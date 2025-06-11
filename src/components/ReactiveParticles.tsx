
import React, { useRef, useEffect, useState } from 'react';
import { MousePointer } from 'lucide-react';

const ReactiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

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

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      maxSize: number;
      color: string;
      opacity: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.maxSize = this.size;
        this.color = ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.5;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }

      update(mouseX: number, mouseY: number, isMouseNear: boolean) {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && isMouseNear) {
          // Attract to mouse
          const force = (150 - distance) / 150;
          this.vx += (dx / distance) * force * 0.3;
          this.vy += (dy / distance) * force * 0.3;
          this.size = this.maxSize * (1 + force);
          this.opacity = Math.min(1, this.opacity + force * 0.02);
        } else {
          // Return to normal
          this.vx *= 0.95;
          this.vy *= 0.95;
          this.size = this.maxSize;
          this.opacity = Math.max(0.1, this.opacity - 0.01);
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.offsetWidth;
        if (this.x > canvas.offsetWidth) this.x = 0;
        if (this.y < 0) this.y = canvas.offsetHeight;
        if (this.y > canvas.offsetHeight) this.y = 0;

        // Update life
        this.life++;
        if (this.life > this.maxLife) {
          this.life = 0;
          this.x = Math.random() * canvas.offsetWidth;
          this.y = Math.random() * canvas.offsetHeight;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(
        Math.random() * canvas.offsetWidth,
        Math.random() * canvas.offsetHeight
      ));
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(30, 30, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update(mouseRef.current.x, mouseRef.current.y, isHovering);
        particle.draw(ctx);

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.3;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Draw mouse cursor effect
      if (isHovering) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 50
        );
        gradient.addColorStop(0, '#4ec9b0');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isHovering]);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">ReactiveParticles</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Interactive particle system - move your mouse to interact!
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
              <MousePointer className="w-4 h-4 text-terminal-text ml-4" />
              <span className="text-terminal-text text-sm">particle-system.js</span>
            </div>
            
            <div className="text-terminal-green text-xs">
              {isHovering ? 'Interacting' : 'Hover to interact'}
            </div>
          </div>

          {/* Canvas Container */}
          <div className="relative h-96 bg-[#1e1e1e] cursor-none">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: 'transparent' }}
            />
            
            {/* Instructions */}
            <div className="absolute top-4 left-4 text-terminal-text/60 text-sm font-mono">
              <div>Move your mouse to attract particles</div>
              <div>Particles: 80 | Connections: Dynamic</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default ReactiveParticles;
