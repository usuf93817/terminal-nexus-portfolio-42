import React, { useEffect, useRef } from 'react';
import { ChevronDown, Code, Zap, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import GSAPAnimations from './GSAPAnimations';

const EnhancedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Create timeline for hero animations
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 100, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "back.out(1.7)" }
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.8"
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.6"
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.8)" }, 
      "-=0.4"
    );

    // Floating animation for icons
    gsap.set('.floating-icon', { transformOrigin: "center center" });
    gsap.to('.floating-icon', {
      y: "-=20",
      rotation: 360,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5
    });

    // Simple typing effect without TextPlugin
    if (codeRef.current) {
      const codeText = codeRef.current;
      const text = `// Crafting digital experiences with modern web technologies
// Specialized in React, TypeScript, and cutting-edge animations
// Passionate about creating performant, beautiful applications`;
      codeText.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          codeText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 30);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }

    // Particles canvas animation
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles: Array<{
          x: number, y: number, vx: number, vy: number, 
          size: number, opacity: number, color: string
        }> = [];

        // Create particles
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            color: ['#4ec9b0', '#569cd6', '#dcdcaa'][Math.floor(Math.random() * 3)]
          });
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
          
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-terminal-bg via-terminal-bg to-terminal-bg/80">
      {/* Particles Canvas */}
      <canvas 
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(78, 201, 176, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78, 201, 176, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <GSAPAnimations animation="fadeIn" delay={0.2}>
          <div className="floating-icon absolute top-20 left-20 text-terminal-green/30">
            <Code className="w-8 h-8" />
          </div>
        </GSAPAnimations>

        <GSAPAnimations animation="fadeIn" delay={0.4}>
          <div className="floating-icon absolute top-32 right-20 text-terminal-blue/30">
            <Zap className="w-6 h-6" />
          </div>
        </GSAPAnimations>

        <GSAPAnimations animation="fadeIn" delay={0.6}>
          <div className="floating-icon absolute bottom-40 left-32 text-terminal-green/30">
            <Globe className="w-7 h-7" />
          </div>
        </GSAPAnimations>

        {/* Main Hero Content */}
        <div className="space-y-8">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-terminal-green leading-tight">
            <span className="block">Dev</span>
            <span className="block text-terminal-blue">Portfolio</span>
          </h1>

          <div className="hero-subtitle text-xl md:text-2xl text-terminal-text/80 font-mono">
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-variable">developer</span> = {"{"}
          </div>

          <div className="hero-description max-w-3xl mx-auto space-y-4 text-terminal-text/70 text-lg">
            <div className="font-mono text-left bg-terminal-bg/50 rounded-lg p-6 border border-terminal-border">
              <div ref={codeRef} className="syntax-comment">
              </div>
            </div>
          </div>

          <div className="hero-subtitle text-xl md:text-2xl text-terminal-text/80 font-mono">
            {"}"}
          </div>

          <GSAPAnimations animation="elastic" delay={1.5}>
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-terminal-green text-terminal-bg font-mono font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-terminal-green/25">
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-terminal-green opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-terminal-border text-terminal-text font-mono font-medium rounded-lg transition-all duration-300 hover:border-terminal-green hover:text-terminal-green hover:scale-105">
                Download Resume
              </button>
            </div>
          </GSAPAnimations>

          <GSAPAnimations animation="slideUp" delay={2}>
            <div className="mt-16">
              <ChevronDown className="w-8 h-8 text-terminal-green/60 mx-auto animate-bounce" />
            </div>
          </GSAPAnimations>
        </div>
      </div>

      {/* Background Styles */}
      <style>{`
        .syntax-keyword { color: #569cd6; }
        .syntax-variable { color: #9cdcfe; }
        .syntax-function { color: #dcdcaa; }
        .syntax-comment { color: #6a9955; }
        .syntax-string { color: #ce9178; }
      `}</style>
    </section>
  );
};

export default EnhancedHero;
