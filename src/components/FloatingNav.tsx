
import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail, Bot } from 'lucide-react';

interface FloatingNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
    }`}>
      {/* Enhanced Scroll Progress */}
      <div className="absolute left-0 top-0 w-0.5 h-full bg-terminal-border rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-terminal-green via-terminal-blue to-terminal-purple transition-all duration-500 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation Items */}
      <div className="ml-4 space-y-4">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`group relative w-12 h-12 rounded-full border transition-all duration-500 ease-out transform will-change-transform ${
              activeSection === item.id
                ? 'bg-terminal-green border-terminal-green text-terminal-bg scale-110 shadow-lg shadow-terminal-green/30'
                : 'bg-terminal-bg/90 border-terminal-border text-terminal-text hover:border-terminal-green backdrop-blur-sm hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
            } ${hoveredItem === item.id ? 'z-10' : ''}`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: hoveredItem === item.id ? 'scale(1.15)' : activeSection === item.id ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <item.icon className="w-5 h-5 mx-auto transition-transform duration-300" />
            
            {/* Enhanced Tooltip */}
            <div className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-500 pointer-events-none ${
              hoveredItem === item.id ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95'
            }`}>
              <div className="bg-terminal-bg/95 border border-terminal-border rounded-lg px-4 py-2 text-sm font-mono whitespace-nowrap backdrop-blur-sm shadow-xl">
                {item.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-terminal-border"></div>
              </div>
            </div>

            {/* Ripple effect */}
            <div className={`absolute inset-0 rounded-full bg-terminal-green/20 scale-0 transition-transform duration-300 ${
              activeSection === item.id ? 'animate-ping' : ''
            }`} />
          </button>
        ))}
      </div>

      {/* Floating background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 to-terminal-blue/5 rounded-full blur-xl -z-10 animate-pulse" />
    </div>
  );
};

export default FloatingNav;
