
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ThreeJsShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const sceneRef = useRef<any>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Enhanced Three.js-like animation with more complex effects
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

    // Enhanced animation variables
    let time = 0;
    const particles: Array<{
      x: number, 
      y: number, 
      z: number, 
      vx: number, 
      vy: number, 
      vz: number,
      color: string,
      size: number,
      trail: Array<{x: number, y: number, alpha: number}>
    }> = [];

    const geometryShapes: Array<{
      x: number,
      y: number,
      rotation: number,
      rotationSpeed: number,
      size: number,
      type: 'cube' | 'triangle' | 'hexagon',
      color: string
    }> = [];

    // Create enhanced particles with trails
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        vz: (Math.random() - 0.5) * 5,
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0', '#f44747'][Math.floor(Math.random() * 5)],
        size: Math.random() * 4 + 1,
        trail: []
      });
    }

    // Create floating geometric shapes
    for (let i = 0; i < 15; i++) {
      geometryShapes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 30 + 10,
        type: ['cube', 'triangle', 'hexagon'][Math.floor(Math.random() * 3)] as 'cube' | 'triangle' | 'hexagon',
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'][Math.floor(Math.random() * 4)]
      });
    }

    // Draw geometric shapes
    const drawGeometry = (shape: typeof geometryShapes[0]) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      switch (shape.type) {
        case 'cube':
          ctx.strokeRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
          // 3D effect
          ctx.beginPath();
          ctx.moveTo(-shape.size/2, -shape.size/2);
          ctx.lineTo(-shape.size/2 + 10, -shape.size/2 - 10);
          ctx.lineTo(shape.size/2 + 10, -shape.size/2 - 10);
          ctx.lineTo(shape.size/2, -shape.size/2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(shape.size/2, -shape.size/2);
          ctx.lineTo(shape.size/2 + 10, -shape.size/2 - 10);
          ctx.lineTo(shape.size/2 + 10, shape.size/2 - 10);
          ctx.lineTo(shape.size/2, shape.size/2);
          ctx.stroke();
          break;
          
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size/2);
          ctx.lineTo(-shape.size/2, shape.size/2);
          ctx.lineTo(shape.size/2, shape.size/2);
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * shape.size/2;
            const y = Math.sin(angle) * shape.size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      if (!isPlaying) return;
      
      time += 0.03;
      
      // Create dramatic background with gradient
      const gradient = ctx.createRadialGradient(
        canvas.offsetWidth/2, canvas.offsetHeight/2, 0,
        canvas.offsetWidth/2, canvas.offsetHeight/2, canvas.offsetWidth/2
      );
      gradient.addColorStop(0, 'rgba(30, 30, 30, 0.1)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw geometric shapes
      geometryShapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed;
        shape.x += Math.sin(time + shape.y * 0.01) * 0.5;
        shape.y += Math.cos(time + shape.x * 0.01) * 0.3;
        
        // Wrap around edges
        if (shape.x < -50) shape.x = canvas.offsetWidth + 50;
        if (shape.x > canvas.offsetWidth + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.offsetHeight + 50;
        if (shape.y > canvas.offsetHeight + 50) shape.y = -50;
        
        drawGeometry(shape);
      });

      // Enhanced particle system with trails and energy fields
      particles.forEach((particle, i) => {
        // Update position with wave motion
        particle.x += particle.vx + Math.sin(time + i * 0.1) * 1.5;
        particle.y += particle.vy + Math.cos(time + i * 0.1) * 1.2;
        particle.z += particle.vz + Math.sin(time * 0.5) * 3;

        // Add to trail
        particle.trail.push({x: particle.x, y: particle.y, alpha: 1});
        if (particle.trail.length > 15) particle.trail.shift();

        // Wrap around edges with portal effect
        if (particle.x < 0) {
          particle.x = canvas.offsetWidth;
          // Portal effect
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(0, particle.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
        if (particle.x > canvas.offsetWidth) {
          particle.x = 0;
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(canvas.offsetWidth, particle.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Draw particle trail
        particle.trail.forEach((point, index) => {
          const alpha = (index / particle.trail.length) * 0.5;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * (alpha + 0.2), 0, Math.PI * 2);
          ctx.fill();
        });

        // Calculate size based on z position with pulsing effect
        const pulseSize = Math.max(1, particle.size + Math.sin(time * 2 + i) * 2 - particle.z / 200);
        
        // Draw main particle with glow effect
        ctx.globalAlpha = Math.max(0.2, 1 - particle.z / 1000);
        
        // Outer glow
        ctx.fillStyle = particle.color;
        ctx.filter = 'blur(8px)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.filter = 'none';
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw enhanced connections with energy fields
        particles.forEach((otherParticle, j) => {
          if (i !== j && i < j) { // Avoid duplicate connections
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 120) {
              const connectionStrength = (120 - distance) / 120;
              
              // Main connection line
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = connectionStrength * 0.6;
              ctx.lineWidth = connectionStrength * 2;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              
              // Energy pulse along connection
              if (Math.sin(time * 3 + i + j) > 0.7) {
                const midX = (particle.x + otherParticle.x) / 2;
                const midY = (particle.y + otherParticle.y) / 2;
                ctx.globalAlpha = connectionStrength;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(midX, midY, 3, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        });
      });

      // Add scanning laser effect
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#4ec9b0';
      ctx.lineWidth = 2;
      ctx.filter = 'blur(2px)';
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.offsetHeight;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.offsetWidth, scanY);
      ctx.stroke();
      ctx.filter = 'none';

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
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 via-transparent to-terminal-blue/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-purple/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-terminal-green mb-4 matrix-text">
            <span className="syntax-keyword">class</span> <span className="syntax-function">ThreeJsDemo</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6 text-lg">
            Advanced 3D particle system with geometric animations and energy fields
          </p>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden glow-effect">
          {/* Enhanced Demo Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#323233] to-[#2d2d30] border-b border-terminal-border relative">
            <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 via-transparent to-terminal-blue/5"></div>
            <div className="flex items-center space-x-2 relative z-10">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <span className="text-terminal-text text-sm ml-4 font-mono">advanced-threejs-demo.js</span>
            </div>
            
            <div className="flex space-x-2 relative z-10">
              <button
                onClick={toggleAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-all duration-300 hover:scale-110 hover:glow-effect"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-all duration-300 hover:scale-110 hover:glow-effect"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced Canvas Container */}
          <div className="relative h-96 bg-gradient-to-br from-[#1e1e1e] to-[#252526] overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: 'transparent' }}
            />
            
            {/* Enhanced Overlay Info */}
            <div className="absolute bottom-4 left-4 text-terminal-text/60 text-sm font-mono bg-terminal-bg/20 backdrop-blur-sm p-3 rounded border border-terminal-border/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span>Particles: 80</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-blue rounded-full animate-pulse"></div>
                <span>Geometries: 15</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-purple rounded-full animate-pulse"></div>
                <span>Rendering: Canvas 2D+</span>
              </div>
            </div>
            
            {/* Performance indicator */}
            <div className="absolute top-4 right-4 text-terminal-green/60 text-xs font-mono">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-terminal-green rounded-full animate-ping"></div>
                <span>60 FPS</span>
              </div>
            </div>
          </div>

          {/* Enhanced Code Preview */}
          <div className="p-6 border-t border-terminal-border bg-gradient-to-b from-transparent to-terminal-bg/30">
            <pre className="text-sm text-terminal-text/80 font-mono">
              <code>
                <span className="syntax-comment">// Advanced particle system with 3D effects</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">particleSystem</span> = <span className="syntax-keyword">new</span> <span className="syntax-function">AdvancedParticleSystem</span>({"{"}
                <br />
                <span className="pl-4 syntax-variable">particleCount</span>: <span className="syntax-string">80</span>,
                <br />
                <span className="pl-4 syntax-variable">geometryShapes</span>: <span className="syntax-string">15</span>,
                <br />
                <span className="pl-4 syntax-variable">trailEffect</span>: <span className="syntax-keyword">true</span>,
                <br />
                <span className="pl-4 syntax-variable">energyFields</span>: <span className="syntax-keyword">true</span>,
                <br />
                <span className="pl-4 syntax-variable">animation</span>: <span className="syntax-string">'quantum-orbital'</span>
                <br />
                {"}"});
              </code>
            </pre>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-3xl font-bold matrix-text">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default ThreeJsShowcase;
