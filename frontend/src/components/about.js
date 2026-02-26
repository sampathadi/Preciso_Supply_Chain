import React from 'react';
import '../styles/Pages.css';

function About() {
  const values = [
    {
      icon: '🎯',
      title: 'Mission',
      description: 'To revolutionize supply chain management through innovative technology and real-time visibility.'
    },
    {
      icon: '🌟',
      title: 'Vision',
      description: 'Creating a seamlessly connected global supply chain that optimizes efficiency and reduces costs.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Continuously developing cutting-edge solutions for modern supply chain challenges.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'Building strong relationships with clients and partners to achieve mutual success.'
    }
  ];

  const team = [
    { name: 'John Smith', role: 'CEO & Founder', emoji: '👨‍💼' },
    { name: 'Sarah Johnson', role: 'CTO', emoji: '👩‍💻' },
    { name: 'Michael Chen', role: 'VP Operations', emoji: '👨‍💼' },
    { name: 'Emily Davis', role: 'Head of Sales', emoji: '👩‍💼' },
  ];

  return (
    <div className="container">
      <div className="card about-page">
      <div className="page-header">
        <h1>About Preciseo supply-chain</h1>
        <p>Your trusted partner in supply chain excellence</p>
      </div>

      {/* Company Overview */}
      <div className="about-overview">
        <h2>Who We Are</h2>
        <p>
          Supply Chain Management System is a leading provider of comprehensive logistics and asset management solutions.
          Founded in 2020, we have been helping businesses optimize their supply chains through intelligent automation,
          real-time tracking, and data-driven insights.
        </p>
        <p>
          Our platform serves over 5,000+ companies globally, managing millions of assets and ensuring smooth operations
          across complex supply chains. We are committed to delivering excellence and innovation in every aspect of our service.
        </p>
      </div>

      {/* Core Values */}
      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="team-section">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.emoji}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-highlight">
        <div className="stat-highlight-item">
          <h3>5000+</h3>
          <p>Active Clients</p>
        </div>
        <div className="stat-highlight-item">
          <h3>50M+</h3>
          <p>Assets Tracked</p>
        </div>
        <div className="stat-highlight-item">
          <h3>150+</h3>
          <p>Countries Served</p>
        </div>
        <div className="stat-highlight-item">
          <h3>99.99%</h3>
          <p>Uptime</p>
        </div>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <p>📧 Email: info@preciseo.com</p>
          <p>📞 Phone: +1 (800) 123-4567</p>
          <p>📍 Address: 123 Tech Street, San Francisco, CA 94105</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default About;
