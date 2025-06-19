
import React, { useEffect, useState, useCallback, memo } from 'react';

const MagneticCursor: React.FC = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const updateCursor = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

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
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave]);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          width: '20px',
          height: '20px',
          backgroundColor: '#4ec9b0',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          filter: 'blur(0.5px)',
          boxShadow: isHovering ? '0 0 20px rgba(78, 201, 176, 0.5)' : 'none'
        }}
      />
      {cursorText && (
        <div
          className="fixed pointer-events-none z-50 bg-terminal-bg/95 border border-terminal-green/50 text-terminal-green px-3 py-2 rounded-lg text-sm font-mono backdrop-blur-md shadow-lg transition-all duration-200 ease-out"
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
