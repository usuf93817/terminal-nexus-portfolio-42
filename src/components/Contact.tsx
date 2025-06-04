
import React, { useState } from 'react';
import { Github, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      console.log('Form submitted:', formData);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
          budget: ''
        });
        setFormStatus('idle');
      }, 3000);
    }, 2000);
  };

  const services = [
    'MERN Stack Development',
    'Three.js Visualization',
    'Python Development',
    'PHP & WordPress',
    'AI Agent Development',
    'Data Scraping',
    'Lead Generation',
    'Custom Solutions'
  ];

  const budgetRanges = [
    '$1K - $5K',
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K+'
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-terminal-green mb-6">
            <span className="syntax-keyword">function</span> <span className="syntax-function">contactUs</span>() {"{"}
          </h2>
          <p className="text-terminal-text/80 text-lg max-w-3xl pl-6">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Ready to transform your ideas into reality?</span><br />
            <span className="syntax-comment"> * Let's discuss your project and create something amazing together.</span><br />
            <span className="syntax-comment"> */</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-terminal-text text-sm">contact-form.tsx</span>
              </div>

              <form className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                      <span className="syntax-variable">name</span>: <span className="syntax-keyword">string</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text placeholder-terminal-text/50 focus:border-terminal-green focus:outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                      <span className="syntax-variable">email</span>: <span className="syntax-keyword">string</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text placeholder-terminal-text/50 focus:border-terminal-green focus:outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Company and Service */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                      <span className="syntax-variable">company</span>: <span className="syntax-keyword">string</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text placeholder-terminal-text/50 focus:border-terminal-green focus:outline-none transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                      <span className="syntax-variable">service</span>: <span className="syntax-keyword">ServiceType</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text focus:border-terminal-green focus:outline-none transition-colors font-mono"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                    <span className="syntax-variable">budget</span>: <span className="syntax-keyword">BudgetRange</span>
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text focus:border-terminal-green focus:outline-none transition-colors font-mono"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-terminal-yellow text-sm mb-2 font-mono">
                    <span className="syntax-variable">message</span>: <span className="syntax-keyword">string</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-text placeholder-terminal-text/50 focus:border-terminal-green focus:outline-none transition-colors font-mono resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={formStatus === 'sending'}
                  className={`w-full py-3 px-6 rounded-lg font-semibold font-mono transition-all duration-300 ${
                    formStatus === 'sending'
                      ? 'bg-terminal-border text-terminal-text cursor-not-allowed'
                      : formStatus === 'success'
                      ? 'bg-terminal-green text-terminal-bg'
                      : 'bg-terminal-green text-terminal-bg hover:bg-terminal-green/90 hover:shadow-lg hover:shadow-terminal-green/30'
                  }`}
                >
                  {formStatus === 'sending' && (
                    <span>
                      <span className="syntax-function">sending</span>()...
                    </span>
                  )}
                  {formStatus === 'success' && (
                    <span>
                      <span className="syntax-function">messageSent</span>() ✓
                    </span>
                  )}
                  {formStatus === 'idle' && (
                    <span>
                      <span className="syntax-function">sendMessage</span>()
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-terminal-bg/50 rounded-lg border border-terminal-border p-8">
              <h3 className="text-xl font-semibold text-terminal-green mb-6">
                <span className="syntax-keyword">const</span> <span className="syntax-variable">contactInfo</span> = {"{"}
              </h3>
              
              <div className="space-y-4 pl-6">
                <div>
                  <p className="text-terminal-yellow text-sm">
                    <span className="syntax-variable">email</span>:
                  </p>
                  <a
                    href="mailto:nodexstation@gmail.com"
                    className="text-terminal-blue hover:text-terminal-green transition-colors text-lg font-mono"
                  >
                    <span className="syntax-string">"nodexstation@gmail.com"</span>
                  </a>
                </div>
                
                <div>
                  <p className="text-terminal-yellow text-sm">
                    <span className="syntax-variable">response_time</span>:
                  </p>
                  <p className="text-terminal-text">
                    <span className="syntax-string">"Within 24 hours"</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-terminal-yellow text-sm">
                    <span className="syntax-variable">availability</span>:
                  </p>
                  <p className="text-terminal-text">
                    <span className="syntax-string">"24/7 for urgent projects"</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-terminal-yellow text-sm">
                    <span className="syntax-variable">timezone</span>:
                  </p>
                  <p className="text-terminal-text">
                    <span className="syntax-string">"UTC+6 (Bangladesh)"</span>
                  </p>
                </div>
              </div>
              
              <p className="text-terminal-green mt-6">{"}"}</p>
            </div>

            {/* Social Links */}
            <div className="bg-terminal-bg/50 rounded-lg border border-terminal-border p-8">
              <h3 className="text-xl font-semibold text-terminal-green mb-6">
                <span className="syntax-keyword">const</span> <span className="syntax-variable">socialLinks</span> = [
              </h3>
              
              <div className="space-y-4 pl-6">
                <a
                  href="https://github.com/nodexStation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-terminal-text hover:text-terminal-green transition-colors group"
                >
                  <Github size={20} />
                  <span>
                    <span className="syntax-string">"github.com/nodexStation"</span>
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                
                <a
                  href="https://www.facebook.com/profile.php?id=61576048524952"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-terminal-text hover:text-terminal-blue transition-colors group"
                >
                  <Facebook size={20} />
                  <span>
                    <span className="syntax-string">"facebook.com/nodexstation"</span>
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                
                <a
                  href="https://www.instagram.com/nodex_station/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-terminal-text hover:text-terminal-purple transition-colors group"
                >
                  <Instagram size={20} />
                  <span>
                    <span className="syntax-string">"instagram.com/nodex_station"</span>
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </div>
              
              <p className="text-terminal-green mt-6">]</p>
            </div>

            {/* Call to Action */}
            <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
              <h3 className="text-lg font-semibold text-terminal-green mb-4">
                <span className="syntax-comment">// Ready to start your project?</span>
              </h3>
              <p className="text-terminal-text/80 mb-6 text-sm">
                We're excited to hear about your ideas and help bring them to life.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:nodexstation@gmail.com"
                  className="block bg-terminal-green text-terminal-bg px-6 py-3 rounded-lg font-semibold hover:bg-terminal-green/90 transition-all duration-300"
                >
                  <span className="syntax-function">sendEmail</span>()
                </a>
                <a
                  href="tel:+8801234567890"
                  className="block border border-terminal-green text-terminal-green px-6 py-3 rounded-lg font-semibold hover:bg-terminal-green/10 transition-all duration-300"
                >
                  <span className="syntax-function">callNow</span>()
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-terminal-green text-4xl font-bold mt-12">{"}"}</p>
      </div>
    </section>
  );
};

export default Contact;
