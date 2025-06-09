
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  threshold?: number;
  distance?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '',
  threshold = 0.1,
  distance = 50
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, hasAnimated]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0) scale(0.95)`;
      case 'down': return `translate3d(0, -${distance}px, 0) scale(0.95)`;
      case 'left': return `translate3d(${distance}px, 0, 0) scale(0.95)`;
      case 'right': return `translate3d(-${distance}px, 0, 0) scale(0.95)`;
      default: return `translate3d(0, ${distance}px, 0) scale(0.95)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out will-change-transform ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(2px)'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
