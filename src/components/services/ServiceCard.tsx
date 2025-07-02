import React from 'react';
import { ServiceCardProps } from '@/types/services';

/**
 * Individual service card component displaying service information
 * with hover effects and interactive elements
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  index, 
  onLearnMore 
}) => {
  return (
    <div
      className="group bg-terminal-bg/50 rounded-lg border border-terminal-border p-6 hover:border-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20 transform-gpu will-change-transform hover:scale-[1.02] cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onLearnMore(service)}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${service.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onLearnMore(service);
        }
      }}
    >
      {/* Service Icon */}
      <div 
        className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        <span className="text-2xl" role="img" aria-label={`${service.name} icon`}>
          {service.icon}
        </span>
      </div>

      {/* Service Name */}
      <h3 className="text-lg font-semibold text-terminal-text mb-3 group-hover:text-terminal-green transition-colors">
        <span className="syntax-string">"{service.name}"</span>
      </h3>

      {/* Description */}
      <p className="text-terminal-text/70 text-sm mb-4 leading-relaxed">
        <span className="syntax-comment">// {service.description}</span>
      </p>

      {/* Technologies */}
      <div className="space-y-2">
        <p className="text-terminal-yellow text-sm">
          <span className="syntax-variable">tech</span>: [
        </p>
        <div className="pl-4 space-y-1 max-h-20 overflow-y-auto">
          {service.technologies.map((tech, techIndex) => (
            <p key={tech} className="text-terminal-text text-xs">
              <span className="syntax-string">"{tech}"</span>
              {techIndex < service.technologies.length - 1 ? ',' : ''}
            </p>
          ))}
        </div>
        <p className="text-terminal-yellow text-sm">]</p>
      </div>

      {/* Hover Effect */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          className="w-full bg-terminal-green/10 hover:bg-terminal-green/20 text-terminal-green py-2 px-4 rounded text-sm border border-terminal-green/30 hover:border-terminal-green/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terminal-green/30"
          onClick={(e) => {
            e.stopPropagation();
            onLearnMore(service);
          }}
          aria-label={`Get more information about ${service.name}`}
        >
          <span className="syntax-function">learnMore</span>()
        </button>
      </div>
    </div>
  );
};