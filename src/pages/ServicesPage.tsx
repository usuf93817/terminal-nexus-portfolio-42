
import React, { useState, useEffect } from 'react';
import Services from '../components/Services';
import ScrollReveal from '../components/ScrollReveal';

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up">
        <Services />
      </ScrollReveal>
    </div>
  );
};

export default ServicesPage;
