
import React, { useEffect, useState, useCallback, memo } from 'react';

const MagneticCursor: React.FC = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    if (target && typeof target.hasAttribute === 'function') {
      if (target.hasAttribute('data-cursor-text')) {
        setCursorText(target.getAttribute('data-cursor-text') || '');
        setIsHovering(true);
      } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.hasAttribute('data-magnetic')) {
        setIsHovering(true);
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setCursorText('');
  }, []);

  useEffect(() => {
    // Throttle mouse move events for better performance
    let ticking = false;
    const throttledUpdateCursor = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCursor(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('mousemove', throttledUpdateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });

    return () => {
      document.removeEventListener('mousemove', throttledUpdateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: '16px',
          height: '16px',
          backgroundColor: '#4ec9b0',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          filter: 'blur(0.5px)',
          boxShadow: isHovering ? '0 0 20px rgba(78, 201, 176, 0.6)' : '0 0 10px rgba(78, 201, 176, 0.3)',
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      />
      {cursorText && (
        <div
          className="fixed pointer-events-none z-50 bg-terminal-bg/98 border border-terminal-green/60 text-terminal-green px-3 py-2 rounded-lg text-sm font-mono backdrop-blur-md shadow-xl transition-all duration-150 ease-out"
          style={{
            left: position.x + 20,
            top: position.y - 40,
            transform: 'translateY(0)',
            opacity: 1
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
});

MagneticCursor.displayName = 'MagneticCursor';

export default MagneticCursor;
