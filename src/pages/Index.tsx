
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EnhancedHero from '../components/EnhancedHero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import AIAssistant from '../components/AIAssistant';
import StatsSection from '../components/StatsSection';
import ThreeJsShowcase from '../components/ThreeJsShowcase';
import TechStack from '../components/TechStack';
import FloatingNav from '../components/FloatingNav';
import MagneticCursor from '../components/MagneticCursor';
import LoadingScreen from '../components/LoadingScreen';
import ParticleBackground from '../components/ParticleBackground';
import GSAPAnimations from '../components/GSAPAnimations';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enhanced smooth scrolling with GSAP
    const style = document.createElement('style');
    style.textContent = `
      html { 
        scroll-behavior: smooth; 
      }
      body { 
        cursor: none;
        overflow-x: hidden;
      }
      
      /* Enhanced animations */
      .gsap-fade-up {
        opacity: 0;
        transform: translateY(50px);
      }
      
      .smooth-transition {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Enhanced entrance animation
    gsap.fromTo(document.body,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        onComplete: () => setIsVisible(true)
      }
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <GSAPAnimations animation="fadeIn" duration={1.2}>
              <EnhancedHero />
            </GSAPAnimations>
            <GSAPAnimations animation="slideLeft" delay={0.2} duration={1}>
              <StatsSection />
            </GSAPAnimations>
            <GSAPAnimations animation="scale" delay={0.4} duration={1.2}>
              <ThreeJsShowcase />
            </GSAPAnimations>
            <GSAPAnimations animation="elastic" delay={0.6} duration={1.5}>
              <TechStack />
            </GSAPAnimations>
          </>
        );
      case 'about':
        return (
          <GSAPAnimations animation="slideUp" duration={1}>
            <About />
          </GSAPAnimations>
        );
      case 'services':
        return (
          <GSAPAnimations animation="fadeIn" duration={1}>
            <Services />
          </GSAPAnimations>
        );
      case 'portfolio':
        return (
          <GSAPAnimations animation="slideRight" duration={1}>
            <Portfolio />
          </GSAPAnimations>
        );
      case 'contact':
        return (
          <GSAPAnimations animation="scale" duration={1}>
            <Contact />
          </GSAPAnimations>
        );
      case 'ai-assistant':
        return (
          <GSAPAnimations animation="rotate" duration={1}>
            <AIAssistant />
          </GSAPAnimations>
        );
      default:
        return (
          <>
            <GSAPAnimations animation="fadeIn" duration={1.2}>
              <EnhancedHero />
            </GSAPAnimations>
            <GSAPAnimations animation="slideLeft" delay={0.2} duration={1}>
              <StatsSection />
            </GSAPAnimations>
            <GSAPAnimations animation="scale" delay={0.4} duration={1.2}>
              <ThreeJsShowcase />
            </GSAPAnimations>
            <GSAPAnimations animation="elastic" delay={0.6} duration={1.5}>
              <TechStack />
            </GSAPAnimations>
          </>
        );
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-terminal-bg text-terminal-text transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Advanced Features */}
      <MagneticCursor />
      <ParticleBackground />
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Header with GSAP animation */}
      <GSAPAnimations animation="slideUp" trigger={false} duration={0.8}>
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      </GSAPAnimations>
      
      <main className="relative">
        {renderSection()}
        
        {/* Enhanced Background Patterns with GSAP */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <GSAPAnimations animation="scale" trigger={false} delay={1} duration={2}>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terminal-green/5 rounded-full blur-3xl"></div>
          </GSAPAnimations>
          <GSAPAnimations animation="rotate" trigger={false} delay={1.5} duration={2}>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-blue/5 rounded-full blur-3xl"></div>
          </GSAPAnimations>
          <GSAPAnimations animation="elastic" trigger={false} delay={2} duration={2}>
            <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-terminal-purple/5 rounded-full blur-3xl"></div>
          </GSAPAnimations>
        </div>
        
        {/* Enhanced Code Rain Effect */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 25 }, (_, i) => (
              <GSAPAnimations
                key={i}
                animation="fadeIn"
                trigger={false}
                delay={Math.random() * 3}
                duration={2}
              >
                <div
                  className="absolute text-terminal-green text-xs font-mono"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  {['{...}', 'console.log()', 'async/await', 'useState()', 'gsap.to()', 'THREE.Scene()'][Math.floor(Math.random() * 6)]}
                </div>
              </GSAPAnimations>
            ))}
          </div>
        </div>
      </main>
      
      {/* Enhanced Footer with GSAP */}
      <footer className="bg-[#1e1e1e] border-t border-terminal-border py-8 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 via-terminal-blue/5 to-terminal-purple/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <GSAPAnimations animation="slideUp" duration={0.8}>
            <p className="text-terminal-text/60 font-mono">
              <span className="syntax-comment">/*</span><br />
              <span className="syntax-comment"> * © 2024 NodeXstation. Built with ❤️, React, GSAP & Three.js</span><br />
              <span className="syntax-comment"> * Transforming ideas into digital reality with smooth animations</span><br />
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
          </GSAPAnimations>
        </div>
      </footer>
    </div>
  );
};

export default Index;
