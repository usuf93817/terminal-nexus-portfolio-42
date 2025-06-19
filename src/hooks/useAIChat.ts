
import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, ChatSession } from '../types/chat';
import { aiChatService } from '../services/aiChatService';

export const useAIChat = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: 'default',
    title: 'New Chat',
    messages: [{
      id: 'welcome',
      content: "👋 Hello! I'm NodeXstation's AI Assistant. I can help you learn about our services, explore our portfolio, discuss project ideas, or answer any questions you have. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession.messages, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    // Add user message
    setCurrentSession(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      updatedAt: new Date()
    }));

    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get AI response
      const response = await aiChatService.sendMessage([...currentSession.messages, userMessage]);
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        setCurrentSession(prev => ({
          ...prev,
          messages: [...prev.messages, response],
          updatedAt: new Date()
        }));
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to get AI response:', error);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentSession.messages, isLoading]);

  const clearChat = useCallback(() => {
    setCurrentSession({
      id: `session-${Date.now()}`,
      title: 'New Chat',
      messages: [{
        id: 'welcome',
        content: "👋 Hello! I'm NodeXstation's AI Assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date()
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }, []);

  return {
    currentSession,
    isLoading,
    isTyping,
    sendMessage,
    clearChat,
    messagesEndRef
  };
};
