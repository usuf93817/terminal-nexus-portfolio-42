
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ThreeJsShowcase from '../components/ThreeJsShowcase';
import TechStack from '../components/TechStack';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up" delay={0}>
        <Hero />
      </ScrollReveal>
      <ScrollReveal direction="left" delay={200}>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={400}>
        <ThreeJsShowcase />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={600}>
        <TechStack />
      </ScrollReveal>
    </div>
  );
};

export default Home;
