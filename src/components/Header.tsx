
import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Github, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');

  const navigationItems = [
    { id: 'home', label: 'Home', command: 'cd home' },
    { id: 'about', label: 'About', command: 'cd about' },
    { id: 'services', label: 'Services', command: 'ls services' },
    { id: 'portfolio', label: 'Portfolio', command: 'ls projects' },
    { id: 'contact', label: 'Contact', command: 'cd contact' },
    { id: 'ai-assistant', label: 'AI Assistant', command: './ai-chat' }
  ];

  const handleTerminalCommand = (command: string) => {
    const section = navigationItems.find(item => 
      command.includes(item.command.split(' ')[1]) || 
      command.includes(item.command.split('/')[1])
    );
    
    if (section) {
      setActiveSection(section.id);
      setTerminalInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTerminalCommand(terminalInput);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg border-b border-terminal-border backdrop-blur-sm">
      {/* VS Code style title bar */}
      <div className="flex items-center justify-between px-4 h-8 bg-[#323233] text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-terminal-text ml-4">NodeXstation - portfolio.tsx</span>
        </div>
        <div className="flex items-center space-x-4 text-terminal-text">
          <a href="https://github.com/nodexStation" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors">
            <Github size={14} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61576048524952" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-blue transition-colors">
            <Facebook size={14} />
          </a>
          <a href="https://www.instagram.com/nodex_station/" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-purple transition-colors">
            <Instagram size={14} />
          </a>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-terminal-green">
            <span className="text-terminal-blue">node</span>
            <span className="text-terminal-yellow">X</span>
            <span className="text-terminal-green">station</span>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 hover:bg-terminal-border ${
                  activeSection === item.id 
                    ? 'bg-terminal-border text-terminal-green border-b-2 border-terminal-green' 
                    : 'text-terminal-text hover:text-terminal-green'
                }`}
              >
                <span className="syntax-comment"># </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Terminal Command Input */}
        <div className="hidden lg:flex items-center space-x-2 bg-[#1e1e1e] rounded px-3 py-1 min-w-64">
          <span className="text-terminal-green text-sm">$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command (e.g., cd about)"
            className="bg-transparent text-terminal-text text-sm outline-none flex-1 placeholder-terminal-text/50"
          />
          <div className="terminal-cursor w-2 h-4"></div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-terminal-text hover:text-terminal-green transition-colors"
        >
          {isMenuOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-terminal-bg border-t border-terminal-border px-6 py-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-terminal-border text-terminal-green' 
                  : 'text-terminal-text hover:text-terminal-green hover:bg-terminal-border'
              }`}
            >
              <span className="syntax-comment">$ </span>
              {item.command}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
