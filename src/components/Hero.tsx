
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    '$ initializing NodeXstation...',
    '$ loading services: MERN, Three.js, Python, PHP...',
    '$ connecting to AI agents...',
    '$ Welcome to NodeXstation',
    '$ Your gateway to innovative software solutions'
  ];

  useEffect(() => {
    const typewriter = setInterval(() => {
      if (currentLineIndex < terminalLines.length) {
        const currentLine = terminalLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          setDisplayText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setDisplayText(prev => prev + '\n');
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
          
          if (currentLineIndex === terminalLines.length - 1) {
            clearInterval(typewriter);
          } else {
            setTimeout(() => {}, 500); // Pause between lines
          }
        }
      }
    }, 100);

    return () => clearInterval(typewriter);
  }, [currentLineIndex, currentCharIndex]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorBlink);
  }, []);

  const services = [
    { name: 'MERN Stack', color: 'text-terminal-green' },
    { name: 'Three.js', color: 'text-terminal-blue' },
    { name: 'Python', color: 'text-terminal-yellow' },
    { name: 'PHP', color: 'text-terminal-purple' },
    { name: 'WordPress', color: 'text-terminal-orange' },
    { name: 'AI Agents', color: 'text-terminal-green' },
    { name: 'Data Scraping', color: 'text-terminal-blue' },
    { name: 'Lead Generation', color: 'text-terminal-red' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Terminal Output */}
        <div className="space-y-8">
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-6 font-mono">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-terminal-text text-sm">Terminal - NodeXstation</span>
            </div>
            
            <div className="space-y-1">
              {displayText.split('\n').map((line, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-terminal-text">{line}</span>
                  {index === displayText.split('\n').length - 1 && showCursor && (
                    <div className="w-2 h-5 bg-terminal-green ml-1 animate-blink"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-terminal-text">
              <span className="syntax-keyword">class</span>{' '}
              <span className="syntax-function">NodeXstation</span>{' '}
              <span className="syntax-keyword">extends</span>{' '}
              <span className="syntax-variable">Innovation</span>
            </h2>
            <p className="text-terminal-text/80 text-lg leading-relaxed">
              <span className="syntax-comment">/*</span><br />
              <span className="syntax-comment"> * We craft cutting-edge digital solutions</span><br />
              <span className="syntax-comment"> * Specializing in full-stack development,</span><br />
              <span className="syntax-comment"> * AI integration, and data solutions</span><br />
              <span className="syntax-comment"> */</span>
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-terminal-green">
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-variable">services</span>{' '}
            <span className="syntax-keyword">=</span> [
          </h3>
          
          <div className="grid grid-cols-2 gap-4 pl-6">
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`p-4 bg-terminal-bg/50 rounded-lg border border-terminal-border hover:border-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="syntax-string">"</span>
                <span className={service.color}>{service.name}</span>
                <span className="syntax-string">",</span>
              </div>
            ))}
          </div>
          
          <p className="text-terminal-text pl-0">
            <span className="syntax-keyword">];</span>
          </p>

          <div className="pt-6">
            <button className="group bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/30">
              <span className="syntax-function">startProject</span>
              <span className="syntax-keyword">()</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
