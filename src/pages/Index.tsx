
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import AIAssistant from '../components/AIAssistant';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative">
        {renderSection()}
        
        {/* Background Patterns */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terminal-green/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-terminal-purple/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Code Rain Effect (Optional) */}
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
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              >
                {'{'}...{'}'}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#1e1e1e] border-t border-terminal-border py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-terminal-text/60 font-mono">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * © 2024 NodeXstation. Built with ❤️ and React.</span><br />
            <span className="syntax-comment"> * Transforming ideas into digital reality.</span><br />
            <span className="syntax-comment"> */</span>
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="mailto:nodexstation@gmail.com"
              className="text-terminal-text/60 hover:text-terminal-green transition-colors font-mono text-sm"
            >
              <span className="syntax-variable">email</span>
            </a>
            <a
              href="https://github.com/nodexStation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/60 hover:text-terminal-green transition-colors font-mono text-sm"
            >
              <span className="syntax-variable">github</span>
            </a>
            <a
              href="https://www.instagram.com/nodex_station/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text/60 hover:text-terminal-green transition-colors font-mono text-sm"
            >
              <span className="syntax-variable">instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
