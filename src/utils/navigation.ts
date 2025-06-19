
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

  // Fallback: try to find section by content or index
  if (!targetElement) {
    const sections = document.querySelectorAll('section');
    switch (sectionId) {
      case 'portfolio':
        targetElement = Array.from(sections).find(section => 
          section.textContent?.toLowerCase().includes('portfolio') ||
          section.textContent?.toLowerCase().includes('projects')
        ) || sections[4]; // Fallback to index
        break;
      case 'contact':
        targetElement = Array.from(sections).find(section => 
          section.textContent?.toLowerCase().includes('contact')
        ) || sections[sections.length - 1]; // Last section
        break;
      case 'services':
        targetElement = Array.from(sections).find(section => 
          section.textContent?.toLowerCase().includes('services')
        ) || sections[2]; // Fallback to index
        break;
      case 'about':
        targetElement = Array.from(sections).find(section => 
          section.textContent?.toLowerCase().includes('about')
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
    toast({
      title: `${sectionName} Section`,
      description: `The ${sectionName.toLowerCase()} section is part of our comprehensive portfolio. Contact us to learn more!`,
      duration: 4000,
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
