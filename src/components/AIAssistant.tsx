
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Bot, User, Copy, Trash2 } from 'lucide-react';

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
      text: "Hello! I'm the NodeXstation AI Assistant. I'm here to help you learn about our services, technologies, and projects. I can provide detailed information about MERN stack development, Three.js visualizations, AI agent development, data scraping solutions, and much more. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const advancedResponses: { [key: string]: string } = {
    'mern': `**MERN Stack Development at NodeXstation**

Our MERN expertise includes:

🚀 **MongoDB**: NoSQL database design, aggregation pipelines, indexing strategies
⚡ **Express.js**: RESTful APIs, middleware development, authentication systems
⚛️ **React**: Component architecture, state management (Redux/Context), hooks optimization
🟢 **Node.js**: Server-side JavaScript, async programming, microservices

**Sample Project Structure:**
\`\`\`
/project-root
  /client (React)
    /src/components
    /src/hooks
    /src/services
  /server (Node.js/Express)
    /routes
    /models
    /middleware
  /database (MongoDB)
\`\`\`

We've built 50+ MERN applications with features like real-time chat, payment integration, and advanced authentication.`,

    'three.js': `**Three.js 3D Development Expertise**

Our Three.js capabilities cover:

🎨 **Interactive 3D Scenes**: Product configurators, architectural visualizations
🎮 **WebGL Optimization**: Performance tuning for mobile and desktop
📱 **Responsive 3D**: Adaptive rendering for different screen sizes
🔧 **Custom Shaders**: GLSL programming for unique visual effects

**Technical Features:**
- Physics simulation (Cannon.js integration)
- Real-time lighting and shadows
- Texture mapping and materials
- Animation systems (GSAP integration)
- VR/AR capabilities (WebXR)

**Use Cases:**
✅ E-commerce product viewers
✅ Interactive data visualizations
✅ Virtual showrooms
✅ Educational simulations`,

    'python': `**Python Development Solutions**

Our Python expertise spans:

🐍 **Web Development**: Django, FastAPI, Flask frameworks
🤖 **AI/ML**: TensorFlow, PyTorch, scikit-learn, OpenCV
📊 **Data Science**: Pandas, NumPy, Matplotlib, Jupyter
🔄 **Automation**: Task scheduling, API integrations, workflow automation

**Specializations:**
- **Backend APIs**: RESTful and GraphQL services
- **Data Processing**: ETL pipelines, real-time analytics
- **Machine Learning**: Predictive models, NLP, computer vision
- **DevOps**: Docker containerization, CI/CD pipelines

**Recent Projects:**
✨ AI-powered recommendation systems
✨ Real-time fraud detection algorithms
✨ Automated trading bots
✨ Large-scale data processing pipelines`,

    'php': `**PHP & WordPress Excellence**

Our PHP development includes:

🌐 **Modern PHP**: PHP 8+, Composer, PSR standards
🏗️ **Frameworks**: Laravel, Symfony, CodeIgniter
📝 **WordPress**: Custom themes, plugins, headless CMS
⚡ **Performance**: Caching strategies, database optimization

**WordPress Specialties:**
- Custom post types and fields
- WooCommerce development
- Multisite network management
- Plugin architecture design
- REST API extensions

**Enterprise Solutions:**
✅ Large-scale content management
✅ E-commerce platforms
✅ Membership systems
✅ Custom admin dashboards`,

    'ai': `**AI Agent Development**

Our AI solutions include:

🤖 **Chatbots**: Customer support, lead qualification, FAQ automation
🧠 **LLM Integration**: GPT-4, Claude, custom model fine-tuning
🔗 **API Integrations**: OpenAI, Anthropic, Hugging Face
📱 **Multi-platform**: Web, mobile, desktop, messaging platforms

**AI Agent Capabilities:**
- Natural language processing
- Intent recognition and response generation
- Context-aware conversations
- Multi-language support
- Learning from interactions

**Implementation Stack:**
- Python + FastAPI for backend
- OpenAI/Anthropic APIs
- Vector databases (Pinecone, Weaviate)
- Real-time WebSocket communication
- Analytics and monitoring dashboards`,

    'scraping': `**Advanced Data Scraping Solutions**

Our scraping expertise:

🕷️ **Technologies**: Scrapy, Selenium, BeautifulSoup, Playwright
⚡ **Performance**: Async processing, proxy rotation, rate limiting
🛡️ **Anti-Detection**: User agent rotation, CAPTCHA solving, stealth mode
📊 **Data Processing**: Cleaning, validation, transformation pipelines

**Scraping Capabilities:**
- JavaScript-heavy SPAs
- Dynamic content loading
- Authentication-protected sites
- Multi-page workflows
- Real-time data monitoring

**Data Delivery:**
✅ JSON/CSV/XML formats
✅ Database integration
✅ API endpoints
✅ Real-time dashboards
✅ Automated reporting

**Legal & Ethical**: We ensure compliance with robots.txt, rate limiting, and data privacy regulations.`,

    'portfolio': `**Our Project Portfolio**

**Recent Highlights:**

🛒 **E-Commerce Platform** (MERN)
- 10,000+ products, real-time inventory
- Stripe payment integration
- Advanced search & filtering
- Admin analytics dashboard

🎨 **3D Product Configurator** (Three.js)
- Real-time customization
- AR preview capabilities
- High-performance rendering
- Mobile-optimized

🤖 **AI Customer Service Bot**
- 95% query resolution rate
- Multi-language support
- CRM integration
- Learning algorithms

📊 **Market Intelligence Platform**
- Real-time competitor monitoring
- Price tracking across 500+ sites
- Automated report generation
- Predictive analytics

**Industries Served:**
• E-commerce & Retail
• FinTech & Banking
• Healthcare & MedTech
• Education & EdTech
• Real Estate & PropTech`,

    'contact': `**Get In Touch With NodeXstation**

📧 **Email**: nodexstation@gmail.com
🌐 **GitHub**: https://github.com/nodexStation
📱 **Instagram**: https://www.instagram.com/nodex_station/
📘 **Facebook**: https://www.facebook.com/profile.php?id=61576048524952

**Response Times:**
• Initial contact: Within 4 hours
• Project quotes: 24-48 hours
• Project kickoff: 1-3 business days

**Consultation Process:**
1. **Discovery Call** (30 min) - Understanding your requirements
2. **Technical Proposal** - Detailed scope and timeline
3. **Project Planning** - Milestones and deliverables
4. **Development** - Regular updates and demos
5. **Deployment & Support** - Launch and ongoing maintenance

**Free Services:**
✅ Initial consultation
✅ Technical feasibility assessment
✅ Basic project estimation
✅ Technology recommendations`,

    'pricing': `**Investment & Pricing Structure**

**Project Tiers:**

🌱 **Starter Projects** ($1K - $5K)
- Simple websites & landing pages
- Basic CRUD applications
- Small automation scripts
- WordPress customizations

🚀 **Professional Projects** ($5K - $25K)
- Complex web applications
- E-commerce platforms
- API development
- Database design & optimization

⭐ **Enterprise Solutions** ($25K+)
- Large-scale applications
- AI/ML implementations
- Complex integrations
- Custom software development

**Hourly Rates:**
- Junior Developer: $25-40/hour
- Senior Developer: $50-75/hour
- Technical Lead: $75-100/hour
- Specialized AI/3D: $80-120/hour

**What's Included:**
✅ Project planning & documentation
✅ Quality assurance & testing
✅ Deployment & launch support
✅ 30-day post-launch support
✅ Code documentation & handover`,

    'team': `**Meet the NodeXstation Team**

👨‍💻 **Fahim Ahmed Asif** - Founder
- Full-stack MERN developer
- 5+ years of industry experience
- Specializes in scalable web applications
- 📧 ahmedasif0007@gmail.com
- 🔗 LinkedIn: linkedin.com/in/fahim-ahmed-asif-502897277/

👨‍💼 **Nahian Ninad** - Managing Director
- Business strategy & client relations
- Project management expertise
- Growth hacking & digital marketing
- 📘 Facebook: facebook.com/Neucleah

👨‍🔬 **Achyuta Arnab Dey** - Co-Founder
- AI/ML specialist & Python expert
- Data science & automation
- Research & development lead
- 📧 arnabdey15091@gmail.com
- 🔗 LinkedIn: linkedin.com/in/achyuta1/
- 💻 GitHub: github.com/ArnabSaga

**Team Strengths:**
🎯 Diverse technical expertise
🤝 Collaborative approach
📈 Continuous learning mindset
🚀 Innovation-driven development`,

    'wordpress': `**WordPress Development Excellence**

**Custom Solutions:**

🎨 **Theme Development**
- Responsive design principles
- Custom post types & fields
- Gutenberg block development
- Performance optimization

🔌 **Plugin Development**
- Custom functionality
- Third-party integrations
- Security best practices
- WordPress coding standards

🛒 **WooCommerce Expertise**
- Custom product types
- Payment gateway integration
- Inventory management
- Multi-vendor marketplaces

**Performance Optimization:**
⚡ Caching strategies (Redis, Memcached)
⚡ Database optimization
⚡ Image compression & CDN
⚡ Code minification & bundling

**Maintenance Services:**
✅ Security updates & monitoring
✅ Backup & recovery systems
✅ Performance monitoring
✅ Content updates & management`,

    'timeline': `**Project Development Timeline**

**Typical Project Phases:**

📋 **Discovery & Planning** (1-2 weeks)
- Requirements gathering
- Technical architecture design
- UI/UX wireframes
- Project timeline finalization

⚙️ **Development Phases:**

**Simple Projects** (2-4 weeks)
- Basic websites
- WordPress customizations
- Small automation tools

**Medium Projects** (1-3 months)
- Web applications
- E-commerce sites
- API development
- Database design

**Complex Projects** (3-6 months)
- Large-scale applications
- AI/ML implementations
- Multi-platform solutions
- Enterprise integrations

**Quality Assurance** (1-2 weeks)
- Testing & bug fixes
- Performance optimization
- Security audits
- User acceptance testing

**Deployment & Launch** (1 week)
- Production setup
- Go-live support
- Team training
- Documentation handover

**Factors Affecting Timeline:**
• Project complexity
• Client feedback cycles
• Third-party integrations
• Team availability`,

    'technologies': `**Our Technology Stack**

**Frontend Technologies:**
⚛️ **React**: Hooks, Context API, Redux Toolkit
📱 **React Native**: Cross-platform mobile apps
🎨 **UI Libraries**: Material-UI, Chakra UI, Tailwind CSS
🚀 **Build Tools**: Vite, Webpack, Parcel

**Backend Technologies:**
🟢 **Node.js**: Express, NestJS, Fastify
🐍 **Python**: Django, FastAPI, Flask
🐘 **PHP**: Laravel, Symfony, WordPress

**Databases:**
🍃 **MongoDB**: NoSQL, aggregation pipelines
🐘 **PostgreSQL**: Relational data, complex queries
🔥 **Redis**: Caching, session management
📊 **InfluxDB**: Time-series data

**Cloud & DevOps:**
☁️ **AWS**: EC2, S3, Lambda, RDS
🔧 **Docker**: Containerization
🚀 **CI/CD**: GitHub Actions, Jenkins
📊 **Monitoring**: New Relic, DataDog

**AI & Machine Learning:**
🤖 **OpenAI**: GPT-4, DALL-E integration
🧠 **TensorFlow**: Deep learning models
📈 **Scikit-learn**: Classical ML algorithms
🔍 **Langchain**: LLM application frameworks`,

    'support': `**Support & Maintenance Services**

**Support Tiers:**

🛡️ **Basic Support** (Included)
- 30 days post-launch support
- Bug fixes & minor adjustments
- Email support (48h response)
- Documentation & handover

⚡ **Premium Support** ($200-500/month)
- Priority support (4h response)
- Monthly security updates
- Performance monitoring
- Content updates (2h/month)

🚀 **Enterprise Support** (Custom pricing)
- 24/7 monitoring
- Dedicated support team
- SLA guarantees
- Regular health checks

**What We Cover:**
✅ Security updates & patches
✅ Performance optimization
✅ Bug fixes & troubleshooting
✅ Feature enhancements
✅ Third-party integrations
✅ Backup & recovery
✅ Database maintenance

**Emergency Support:**
🆘 Critical issues: 2-4 hour response
⚠️ High priority: 8-12 hour response
📝 Normal issues: 24-48 hour response

**Proactive Monitoring:**
- Uptime monitoring (99.9% SLA)
- Performance metrics
- Security scanning
- Error tracking & alerting`,

    'default': "I'd be happy to help you learn more about NodeXstation! I can provide detailed information about our technologies, services, team, pricing, project timelines, and much more. You can ask me about specific topics like 'MERN development', 'Three.js projects', 'AI solutions', 'pricing structure', or 'our team'. What would you like to explore?"
  };

  const quickQuestions = [
    "What is MERN stack?",
    "Tell me about Three.js",
    "Show me your portfolio",
    "How can I contact you?",
    "What are your pricing ranges?",
    "Tell me about your team",
    "What technologies do you use?",
    "How long do projects take?",
    "Do you provide support?",
    "Can you build AI agents?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and return detailed responses
    for (const [key, response] of Object.entries(advancedResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for greeting patterns
    if (lowerMessage.match(/^(hi|hello|hey|good\s+(morning|afternoon|evening))/)) {
      return "Hello there! 👋 Welcome to NodeXstation. I'm excited to help you learn about our services and capabilities. Whether you're interested in web development, AI solutions, or data scraping, I'm here to provide detailed information. What catches your interest?";
    }
    
    // Check for pricing-related queries
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
      return advancedResponses.pricing;
    }
    
    // Check for time-related queries
    if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('deadline')) {
      return advancedResponses.timeline;
    }
    
    return advancedResponses.default;
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

    // Simulate AI thinking time with more realistic delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
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

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Chat cleared! I'm still here to help you with any questions about NodeXstation's services, technologies, or projects. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-terminal-green mb-6">
            <span className="syntax-keyword">class</span> <span className="syntax-function">AIAssistant</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 text-lg pl-6">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Advanced AI assistant powered by NodeXstation</span><br />
            <span className="syntax-comment"> * Ask detailed questions about our services, technologies, or projects!</span><br />
            <span className="syntax-comment"> */</span>
          </p>
        </div>

        {/* Enhanced Chat Interface */}
        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-terminal-text text-sm ml-4">ai-assistant-advanced.tsx</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={clearChat}
                className="flex items-center space-x-1 px-2 py-1 text-xs text-terminal-text/60 hover:text-terminal-text transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-terminal-green text-xs">AI Online</span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-terminal-bg/50 to-terminal-bg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] group ${
                    message.sender === 'user'
                      ? 'bg-terminal-green text-terminal-bg rounded-l-lg rounded-tr-lg'
                      : 'bg-terminal-border text-terminal-text rounded-r-lg rounded-tl-lg border-l-4 border-terminal-green'
                  } p-4 shadow-lg`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-terminal-bg" />
                      </div>
                      <span className="text-xs text-terminal-text/60 font-semibold">NodeXstation AI</span>
                    </div>
                  )}
                  
                  {message.sender === 'user' && (
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <span className="text-xs text-terminal-bg/60 font-semibold">You</span>
                      <div className="w-6 h-6 bg-terminal-bg rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-terminal-green" />
                      </div>
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/20">
                    <div className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                    <button
                      onClick={() => copyMessage(message.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-current/10 rounded"
                      title="Copy message"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-terminal-border text-terminal-text rounded-r-lg rounded-tl-lg p-4 border-l-4 border-terminal-green">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-terminal-bg" />
                    </div>
                    <span className="text-xs text-terminal-text/60 font-semibold">NodeXstation AI</span>
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

          {/* Enhanced Quick Questions */}
          <div className="border-t border-terminal-border p-4 bg-terminal-bg/30">
            <p className="text-terminal-text/60 text-sm mb-3 font-mono">💡 Quick questions to get you started:</p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-2 bg-terminal-bg border border-terminal-border rounded text-sm text-terminal-text hover:border-terminal-green hover:text-terminal-green hover:bg-terminal-green/5 transition-all font-mono text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Input Area */}
          <div className="border-t border-terminal-border p-4 bg-[#323233]">
            <div className="flex items-center space-x-3">
              <span className="text-terminal-green font-mono">🤖</span>
              <div className="flex-1 flex items-center bg-terminal-bg border border-terminal-border rounded-lg focus-within:border-terminal-green transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about NodeXstation's services, technologies, or projects..."
                  className="flex-1 bg-transparent px-4 py-3 text-terminal-text placeholder-terminal-text/50 outline-none font-mono"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="m-2 p-2 bg-terminal-green text-terminal-bg rounded-lg hover:bg-terminal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-terminal-green"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
            <p className="text-terminal-text/40 text-xs mt-2 font-mono">
              Press Enter to send • Shift+Enter for new line • Ask detailed questions for comprehensive answers
            </p>
          </div>
        </div>

        <p className="text-terminal-green text-4xl font-bold mt-8">{"}"}</p>

        {/* Enhanced Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-terminal-bg/50 rounded-lg border border-terminal-border p-8">
            <h3 className="text-xl font-semibold text-terminal-green mb-6">
              <span className="syntax-keyword">const</span> <span className="syntax-variable">capabilities</span> = [
            </h3>
            <div className="space-y-4 pl-6">
              <div>
                <h4 className="text-terminal-yellow mb-2">
                  <span className="syntax-string">"Detailed Technical Responses"</span>
                </h4>
                <p className="text-terminal-text/80 text-sm">
                  Get comprehensive information about our technologies, code examples, and implementation details.
                </p>
              </div>
              <div>
                <h4 className="text-terminal-yellow mb-2">
                  <span className="syntax-string">"Project Guidance"</span>
                </h4>
                <p className="text-terminal-text/80 text-sm">
                  Receive expert guidance on technology selection, project planning, and best practices.
                </p>
              </div>
            </div>
            <p className="text-terminal-green mt-6">]</p>
          </div>

          <div className="bg-terminal-bg/50 rounded-lg border border-terminal-border p-8">
            <h3 className="text-xl font-semibold text-terminal-green mb-6">
              <span className="syntax-keyword">const</span> <span className="syntax-variable">features</span> = [
            </h3>
            <div className="space-y-4 pl-6">
              <div>
                <h4 className="text-terminal-yellow mb-2">
                  <span className="syntax-string">"Smart Context Understanding"</span>
                </h4>
                <p className="text-terminal-text/80 text-sm">
                  Ask follow-up questions and get contextually relevant answers about our services.
                </p>
              </div>
              <div>
                <h4 className="text-terminal-yellow mb-2">
                  <span className="syntax-string">"Interactive Code Examples"</span>
                </h4>
                <p className="text-terminal-text/80 text-sm">
                  View code snippets and technical implementations for our various solutions.
                </p>
              </div>
            </div>
            <p className="text-terminal-green mt-6">]</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
