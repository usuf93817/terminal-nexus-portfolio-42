
import React, { useState, useEffect } from 'react';
import About from '../components/About';
import ScrollReveal from '../components/ScrollReveal';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up">
        <About />
      </ScrollReveal>
    </div>
  );
};

export default AboutPage;
