
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ThreeJsShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const sceneRef = useRef<any>();

  useEffect(() => {
    // GSAP entrance animation with proper ScrollTrigger setup
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          duration: 1.2,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Enhanced Three.js-like animation without the library
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;
    const particles: Array<{x: number, y: number, z: number, vx: number, vy: number, color: string, size: number}> = [];

    // Create enhanced particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0', '#ce9178'][Math.floor(Math.random() * 5)],
        size: Math.random() * 4 + 1
      });
    }

    const animate = () => {
      if (!isPlaying) return;
      
      time += 0.02;
      
      // Enhanced background with gradient
      const gradient = ctx.createRadialGradient(
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, 0,
        canvas.offsetWidth / 2, canvas.offsetHeight / 2, Math.max(canvas.offsetWidth, canvas.offsetHeight)
      );
      gradient.addColorStop(0, 'rgba(30, 30, 30, 0.95)');
      gradient.addColorStop(1, 'rgba(20, 20, 20, 0.95)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw and update particles with enhanced effects
      particles.forEach((particle, i) => {
        // Update position with wave motion
        particle.x += particle.vx + Math.sin(time + i * 0.1) * 1.5;
        particle.y += particle.vy + Math.cos(time + i * 0.1) * 1.5;
        particle.z += Math.sin(time * 0.5) * 3;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Calculate enhanced size based on z position and time
        const baseSize = Math.max(1, particle.size - particle.z / 200);
        const pulseSize = baseSize + Math.sin(time * 2 + i * 0.5) * 0.5;
        
        // Enhanced glow effect
        const alpha = Math.max(0.1, 1 - particle.z / 1000);
        ctx.globalAlpha = alpha;
        
        // Draw particle with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;

        // Enhanced connections with dynamic opacity
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 120) {
              const connectionAlpha = (120 - distance) / 600;
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = connectionAlpha * alpha;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
      };
      animate();
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">ThreeJsDemo</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Interactive 3D particle system showcasing our Three.js expertise
          </p>
        </div>

        <div ref={containerRef} className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden hover:border-terminal-green transition-all duration-500">
          {/* Demo Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-terminal-text text-sm ml-4">threejs-demo.js</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={toggleAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors hover:scale-110 transform"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors hover:scale-110 transform"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced Canvas Container */}
          <div className="relative h-96 bg-[#1e1e1e] overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              style={{ background: 'transparent' }}
            />
            
            {/* Enhanced Overlay Info */}
            <div className="absolute bottom-4 left-4 text-terminal-text/60 text-sm font-mono bg-black/30 rounded p-2 backdrop-blur-sm">
              <div>Particles: 60</div>
              <div>FPS: ~60</div>
              <div>Engine: Enhanced Canvas 2D</div>
              <div>GSAP: Enabled</div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="p-6 border-t border-terminal-border">
            <pre className="text-sm text-terminal-text/80 font-mono">
              <code>
                <span className="syntax-comment">// Enhanced particle system with GSAP</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">particles</span> = <span className="syntax-keyword">new</span> <span className="syntax-function">ParticleSystem</span>({"{"}
                <br />
                <span className="pl-4 syntax-variable">count</span>: <span className="syntax-string">60</span>,
                <br />
                <span className="pl-4 syntax-variable">connections</span>: <span className="syntax-keyword">true</span>,
                <br />
                <span className="pl-4 syntax-variable">animation</span>: <span className="syntax-string">'enhanced-orbital'</span>,
                <br />
                <span className="pl-4 syntax-variable">gsap</span>: <span className="syntax-keyword">true</span>
                <br />
                {"}"});
              </code>
            </pre>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default ThreeJsShowcase;
