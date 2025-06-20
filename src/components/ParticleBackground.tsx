
import React, { useRef, useEffect, memo, useMemo } from 'react';

const ParticleBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colors = useMemo(() => ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'], []);
  const particleCount = useMemo(() => {
    // Further reduced particle count for optimal performance
    const width = window.innerWidth;
    if (width < 640) return 5; // Mobile - minimal particles
    if (width < 1024) return 8; // Tablet 
    return 12; // Desktop - reduced further
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const targetFPS = 24; // Reduced from 30 for better performance
    const frameInterval = 1000 / targetFPS;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.05, // Even slower movement
      vy: (Math.random() - 0.5) * 0.05,
      size: Math.random() * 0.6 + 0.2, // Even smaller particles
      opacity: Math.random() * 0.15 + 0.03, // Much lower opacity
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      
      // Very light fade for minimal redraws
      ctx.fillStyle = 'rgba(30, 30, 30, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Optimized boundary handling
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with better performance
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Minimal connections - only every 3rd particle
        if (index % 3 === 0 && index < particles.length - 3) {
          const otherParticle = particles[index + 3];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30) { // Even shorter connection distance
            ctx.globalAlpha = (30 - distance) / 30 * 0.03;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.05;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.1 }} // Even more reduced opacity
      aria-hidden="true"
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
