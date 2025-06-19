
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isTyping?: boolean;
  metadata?: {
    model?: string;
    tokens?: number;
    responseTime?: number;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIProvider {
  name: string;
  model: string;
  endpoint: string;
  requiresAuth: boolean;
}
