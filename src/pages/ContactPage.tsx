
import React, { useState, useEffect } from 'react';
import Contact from '../components/Contact';
import ScrollReveal from '../components/ScrollReveal';

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <ScrollReveal direction="up">
        <Contact />
      </ScrollReveal>
    </div>
  );
};

export default ContactPage;
