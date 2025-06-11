
import React, { useState, useEffect } from 'react';
import { Code, Database, Brain, Globe } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    'Welcome to NodeXstation',
    'MERN Stack Developers',
    'Three.js Specialists',
    'AI Agent Builders',
    'Data Scraping Experts'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      setDisplayText(
        isDeleting 
          ? fullText.substring(0, currentIndex - 1)
          : fullText.substring(0, currentIndex + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setCurrentIndex(isDeleting ? currentIndex - 1 : currentIndex + 1);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, typingSpeed, textArray]);

  const services = [
    {
      icon: Code,
      name: 'MERN Stack',
      description: 'Full-stack JavaScript development',
      color: 'text-terminal-green'
    },
    {
      icon: Globe,
      name: 'Three.js',
      description: '3D web experiences',
      color: 'text-terminal-blue'
    },
    {
      icon: Brain,
      name: 'AI Agents',
      description: 'Intelligent automation',
      color: 'text-terminal-purple'
    },
    {
      icon: Database,
      name: 'Data Scraping',
      description: 'Automated data extraction',
      color: 'text-terminal-yellow'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Enhanced Animated Background Grid */}
      <div className="absolute inset-0 opacity-20 cyber-grid"></div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-terminal-green rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Energy waves */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute w-full h-px energy-wave opacity-30"
            style={{
              top: `${20 + i * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Enhanced Terminal Window */}
        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden mb-12 hover-glow neon-border hologram-effect">
          {/* Enhanced Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#323233] to-[#2d2d30] border-b border-terminal-border relative data-stream">
            <div className="flex items-center space-x-2 relative z-10">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 quantum-dot"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 quantum-dot" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 quantum-dot" style={{animationDelay: '1s'}}></div>
              </div>
              <span className="text-terminal-text text-sm ml-4 matrix-text">neural-terminal.exe</span>
            </div>
            <div className="text-terminal-text/60 text-xs relative z-10">NodeXstation v2.1.0</div>
          </div>

          {/* Enhanced Terminal Content */}
          <div className="p-8 relative">
            <div className="terminal-line">
              <span className="terminal-prompt">root@nodex:~$</span>
              <span className="text-terminal-text font-mono">initialize </span>
              <span className="text-terminal-green font-mono text-2xl md:text-4xl font-bold matrix-text">
                {displayText}
                <span className="terminal-cursor"></span>
              </span>
            </div>
            
            <div className="mt-6 text-left">
              <div className="terminal-line">
                <span className="terminal-prompt">root@nodex:~$</span>
                <span className="text-terminal-text font-mono">cat quantum-capabilities.json</span>
              </div>
              <div className="mt-2 pl-6 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-terminal-green to-terminal-blue opacity-50"></div>
                <span className="syntax-comment">// Next-generation software development</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">expertise</span> = [<br />
                <span className="pl-4 syntax-string hologram-effect">"MERN Stack Architecture"</span>,<br />
                <span className="pl-4 syntax-string hologram-effect">"Three.js Quantum Experiences"</span>,<br />
                <span className="pl-4 syntax-string hologram-effect">"AI Neural Networks"</span>,<br />
                <span className="pl-4 syntax-string hologram-effect">"Data Mining & Automation"</span><br />
                ];
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="bg-terminal-bg/50 border border-terminal-border rounded-lg p-6 hover:border-terminal-green transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 to-terminal-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Scanning line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              
              <service.icon className={`w-8 h-8 ${service.color} mb-4 group-hover:scale-110 transition-transform relative z-10`} />
              <h3 className="text-terminal-text font-semibold mb-2 relative z-10">{service.name}</h3>
              <p className="text-terminal-text/70 text-sm relative z-10">{service.description}</p>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-terminal-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-terminal-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="space-y-6 relative">
          <p className="text-terminal-text/80 text-lg max-w-2xl mx-auto relative">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment matrix-text"> * Transforming quantum ideas into digital reality</span><br />
            <span className="syntax-comment matrix-text"> * Building the metaverse, one neural network at a time</span><br />
            <span className="syntax-comment"> */</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover-scale hologram-effect">
              <span className="syntax-function">initializeProject</span>()
            </button>
            <button className="border border-terminal-green text-terminal-green px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300 hover-scale neon-border">
              <span className="syntax-function">establishConnection</span>()
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
