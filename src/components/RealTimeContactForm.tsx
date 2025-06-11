
import React, { useState, useEffect } from 'react';
import { Send, Check, X, Mail, User, MessageSquare, Phone } from 'lucide-react';

const RealTimeContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [validation, setValidation] = useState({
    name: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    phone: { isValid: false, message: '' },
    message: { isValid: false, message: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.length >= 2 
          ? { isValid: true, message: 'Valid name' }
          : { isValid: false, message: 'Name must be at least 2 characters' };
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
          ? { isValid: true, message: 'Valid email' }
          : { isValid: false, message: 'Please enter a valid email' };
      case 'phone':
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(value)
          ? { isValid: true, message: 'Valid phone number' }
          : { isValid: false, message: 'Please enter a valid phone number' };
      case 'message':
        return value.length >= 10
          ? { isValid: true, message: 'Valid message' }
          : { isValid: false, message: 'Message must be at least 10 characters' };
      default:
        return { isValid: false, message: '' };
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidation(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const isFormValid = Object.values(validation).every(field => field.isValid);

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">RealTimeContact</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Get in touch with live validation feedback
          </p>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <Mail className="w-4 h-4 text-terminal-text ml-4" />
              <span className="text-terminal-text text-sm">contact-form.jsx</span>
            </div>
            
            <div className="text-terminal-green text-xs">
              {submitStatus === 'success' ? 'Message Sent!' : 
               isSubmitting ? 'Sending...' : 
               isFormValid ? 'Ready to Send' : 'Fill Required Fields'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-terminal-text font-mono text-sm flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-[#2d2d2d] text-terminal-text border border-terminal-border rounded-lg focus:border-terminal-green transition-colors font-mono"
                    placeholder="Enter your name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {formData.name && (
                      validation.name.isValid ? 
                        <Check className="w-5 h-5 text-terminal-green" /> : 
                        <X className="w-5 h-5 text-terminal-red" />
                    )}
                  </div>
                </div>
                {formData.name && (
                  <p className={`text-xs font-mono ${validation.name.isValid ? 'text-terminal-green' : 'text-terminal-red'}`}>
                    {validation.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-terminal-text font-mono text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-[#2d2d2d] text-terminal-text border border-terminal-border rounded-lg focus:border-terminal-green transition-colors font-mono"
                    placeholder="your@email.com"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {formData.email && (
                      validation.email.isValid ? 
                        <Check className="w-5 h-5 text-terminal-green" /> : 
                        <X className="w-5 h-5 text-terminal-red" />
                    )}
                  </div>
                </div>
                {formData.email && (
                  <p className={`text-xs font-mono ${validation.email.isValid ? 'text-terminal-green' : 'text-terminal-red'}`}>
                    {validation.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-terminal-text font-mono text-sm flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-[#2d2d2d] text-terminal-text border border-terminal-border rounded-lg focus:border-terminal-green transition-colors font-mono"
                  placeholder="+1 (555) 123-4567"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {formData.phone && (
                    validation.phone.isValid ? 
                      <Check className="w-5 h-5 text-terminal-green" /> : 
                      <X className="w-5 h-5 text-terminal-red" />
                  )}
                </div>
              </div>
              {formData.phone && (
                <p className={`text-xs font-mono ${validation.phone.isValid ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {validation.phone.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-terminal-text font-mono text-sm flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message *
              </label>
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#2d2d2d] text-terminal-text border border-terminal-border rounded-lg focus:border-terminal-green transition-colors font-mono resize-none"
                  placeholder="Tell us about your project..."
                />
                <div className="absolute right-3 top-3">
                  {formData.message && (
                    validation.message.isValid ? 
                      <Check className="w-5 h-5 text-terminal-green" /> : 
                      <X className="w-5 h-5 text-terminal-red" />
                  )}
                </div>
              </div>
              {formData.message && (
                <p className={`text-xs font-mono ${validation.message.isValid ? 'text-terminal-green' : 'text-terminal-red'}`}>
                  {validation.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-terminal-green text-terminal-bg rounded-lg font-mono font-semibold hover:bg-terminal-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="animate-spin w-5 h-5 border-2 border-terminal-bg border-t-transparent rounded-full"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>
                {submitStatus === 'success' ? 'Message Sent!' : 
                 isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default RealTimeContactForm;
