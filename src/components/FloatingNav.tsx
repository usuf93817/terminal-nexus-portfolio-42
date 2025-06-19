
import React, { useState, useEffect, memo } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail, Bot } from 'lucide-react';

interface FloatingNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = memo(({ activeSection, setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to hide nav when scrolling stops
      const newTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 3000); // Hide after 3 seconds of no scrolling
      
      setScrollTimeout(newTimeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const shouldShow = isVisible && isScrolling;

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Dispatch custom event for navigation
    const event = new CustomEvent('navigate-to-section', { 
      detail: { sectionId } 
    });
    window.dispatchEvent(event);
  };

  return (
    <nav className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
      shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="bg-terminal-bg/95 backdrop-blur-md border border-terminal-border/50 rounded-full px-4 py-2 shadow-2xl">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group relative p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                activeSection === item.id
                  ? 'bg-terminal-green/20 text-terminal-green'
                  : 'text-terminal-text/60 hover:text-terminal-green hover:bg-terminal-green/10'
              }`}
              aria-label={item.label}
              data-cursor-text={item.label}
            >
              <item.icon className="w-5 h-5 transition-all duration-300" />
              
              {/* Active indicator */}
              {activeSection === item.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-terminal-green rounded-full animate-pulse" />
              )}
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-terminal-bg/95 border border-terminal-border/50 rounded-md px-2 py-1 backdrop-blur-md">
                  <span className="text-xs font-mono text-terminal-text whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-terminal-green/10 to-transparent animate-pulse" />
      </div>
    </nav>
  );
});

FloatingNav.displayName = 'FloatingNav';

export default FloatingNav;
