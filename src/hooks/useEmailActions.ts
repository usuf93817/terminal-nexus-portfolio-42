import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook for handling email-related actions
 * Provides reusable email functionality with toast notifications
 */
export const useEmailActions = () => {
  const { toast } = useToast();

  /**
   * Opens default email client with pre-filled quote request
   */
  const handleGetQuote = () => {
    const subject = encodeURIComponent('Project Quote Request');
    const body = encodeURIComponent(`Hello NodeX Station,

I'm interested in getting a quote for my project. Here are the details:

Service Required: [Please specify]
Project Description: [Please describe your project]
Timeline: [When do you need this completed?]
Budget Range: [Your budget range]

Please get back to me with a detailed quote.

Best regards,
[Your Name]`);
    
    window.location.href = `mailto:nodexstation@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening email client...",
      description: "We're opening your default email client with a pre-filled quote request.",
      duration: 3000,
    });
  };

  return { handleGetQuote };
};