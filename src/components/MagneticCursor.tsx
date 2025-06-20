
import React, { useEffect, useState, useCallback, memo } from 'react';

const MagneticCursor: React.FC = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    // Throttle updates for better performance
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
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
    // Reduced throttling for smoother movement
    let ticking = false;
    const throttledUpdateCursor = (e: MouseEvent) => {
      if (!ticking) {
        updateCursor(e);
        ticking = false; // Removed requestAnimationFrame throttling
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
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: '16px',
          height: '16px',
          backgroundColor: '#4ec9b0',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          filter: 'blur(0.5px)',
          boxShadow: isHovering ? '0 0 15px rgba(78, 201, 176, 0.4)' : '0 0 8px rgba(78, 201, 176, 0.2)',
        }}
      />
      {cursorText && (
        <div
          className="fixed pointer-events-none z-50 bg-terminal-bg/95 border border-terminal-green/60 text-terminal-green px-2 py-1 rounded text-xs font-mono backdrop-blur-sm shadow-lg transition-opacity duration-100"
          style={{
            left: position.x + 15,
            top: position.y - 30,
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
