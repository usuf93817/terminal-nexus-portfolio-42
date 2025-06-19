
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
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave]);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-150 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          width: '20px',
          height: '20px',
          backgroundColor: '#4ec9b0',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
        }}
      />
      {cursorText && (
        <div
          className="fixed pointer-events-none z-50 bg-terminal-green text-terminal-bg px-2 py-1 rounded text-xs font-mono"
          style={{
            left: position.x + 20,
            top: position.y - 30
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
