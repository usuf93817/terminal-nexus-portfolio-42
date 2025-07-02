/**
 * Service-related type definitions for the NodeXstation portfolio
 */

export interface ServiceDetails {
  overview: string;
  features: string[];
  timeline: string;
  pricing: string;
}

export interface Service {
  name: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
  details: ServiceDetails;
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  onLearnMore: (service: Service) => void;
}

export interface ServiceTooltipProps {
  service: Service;
}