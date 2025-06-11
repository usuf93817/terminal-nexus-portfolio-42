
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  variant?: 'default' | 'holographic' | 'matrix' | 'glitch';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '',
  variant = 'default'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    
    switch (direction) {
      case 'up': return 'translate(0, 50px)';
      case 'down': return 'translate(0, -50px)';
      case 'left': return 'translate(50px, 0)';
      case 'right': return 'translate(-50px, 0)';
      default: return 'translate(0, 50px)';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'holographic':
        return 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-terminal-green/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-1000 hover:before:translate-x-[100%] relative overflow-hidden';
      case 'matrix':
        return 'matrix-text relative';
      case 'glitch':
        return 'relative hover:animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${getVariantStyles()} ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        filter: isVisible && variant === 'holographic' ? 'drop-shadow(0 0 20px rgba(78, 201, 176, 0.5))' : 'none'
      }}
    >
      {children}
      {variant === 'glitch' && (
        <>
          <div className="absolute inset-0 bg-terminal-red/10 translate-x-1 opacity-0 hover:opacity-100 transition-opacity duration-100" />
          <div className="absolute inset-0 bg-terminal-blue/10 -translate-x-1 opacity-0 hover:opacity-100 transition-opacity duration-150" />
        </>
      )}
    </div>
  );
};

export default ScrollReveal;
