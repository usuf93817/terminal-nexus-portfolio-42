
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demo?: string;
  github?: string;
  status: 'completed' | 'in-progress' | 'concept';
}

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with MERN stack and integrated with Stripe.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      status: "completed"
    },
    {
      id: 2,
      title: "3D Product Configurator",
      description: "Interactive 3D product customization tool allowing users to modify colors, materials, and components in real-time using Three.js.",
      tech: ["Three.js", "React", "WebGL", "TypeScript"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      status: "completed"
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description: "Intelligent chatbot system with natural language processing, context awareness, and integration with multiple AI providers.",
      tech: ["OpenAI", "React", "Node.js", "Socket.io", "Redis"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      status: "in-progress"
    },
    {
      id: 4,
      title: "Data Analytics Dashboard",
      description: "Real-time analytics platform with interactive charts, data visualization, and automated reporting capabilities.",
      tech: ["React", "D3.js", "Python", "PostgreSQL", "FastAPI"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      status: "completed"
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Secure, transparent voting platform using blockchain technology to ensure vote integrity and transparency.",
      tech: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      status: "concept"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-terminal-green';
      case 'in-progress': return 'text-terminal-yellow';
      case 'concept': return 'text-terminal-blue';
      default: return 'text-terminal-text';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'concept': return 'Concept';
      default: return 'Unknown';
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">ProjectShowcase</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Explore our latest projects and innovations
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div 
            className="relative overflow-hidden rounded-lg border border-terminal-border bg-[#1e1e1e]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Project Image */}
                    <div className="relative group">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-lg border border-terminal-border group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono ${getStatusColor(project.status)} bg-black/50 backdrop-blur-sm`}>
                          {getStatusText(project.status)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-terminal-green text-terminal-bg rounded-full hover:scale-110 transition-transform">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-terminal-text text-terminal-bg rounded-full hover:scale-110 transition-transform">
                          <Github className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-terminal-blue text-white rounded-full hover:scale-110 transition-transform">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-terminal-green mb-4">
                        {project.title}
                      </h3>
                      
                      <p className="text-terminal-text/80 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <h4 className="text-terminal-text font-semibold mb-3">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-terminal-border text-terminal-text rounded-full text-sm font-mono hover:bg-terminal-green hover:text-terminal-bg transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Links */}
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-terminal-green text-terminal-bg rounded-lg hover:bg-terminal-green/90 transition-colors">
                          <Play className="w-4 h-4" />
                          <span>Live Demo</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-terminal-green text-terminal-green rounded-lg hover:bg-terminal-green/10 transition-colors">
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-terminal-green rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-terminal-green rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-terminal-green' : 'bg-terminal-border hover:bg-terminal-green/50'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full h-1 bg-terminal-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-terminal-green transition-all duration-500 ease-in-out"
              style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
