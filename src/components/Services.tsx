import React from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { navigateToSection } from '@/utils/navigation';
import { useEmailActions } from '@/hooks/useEmailActions';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceTooltip } from '@/components/services/ServiceTooltip';
import { servicesData } from '@/data/servicesData';
import { Service } from '@/types/services';

/**
 * Services section component displaying all available services
 * with interactive cards and detailed tooltips
 */
const Services: React.FC = () => {
  const { handleGetQuote } = useEmailActions();

  /**
   * Handles navigation to contact section when learning more about a service
   */
  const handleLearnMore = (service: Service) => {
    navigateToSection('contact', 'Contact');
  };

  /**
   * Handles navigation to portfolio section
   */
  const handleViewPortfolio = () => {
    navigateToSection('portfolio', 'Portfolio');
  };

  return (
    <TooltipProvider>
      <section 
        className="min-h-screen py-20 px-6" 
        data-section="services"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <header className="mb-16">
            <h2 
              id="services-heading"
              className="text-4xl font-bold text-terminal-green mb-6"
            >
              <span className="syntax-keyword">export</span> <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">services</span> = [
            </h2>
            <p className="text-terminal-text/80 text-lg max-w-3xl pl-6">
              <span className="syntax-comment">/*</span><br />
              <span className="syntax-comment"> * Comprehensive technology solutions tailored to your needs.</span><br />
              <span className="syntax-comment"> * From concept to deployment, we deliver excellence.</span><br />
              <span className="syntax-comment"> */</span>
            </p>
          </header>

          {/* Services Grid */}
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-6"
            role="grid"
            aria-label="Available services"
          >
            {servicesData.map((service, index) => (
              <Tooltip key={service.name}>
                <TooltipTrigger asChild>
                  <div role="gridcell">
                    <ServiceCard
                      service={service}
                      index={index}
                      onLearnMore={handleLearnMore}
                    />
                  </div>
                </TooltipTrigger>
                <ServiceTooltip service={service} />
              </Tooltip>
            ))}
          </div>

          <p className="text-terminal-green text-4xl font-bold mt-8" aria-hidden="true">];</p>

          {/* Call to Action */}
          <section 
            className="mt-16 bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center"
            aria-labelledby="cta-heading"
          >
            <h3 
              id="cta-heading"
              className="text-2xl font-semibold text-terminal-green mb-4"
            >
              <span className="syntax-keyword">ready</span> <span className="syntax-keyword">to</span>{' '}
              <span className="syntax-function">startProject</span>()?
            </h3>
            <p className="text-terminal-text/80 mb-6 max-w-2xl mx-auto">
              <span className="syntax-comment">
                // Let's discuss your project requirements and create something amazing together
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetQuote}
                className="bg-terminal-green text-terminal-bg px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/30 focus:outline-none focus:ring-2 focus:ring-terminal-green/30"
                aria-label="Get a project quote"
              >
                <span className="syntax-function">getQuote</span>()
              </button>
              <button 
                onClick={handleViewPortfolio}
                className="border border-terminal-green text-terminal-green px-8 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terminal-green/30"
                aria-label="View our portfolio"
              >
                <span className="syntax-function">viewPortfolio</span>()
              </button>
            </div>
          </section>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Services;