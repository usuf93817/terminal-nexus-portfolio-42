
import React, { useState } from 'react';
import { Github, ArrowUp } from 'lucide-react';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      name: 'E-Commerce MERN Platform',
      description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe', 'JWT'],
      code: `const ecommerceApp = {
  frontend: {
    framework: "React",
    state: "Redux Toolkit",
    styling: "Tailwind CSS",
    features: ["Product Catalog", "Shopping Cart", "User Auth"]
  },
  backend: {
    runtime: "Node.js",
    framework: "Express.js",
    database: "MongoDB",
    payment: "Stripe API"
  },
  deployment: "Vercel + Heroku"
};`,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      category: 'Full-Stack',
      status: 'Completed'
    },
    {
      id: 2,
      name: '3D Product Visualizer',
      description: 'Interactive 3D product showcase using Three.js with realistic lighting and materials',
      technologies: ['Three.js', 'WebGL', 'React', 'GSAP', 'Blender'],
      code: `const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Load 3D model
const loader = new THREE.GLTFLoader();
loader.load('product.gltf', (gltf) => {
  scene.add(gltf.scene);
  animate();
});`,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      category: '3D Visualization',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'AI Content Generator',
      description: 'Intelligent content generation platform powered by OpenAI GPT with custom fine-tuning',
      technologies: ['Python', 'OpenAI API', 'FastAPI', 'React', 'PostgreSQL'],
      code: `import openai
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ContentRequest(BaseModel):
    prompt: str
    max_tokens: int = 500

@app.post("/generate")
async def generate_content(request: ContentRequest):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=request.prompt,
        max_tokens=request.max_tokens
    )
    return {"content": response.choices[0].text}`,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      category: 'AI/ML',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'WordPress Automation Suite',
      description: 'Custom WordPress plugin suite for automated content management and SEO optimization',
      technologies: ['PHP', 'WordPress', 'MySQL', 'JavaScript', 'REST API'],
      code: `<?php
/**
 * Plugin Name: NodeX Automation Suite
 * Description: Automated content management and SEO tools
 */

class NodeXAutomation {
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function init() {
        // Initialize automation features
        $this->setup_content_scheduler();
        $this->setup_seo_optimizer();
    }
    
    private function setup_content_scheduler() {
        // Auto-publish scheduled content
        wp_schedule_event(time(), 'hourly', 'nodex_auto_publish');
    }
}

new NodeXAutomation();`,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'WordPress',
      status: 'Completed'
    },
    {
      id: 5,
      name: 'Data Scraping Dashboard',
      description: 'Real-time data collection and visualization dashboard for market intelligence',
      technologies: ['Python', 'Scrapy', 'React', 'D3.js', 'Redis', 'Celery'],
      code: `import scrapy
from scrapy.crawler import CrawlerProcess
import pandas as pd

class MarketDataSpider(scrapy.Spider):
    name = 'market_data'
    start_urls = ['https://example-market.com']
    
    def parse(self, response):
        for product in response.css('.product-item'):
            yield {
                'name': product.css('.product-name::text').get(),
                'price': product.css('.price::text').get(),
                'availability': product.css('.stock::text').get(),
                'timestamp': datetime.now()
            }
            
    def save_to_database(self, data):
        df = pd.DataFrame(data)
        df.to_sql('market_data', engine, if_exists='append')`,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      category: 'Data Science',
      status: 'In Progress'
    }
  ];

  const categories = ['All', 'Full-Stack', '3D Visualization', 'AI/ML', 'WordPress', 'Data Science'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-terminal-green mb-6">
            <span className="syntax-keyword">const</span> <span className="syntax-variable">portfolio</span> = [
          </h2>
          <p className="text-terminal-text/80 text-lg max-w-3xl pl-6">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Showcase of our recent projects and technical achievements.</span><br />
            <span className="syntax-comment"> * Each project demonstrates our expertise and innovation.</span><br />
            <span className="syntax-comment"> */</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 pl-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-terminal-green text-terminal-bg'
                    : 'bg-terminal-bg/50 text-terminal-text border border-terminal-border hover:border-terminal-green hover:text-terminal-green'
                }`}
              >
                <span className="syntax-string">"{category}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 pl-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="grid lg:grid-cols-2 gap-8 bg-terminal-bg/50 rounded-lg border border-terminal-border p-8 hover:border-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20"
            >
              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-terminal-text">
                      <span className="syntax-variable">{project.name}</span>
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                      project.status === 'Completed' 
                        ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/30'
                        : 'bg-terminal-yellow/20 text-terminal-yellow border border-terminal-yellow/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-terminal-blue text-sm font-mono mb-2">
                    <span className="syntax-keyword">category:</span> <span className="syntax-string">"{project.category}"</span>
                  </p>
                  <p className="text-terminal-text/80 leading-relaxed">
                    <span className="syntax-comment">// {project.description}</span>
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <p className="text-terminal-yellow text-sm mb-3">
                    <span className="syntax-variable">technologies</span>: [
                  </p>
                  <div className="pl-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-terminal-border/50 text-terminal-text px-3 py-1 rounded text-sm font-mono border border-terminal-border hover:border-terminal-green transition-colors"
                      >
                        <span className="syntax-string">"{tech}"</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-terminal-yellow text-sm mt-3">]</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex items-center space-x-2 bg-terminal-green text-terminal-bg px-6 py-2 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300">
                    <Github size={16} />
                    <span>View Code</span>
                  </button>
                  <button className="flex items-center space-x-2 border border-terminal-green text-terminal-green px-6 py-2 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300">
                    <ArrowUp size={16} className="rotate-45" />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>

              {/* Code Preview */}
              <div className="space-y-4">
                <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-terminal-border">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-terminal-text text-xs">
                      {project.name.toLowerCase().replace(/\s+/g, '-')}.js
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="text-terminal-text whitespace-pre-wrap">
                        {project.code}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Project Image */}
                <div className="rounded-lg overflow-hidden border border-terminal-border">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-terminal-green text-4xl font-bold mt-8">];</p>

        {/* GitHub CTA */}
        <div className="mt-16 bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
          <h3 className="text-2xl font-semibold text-terminal-green mb-4">
            <span className="syntax-keyword">explore</span> <span className="syntax-function">moreProjects</span>()
          </h3>
          <p className="text-terminal-text/80 mb-6">
            <span className="syntax-comment">
              // Visit our GitHub for more open-source projects and contributions
            </span>
          </p>
          <a
            href="https://github.com/nodexStation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/30"
          >
            <Github size={20} />
            <span>View GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
