
import { ChatMessage, AIProvider } from '../types/chat';

export class AIChatService {
  private apiKey: string = '';
  private currentProvider: AIProvider = {
    name: 'OpenAI',
    model: 'gpt-4',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    requiresAuth: true
  };

  setApiKey(key: string) {
    this.apiKey = key;
  }

  setProvider(provider: AIProvider) {
    this.currentProvider = provider;
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    try {
      const startTime = Date.now();
      
      // Convert messages format for API
      const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(this.currentProvider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.currentProvider.model,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;

      return {
        id: `ai-${Date.now()}`,
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          model: this.currentProvider.model,
          tokens: data.usage?.total_tokens,
          responseTime
        }
      };
    } catch (error) {
      // Fallback response for demo/development
      return {
        id: `ai-${Date.now()}`,
        content: this.getFallbackResponse(messages[messages.length - 1]?.content || ''),
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          model: 'fallback',
          responseTime: 500
        }
      };
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const responses = {
      greeting: "Hello! I'm your AI assistant. I'm here to help you with any questions about NodeXstation's services, projects, or anything else you'd like to know.",
      services: "NodeXstation offers MERN Stack development, Three.js 3D experiences, AI agent development, and data scraping services. We transform ideas into digital reality!",
      portfolio: "Our portfolio includes 150+ successful projects ranging from e-commerce platforms to 3D configurators and AI chatbot systems. Each project is built with cutting-edge technology.",
      contact: "You can reach out to us at nodexstation@gmail.com or through our social media channels. We're always excited to discuss new projects!",
      default: "That's an interesting question! As NodeXstation's AI assistant, I'm here to help you learn more about our services, view our portfolio, or discuss potential projects. What would you like to know more about?"
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return responses.greeting;
    } else if (message.includes('service') || message.includes('what do you do')) {
      return responses.services;
    } else if (message.includes('portfolio') || message.includes('project') || message.includes('work')) {
      return responses.portfolio;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return responses.contact;
    }
    
    return responses.default;
  }
}

export const aiChatService = new AIChatService();
