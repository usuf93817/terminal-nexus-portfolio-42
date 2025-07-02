import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { navigateToSection, openExternalLink } from '../utils/navigation';

const Services = () => {
  const { toast } = useToast();

  const services = [
    {
      name: 'MERN Stack Development',
      description: 'Full-stack web applications using MongoDB, Express.js, React, and Node.js',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript'],
      icon: '⚛️',
      color: 'from-terminal-green to-terminal-blue',
      details: {
        overview: 'Complete end-to-end web application development using the MERN stack',
        features: ['RESTful API Development', 'Real-time Applications', 'Database Design', 'Authentication Systems', 'Responsive UI Design'],
        timeline: '4-12 weeks depending on complexity',
        pricing: 'Starting from $2,500'
      }
    },
    {
      name: 'Three.js Visualization',
      description: '3D web experiences and interactive visualizations for modern applications',
      technologies: ['Three.js', 'WebGL', 'GLSL', 'Blender Integration', 'AR/VR'],
      icon: '🎯',
      color: 'from-terminal-blue to-terminal-purple',
      details: {
        overview: 'Immersive 3D web experiences and interactive visualizations',
        features: ['3D Model Loading', 'Custom Shaders', 'Physics Simulation', 'VR/AR Integration', 'Performance Optimization'],
        timeline: '6-16 weeks depending on complexity',
        pricing: 'Starting from $3,500'
      }
    },
    {
      name: 'Python Development',
      description: 'Backend services, automation scripts, and data processing solutions',
      technologies: ['Django', 'FastAPI', 'Flask', 'Pandas', 'NumPy'],
      icon: '🐍',
      color: 'from-terminal-yellow to-terminal-orange',
      details: {
        overview: 'Robust backend systems and automation solutions using Python',
        features: ['API Development', 'Data Processing', 'Machine Learning', 'Task Automation', 'Database Integration'],
        timeline: '3-10 weeks depending on scope',
        pricing: 'Starting from $2,000'
      }
    },
    {
      name: 'PHP & WordPress',
      description: 'Dynamic websites, custom themes, and enterprise WordPress solutions',
      technologies: ['PHP', 'WordPress', 'MySQL', 'WooCommerce', 'Custom Plugins'],
      icon: '🌐',
      color: 'from-terminal-purple to-terminal-red',
      details: {
        overview: 'Professional WordPress solutions and custom PHP applications',
        features: ['Custom Theme Development', 'Plugin Creation', 'E-commerce Solutions', 'Performance Optimization', 'Security Implementation'],
        timeline: '2-8 weeks depending on requirements',
        pricing: 'Starting from $1,500'
      }
    },
    {
      name: 'AI Agent Development',
      description: 'Intelligent chatbots, automation agents, and AI-powered applications',
      technologies: ['OpenAI API', 'LangChain', 'Machine Learning', 'NLP', 'TensorFlow'],
      icon: '🤖',
      color: 'from-terminal-green to-terminal-yellow',
      details: {
        overview: 'Cutting-edge AI solutions for business automation and customer engagement',
        features: ['Conversational AI', 'Document Processing', 'Workflow Automation', 'Custom Training', 'API Integration'],
        timeline: '4-14 weeks depending on complexity',
        pricing: 'Starting from $3,000'
      }
    },
    {
      name: 'Data Scraping',
      description: 'Automated data extraction, web scraping, and API integration services',
      technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Selenium', 'Pandas'],
      icon: '📊',
      color: 'from-terminal-blue to-terminal-green',
      details: {
        overview: 'Automated data collection and processing solutions',
        features: ['Web Scraping', 'API Integration', 'Data Cleaning', 'Real-time Monitoring', 'Custom Dashboards'],
        timeline: '2-6 weeks depending on data sources',
        pricing: 'Starting from $1,200'
      }
    },
    {
      name: 'Lead Generation',
      description: 'Targeted lead generation systems and customer acquisition strategies',
      technologies: ['CRM Integration', 'Email Automation', 'Analytics', 'A/B Testing'],
      icon: '🎯',
      color: 'from-terminal-orange to-terminal-red',
      details: {
        overview: 'Comprehensive lead generation and customer acquisition systems',
        features: ['Lead Scoring', 'Email Campaigns', 'Landing Pages', 'Analytics Tracking', 'CRM Integration'],
        timeline: '3-8 weeks depending on strategy',
        pricing: 'Starting from $2,200'
      }
    },
    {
      name: 'Custom Solutions',
      description: 'Tailored software solutions for unique business requirements',
      technologies: ['Microservices', 'API Development', 'Cloud Deployment', 'DevOps'],
      icon: '⚙️',
      color: 'from-terminal-purple to-terminal-blue',
      details: {
        overview: 'Bespoke software solutions designed for your specific business needs',
        features: ['Architecture Design', 'Scalable Solutions', 'Cloud Integration', 'DevOps Setup', 'Ongoing Support'],
        timeline: '6-20 weeks depending on requirements',
        pricing: 'Custom quote based on requirements'
      }
    }
  ];

  const handleLearnMore = (service: any) => {
    navigateToSection('contact', 'Contact');
  };

  const handleGetQuote = () => {
    const subject = encodeURIComponent('Project Quote Request');
    const body = encodeURIComponent(`Hello NodeX Station,

I'm interested in getting a quote for my project. Here are the details:

Service Required: [Please specify]
Project Description: [Please describe your project]
Timeline: [When do you need this completed?]
Budget Range: [Your budget range]

Please get back to me with a detailed quote.

Best regards,
[Your Name]`);
    
    window.location.href = `mailto:nodexstation@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening email client...",
      description: "We're opening your default email client with a pre-filled quote request.",
      duration: 3000,
    });
  };

  const handleViewPortfolio = () => {
    navigateToSection('portfolio', 'Portfolio');
  };

  return (
    <TooltipProvider>
      <section className="min-h-screen py-20 px-6" data-section="services">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-terminal-green mb-6">
              <span className="syntax-keyword">export</span> <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">services</span> = [
            </h2>
            <p className="text-terminal-text/80 text-lg max-w-3xl pl-6">
              <span className="syntax-comment">/*</span><br />
              <span className="syntax-comment"> * Comprehensive technology solutions tailored to your needs.</span><br />
              <span className="syntax-comment"> * From concept to deployment, we deliver excellence.</span><br />
              <span className="syntax-comment"> */</span>
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-6">
            {services.map((service, index) => (
              <Tooltip key={service.name}>
                <TooltipTrigger asChild>
                  <div
                    className="group bg-terminal-bg/50 rounded-lg border border-terminal-border p-6 hover:border-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20 transform-gpu will-change-transform hover:scale-[1.02] cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleLearnMore(service)}
                  >
                    {/* Service Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-lg font-semibold text-terminal-text mb-3 group-hover:text-terminal-green transition-colors">
                      <span className="syntax-string">"{service.name}"</span>
                    </h3>

                    {/* Description */}
                    <p className="text-terminal-text/70 text-sm mb-4 leading-relaxed">
                      <span className="syntax-comment">// {service.description}</span>
                    </p>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <p className="text-terminal-yellow text-sm">
                        <span className="syntax-variable">tech</span>: [
                      </p>
                      <div className="pl-4 space-y-1 max-h-20 overflow-y-auto">
                        {service.technologies.map((tech, techIndex) => (
                          <p key={tech} className="text-terminal-text text-xs">
                            <span className="syntax-string">"{tech}"</span>
                            {techIndex < service.technologies.length - 1 ? ',' : ''}
                          </p>
                        ))}
                      </div>
                      <p className="text-terminal-yellow text-sm">]</p>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="w-full bg-terminal-green/10 hover:bg-terminal-green/20 text-terminal-green py-2 px-4 rounded text-sm border border-terminal-green/30 hover:border-terminal-green/50 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLearnMore(service);
                        }}
                      >
                        <span className="syntax-function">learnMore</span>()
                      </button>
                    </div>
                  </div>
                </TooltipTrigger>
                
                <TooltipContent side="right" className="max-w-sm p-4 bg-terminal-bg border-terminal-green/30">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-terminal-green">{service.name}</h4>
                    
                    <div>
                      <p className="text-xs font-medium text-terminal-blue mb-1">Overview:</p>
                      <p className="text-xs text-terminal-text/90 leading-relaxed">{service.details.overview}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-terminal-yellow mb-1">Key Features:</p>
                      <div className="grid grid-cols-1 gap-1">
                        {service.details.features.slice(0, 3).map((feature, index) => (
                          <p key={index} className="text-xs text-terminal-text/80">• {feature}</p>
                        ))}
                        {service.details.features.length > 3 && (
                          <p className="text-xs text-terminal-text/60">+ {service.details.features.length - 3} more features</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 pt-2 border-t border-terminal-border/30">
                      <div>
                        <p className="text-xs font-medium text-terminal-purple">Timeline: <span className="font-normal text-terminal-text/90">{service.details.timeline}</span></p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-terminal-orange">Pricing: <span className="font-normal text-terminal-text/90">{service.details.pricing}</span></p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-terminal-green/70 italic mt-2">Click for detailed information</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <p className="text-terminal-green text-4xl font-bold mt-8">];</p>

          {/* Call to Action */}
          <div className="mt-16 bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
            <h3 className="text-2xl font-semibold text-terminal-green mb-4">
              <span className="syntax-keyword">ready</span> <span className="syntax-keyword">to</span>{' '}
              <span className="syntax-function">startProject</span>()?
            </h3>
            <p className="text-terminal-text/80 mb-6 max-w-2xl mx-auto">
              <span className="syntax-comment">
                // Let's discuss your project requirements and create something amazing together
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetQuote}
                className="bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/30"
              >
                <span className="syntax-function">getQuote</span>()
              </button>
              <button 
                onClick={handleViewPortfolio}
                className="border border-terminal-green text-terminal-green px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300"
              >
                <span className="syntax-function">viewPortfolio</span>()
              </button>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Services;
