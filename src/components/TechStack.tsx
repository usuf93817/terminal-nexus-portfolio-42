
import React, { useState } from 'react';
import { Code2, Database, Brain, Palette } from 'lucide-react';

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const techCategories = {
    frontend: {
      icon: Code2,
      title: 'Frontend Development',
      color: 'text-terminal-blue',
      technologies: [
        { name: 'React.js', level: 95, description: 'Modern React with hooks and context' },
        { name: 'Next.js', level: 90, description: 'Server-side rendering and static sites' },
        { name: 'Three.js', level: 85, description: '3D graphics and WebGL experiences' },
        { name: 'TypeScript', level: 88, description: 'Type-safe JavaScript development' },
        { name: 'Tailwind CSS', level: 92, description: 'Utility-first CSS framework' }
      ]
    },
    backend: {
      icon: Database,
      title: 'Backend Development',
      color: 'text-terminal-green',
      technologies: [
        { name: 'Node.js', level: 93, description: 'Server-side JavaScript runtime' },
        { name: 'Express.js', level: 90, description: 'Fast web application framework' },
        { name: 'MongoDB', level: 87, description: 'NoSQL database for modern apps' },
        { name: 'Python', level: 85, description: 'Data science and web development' },
        { name: 'PHP', level: 80, description: 'Server-side scripting language' }
      ]
    },
    ai: {
      icon: Brain,
      title: 'AI & Automation',
      color: 'text-terminal-purple',
      technologies: [
        { name: 'OpenAI API', level: 88, description: 'GPT integration and AI agents' },
        { name: 'LangChain', level: 82, description: 'AI application development framework' },
        { name: 'Scrapy', level: 90, description: 'Web scraping and data extraction' },
        { name: 'Selenium', level: 85, description: 'Browser automation and testing' },
        { name: 'Beautiful Soup', level: 88, description: 'HTML/XML parsing library' }
      ]
    },
    tools: {
      icon: Palette,
      title: 'Tools & Platforms',
      color: 'text-terminal-yellow',
      technologies: [
        { name: 'WordPress', level: 85, description: 'CMS development and customization' },
        { name: 'Git', level: 92, description: 'Version control and collaboration' },
        { name: 'Docker', level: 80, description: 'Containerization and deployment' },
        { name: 'AWS', level: 75, description: 'Cloud infrastructure and services' },
        { name: 'Figma', level: 88, description: 'UI/UX design and prototyping' }
      ]
    }
  };

  const currentCategory = techCategories[activeCategory as keyof typeof techCategories];

  return (
    <section className="py-16 px-6 bg-terminal-bg/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-comment">// Technology Stack</span>
          </h2>
          <p className="text-terminal-text/80">
            Our expertise across modern development technologies
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(techCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono text-sm transition-all ${
                activeCategory === key
                  ? 'bg-terminal-green text-terminal-bg'
                  : 'bg-terminal-bg border border-terminal-border text-terminal-text hover:border-terminal-green'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Technology Grid */}
        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
          <div className="px-6 py-4 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <currentCategory.icon className={`w-5 h-5 ${currentCategory.color}`} />
              <h3 className="text-terminal-text font-semibold">{currentCategory.title}</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {currentCategory.technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className="bg-terminal-bg/30 border border-terminal-border rounded-lg p-4 hover:border-terminal-green/50 transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-terminal-text font-semibold">{tech.name}</h4>
                    <span className={`text-sm ${currentCategory.color}`}>{tech.level}%</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="w-full bg-terminal-border rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000`}
                        style={{
                          width: `${tech.level}%`,
                          background: `linear-gradient(90deg, ${
                            currentCategory.color.includes('blue') ? '#569cd6' :
                            currentCategory.color.includes('green') ? '#4ec9b0' :
                            currentCategory.color.includes('purple') ? '#c586c0' :
                            '#dcdcaa'
                          }, rgba(255,255,255,0.1))`
                        }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-terminal-text/70 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
