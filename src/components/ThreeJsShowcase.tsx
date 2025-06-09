
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';

const ThreeJsShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sceneRef = useRef<any>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Enhanced Three.js-like animation with more complex geometries
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
      x: number, y: number, z: number, 
      vx: number, vy: number, vz: number,
      color: string, size: number, life: number,
      type: 'particle' | 'wave' | 'spiral'
    }> = [];

    const waves: Array<{
      x: number, y: number, radius: number, 
      frequency: number, amplitude: number, phase: number
    }> = [];

    const geometries: Array<{
      x: number, y: number, rotation: number,
      type: 'cube' | 'sphere' | 'torus', color: string
    }> = [];

    // Create enhanced particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        vz: (Math.random() - 0.5) * 2,
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 6)],
        size: Math.random() * 4 + 1,
        life: Math.random() * 100 + 50,
        type: ['particle', 'wave', 'spiral'][Math.floor(Math.random() * 3)] as any
      });
    }

    // Create wave effects
    for (let i = 0; i < 5; i++) {
      waves.push({
        x: canvas.offsetWidth / 2,
        y: canvas.offsetHeight / 2,
        radius: 0,
        frequency: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 50 + 20,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Create 3D geometries
    for (let i = 0; i < 8; i++) {
      geometries.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        rotation: 0,
        type: ['cube', 'sphere', 'torus'][Math.floor(Math.random() * 3)] as any,
        color: ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'][Math.floor(Math.random() * 4)]
      });
    }

    const drawCube = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Draw 3D-like cube
      ctx.fillStyle = color;
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Add depth
      ctx.fillStyle = color + '80';
      ctx.fillRect(-size/2 + 5, -size/2 - 5, size, size);
      
      ctx.restore();
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '40');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTorus = (ctx: CanvasRenderingContext2D, x: number, y: number, outerRadius: number, innerRadius: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = outerRadius - innerRadius;
      ctx.beginPath();
      ctx.arc(0, 0, (outerRadius + innerRadius) / 2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      if (!isPlaying) return;
      
      time += 0.016;
      
      // Create trail effect
      ctx.fillStyle = 'rgba(30, 30, 30, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw and update waves
      waves.forEach((wave, i) => {
        wave.radius += 2;
        if (wave.radius > Math.max(canvas.offsetWidth, canvas.offsetHeight)) {
          wave.radius = 0;
        }

        ctx.strokeStyle = `rgba(78, 201, 176, ${1 - wave.radius / 300})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Add wave distortion
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const waveX = wave.x + Math.cos(angle) * wave.radius;
          const waveY = wave.y + Math.sin(angle) * wave.radius + Math.sin(time * 2 + angle * 4) * wave.amplitude * 0.1;
          
          ctx.fillStyle = `rgba(86, 156, 214, 0.3)`;
          ctx.beginPath();
          ctx.arc(waveX, waveY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw and update geometries
      geometries.forEach((geo, i) => {
        geo.rotation += 0.02 + i * 0.001;
        geo.x += Math.sin(time + i) * 0.5;
        geo.y += Math.cos(time + i * 0.7) * 0.3;

        // Boundary wrapping
        if (geo.x < -50) geo.x = canvas.offsetWidth + 50;
        if (geo.x > canvas.offsetWidth + 50) geo.x = -50;
        if (geo.y < -50) geo.y = canvas.offsetHeight + 50;
        if (geo.y > canvas.offsetHeight + 50) geo.y = -50;

        const size = 30 + Math.sin(time + i) * 10;

        switch (geo.type) {
          case 'cube':
            drawCube(ctx, geo.x, geo.y, size, geo.rotation, geo.color);
            break;
          case 'sphere':
            drawSphere(ctx, geo.x, geo.y, size / 2, geo.color);
            break;
          case 'torus':
            drawTorus(ctx, geo.x, geo.y, size, size * 0.6, geo.rotation, geo.color);
            break;
        }
      });

      // Enhanced particles with different behaviors
      particles.forEach((particle, i) => {
        // Update based on type
        switch (particle.type) {
          case 'spiral':
            const spiralRadius = 50 + Math.sin(time + i * 0.1) * 30;
            particle.x += Math.cos(time * 2 + i * 0.1) * spiralRadius * 0.01;
            particle.y += Math.sin(time * 2 + i * 0.1) * spiralRadius * 0.01;
            break;
          case 'wave':
            particle.x += particle.vx + Math.sin(time * 3 + i * 0.2) * 2;
            particle.y += particle.vy + Math.cos(time * 2 + i * 0.15) * 1.5;
            break;
          default:
            particle.x += particle.vx + Math.sin(time + i * 0.1) * 0.5;
            particle.y += particle.vy + Math.cos(time + i * 0.1) * 0.5;
        }

        particle.z += particle.vz + Math.sin(time * 0.5) * 2;
        particle.life -= 0.2;

        // Reset particle if dead
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
          particle.life = Math.random() * 100 + 50;
        }

        // Wrap around edges
        if (particle.x < -20) particle.x = canvas.offsetWidth + 20;
        if (particle.x > canvas.offsetWidth + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.offsetHeight + 20;
        if (particle.y > canvas.offsetHeight + 20) particle.y = -20;

        // Calculate size and opacity based on z position and life
        const size = Math.max(0.5, particle.size - particle.z / 300);
        const opacity = Math.max(0.1, (particle.life / 100) * (1 - particle.z / 1000));
        
        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 3);
        gradient.addColorStop(0, particle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Enhanced connections with curved lines
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 120) {
              const connectionOpacity = (120 - distance) / 800;
              ctx.strokeStyle = particle.color + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0');
              ctx.lineWidth = 1;
              
              // Create curved connection
              const midX = (particle.x + otherParticle.x) / 2;
              const midY = (particle.y + otherParticle.y) / 2;
              const curve = Math.sin(time + i + j) * 20;
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.quadraticCurveTo(midX + curve, midY + curve, otherParticle.x, otherParticle.y);
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

  // GSAP animations for container
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section className="py-16 px-6" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">AdvancedThreeJS</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Enhanced 3D particle system with geometries, waves, and advanced animations
          </p>
        </div>

        <div className={`bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden transition-all duration-500 ${
          isFullscreen ? 'fixed inset-4 z-50' : ''
        }`}>
          {/* Demo Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-terminal-text text-sm ml-4">advanced-threejs.js</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={toggleAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                data-magnetic
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetAnimation}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                data-magnetic
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                data-magnetic
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div className={`relative bg-[#1e1e1e] ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-[500px]'}`}>
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              style={{ background: 'transparent' }}
            />
            
            {/* Enhanced Overlay Info */}
            <div className="absolute bottom-4 left-4 text-terminal-text/60 text-sm font-mono space-y-1">
              <div>Particles: 80</div>
              <div>Geometries: 8</div>
              <div>Wave Effects: 5</div>
              <div>FPS: ~60</div>
              <div>Engine: Enhanced Canvas 2D</div>
            </div>

            {/* Performance Info */}
            <div className="absolute top-4 right-4 text-terminal-text/60 text-xs font-mono">
              <div>Advanced Three.js Demo</div>
              <div className="text-terminal-green">● Real-time Rendering</div>
            </div>
          </div>

          {/* Enhanced Code Preview */}
          <div className="p-6 border-t border-terminal-border">
            <pre className="text-sm text-terminal-text/80 font-mono overflow-x-auto">
              <code>
                <span className="syntax-comment">// Advanced particle system with 3D geometries</span><br />
                <span className="syntax-keyword">const</span> <span className="syntax-variable">scene</span> = <span className="syntax-keyword">new</span> <span className="syntax-function">EnhancedScene</span>({"{"}
                <br />
                <span className="pl-4 syntax-variable">particles</span>: <span className="syntax-string">80</span>,
                <br />
                <span className="pl-4 syntax-variable">geometries</span>: [<span className="syntax-string">'cube'</span>, <span className="syntax-string">'sphere'</span>, <span className="syntax-string">'torus'</span>],
                <br />
                <span className="pl-4 syntax-variable">effects</span>: [<span className="syntax-string">'waves'</span>, <span className="syntax-string">'trails'</span>, <span className="syntax-string">'connections'</span>],
                <br />
                <span className="pl-4 syntax-variable">animation</span>: <span className="syntax-string">'realtime'</span>
                <br />
                {"}"});
                <br /><br />
                <span className="syntax-comment">// GSAP enhanced animations</span><br />
                <span className="syntax-variable">gsap</span>.<span className="syntax-function">to</span>(<span className="syntax-variable">elements</span>, {"{"}
                <br />
                <span className="pl-4 syntax-variable">duration</span>: <span className="syntax-string">1</span>,
                <br />
                <span className="pl-4 syntax-variable">ease</span>: <span className="syntax-string">"power2.out"</span>
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
