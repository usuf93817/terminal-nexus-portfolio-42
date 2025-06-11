
import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface Command {
  command: string;
  output: string | string[];
  type: 'success' | 'error' | 'info';
}

const InteractiveTerminal = () => {
  const [history, setHistory] = useState<Command[]>([
    {
      command: 'welcome',
      output: [
        'Welcome to NodeXstation Interactive Terminal!',
        'Type "help" to see available commands.',
        ''
      ],
      type: 'success'
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      output: [
        'Available commands:',
        '  help     - Show this help message',
        '  about    - About NodeXstation',
        '  skills   - List our technical skills',
        '  projects - Show recent projects',
        '  contact  - Get contact information',
        '  clear    - Clear terminal',
        '  whoami   - Display current user info',
        '  date     - Show current date and time',
        '  echo     - Echo back your message',
        ''
      ],
      type: 'info' as const
    },
    about: {
      output: [
        'NodeXstation - Professional Software Development',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'We specialize in:',
        '• MERN Stack Development',
        '• Three.js 3D Experiences',
        '• AI Agent Development',
        '• Data Scraping & Automation',
        '',
        'Transforming ideas into digital reality.',
        ''
      ],
      type: 'success' as const
    },
    skills: {
      output: [
        'Technical Skills:',
        '━━━━━━━━━━━━━━━',
        'Frontend: React, TypeScript, Three.js, Tailwind CSS',
        'Backend: Node.js, Express, MongoDB, PostgreSQL',
        'AI/ML: Python, TensorFlow, OpenAI APIs',
        'Tools: Git, Docker, AWS, Supabase',
        ''
      ],
      type: 'success' as const
    },
    projects: {
      output: [
        'Recent Projects:',
        '━━━━━━━━━━━━━━━',
        '1. E-commerce Platform - MERN Stack',
        '2. 3D Product Configurator - Three.js',
        '3. AI Chatbot System - OpenAI + React',
        '4. Data Analytics Dashboard - React + D3.js',
        ''
      ],
      type: 'success' as const
    },
    contact: {
      output: [
        'Contact Information:',
        '━━━━━━━━━━━━━━━━━━━',
        'Email: nodexstation@gmail.com',
        'GitHub: https://github.com/nodexStation',
        'Instagram: https://www.instagram.com/nodex_station/',
        ''
      ],
      type: 'success' as const
    },
    whoami: {
      output: ['guest@nodexstation', ''],
      type: 'info' as const
    },
    date: {
      output: [new Date().toString(), ''],
      type: 'info' as const
    }
  };

  const executeCommand = (input: string) => {
    const [cmd, ...args] = input.trim().toLowerCase().split(' ');
    
    if (!cmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    let output: string | string[];
    let type: 'success' | 'error' | 'info' = 'success';

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'echo') {
      output = [args.join(' ') || '', ''];
      type = 'info';
    } else if (cmd in commands) {
      const command = commands[cmd as keyof typeof commands];
      output = command.output;
      type = command.type;
    } else {
      output = [`Command not found: ${cmd}`, 'Type "help" for available commands.', ''];
      type = 'error';
    }

    setHistory(prev => [...prev, {
      command: input,
      output,
      type
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : commandHistory.length - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">InteractiveTerminal</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Try our interactive terminal - type commands to explore!
          </p>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <Terminal className="w-4 h-4 text-terminal-text ml-4" />
              <span className="text-terminal-text text-sm">terminal</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="p-6 h-96 overflow-y-auto font-mono text-sm"
          >
            {/* Command History */}
            {history.map((entry, index) => (
              <div key={index} className="mb-2">
                {entry.command !== 'welcome' && (
                  <div className="flex items-center mb-1">
                    <span className="text-terminal-green">guest@nodexstation:~$</span>
                    <span className="text-terminal-text ml-2">{entry.command}</span>
                  </div>
                )}
                <div className={`${
                  entry.type === 'error' ? 'text-terminal-red' :
                  entry.type === 'info' ? 'text-terminal-blue' :
                  'text-terminal-text'
                } whitespace-pre-line`}>
                  {Array.isArray(entry.output) ? entry.output.join('\n') : entry.output}
                </div>
              </div>
            ))}

            {/* Current Input */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-terminal-green">guest@nodexstation:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-terminal-text ml-2 flex-1 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-terminal-green animate-pulse">_</span>
            </form>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
