
import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Image, Volume2, VolumeX, Brain, Zap, Code, FileText, Search, Camera } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'message' | 'welcome' | 'response' | 'image' | 'analysis' | 'voice';
  imageUrl?: string;
}

const FuturisticAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🧠 Neural AI Interface Initialized. I'm your advanced AI assistant with voice recognition, image analysis, and quantum processing capabilities. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('default');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const personalities = [
    { id: 'default', name: 'Neural', icon: '🧠', color: 'text-terminal-green' },
    { id: 'creative', name: 'Creative', icon: '🎨', color: 'text-terminal-purple' },
    { id: 'technical', name: 'Technical', icon: '⚡', color: 'text-terminal-blue' },
    { id: 'analytical', name: 'Analytical', icon: '📊', color: 'text-terminal-yellow' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
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
        setInputMessage(transcript);
      };
      
      recognition.start();
    }
  };

  const processCommand = (message: string) => {
    if (message.startsWith('/')) {
      const command = message.toLowerCase();
      
      if (command.startsWith('/code')) {
        return "```javascript\n// Here's a sample code snippet\nconst futuristicFunction = () => {\n  console.log('Welcome to the future!');\n  return 'AI-Generated Code';\n};\n```";
      } else if (command.startsWith('/analyze')) {
        return "🔍 **System Analysis Complete**\n\n• Performance: Optimal\n• Memory Usage: 12%\n• Neural Networks: Active\n• Quantum Processors: Online\n• Security Level: Maximum";
      } else if (command.startsWith('/help')) {
        return "🤖 **Available Commands:**\n\n/code - Generate code snippets\n/analyze - System analysis\n/weather - Current weather\n/time - Current time\n/joke - Tell a joke\n/fact - Random fact";
      } else if (command.startsWith('/weather')) {
        return "🌤️ **Weather Report:**\nTemperature: 72°F\nConditions: Partly Cloudy\nHumidity: 45%\nWind: 8 mph NE";
      } else if (command.startsWith('/time')) {
        return `🕐 **Current Time:** ${new Date().toLocaleTimeString()}`;
      } else if (command.startsWith('/joke')) {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
          "Why do AI assistants never get tired? Because they run on infinite loops! ♾️"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      } else if (command.startsWith('/fact')) {
        const facts = [
          "🧠 The human brain has approximately 86 billion neurons!",
          "🌌 There are more possible games of chess than atoms in the observable universe!",
          "💻 The first computer bug was an actual bug - a moth trapped in a relay!"
        ];
        return facts[Math.floor(Math.random() * facts.length)];
      }
    }
    
    return null;
  };

  const getPersonalityResponse = (message: string, personality: string) => {
    const responses = {
      default: [
        "I understand your query. Let me process this with my neural networks...",
        "Analyzing your request through quantum algorithms...",
        "Processing complete. Here's my analysis...",
      ],
      creative: [
        "What an interesting perspective! Let me explore this creatively...",
        "I'm inspired by your question. Here's a creative approach...",
        "Let's think outside the conventional parameters...",
      ],
      technical: [
        "Initiating technical analysis protocol...",
        "Accessing technical databases and specifications...",
        "Compiling technical documentation and best practices...",
      ],
      analytical: [
        "Running comprehensive data analysis...",
        "Cross-referencing multiple data sources...",
        "Statistical analysis indicates...",
      ]
    };
    
    const personalityResponses = responses[personality as keyof typeof responses] || responses.default;
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'message'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const commandResponse = processCommand(inputMessage);
      const responseText = commandResponse || getPersonalityResponse(inputMessage, selectedPersonality);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        type: 'response'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Auto-speak AI responses
      if (!isSpeaking) {
        speakMessage(responseText);
      }
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        const imageMessage: Message = {
          id: Date.now(),
          text: "Image uploaded for analysis",
          sender: 'user',
          timestamp: new Date(),
          type: 'image',
          imageUrl
        };
        
        setMessages(prev => [...prev, imageMessage]);
        
        // Simulate AI image analysis
        setTimeout(() => {
          const analysisMessage: Message = {
            id: Date.now() + 1,
            text: "🔍 **Image Analysis Complete:**\n\n• Objects detected: Multiple\n• Colors: Vibrant spectrum\n• Composition: Well-balanced\n• Quality: High resolution\n• Sentiment: Positive\n\nThis appears to be a well-composed image with excellent visual elements!",
            sender: 'ai',
            timestamp: new Date(),
            type: 'analysis'
          };
          
          setMessages(prev => [...prev, analysisMessage]);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] rounded-2xl border border-terminal-green/30 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-green/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-terminal-green">Neural AI Assistant</h3>
            <p className="text-terminal-text/60 text-sm">Advanced Quantum Processing</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className="p-2 text-terminal-text/60 hover:text-terminal-green transition-colors"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Personality Selector */}
      <div className="flex space-x-2 mb-4">
        {personalities.map((personality) => (
          <button
            key={personality.id}
            onClick={() => setSelectedPersonality(personality.id)}
            className={`px-3 py-1 rounded-full text-sm font-mono transition-all ${
              selectedPersonality === personality.id
                ? 'bg-terminal-green text-terminal-bg'
                : 'bg-terminal-bg/50 text-terminal-text/60 hover:text-terminal-text'
            }`}
          >
            {personality.icon} {personality.name}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-terminal-green/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-terminal-green text-terminal-bg'
                  : 'bg-terminal-bg/50 text-terminal-text border border-terminal-green/20'
              }`}
            >
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-sm font-mono whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-terminal-bg/50 text-terminal-text border border-terminal-green/20 px-4 py-3 rounded-2xl">
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

      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message or use commands like /help, /code, /analyze..."
            className="w-full bg-terminal-bg/50 border border-terminal-green/30 rounded-xl px-4 py-3 text-terminal-text font-mono text-sm resize-none focus:outline-none focus:border-terminal-green"
            rows={1}
          />
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-3 text-terminal-text/60 hover:text-terminal-green transition-colors"
        >
          <Image className="w-5 h-5" />
        </button>
        
        <button
          onClick={startListening}
          className={`p-3 transition-colors ${
            isListening ? 'text-terminal-green' : 'text-terminal-text/60 hover:text-terminal-green'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        
        <button
          onClick={handleSendMessage}
          className="p-3 bg-terminal-green text-terminal-bg rounded-xl hover:bg-terminal-green/90 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Commands */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['/help', '/code', '/analyze', '/weather', '/joke'].map((command) => (
          <button
            key={command}
            onClick={() => setInputMessage(command)}
            className="px-2 py-1 bg-terminal-bg/30 text-terminal-text/60 rounded text-xs font-mono hover:text-terminal-green transition-colors"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FuturisticAIChat;
