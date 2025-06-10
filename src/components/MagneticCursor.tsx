
import React, { useEffect, useState } from 'react';

const MagneticCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as Element;
      
      // Check if target is an HTML element and has the hasAttribute method
      if (target && target instanceof HTMLElement) {
        if (target.hasAttribute('data-cursor-text')) {
          setCursorText(target.getAttribute('data-cursor-text') || '');
          setIsHovering(true);
        } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.hasAttribute('data-magnetic')) {
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

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
};

export default MagneticCursor;
