import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleCopyToClipboard = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopySuccess(true);
        // Reset the success message after 3 seconds
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
        alert('Failed to copy URL to clipboard');
      });
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Join our circle</h3>
          <p>Hey there! Take 20% off your first order of $35+ when you join!</p>
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
            <button
              onClick={handleCopyToClipboard}
              className="footer-link copy-link"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                paddingLeft: '15px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '1rem',
                fontFamily: 'inherit',
                textTransform: 'lowercase',
                fontWeight: 'normal',
                display: 'block',
                position: 'relative'
              }}
            >
              refer a friend {copySuccess && <span className="copy-tooltip">URL copied!</span>}
            </button>
            <Link to="/why-smartshea" className="footer-link">brand mission</Link>
            <Link to="/why-smartshea" className="footer-link">sustainability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;