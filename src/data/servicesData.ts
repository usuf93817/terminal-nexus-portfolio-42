import { Service } from '@/types/services';

/**
 * Static data for all available services
 * Centralized configuration for easy maintenance
 */
export const servicesData: Service[] = [
  {
    name: 'MERN Stack Development',
    description: 'Full-stack web applications using MongoDB, Express.js, React, and Node.js',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript'],
    icon: '⚛️',
    color: 'from-terminal-green to-terminal-blue',
    details: {
      overview: 'Complete end-to-end web application development using the MERN stack',
      features: ['RESTful API Development', 'Real-time Applications', 'Database Design', 'Authentication Systems', 'Responsive UI Design'],
      timeline: '4-12 weeks depending on complexity',
      pricing: 'Starting from $2,500'
    }
  },
  {
    name: 'Three.js Visualization',
    description: '3D web experiences and interactive visualizations for modern applications',
    technologies: ['Three.js', 'WebGL', 'GLSL', 'Blender Integration', 'AR/VR'],
    icon: '🎯',
    color: 'from-terminal-blue to-terminal-purple',
    details: {
      overview: 'Immersive 3D web experiences and interactive visualizations',
      features: ['3D Model Loading', 'Custom Shaders', 'Physics Simulation', 'VR/AR Integration', 'Performance Optimization'],
      timeline: '6-16 weeks depending on complexity',
      pricing: 'Starting from $3,500'
    }
  },
  {
    name: 'Python Development',
    description: 'Backend services, automation scripts, and data processing solutions',
    technologies: ['Django', 'FastAPI', 'Flask', 'Pandas', 'NumPy'],
    icon: '🐍',
    color: 'from-terminal-yellow to-terminal-orange',
    details: {
      overview: 'Robust backend systems and automation solutions using Python',
      features: ['API Development', 'Data Processing', 'Machine Learning', 'Task Automation', 'Database Integration'],
      timeline: '3-10 weeks depending on scope',
      pricing: 'Starting from $2,000'
    }
  },
  {
    name: 'PHP & WordPress',
    description: 'Dynamic websites, custom themes, and enterprise WordPress solutions',
    technologies: ['PHP', 'WordPress', 'MySQL', 'WooCommerce', 'Custom Plugins'],
    icon: '🌐',
    color: 'from-terminal-purple to-terminal-red',
    details: {
      overview: 'Professional WordPress solutions and custom PHP applications',
      features: ['Custom Theme Development', 'Plugin Creation', 'E-commerce Solutions', 'Performance Optimization', 'Security Implementation'],
      timeline: '2-8 weeks depending on requirements',
      pricing: 'Starting from $1,500'
    }
  },
  {
    name: 'AI Agent Development',
    description: 'Intelligent chatbots, automation agents, and AI-powered applications',
    technologies: ['OpenAI API', 'LangChain', 'Machine Learning', 'NLP', 'TensorFlow'],
    icon: '🤖',
    color: 'from-terminal-green to-terminal-yellow',
    details: {
      overview: 'Cutting-edge AI solutions for business automation and customer engagement',
      features: ['Conversational AI', 'Document Processing', 'Workflow Automation', 'Custom Training', 'API Integration'],
      timeline: '4-14 weeks depending on complexity',
      pricing: 'Starting from $3,000'
    }
  },
  {
    name: 'Data Scraping',
    description: 'Automated data extraction, web scraping, and API integration services',
    technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Selenium', 'Pandas'],
    icon: '📊',
    color: 'from-terminal-blue to-terminal-green',
    details: {
      overview: 'Automated data collection and processing solutions',
      features: ['Web Scraping', 'API Integration', 'Data Cleaning', 'Real-time Monitoring', 'Custom Dashboards'],
      timeline: '2-6 weeks depending on data sources',
      pricing: 'Starting from $1,200'
    }
  },
  {
    name: 'Lead Generation',
    description: 'Targeted lead generation systems and customer acquisition strategies',
    technologies: ['CRM Integration', 'Email Automation', 'Analytics', 'A/B Testing'],
    icon: '🎯',
    color: 'from-terminal-orange to-terminal-red',
    details: {
      overview: 'Comprehensive lead generation and customer acquisition systems',
      features: ['Lead Scoring', 'Email Campaigns', 'Landing Pages', 'Analytics Tracking', 'CRM Integration'],
      timeline: '3-8 weeks depending on strategy',
      pricing: 'Starting from $2,200'
    }
  },
  {
    name: 'Custom Solutions',
    description: 'Tailored software solutions for unique business requirements',
    technologies: ['Microservices', 'API Development', 'Cloud Deployment', 'DevOps'],
    icon: '⚙️',
    color: 'from-terminal-purple to-terminal-blue',
    details: {
      overview: 'Bespoke software solutions designed for your specific business needs',
      features: ['Architecture Design', 'Scalable Solutions', 'Cloud Integration', 'DevOps Setup', 'Ongoing Support'],
      timeline: '6-20 weeks depending on requirements',
      pricing: 'Custom quote based on requirements'
    }
  }
];