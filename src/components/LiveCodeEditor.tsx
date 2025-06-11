
import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, RotateCcw, Download } from 'lucide-react';

const LiveCodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to the Live Code Editor!
// Try writing some JavaScript code

function greetUser(name) {
  return \`Hello, \${name}! Welcome to NodeXstation.\`;
}

const message = greetUser("Developer");
console.log(message);

// Try some creative coding:
const colors = ["#4ec9b0", "#569cd6", "#dcdcaa"];
colors.forEach((color, index) => {
  console.log(\`Color \${index + 1}: \${color}\`);
});`);
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Capture console.log output
    const originalLog = console.log;
    const logs: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    try {
      // Create a safe evaluation environment
      const result = new Function(code)();
      if (result !== undefined) {
        logs.push(`Return value: ${result}`);
      }
      setOutput(logs.join('\n') || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    setCode('// Start coding here...\n');
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nodexstation-code.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">LiveCodeEditor</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Write and execute JavaScript code in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-terminal-text text-sm ml-4">editor.js</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={copyCode}
                  className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                  title="Copy Code"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                  title="Download Code"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCode}
                  className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
                  title="Clear Code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors disabled:opacity-50"
                  title="Run Code"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-transparent text-terminal-text font-mono text-sm resize-none focus:outline-none"
                placeholder="// Start coding here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Console */}
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-terminal-text text-sm ml-4">console</span>
              </div>
              
              <div className="text-terminal-green text-xs">
                {isRunning ? 'Running...' : 'Ready'}
              </div>
            </div>

            <div className="p-6">
              <div className="h-96 overflow-y-auto">
                <pre className="text-terminal-green font-mono text-sm whitespace-pre-wrap">
                  {output || '// Output will appear here when you run your code\n// Click the play button to execute'}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default LiveCodeEditor;
