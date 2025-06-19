
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { User, Brain, Sparkles, Clock } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-first' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl font-mono text-sm ${
            isUser
              ? 'bg-terminal-green text-terminal-bg ml-auto'
              : 'bg-[#1a1a2e]/50 text-terminal-text border border-terminal-green/20'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          
          <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
            isUser ? 'border-terminal-bg/20' : 'border-terminal-green/20'
          }`}>
            <span className={`text-xs opacity-60 ${isUser ? 'text-terminal-bg/80' : 'text-terminal-text/60'}`}>
              {message.timestamp.toLocaleTimeString()}
            </span>
            
            {message.metadata && (
              <div className={`flex items-center space-x-2 text-xs ${
                isUser ? 'text-terminal-bg/60' : 'text-terminal-text/40'
              }`}>
                {message.metadata.responseTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{message.metadata.responseTime}ms</span>
                  </div>
                )}
                {message.metadata.model && (
                  <span className="px-2 py-0.5 bg-terminal-green/20 rounded text-terminal-green">
                    {message.metadata.model}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-terminal-green rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-terminal-bg" />
        </div>
      )}
    </div>
  );
};
