
import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff, RotateCcw, Settings, Zap, Brain, Sparkles } from 'lucide-react';
import { useAIChat } from '../hooks/useAIChat';
import { ChatMessage } from './ChatMessage';
import { AIProviderSelector } from './AIProviderSelector';

const EnhancedAIChat = () => {
  const { currentSession, isLoading, isTyping, sendMessage, clearChat, messagesEndRef } = useAIChat();
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };
      
      recognition.start();
    }
  };

  const quickPrompts = [
    "Tell me about NodeXstation's services",
    "Show me your portfolio",
    "How can I contact you?",
    "What technologies do you use?",
    "Can you help with my project?"
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] rounded-2xl border border-terminal-green/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-terminal-green/20 bg-[#1a1a2e]/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-terminal-green font-mono">NodeX AI Assistant</h3>
            <p className="text-terminal-text/60 text-sm">Real-time conversation • Always available</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors rounded-lg hover:bg-terminal-green/10"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={clearChat}
            className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors rounded-lg hover:bg-terminal-green/10"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-terminal-green/20 bg-[#1a1a2e]/30">
          <AIProviderSelector />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-terminal-green/30">
        {currentSession.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-[#1a1a2e]/50 border border-terminal-green/20 rounded-2xl px-4 py-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-terminal-green/10">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInputValue(prompt)}
              className="px-3 py-1 bg-terminal-bg/30 text-terminal-text/70 rounded-full text-xs font-mono hover:text-terminal-green hover:bg-terminal-green/10 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-terminal-green/20 bg-[#1a1a2e]/30">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about NodeXstation..."
              className="w-full bg-[#0f0f0f]/50 border border-terminal-green/30 rounded-xl px-4 py-3 text-terminal-text font-mono text-sm resize-none focus:outline-none focus:border-terminal-green min-h-[44px] max-h-32"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          <button
            onClick={startListening}
            disabled={isLoading}
            className={`p-3 rounded-xl transition-colors ${
              isListening 
                ? 'bg-terminal-green text-terminal-bg' 
                : 'text-terminal-text/60 hover:text-terminal-green hover:bg-terminal-green/10'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-terminal-green text-terminal-bg rounded-xl hover:bg-terminal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-terminal-bg/30 border-t-terminal-bg rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIChat;
