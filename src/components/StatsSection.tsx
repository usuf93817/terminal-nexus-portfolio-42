
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

const StatsSection = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    success: 0
  });

  const finalStats = {
    projects: 150,
    clients: 80,
    experience: 5,
    success: 98
  };

  useEffect(() => {
    const animateCounter = (key: keyof typeof stats, target: number) => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, duration / steps);
    };

    // Start animations with delays
    setTimeout(() => animateCounter('projects', finalStats.projects), 200);
    setTimeout(() => animateCounter('clients', finalStats.clients), 400);
    setTimeout(() => animateCounter('experience', finalStats.experience), 600);
    setTimeout(() => animateCounter('success', finalStats.success), 800);
  }, []);

  const statsData = [
    {
      icon: TrendingUp,
      label: 'Projects Completed',
      value: stats.projects,
      suffix: '+',
      color: 'text-terminal-green'
    },
    {
      icon: Users,
      label: 'Happy Clients',
      value: stats.clients,
      suffix: '+',
      color: 'text-terminal-blue'
    },
    {
      icon: Clock,
      label: 'Years Experience',
      value: stats.experience,
      suffix: '+',
      color: 'text-terminal-yellow'
    },
    {
      icon: Award,
      label: 'Success Rate',
      value: stats.success,
      suffix: '%',
      color: 'text-terminal-purple'
    }
  ];

  return (
    <section className="py-16 px-6 bg-terminal-bg/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-comment">// Our Achievements</span>
          </h2>
          <p className="text-terminal-text/80">
            Delivering excellence through innovation and dedication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-terminal-bg/50 border border-terminal-border rounded-lg p-6 text-center hover:border-terminal-green transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-terminal-text mb-2">
                {stat.value}<span className={stat.color}>{stat.suffix}</span>
              </div>
              <p className="text-terminal-text/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
