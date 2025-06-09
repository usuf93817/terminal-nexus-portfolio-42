
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ThreeJsShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const sceneRef = useRef<any>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Simple Three.js-like animation without the library
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
    const particles: Array<{x: number, y: number, z: number, vx: number, vy: number, color: string}> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'][Math.floor(Math.random() * 4)]
      });
    }

    const animate = () => {
      if (!isPlaying) return;
      
      time += 0.02;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(30, 30, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw and update particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx + Math.sin(time + i * 0.1) * 0.5;
        particle.y += particle.vy + Math.cos(time + i * 0.1) * 0.5;
        particle.z += Math.sin(time) * 2;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Calculate size based on z position
        const size = Math.max(1, 5 - particle.z / 200);
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.max(0.1, 1 - particle.z / 1000);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 100) {
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (100 - distance) / 500;
              ctx.lineWidth = 0.5;
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
        // Resume animation logic here
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

        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
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
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative h-96 bg-[#1e1e1e]">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: 'transparent' }}
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-4 left-4 text-terminal-text/60 text-sm font-mono">
              <div>Particles: 50</div>
              <div>FPS: ~60</div>
              <div>Rendering: Canvas 2D</div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="p-6 border-t border-terminal-border">
            <pre className="text-sm text-terminal-text/80 font-mono">
              <code>
                <span className="syntax-comment">// Particle system initialization</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">particles</span> = <span className="syntax-keyword">new</span> <span className="syntax-function">ParticleSystem</span>({"{"}
                <br />
                <span className="pl-4 syntax-variable">count</span>: <span className="syntax-string">50</span>,
                <br />
                <span className="pl-4 syntax-variable">connections</span>: <span className="syntax-keyword">true</span>,
                <br />
                <span className="pl-4 syntax-variable">animation</span>: <span className="syntax-string">'orbital'</span>
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
