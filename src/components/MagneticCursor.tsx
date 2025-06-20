
import React, { useEffect, useState, useCallback, memo } from 'react';

const MagneticCursor: React.FC = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    // Direct update for maximum smoothness
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
    // Optimized event handling for best performance
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: '16px',
          height: '16px',
          backgroundColor: '#4ec9b0',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.3 : 1})`,
          filter: 'blur(0.3px)',
          boxShadow: isHovering ? '0 0 12px rgba(78, 201, 176, 0.3)' : '0 0 6px rgba(78, 201, 176, 0.15)',
        }}
      />
      {cursorText && (
        <div
          className="fixed pointer-events-none z-50 bg-terminal-bg/98 border border-terminal-green/70 text-terminal-green px-2 py-1 rounded text-xs font-mono backdrop-blur-sm shadow-lg transition-opacity duration-75"
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
