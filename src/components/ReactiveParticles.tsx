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

    // Optimized canvas setup
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized Particle class
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
        this.vx = (Math.random() - 0.5) * 1.5; // Smoother movement
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2.5 + 0.8;
        this.maxSize = this.size;
        this.color = ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.4 + 0.4;
        this.life = 0;
        this.maxLife = Math.random() * 80 + 60; // Shorter life for better performance
      }

      update(mouseX: number, mouseY: number, isMouseNear: boolean) {
        // More accurate mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120 && isMouseNear) {
          // Smoother attraction
          const force = (120 - distance) / 120;
          const attraction = force * 0.25;
          this.vx += (dx / distance) * attraction;
          this.vy += (dy / distance) * attraction;
          this.size = this.maxSize * (1 + force * 0.8);
          this.opacity = Math.min(1, this.opacity + force * 0.015);
        } else {
          // Smoother return to normal
          this.vx *= 0.96;
          this.vy *= 0.96;
          this.size = Math.max(this.maxSize, this.size * 0.98);
          this.opacity = Math.max(0.1, this.opacity - 0.008);
        }

        // Update position with bounds checking
        this.x += this.vx;
        this.y += this.vy;

        const canvasRect = canvas.getBoundingClientRect();
        if (this.x < 0) this.x = canvasRect.width;
        if (this.x > canvasRect.width) this.x = 0;
        if (this.y < 0) this.y = canvasRect.height;
        if (this.y > canvasRect.height) this.y = 0;

        // Life cycle management
        this.life++;
        if (this.life > this.maxLife) {
          this.life = 0;
          this.x = Math.random() * canvasRect.width;
          this.y = Math.random() * canvasRect.height;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // More efficient gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 1.2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.7, this.color + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Reduced particle count for better performance
    const particles: Particle[] = [];
    const particleCount = 50; // Reduced from 80
    const canvasRect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(
        Math.random() * canvasRect.width,
        Math.random() * canvasRect.height
      ));
    }

    // More accurate mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30; // Optimized frame rate
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      
      // Lighter trail effect
      ctx.fillStyle = 'rgba(30, 30, 30, 0.15)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update(mouseRef.current.x, mouseRef.current.y, isHovering);
        particle.draw(ctx);

        // Optimized connections - only connect nearby particles
        if (index % 2 === 0) { // Skip every other particle for connections
          particles.slice(index + 1, index + 3).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) { // Reduced connection distance
              ctx.save();
              ctx.globalAlpha = (100 - distance) / 100 * 0.25;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        }
      });

      // Smoother mouse cursor effect
      if (isHovering) {
        ctx.save();
        ctx.globalAlpha = 0.25;
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 40
        );
        gradient.addColorStop(0, '#4ec9b0');
        gradient.addColorStop(0.6, '#4ec9b040');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate(0);

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

          <div className="relative h-96 bg-[#1e1e1e] cursor-none">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: 'transparent' }}
            />
            
            <div className="absolute top-4 left-4 text-terminal-text/60 text-sm font-mono">
              <div>Move your mouse to attract particles</div>
              <div>Particles: 50 | Connections: Optimized</div>
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
