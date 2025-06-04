
import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail, Bot } from 'lucide-react';

interface FloatingNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'services', icon: Briefcase, label: 'Services' },
    { id: 'portfolio', icon: FolderOpen, label: 'Portfolio' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'ai-assistant', icon: Bot, label: 'AI Assistant' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
    }`}>
      {/* Scroll Progress */}
      <div className="absolute left-0 top-0 w-0.5 h-full bg-terminal-border rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-terminal-green to-terminal-blue transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation Items */}
      <div className="ml-4 space-y-4">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`group relative w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 ${
              activeSection === item.id
                ? 'bg-terminal-green border-terminal-green text-terminal-bg'
                : 'bg-terminal-bg/80 border-terminal-border text-terminal-text hover:border-terminal-green backdrop-blur-sm'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <item.icon className="w-5 h-5 mx-auto" />
            
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-terminal-bg border border-terminal-border rounded-lg px-3 py-2 text-sm font-mono whitespace-nowrap">
                {item.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-terminal-border"></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingNav;
