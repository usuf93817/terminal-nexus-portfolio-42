
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the NodeXstation AI Assistant. I can help you learn about our services, technologies, and projects. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: { [key: string]: string } = {
    'mern': 'MERN Stack combines MongoDB, Express.js, React, and Node.js for full-stack development. We build scalable web applications with modern JavaScript throughout the entire stack.',
    'three.js': 'Three.js is a powerful 3D library for creating interactive 3D graphics in web browsers. We use it for product visualizations, interactive experiences, and immersive web applications.',
    'python': 'We use Python for backend development, data processing, automation scripts, and AI/ML applications. Our expertise includes Django, FastAPI, Flask, and data science libraries.',
    'php': 'PHP powers our dynamic websites and WordPress solutions. We create custom themes, plugins, and enterprise-level WordPress applications with modern PHP frameworks.',
    'ai': 'Our AI services include chatbot development, automation agents, GPT integration, and machine learning solutions. We build intelligent systems that enhance user experiences.',
    'scraping': 'We provide automated data extraction services using Python tools like Scrapy, BeautifulSoup, and Selenium. Perfect for market research and business intelligence.',
    'portfolio': 'Our portfolio includes e-commerce platforms, 3D visualizations, AI-powered applications, WordPress solutions, and data scraping dashboards. Each project showcases our technical expertise.',
    'contact': 'You can reach us at nodexstation@gmail.com or through our contact form. We typically respond within 24 hours and offer free project consultations.',
    'pricing': 'Our pricing varies based on project scope and complexity. We offer competitive rates starting from $1K for smaller projects up to enterprise solutions. Contact us for a detailed quote.',
    'team': 'Our team includes Fahim Ahmed Asif (Founder), Nahian Ninad (Managing Director), and Achyuta Arnab Dey (Co-Founder). We bring diverse expertise in development, strategy, and innovation.',
    'wordpress': 'We specialize in custom WordPress development including themes, plugins, WooCommerce solutions, and performance optimization. We handle everything from simple blogs to complex enterprise sites.',
    'timeline': 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications may take 2-6 months. We provide detailed timelines during project planning.',
    'technologies': 'We work with modern technologies including React, Node.js, Python, PHP, Three.js, MongoDB, PostgreSQL, AWS, Docker, and various AI/ML frameworks.',
    'support': 'We provide ongoing support and maintenance for all our projects. This includes updates, bug fixes, security patches, and feature enhancements as needed.',
    'default': "I'm not sure about that specific topic, but I'd be happy to help you with information about our services, technologies, team, or projects. You can also contact us directly for detailed discussions!"
  };

  const quickQuestions = [
    "What is MERN stack?",
    "Tell me about Three.js",
    "Show me your portfolio",
    "How can I contact you?",
    "What are your pricing ranges?",
    "Tell me about your team"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-terminal-green mb-6">
            <span className="syntax-keyword">class</span> <span className="syntax-function">AIAssistant</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 text-lg pl-6">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Interactive AI assistant powered by NodeXstation</span><br />
            <span className="syntax-comment"> * Ask questions about our services, projects, or anything else!</span><br />
            <span className="syntax-comment"> */</span>
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-terminal-text text-sm ml-4">ai-assistant.tsx</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              <span className="text-terminal-green text-xs">AI Online</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-terminal-green text-terminal-bg'
                      : 'bg-terminal-border text-terminal-text'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-terminal-green to-terminal-blue rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-terminal-bg">AI</span>
                      </div>
                      <span className="text-xs text-terminal-text/60">NodeX Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed font-mono">{message.text}</p>
                  <div className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-terminal-border text-terminal-text px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-terminal-green to-terminal-blue rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-terminal-bg">AI</span>
                    </div>
                    <span className="text-xs text-terminal-text/60">NodeX Assistant</span>
                  </div>
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

          {/* Quick Questions */}
          <div className="border-t border-terminal-border p-4">
            <p className="text-terminal-text/60 text-sm mb-3 font-mono">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1 bg-terminal-bg border border-terminal-border rounded text-sm text-terminal-text hover:border-terminal-green hover:text-terminal-green transition-colors font-mono"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-terminal-border p-4">
            <div className="flex items-center space-x-3">
              <span className="text-terminal-green font-mono">$</span>
              <div className="flex-1 flex items-center bg-terminal-bg border border-terminal-border rounded-lg">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about NodeXstation..."
                  className="flex-1 bg-transparent px-4 py-3 text-terminal-text placeholder-terminal-text/50 outline-none font-mono"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="m-2 p-2 bg-terminal-green text-terminal-bg rounded-lg hover:bg-terminal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
            <p className="text-terminal-text/40 text-xs mt-2 font-mono">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>

        <p className="text-terminal-green text-4xl font-bold mt-8">{"}"}</p>

        {/* Features */}
        <div className="mt-12 bg-terminal-bg/50 rounded-lg border border-terminal-border p-8">
          <h3 className="text-xl font-semibold text-terminal-green mb-6">
            <span className="syntax-keyword">const</span> <span className="syntax-variable">features</span> = [
          </h3>
          <div className="grid md:grid-cols-2 gap-6 pl-6">
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-string">"Instant Responses"</span>
              </h4>
              <p className="text-terminal-text/80 text-sm">
                Get immediate answers about our services, technologies, and projects.
              </p>
            </div>
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-string">"24/7 Availability"</span>
              </h4>
              <p className="text-terminal-text/80 text-sm">
                Our AI assistant is always available to help with your questions.
              </p>
            </div>
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-string">"Project Guidance"</span>
              </h4>
              <p className="text-terminal-text/80 text-sm">
                Get guidance on choosing the right technologies for your project.
              </p>
            </div>
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-string">"Quick Quotes"</span>
              </h4>
              <p className="text-terminal-text/80 text-sm">
                Receive ballpark estimates and project timeline information.
              </p>
            </div>
          </div>
          <p className="text-terminal-green mt-6">]</p>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
