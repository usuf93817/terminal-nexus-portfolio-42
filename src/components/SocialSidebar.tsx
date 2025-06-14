
import React, { useState, useEffect } from 'react';
import { Github, Facebook, Instagram, Mail } from 'lucide-react';

const SocialSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const socialLinks = [
    {
      id: 'email',
      icon: Mail,
      url: 'mailto:nodexstation@gmail.com',
      label: 'Email',
      color: 'text-terminal-green',
      hoverColor: 'hover:text-terminal-green',
      description: 'Send Email'
    },
    {
      id: 'github',
      icon: Github,
      url: 'https://github.com/nodexStation',
      label: 'GitHub',
      color: 'text-terminal-text',
      hoverColor: 'hover:text-terminal-green',
      description: 'View GitHub'
    },
    {
      id: 'instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/nodex_station/',
      label: 'Instagram',
      color: 'text-terminal-purple',
      hoverColor: 'hover:text-terminal-purple',
      description: 'Follow Instagram'
    },
    {
      id: 'facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61576048524952',
      label: 'Facebook',
      color: 'text-terminal-blue',
      hoverColor: 'hover:text-terminal-blue',
      description: 'Like Facebook'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
    }`}>
      {/* Holographic Connection Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-8 top-0 w-px h-full bg-gradient-to-b from-transparent via-terminal-green/30 to-transparent" />
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="absolute w-20 h-px bg-gradient-to-r from-terminal-green/20 to-transparent"
            style={{
              top: `${20 + i * 80}px`,
              left: '32px',
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Social Media Cards */}
      <div className="space-y-6">
        {socialLinks.map((social, index) => (
          <div
            key={social.id}
            className="group relative"
            style={{
              transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.02}deg)`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Main Card */}
            <a
              href={social.url}
              target={social.id !== 'email' ? '_blank' : undefined}
              rel={social.id !== 'email' ? 'noopener noreferrer' : undefined}
              className={`block w-16 h-16 bg-terminal-bg/20 border border-terminal-border/30 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-terminal-green/50 group ${social.hoverColor}`}
              data-magnetic
              data-cursor-text={social.description}
            >
              {/* Holographic Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-terminal-green/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-xl" />
              
              {/* Icon */}
              <div className="flex items-center justify-center w-full h-full">
                <social.icon className={`w-7 h-7 ${social.color} group-hover:text-terminal-green transition-all duration-300 drop-shadow-lg`} />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-terminal-green/5 to-terminal-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Extended Info Panel */}
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-gradient-to-r from-terminal-bg/95 to-terminal-bg/80 border border-terminal-green/30 rounded-lg px-4 py-3 backdrop-blur-md shadow-xl min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <social.icon className={`w-5 h-5 ${social.color}`} />
                  <div>
                    <p className="font-mono text-sm font-semibold text-terminal-green">
                      {social.label}
                    </p>
                    <p className="font-mono text-xs text-terminal-text/70">
                      {social.description}
                    </p>
                  </div>
                </div>
                
                {/* Connection Arrow */}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-terminal-green/30"></div>
                
                {/* Panel Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 to-terminal-blue/5 rounded-lg blur-sm -z-10" />
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none group-hover:block hidden">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 ${social.color} rounded-full opacity-60`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `particleFloat 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>

            {/* Activity Indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 ${social.color} rounded-full opacity-60 animate-pulse`}>
              <div className={`absolute inset-0 ${social.color} rounded-full animate-ping`} />
            </div>
          </div>
        ))}
      </div>

      {/* Energy Field Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-terminal-green/5 via-transparent to-transparent rounded-full scale-150 animate-pulse" />
      </div>

      {/* Status Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-terminal-bg/20 border border-terminal-border/30 rounded-full px-3 py-1 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
            <span className="text-xs font-mono text-terminal-text/60">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSidebar;
