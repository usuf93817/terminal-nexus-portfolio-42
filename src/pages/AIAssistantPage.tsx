
import React, { useState, useEffect } from 'react';
import AIAssistant from '../components/AIAssistant';
import ScrollReveal from '../components/ScrollReveal';

const AIAssistantPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up">
        <AIAssistant />
      </ScrollReveal>
    </div>
  );
};

export default AIAssistantPage;
