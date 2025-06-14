
import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [isOpen, setIsOpen] = useState(false);

  const themes = {
    matrix: {
      name: 'Matrix Green',
      primary: '#4ec9b0',
      secondary: '#569cd6',
      accent: '#dcdcaa',
      bg: '#1e1e1e',
      border: '#3c3c3c',
      text: '#d4d4d4',
      description: 'Classic hacker aesthetic'
    },
    cyberpunk: {
      name: 'Cyberpunk',
      primary: '#ff0080',
      secondary: '#00ffff',
      accent: '#ffff00',
      bg: '#0a0a0a',
      border: '#ff0080',
      text: '#ffffff',
      description: 'Neon-soaked future'
    },
    ocean: {
      name: 'Deep Ocean',
      primary: '#00d4ff',
      secondary: '#0099cc',
      accent: '#66ffcc',
      bg: '#001122',
      border: '#004466',
      text: '#ccffff',
      description: 'Submarine depths'
    },
    plasma: {
      name: 'Plasma Fire',
      primary: '#ff4444',
      secondary: '#ff8800',
      accent: '#ffaa00',
      bg: '#220000',
      border: '#660000',
      text: '#ffcccc',
      description: 'Molten energy'
    },
    aurora: {
      name: 'Aurora',
      primary: '#44ff88',
      secondary: '#8844ff',
      accent: '#ff8844',
      bg: '#001122',
      border: '#004422',
      text: '#ccffcc',
      description: 'Northern lights'
    }
  };

  const applyTheme = (themeKey: string) => {
    const theme = themes[themeKey as keyof typeof themes];
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--terminal-green', theme.primary);
    root.style.setProperty('--terminal-blue', theme.secondary);
    root.style.setProperty('--terminal-yellow', theme.accent);
    root.style.setProperty('--terminal-bg', theme.bg);
    root.style.setProperty('--terminal-border', theme.border);
    root.style.setProperty('--terminal-text', theme.text);
    
    // Update Tailwind CSS variables
    root.style.setProperty('--background', theme.bg);
    root.style.setProperty('--foreground', theme.text);
    root.style.setProperty('--border', theme.border);
    
    setCurrentTheme(themeKey);
    localStorage.setItem('preferred-theme', themeKey);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      applyTheme(savedTheme);
    }
  }, []);

  return (
    <div className="fixed top-20 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-terminal-bg/90 border border-terminal-border rounded-lg text-terminal-green hover:bg-terminal-bg transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl"
        title="Change Theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-terminal-bg/95 border border-terminal-border rounded-lg overflow-hidden animate-fade-in backdrop-blur-md shadow-xl">
          <div className="px-4 py-3 bg-terminal-bg/80 border-b border-terminal-border">
            <h3 className="text-terminal-green font-mono font-semibold">Choose Theme</h3>
          </div>
          
          <div className="p-2 space-y-1">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  applyTheme(key);
                  setIsOpen(false);
                }}
                className="w-full p-3 rounded-lg hover:bg-terminal-border/30 transition-colors text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full border border-terminal-border/30" 
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-terminal-border/30" 
                        style={{ backgroundColor: theme.secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-terminal-border/30" 
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                    <div>
                      <div className="text-terminal-text font-mono text-sm">{theme.name}</div>
                      <div className="text-terminal-text/60 text-xs">{theme.description}</div>
                    </div>
                  </div>
                  
                  {currentTheme === key && (
                    <Check className="w-4 h-4 text-terminal-green" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
