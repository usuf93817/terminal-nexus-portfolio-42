
import React, { useState, useEffect } from 'react';
import Portfolio from '../components/Portfolio';
import ScrollReveal from '../components/ScrollReveal';

const PortfolioPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up">
        <Portfolio />
      </ScrollReveal>
    </div>
  );
};

export default PortfolioPage;
