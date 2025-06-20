
import React, { useRef, useEffect, memo, useMemo } from 'react';

const ParticleBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colors = useMemo(() => ['#4ec9b0', '#569cd6', '#dcdcaa', '#c586c0'], []);
  const particleCount = useMemo(() => {
    // Further optimize for different screen sizes
    const width = window.innerWidth;
    if (width < 640) return 15; // Mobile
    if (width < 1024) return 25; // Tablet
    return 35; // Desktop
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const targetFPS = 60;
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
      vx: (Math.random() - 0.5) * 0.2, // Slower movement for smoother effect
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.3 + 0.1,
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
      
      // More subtle fade effect for ultra-smooth animation
      ctx.fillStyle = 'rgba(30, 30, 30, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Smooth boundary handling
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.95;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.95;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle with optimized settings
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections (limit to improve performance)
        particles.slice(index + 1, index + 3).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) { // Reduced connection distance
            ctx.globalAlpha = (60 - distance) / 60 * 0.1;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
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
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.2 }}
      aria-hidden="true"
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
