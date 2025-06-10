
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import FloatingNav from './FloatingNav';
import MagneticCursor from './MagneticCursor';
import ParticleBackground from './ParticleBackground';
import LoadingScreen from './LoadingScreen';
import ThreeJsScene from './ThreeJsScene';
import ScrollReveal from './ScrollReveal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  // Determine active section based on current route
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/services') return 'services';
    if (path === '/portfolio') return 'portfolio';
    if (path === '/contact') return 'contact';
    if (path === '/ai-assistant') return 'ai-assistant';
    return 'home';
  };

  const [activeSection, setActiveSection] = useState(getActiveSection());

  useEffect(() => {
    setActiveSection(getActiveSection());
  }, [location.pathname]);

  useEffect(() => {
    // Enhanced smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html { 
        scroll-behavior: smooth; 
        scroll-padding-top: 80px;
      }
      body { 
        cursor: none;
        overflow-x: hidden;
      }
      * {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);

    // Smooth scroll tracking
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-terminal-bg text-terminal-text transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Add Three.js background scene */}
      <ThreeJsScene />
      
      {/* Advanced Features */}
      <MagneticCursor />
      <ParticleBackground />
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Header with parallax effect */}
      <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      
      <main className="relative pt-20">
        {children}
        
        {/* Enhanced Background Patterns with parallax */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-terminal-green/5 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-blue/5 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '1s',
              transform: `translateY(${scrollY * -0.03}px)` 
            }}
          ></div>
          <div 
            className="absolute top-3/4 left-1/2 w-48 h-48 bg-terminal-purple/5 rounded-full blur-3xl animate-pulse" 
            style={{ 
              animationDelay: '2s',
              transform: `translateY(${scrollY * 0.07}px)` 
            }}
          ></div>
        </div>
        
        {/* Enhanced Code Rain Effect */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute text-terminal-green text-xs font-mono animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  transform: `translateY(${scrollY * (0.01 + Math.random() * 0.02)}px)`
                }}
              >
                {['{...}', 'console.log()', 'async/await', 'useState()', 'useEffect()'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-[#1e1e1e] border-t border-terminal-border py-8 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 via-terminal-blue/5 to-terminal-purple/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <p className="text-terminal-text/60 font-mono">
              <span className="syntax-comment">/*</span><br />
              <span className="syntax-comment"> * © 2024 NodeXstation. Built with ❤️ and React.</span><br />
              <span className="syntax-comment"> * Transforming ideas into digital reality.</span><br />
              <span className="syntax-comment"> */</span>
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="mailto:nodexstation@gmail.com"
                className="text-terminal-text/60 hover:text-terminal-green transition-all duration-300 font-mono text-sm hover:scale-110 transform"
                data-magnetic
                data-cursor-text="Send Email"
              >
                <span className="syntax-variable">email</span>
              </a>
              <a
                href="https://github.com/nodexStation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text/60 hover:text-terminal-green transition-all duration-300 font-mono text-sm hover:scale-110 transform"
                data-magnetic
                data-cursor-text="View GitHub"
              >
                <span className="syntax-variable">github</span>
              </a>
              <a
                href="https://www.instagram.com/nodex_station/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text/60 hover:text-terminal-green transition-all duration-300 font-mono text-sm hover:scale-110 transform"
                data-magnetic
                data-cursor-text="Follow Instagram"
              >
                <span className="syntax-variable">instagram</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
