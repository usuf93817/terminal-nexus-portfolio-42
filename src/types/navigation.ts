/**
 * Navigation-related type definitions
 */

export interface NavigationSection {
  id: string;
  label: string;
  path?: string;
}

export interface HeroService {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  color: string;
}