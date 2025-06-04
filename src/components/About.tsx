
import React from 'react';
import { Github, Facebook, Instagram, Linkedin } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Fahim Ahmed Asif',
      role: 'Founder',
      email: 'ahmedasif0007@gmail.com',
      social: {
        facebook: 'https://www.facebook.com/fahimahmed.asif.14/',
        instagram: 'https://www.instagram.com/faabs__photobin/',
        linkedin: 'https://www.linkedin.com/in/fahim-ahmed-asif-502897277/'
      },
      description: 'Visionary leader driving innovation in software development',
      skills: ['Full-Stack Development', 'AI Integration', 'Project Management']
    },
    {
      name: 'Nahian Ninad',
      role: 'Managing Director',
      social: {
        facebook: 'https://www.facebook.com/Neucleah',
        instagram: 'https://www.instagram.com/subconscious._.being/'
      },
      description: 'Strategic operations manager with expertise in business development',
      skills: ['Business Strategy', 'Operations Management', 'Client Relations']
    },
    {
      name: 'Achyuta Arnab Dey',
      role: 'Co-Founder',
      email: 'arnabdey15091@gmail.com',
      social: {
        facebook: 'https://www.facebook.com/avirs.arnab',
        instagram: 'https://www.instagram.com/rz_arnab_/',
        github: 'https://github.com/ArnabSaga',
        linkedin: 'https://www.linkedin.com/in/achyuta1/'
      },
      description: 'Technical architect specializing in modern web technologies',
      skills: ['MERN Stack', 'Three.js', 'System Architecture']
    }
  ];

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="syntax-comment">// About NodeXstation</span>
            </div>
            <pre className="text-terminal-text">
              <span className="syntax-keyword">interface</span> <span className="syntax-variable">Company</span> {"{"}
              {"\n"}  <span className="syntax-variable">name</span>: <span className="syntax-string">"NodeXstation"</span>;
              {"\n"}  <span className="syntax-variable">mission</span>: <span className="syntax-string">"Transforming ideas into digital reality"</span>;
              {"\n"}  <span className="syntax-variable">founded</span>: <span className="syntax-string">"2024"</span>;
              {"\n"}  <span className="syntax-variable">speciality</span>: <span className="syntax-string">"AI-powered solutions"</span>;
              {"\n"}{"}"}
            </pre>
          </div>

          <h2 className="text-4xl font-bold text-terminal-green mb-6">
            <span className="syntax-keyword">about</span> <span className="syntax-function">team</span>()
          </h2>
          <p className="text-terminal-text/80 text-lg max-w-3xl">
            <span className="syntax-comment">/*</span><br />
            <span className="syntax-comment"> * Meet the innovative minds behind NodeXstation.</span><br />
            <span className="syntax-comment"> * We're passionate developers, strategists, and problem-solvers</span><br />
            <span className="syntax-comment"> * committed to delivering exceptional digital experiences.</span><br />
            <span className="syntax-comment"> */</span>
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group bg-terminal-bg/50 rounded-lg border border-terminal-border p-6 hover:border-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Member Header */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-terminal-green to-terminal-blue rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-terminal-bg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-terminal-text mb-1">
                  <span className="syntax-variable">{member.name}</span>
                </h3>
                <p className="text-terminal-green font-mono text-sm">
                  <span className="syntax-keyword">role:</span> <span className="syntax-string">"{member.role}"</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-terminal-text/80 mb-4 text-sm">
                <span className="syntax-comment">// {member.description}</span>
              </p>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-terminal-yellow text-sm mb-2">
                  <span className="syntax-keyword">skills</span>: [
                </p>
                <div className="pl-4 space-y-1">
                  {member.skills.map((skill) => (
                    <p key={skill} className="text-terminal-text text-sm">
                      <span className="syntax-string">"{skill}"</span>,
                    </p>
                  ))}
                </div>
                <p className="text-terminal-yellow text-sm">]</p>
              </div>

              {/* Contact Info */}
              {member.email && (
                <div className="mb-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-terminal-blue hover:text-terminal-green transition-colors text-sm font-mono"
                  >
                    <span className="syntax-variable">email</span>: <span className="syntax-string">"{member.email}"</span>
                  </a>
                </div>
              )}

              {/* Social Links */}
              <div className="flex space-x-3">
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text hover:text-terminal-green transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text hover:text-terminal-blue transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.social.facebook && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text hover:text-terminal-blue transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-text hover:text-terminal-purple transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Company Values */}
        <div className="mt-16 bg-[#1e1e1e] rounded-lg border border-terminal-border p-8">
          <h3 className="text-2xl font-semibold text-terminal-green mb-6">
            <span className="syntax-keyword">const</span> <span className="syntax-variable">values</span> = {"{"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 pl-6">
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-variable">innovation</span>:
              </h4>
              <p className="text-terminal-text/80 text-sm">
                <span className="syntax-string">"Embracing cutting-edge technologies to solve complex problems"</span>
              </p>
            </div>
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-variable">quality</span>:
              </h4>
              <p className="text-terminal-text/80 text-sm">
                <span className="syntax-string">"Delivering exceptional solutions with attention to detail"</span>
              </p>
            </div>
            <div>
              <h4 className="text-terminal-yellow mb-2">
                <span className="syntax-variable">collaboration</span>:
              </h4>
              <p className="text-terminal-text/80 text-sm">
                <span className="syntax-string">"Working closely with clients to exceed expectations"</span>
              </p>
            </div>
          </div>
          <p className="text-terminal-green mt-6">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
