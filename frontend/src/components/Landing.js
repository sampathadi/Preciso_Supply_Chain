import React from 'react';
import '../styles/Landing.css';

function Landing({ onLoginClick }) {
  const features = [
    { icon: '📍', title: 'Real-time Tracking', description: 'Track your assets in real-time with GPS precision and live updates' },
    { icon: '🔐', title: 'Secure & Reliable', description: 'Enterprise-grade security with 99.99% uptime guarantee' },
    { icon: '📊', title: 'Advanced Analytics', description: 'Comprehensive dashboards and reports for data-driven decisions' },
    { icon: '🌍', title: 'Global Network', description: 'Connect with suppliers and partners across the globe' },
    { icon: '⚡', title: 'Fast Integration', description: 'Easy integration with existing systems and APIs' },
    { icon: '💬', title: '24/7 Support', description: 'Round-the-clock customer support and assistance' }
  ];

  const testimonials = [
    { 
      name: 'James Wilson', 
      company: 'Global Logistics Inc.',
      text: 'The supply chain system has reduced our operational costs by 35% while improving efficiency.',
      emoji: '👨‍💼'
    },
    { 
      name: 'Maria Garcia', 
      company: 'Distribution Plus',
      text: 'Real-time tracking has completely transformed how we manage our inventory.',
      emoji: '👩‍💼'
    },
    { 
      name: 'David Chen', 
      company: 'Tech Freight Solutions',
      text: 'The analytics dashboard provides insights we never had before. Highly recommended!',
      emoji: '👨‍💼'
    }
  ];

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Revolutionize Your Supply Chain</h1>
          <p className="hero-subtitle">
            Optimize logistics, increase efficiency, and reduce costs with our intelligent supply chain management platform
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => {
                const token = localStorage.getItem('authToken');
                if (token) return window.location.href = '/dashboard';
                return onLoginClick && onLoginClick();
              }}
            >
              Get Started →
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-emoji">🚚📦🌍</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Powerful Features for Modern Supply Chains</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>Why Choose Our Platform?</h2>
            <ul className="benefits-list">
              <li>
                <span className="benefit-check">✓</span>
                <strong>Increased Visibility:</strong> Real-time insights into every aspect of your supply chain
              </li>
              <li>
                <span className="benefit-check">✓</span>
                <strong>Cost Reduction:</strong> Optimize routes and reduce operational expenses by up to 40%
              </li>
              <li>
                <span className="benefit-check">✓</span>
                <strong>Improved Efficiency:</strong> Automate workflows and reduce manual processes
              </li>
              <li>
                <span className="benefit-check">✓</span>
                <strong>Better Decision Making:</strong> Data-driven insights for strategic planning
              </li>
              <li>
                <span className="benefit-check">✓</span>
                <strong>Scalability:</strong> Grow your operations without scaling costs
              </li>
            </ul>
          </div>
          <div className="benefits-visual">
            <div className="visual-graphic">📈</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <span className="testimonial-emoji">{testimonial.emoji}</span>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.company}</p>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>5,000+</h3>
            <p>Active Clients</p>
          </div>
          <div className="stat-item">
            <h3>50M+</h3>
            <p>Assets Tracked</p>
          </div>
          <div className="stat-item">
            <h3>150+</h3>
            <p>Countries</p>
          </div>
          <div className="stat-item">
            <h3>99.99%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Supply Chain?</h2>
        <p>Join thousands of companies already using our platform to streamline their operations</p>
        <button className="btn btn-large" onClick={onLoginClick}>
          Start Your Free Trial Today
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#status">Status</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Preciseo supply-chain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
