import React from 'react';
import { Link } from 'react-router-dom';

const WhySmartShea = () => {
  return (
    <div className="why-smartshea-container">
      <div className="header">
        <h1>Why Choose SmartShea?</h1>
        <p>Discover what makes our products unique and effective</p>
      </div>
      
      <div className="motto-section">
        <h2>Our Motto</h2>
        <p><strong><em>Look good, feel good</em></strong></p>
      </div>
      
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At SmartShea, we believe that effective skincare should be accessible, natural, and personalized. 
          Our mission is to harness the power of natural shea butter and combine it with cutting-edge AI technology 
          to provide you with skincare solutions that are perfectly matched to your unique skin needs.
        </p>
      </div>
      
      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>We source the highest quality shea butter directly from West Africa, ensuring that our products deliver maximum benefits to your skin.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>By combining traditional ingredients with modern technology, we create innovative solutions that address real skincare needs.</p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We are committed to ethical sourcing, eco-friendly packaging, and supporting the communities that produce our shea butter.</p>
          </div>
          <div className="value-card">
            <h3>Transparency</h3>
            <p>We believe in being honest about what goes into our products and how they work, so you can make informed decisions about your skincare.</p>
          </div>
        </div>
      </div>
      
      <div className="difference-section">
        <h2>The SmartShea Difference</h2>
        <div className="difference-grid">
          <div className="difference-card">
            <h3>AI-Powered Skin Analysis</h3>
            <p>Our proprietary algorithm analyzes your skin characteristics to recommend the perfect shea butter products for your specific needs.</p>
          </div>
          <div className="difference-card">
            <h3>Customized Solutions</h3>
            <p>No more one-size-fits-all skincare. Our recommendations are tailored to your unique skin type and concerns.</p>
          </div>
          <div className="difference-card">
            <h3>Pure, Unrefined Ingredients</h3>
            <p>We use only 100% natural, unrefined shea butter to ensure all beneficial properties remain intact.</p>
          </div>
          <div className="difference-card">
            <h3>Fair Trade Practices</h3>
            <p>We work directly with women's cooperatives in West Africa, ensuring fair compensation and supporting local communities.</p>
          </div>
        </div>
      </div>
      
      <div className="community-section">
        <h2>Supporting Communities</h2>
        <p>
          When you choose SmartShea, you're not just investing in your skin's health but also supporting sustainable 
          farming communities in Africa. Our direct trade relationships help provide stable income for women-led 
          cooperatives and contribute to local economic development.
        </p>
      </div>
      
      <div className="learn-more-section">
        <h2>Learn More About Our Ingredients</h2>
        <p>
          Discover the incredible benefits of our star ingredient and how it can transform your skincare routine.
        </p>
        <Link to="/natural-shea-butter" className="primary-button">
          Explore the Power of Natural Shea Butter
        </Link>
      </div>
    </div>
  );
};

export default WhySmartShea;