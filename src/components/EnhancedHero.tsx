
import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Brain, Globe, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const EnhancedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const textArray = [
    'Welcome to NodeXstation',
    'MERN Stack Developers',
    'Three.js Specialists', 
    'AI Agent Builders',
    'Data Scraping Experts'
  ];

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

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial hero entrance animation
    tl.fromTo(heroRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(terminalRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(".service-card",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    )
    .fromTo(".cta-buttons",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );

    // Floating animation for background particles
    gsap.to(".floating-particle", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-180, 180)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Continuous pulse animation for terminal
    gsap.to(terminalRef.current, {
      boxShadow: "0 0 30px rgba(78, 201, 176, 0.3)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  useEffect(() => {
    // Enhanced typing animation with GSAP
    const typeText = () => {
      const currentText = textArray[currentIndex % textArray.length];
      
      gsap.to({}, {
        duration: currentText.length * 0.1,
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          const currentLength = Math.floor(progress * currentText.length);
          setDisplayText(currentText.substring(0, currentLength));
        },
        onComplete: () => {
          setTimeout(() => {
            gsap.to({}, {
              duration: 0.5,
              onUpdate: function() {
                const progress = this.progress();
                const currentLength = Math.floor((1 - progress) * currentText.length);
                setDisplayText(currentText.substring(0, currentLength));
              },
              onComplete: () => {
                setCurrentIndex((prev) => prev + 1);
              }
            });
          }, 1500);
        }
      });
    };

    const interval = setInterval(typeText, 4000);
    typeText(); // Start immediately

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToNext = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: window.innerHeight,
      ease: "power2.inOut"
    });
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(78, 201, 176, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(78, 201, 176, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Enhanced Floating Particles with GSAP */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 bg-terminal-green rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Additional geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="floating-particle absolute border border-terminal-blue/30 rounded-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Enhanced Terminal Window */}
        <div 
          ref={terminalRef}
          className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden mb-12 relative"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 pulse-dot"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 pulse-dot"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 pulse-dot"></div>
              </div>
              <span className="text-terminal-text text-sm ml-4">enhanced-terminal</span>
            </div>
            <div className="text-terminal-text/60 text-xs">NodeXstation v2.0</div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 relative">
            <div className="terminal-line">
              <span className="terminal-prompt">nodex@station:~$</span>
              <span className="text-terminal-text font-mono">echo "</span>
              <span className="text-terminal-green font-mono text-2xl md:text-4xl font-bold">
                {displayText}
                <span className="terminal-cursor"></span>
              </span>
              <span className="text-terminal-text font-mono">"</span>
            </div>
            
            <div className="mt-6 text-left">
              <div className="terminal-line">
                <span className="terminal-prompt">nodex@station:~$</span>
                <span className="text-terminal-text font-mono">cat enhanced-services.json</span>
              </div>
              <div className="mt-2 pl-6">
                <span className="syntax-comment">// Next-generation software development</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">expertise</span> = [<br />
                <span className="pl-4 syntax-string">"MERN Stack Development"</span>,<br />
                <span className="pl-4 syntax-string">"Advanced Three.js Experiences"</span>,<br />
                <span className="pl-4 syntax-string">"AI Agent Development"</span>,<br />
                <span className="pl-4 syntax-string">"Intelligent Data Scraping"</span><br />
                ];
              </div>
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="scanline"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="service-card bg-terminal-bg/50 border border-terminal-border rounded-lg p-6 hover:border-terminal-green transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <service.icon className={`w-8 h-8 ${service.color} mb-4 relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300`} />
              <h3 className="text-terminal-text font-semibold mb-2 relative z-10">{service.name}</h3>
              <p className="text-terminal-text/70 text-sm relative z-10">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="space-y-6">
          <p className="text-terminal-text/80 text-lg max-w-2xl mx-auto">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Crafting the future with cutting-edge technology</span><br />
            <span className="syntax-comment"> * Where innovation meets exceptional execution</span><br />
            <span className="syntax-comment"> */</span>
          </p>
          
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-terminal-green/25">
              <span className="syntax-function">exploreProjects</span>()
            </button>
            <button className="border border-terminal-green text-terminal-green px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10"><span className="syntax-function">contactUs</span>()</span>
              <div className="absolute inset-0 bg-terminal-green/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
        >
          <ChevronDown className="w-6 h-6 text-terminal-green animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #4ec9b0, transparent);
          animation: scan 3s ease-in-out infinite;
        }
        
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(200px); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default EnhancedHero;
