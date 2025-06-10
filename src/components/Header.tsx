import React, { useState, useRef, useEffect } from 'react';
import { Terminal, User, Code, FolderOpen, Mail, Bot } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTerminal, setShowTerminal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = [
    { id: 'home', label: 'Home', icon: Terminal, command: 'cd ~' },
    { id: 'about', label: 'About', icon: User, command: 'cd about' },
    { id: 'services', label: 'Services', icon: Code, command: 'cd services' },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen, command: 'cd portfolio' },
    { id: 'contact', label: 'Contact', icon: Mail, command: 'cd contact' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, command: 'cd ai-assistant' }
  ];

  const commands = {
    'cd ~': 'home',
    'cd home': 'home',
    'cd about': 'about',
    'cd services': 'services',
    'cd portfolio': 'portfolio',
    'cd contact': 'contact',
    'cd ai-assistant': 'ai-assistant',
    'ls': 'list',
    'pwd': 'path',
    'whoami': 'user',
    'help': 'help',
    'clear': 'clear'
  };

  const handleNavigation = (sectionId: string) => {
    console.log('Navigation clicked:', sectionId);
    console.log('Current activeSection:', activeSection);
    
    // Ensure we're calling the prop function correctly
    if (typeof setActiveSection === 'function') {
      setActiveSection(sectionId);
      console.log('Set active section to:', sectionId);
    } else {
      console.error('setActiveSection is not a function:', setActiveSection);
    }
    
    // Scroll to top smoothly
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Scroll error:', error);
      window.scrollTo(0, 0); // Fallback
    }
  };

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    console.log('Executing command:', trimmedCommand);
    
    if (commands[trimmedCommand as keyof typeof commands]) {
      const action = commands[trimmedCommand as keyof typeof commands];
      
      switch (action) {
        case 'list':
          return 'Available sections: home about services portfolio contact ai-assistant';
        case 'path':
          return `/nodexstation/${activeSection}`;
        case 'user':
          return 'nodex@station';
        case 'help':
          return 'Available commands: cd [section], ls, pwd, whoami, help, clear';
        case 'clear':
          return 'CLEAR';
        default:
          handleNavigation(action);
          return `Navigated to ${action}`;
      }
    }
    
    return `Command not found: ${command}. Type 'help' for available commands.`;
  };

  const executeCommand = () => {
    if (!commandInput.trim()) return;
    
    try {
      const result = handleCommand(commandInput);
      
      if (result === 'CLEAR') {
        setCommandHistory([]);
      } else {
        setCommandHistory(prev => [...prev, `$ ${commandInput}`, result]);
      }
      
      setCommandInput('');
      setHistoryIndex(-1);
    } catch (error) {
      console.error('Command execution error:', error);
      setCommandHistory(prev => [...prev, `$ ${commandInput}`, 'Error executing command']);
      setCommandInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    try {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const commandLines = commandHistory.filter(line => line.startsWith('$ '));
          if (commandLines.length > 0) {
            const currentIndex = historyIndex === -1 ? commandLines.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(currentIndex);
            setCommandInput(commandLines[currentIndex].substring(2));
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex >= 0) {
          const commandLines = commandHistory.filter(line => line.startsWith('$ '));
          const nextIndex = historyIndex + 1;
          if (nextIndex < commandLines.length) {
            setHistoryIndex(nextIndex);
            setCommandInput(commandLines[nextIndex].substring(2));
          } else {
            setHistoryIndex(-1);
            setCommandInput('');
          }
        }
      }
    } catch (error) {
      console.error('Key handling error:', error);
    }
  };

  const toggleTerminal = () => {
    const newState = !showTerminal;
    setShowTerminal(newState);
    console.log('Terminal toggled:', newState);
  };

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTerminal]);

  // Close terminal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTerminal && !(event.target as Element).closest('.terminal-container')) {
        setShowTerminal(false);
      }
    };

    if (showTerminal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTerminal]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] border-b border-terminal-border">
        {/* VS Code Style Header */}
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-terminal-green" />
              <span className="text-terminal-text font-semibold">NodeXstation</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked for:', item.id);
                    handleNavigation(item.id);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green/50 ${
                    activeSection === item.id
                      ? 'bg-terminal-border text-terminal-green'
                      : 'text-terminal-text/70 hover:text-terminal-text hover:bg-terminal-border/50'
                  }`}
                  title={item.command}
                  aria-label={`Navigate to ${item.label}`}
                  type="button"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTerminal();
              }}
              className="flex items-center space-x-2 px-3 py-1 rounded text-sm text-terminal-text/70 hover:text-terminal-text hover:bg-terminal-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green/50"
              title="Toggle Terminal"
              aria-label="Toggle Terminal"
              type="button"
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline">Terminal</span>
            </button>
            
            <div className="flex items-center space-x-1 text-xs text-terminal-text/60">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-terminal-border">
          <div className="flex overflow-x-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Mobile button clicked for:', item.id);
                  handleNavigation(item.id);
                }}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 text-sm border-r border-terminal-border transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green/50 ${
                  activeSection === item.id
                    ? 'bg-terminal-border text-terminal-green'
                    : 'text-terminal-text/70 hover:text-terminal-text hover:bg-terminal-border/50'
                }`}
                aria-label={`Navigate to ${item.label}`}
                type="button"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="terminal-container w-full bg-[#1e1e1e] border-t border-terminal-border h-64 flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-terminal-border">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-terminal-green" />
                <span className="text-terminal-text text-sm">NodeXstation Terminal</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowTerminal(false);
                }}
                className="text-terminal-text/60 hover:text-terminal-text text-sm focus:outline-none focus:ring-2 focus:ring-terminal-green/50 rounded px-2 py-1"
                aria-label="Close Terminal"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
              <div className="space-y-1">
                {commandHistory.map((line, index) => (
                  <div key={index} className={line.startsWith('$') ? 'text-terminal-green' : 'text-terminal-text/80'}>
                    {line}
                  </div>
                ))}
              </div>
              
              {/* Input Line */}
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-terminal-green">nodex@station:~{activeSection !== 'home' ? `/${activeSection}` : ''}$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-terminal-text outline-none"
                  placeholder="Type a command..."
                  aria-label="Terminal command input"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
