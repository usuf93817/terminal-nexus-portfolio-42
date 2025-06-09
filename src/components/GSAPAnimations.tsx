
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface GSAPAnimationsProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'elastic';
  delay?: number;
  duration?: number;
  trigger?: boolean;
  className?: string;
}

const GSAPAnimations: React.FC<GSAPAnimationsProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  trigger = true,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial state based on animation type
    const getInitialState = () => {
      switch (animation) {
        case 'fadeIn':
          return { opacity: 0, y: 30 };
        case 'slideUp':
          return { opacity: 0, y: 100 };
        case 'slideLeft':
          return { opacity: 0, x: -100 };
        case 'slideRight':
          return { opacity: 0, x: 100 };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        case 'rotate':
          return { opacity: 0, rotation: 45, scale: 0.9 };
        case 'elastic':
          return { opacity: 0, scale: 0.3, rotation: -15 };
        default:
          return { opacity: 0 };
      }
    };

    // Set final state
    const getFinalState = () => {
      const base = { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 };
      
      switch (animation) {
        case 'elastic':
          return { ...base, ease: "elastic.out(1, 0.5)" };
        case 'rotate':
          return { ...base, ease: "back.out(1.7)" };
        default:
          return { ...base, ease: "power2.out" };
      }
    };

    gsap.set(element, getInitialState());

    if (trigger) {
      // Use ScrollTrigger for scroll-based animations
      gsap.to(element, {
        ...getFinalState(),
        duration,
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    } else {
      // Immediate animation
      gsap.to(element, {
        ...getFinalState(),
        duration,
        delay
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPAnimations;
