import React from 'react';
import { TooltipContent } from '@/components/ui/tooltip';
import { ServiceTooltipProps } from '@/types/services';

/**
 * Tooltip component displaying detailed service information
 * on hover with structured layout
 */
export const ServiceTooltip: React.FC<ServiceTooltipProps> = ({ service }) => {
  return (
    <TooltipContent 
      side="right" 
      className="max-w-sm p-4 bg-terminal-bg border-terminal-green/30"
      role="tooltip"
      aria-label={`${service.name} details`}
    >
      <div className="space-y-3">
        <h4 className="font-semibold text-terminal-green">{service.name}</h4>
        
        <div>
          <p className="text-xs font-medium text-terminal-blue mb-1">Overview:</p>
          <p className="text-xs text-terminal-text/90 leading-relaxed">
            {service.details.overview}
          </p>
        </div>
        
        <div>
          <p className="text-xs font-medium text-terminal-yellow mb-1">Key Features:</p>
          <div className="grid grid-cols-1 gap-1">
            {service.details.features.slice(0, 3).map((feature, index) => (
              <p key={index} className="text-xs text-terminal-text/80">• {feature}</p>
            ))}
            {service.details.features.length > 3 && (
              <p className="text-xs text-terminal-text/60">
                + {service.details.features.length - 3} more features
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-terminal-border/30">
          <div>
            <p className="text-xs font-medium text-terminal-purple">
              Timeline: <span className="font-normal text-terminal-text/90">{service.details.timeline}</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-terminal-orange">
              Pricing: <span className="font-normal text-terminal-text/90">{service.details.pricing}</span>
            </p>
          </div>
        </div>
        
        <p className="text-xs text-terminal-green/70 italic mt-2">
          Click for detailed information
        </p>
      </div>
    </TooltipContent>
  );
};