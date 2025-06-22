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
    if (!theme) return;
    const root = document.documentElement;
    try {
      // Update CSS custom properties
      root.style.setProperty('--terminal-green', theme.primary);
      root.style.setProperty('--terminal-blue', theme.secondary);
      root.style.setProperty('--terminal-yellow', theme.accent);
      root.style.setProperty('--terminal-purple', theme.secondary);
      root.style.setProperty('--terminal-orange', theme.accent);
      root.style.setProperty('--terminal-red', '#ff4444');
      root.style.setProperty('--terminal-bg', theme.bg);
      root.style.setProperty('--terminal-border', theme.border);
      root.style.setProperty('--terminal-text', theme.text);

      // Update Tailwind CSS variables
      root.style.setProperty('--background', theme.bg);
      root.style.setProperty('--foreground', theme.text);
      root.style.setProperty('--border', theme.border);

      // Update body background
      document.body.style.background = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.border} 100%)`;
      setCurrentTheme(themeKey);
      localStorage.setItem('preferred-theme', themeKey);
      console.log(`Theme applied: ${theme.name}`);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if target exists and is an element before calling closest
      if (target && typeof target.closest === 'function') {
        if (!target.closest('[data-theme-switcher]')) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      applyTheme(savedTheme);
    } else {
      // Apply default theme on first load
      applyTheme('matrix');
    }
  }, []);
  const handleToggle = () => {
    console.log('Theme switcher toggle clicked');
    setIsOpen(!isOpen);
  };
  const handleThemeSelect = (key: string) => {
    console.log(`Theme selected: ${key}`);
    applyTheme(key);
    setIsOpen(false);
  };
  return <div className="fixed top-20 right-6 z-50" data-theme-switcher>
      <button onClick={handleToggle} title="Change Theme" type="button" className="p-3 bg-black/90 border border-gray-600 rounded-lg text-green-400 hover:bg-black hover:border-green-400 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl my-[55px]">
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && <div className="absolute top-full right-0 mt-2 w-72 bg-black/95 border border-gray-600 rounded-lg overflow-hidden animate-fade-in backdrop-blur-md shadow-xl">
          <div className="px-4 py-3 bg-black/80 border-b border-gray-600">
            <h3 className="text-green-400 font-mono font-semibold">Choose Theme</h3>
          </div>
          
          <div className="p-2 space-y-1">
            {Object.entries(themes).map(([key, theme]) => <button key={key} onClick={() => handleThemeSelect(key)} className="w-full p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-left group" type="button">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full border border-gray-600" style={{
                  backgroundColor: theme.primary
                }} />
                      <div className="w-3 h-3 rounded-full border border-gray-600" style={{
                  backgroundColor: theme.secondary
                }} />
                      <div className="w-3 h-3 rounded-full border border-gray-600" style={{
                  backgroundColor: theme.accent
                }} />
                    </div>
                    <div>
                      <div className="text-gray-200 font-mono text-sm">{theme.name}</div>
                      <div className="text-gray-400 text-xs">{theme.description}</div>
                    </div>
                  </div>
                  
                  {currentTheme === key && <Check className="w-4 h-4 text-green-400" />}
                </div>
              </button>)}
          </div>
        </div>}
    </div>;
};
export default ThemeSwitcher;