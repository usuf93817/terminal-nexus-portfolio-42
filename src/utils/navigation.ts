
import { toast } from '@/hooks/use-toast';

export const navigateToSection = (sectionId: string, sectionName: string) => {
  // Try multiple selectors to find the section
  const selectors = [
    `[data-section="${sectionId}"]`,
    `#${sectionId}`,
    `[id="${sectionId}"]`,
    `.${sectionId}`,
  ];

  let targetElement: Element | null = null;
  
  for (const selector of selectors) {
    targetElement = document.querySelector(selector);
    if (targetElement) break;
  }

  // Enhanced fallback: try to find section by content or specific components
  if (!targetElement) {
    const sections = document.querySelectorAll('section');
    const allElements = document.querySelectorAll('*');
    
    switch (sectionId) {
      case 'portfolio':
        // Look for portfolio-related elements
        targetElement = Array.from(allElements).find(el => 
          el.textContent?.toLowerCase().includes('portfolio') ||
          el.textContent?.toLowerCase().includes('projects') ||
          el.className?.includes('portfolio') ||
          el.className?.includes('project')
        ) || sections[4]; // Fallback to index
        break;
      case 'contact':
        // Look for contact-related elements
        targetElement = Array.from(allElements).find(el => 
          el.textContent?.toLowerCase().includes('contact') ||
          el.textContent?.toLowerCase().includes('email') ||
          el.className?.includes('contact')
        ) || sections[sections.length - 1]; // Last section
        break;
      case 'services':
        // Look for services-related elements
        targetElement = Array.from(allElements).find(el => 
          el.textContent?.toLowerCase().includes('services') ||
          el.textContent?.toLowerCase().includes('mern stack') ||
          el.className?.includes('service')
        ) || sections[2]; // Fallback to index
        break;
      case 'about':
        // Look for about-related elements
        targetElement = Array.from(allElements).find(el => 
          el.textContent?.toLowerCase().includes('about') ||
          el.className?.includes('about')
        ) || sections[1]; // Fallback to index
        break;
    }
  }

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast({
      title: `Navigating to ${sectionName}`,
      description: `Scrolling to the ${sectionName.toLowerCase()} section...`,
    });
    return true;
  } else {
    // If still not found, try to trigger section change via setActiveSection
    const event = new CustomEvent('navigate-to-section', { 
      detail: { sectionId, sectionName } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: `Switching to ${sectionName}`,
      description: `Loading the ${sectionName.toLowerCase()} section...`,
      duration: 3000,
    });
    return false;
  }
};

export const openExternalLink = (url: string, description: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
  toast({
    title: "Opening External Link",
    description: description,
  });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
