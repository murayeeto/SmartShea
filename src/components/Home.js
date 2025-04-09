import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      
      {/* Hero Section - Full Height */}
      <div className="hero-section full-height">
        <div className="hero-content">
          <div className="hero-image-container">
            <img src="https://murayeeto.github.io/SmartShea/images/SmartShea.png" alt="SmartShea Product" className="hero-image" />
          </div>
          <div className="hero-text-container">
            <h1 className="hero-title">Natural Skincare Solutions</h1>
            <p className="hero-subtitle">Discover the perfect shea butter products for your unique skin needs</p>
            <div className="hero-buttons">
              <Link to="/skin-tester" className="primary-button">
                Try Skin Analysis
              </Link>
              <Link to="/products" className="secondary-button">
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h3>Take a Photo</h3>
            <p>Upload or capture a photo of your skin in natural lighting</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>AI Analysis</h3>
            <p>Our advanced algorithm analyzes your skin characteristics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Get Results</h3>
            <p>Receive your skin type assessment and detailed analysis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛍️</div>
            <h3>Shea Butter Recommendations</h3>
            <p>Discover the perfect shea butter products for your skin</p>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>The SmartShea Difference</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Natural Ingredients</h3>
            <p>Our products are made with 100% natural shea butter and other plant-based ingredients</p>
          </div>
          <div className="benefit-card">
            <h3>Personalized Care</h3>
            <p>AI-powered recommendations tailored to your unique skin needs</p>
          </div>
          <div className="benefit-card">
            <h3>Sustainable Sourcing</h3>
            <p>Ethically sourced ingredients that support local communities</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to find your perfect shea butter match?</h2>
        <Link to="/skin-tester" className="primary-button">
          Start SmartShea Analysis
        </Link>
      </div>
    </>
  );
};

export default Home;