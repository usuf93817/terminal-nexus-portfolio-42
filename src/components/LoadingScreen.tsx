
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const loadingTexts = [
    'Initializing NodeXstation...',
    'Loading MERN stack...',
    'Rendering Three.js components...',
    'Connecting AI agents...',
    'Finalizing experience...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        setCurrentText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-terminal-bg z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto border-2 border-terminal-green rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/20 to-terminal-blue/20"></div>
            <div className="absolute inset-2 border border-terminal-green/50 rounded flex items-center justify-center">
              <span className="text-terminal-green font-bold text-xl font-mono">NX</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-terminal-green font-mono text-sm">Loading...</span>
            <span className="text-terminal-green font-mono text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-terminal-green to-terminal-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-terminal-text/80 font-mono text-sm min-h-[20px]">
          {currentText}
          <span className="inline-block w-2 h-5 bg-terminal-green ml-1 animate-pulse"></span>
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute text-terminal-green text-xs font-mono animate-float"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            >
              {Array.from({ length: 20 }, (_, j) => (
                <div key={j} className="mb-4">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
