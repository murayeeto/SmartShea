import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Join our circle</h3>
          <p>Hey there! Take 15% off your first order of $45+ when you join!</p>
          <div className="subscribe-form">
            <input type="email" placeholder="email@example.com" className="email-input" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>📘</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>🐦</span>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>📌</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>📷</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>🎵</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <span>📺</span>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <Link to="/help-faq" className="footer-link">help & faq</Link>
            <Link to="/contact" className="footer-link">contact us</Link>
            <Link to="/shipping" className="footer-link">shipping & returns</Link>
            <Link to="/privacy" className="footer-link">privacy policy</Link>
            <Link to="/accessibility" className="footer-link">accessibility</Link>
            <Link to="/cookies" className="footer-link">cookie preferences</Link>
          </div>
          
          <div className="footer-column">
            <Link to="/rewards" className="footer-link">rewards program</Link>
            <Link to="/refer" className="footer-link">refer a friend</Link>
            <Link to="/mission" className="footer-link">brand mission</Link>
            <Link to="/sustainability" className="footer-link">sustainability</Link>
            <Link to="/recycle" className="footer-link">recycle with us</Link>
            <Link to="/stores" className="footer-link">where to buy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;