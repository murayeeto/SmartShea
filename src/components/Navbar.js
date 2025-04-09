import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveSubmenu(null);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  // Toggle submenu
  const toggleSubmenu = (submenuId) => {
    setActiveSubmenu(activeSubmenu === submenuId ? null : submenuId);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="https://murayeeto.github.io/SmartShea/images/Logo.png" alt="SmartShea Logo" className="logo-image" />
          </Link>
        </div>
        
        {/* Mobile menu toggle button */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className={`nav-menu ${windowWidth <= 768 ? 'desktop-only' : ''}`}>
          <li className="nav-item dropdown">
            <Link to="/" className="nav-link">Shop</Link>
            <div className="dropdown-content">
              <Link to="/products" className="dropdown-link">Products</Link>
              <Link to="/products" className="dropdown-link">Gift Packages</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link to="/quizzes" className="nav-link">Quizzes</Link>
            <div className="dropdown-content">
              <Link to="/quizzes" className="dropdown-link">Skin Type Quiz</Link>
              <Link to="/quizzes" className="dropdown-link">Product Finder</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/skin-tester" className="nav-link">Find Your Skintype</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to="/about" className="nav-link">About</Link>
            <div className="dropdown-content">
              <Link to="/about" className="dropdown-link">About Us</Link>
              <Link to="/natural-shea-butter" className="dropdown-link">Natural Shea Butter</Link>
              <Link to="/why-smartshea" className="dropdown-link">Why SmartShea</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/skincare-tips" className="nav-link">Skincare Tips</Link>
          </li>
        </ul>

        {/* Mobile slide-in menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="mobile-menu-close" onClick={closeMobileMenu}>×</div>
          </div>
          <ul className="mobile-nav-menu">
            <li className="mobile-nav-item">
              <div className="mobile-nav-link">
                <span onClick={() => toggleSubmenu('shop')}>Shop</span>
                <span className="toggle-icon" onClick={() => toggleSubmenu('shop')}>
                  {activeSubmenu === 'shop' ? '−' : '+'}
                </span>
              </div>
              <ul className={`mobile-submenu ${activeSubmenu === 'shop' ? 'open' : ''}`}>
                <li><Link to="/products" className="mobile-submenu-link" onClick={closeMobileMenu}>Products</Link></li>
                <li><Link to="/products" className="mobile-submenu-link" onClick={closeMobileMenu}>Gift Packages</Link></li>
              </ul>
            </li>
            <li className="mobile-nav-item">
              <div className="mobile-nav-link">
                <span onClick={() => toggleSubmenu('quizzes')}>Quizzes</span>
                <span className="toggle-icon" onClick={() => toggleSubmenu('quizzes')}>
                  {activeSubmenu === 'quizzes' ? '−' : '+'}
                </span>
              </div>
              <ul className={`mobile-submenu ${activeSubmenu === 'quizzes' ? 'open' : ''}`}>
                <li><Link to="/quizzes" className="mobile-submenu-link" onClick={closeMobileMenu}>Skin Type Quiz</Link></li>
                <li><Link to="/quizzes" className="mobile-submenu-link" onClick={closeMobileMenu}>Product Finder</Link></li>
              </ul>
            </li>
            <li className="mobile-nav-item">
              <Link to="/skin-tester" className="mobile-nav-link" onClick={closeMobileMenu}>Find Your Skintype</Link>
            </li>
            <li className="mobile-nav-item">
              <div className="mobile-nav-link">
                <span onClick={() => toggleSubmenu('about')}>About</span>
                <span className="toggle-icon" onClick={() => toggleSubmenu('about')}>
                  {activeSubmenu === 'about' ? '−' : '+'}
                </span>
              </div>
              <ul className={`mobile-submenu ${activeSubmenu === 'about' ? 'open' : ''}`}>
                <li><Link to="/about" className="mobile-submenu-link" onClick={closeMobileMenu}>About Us</Link></li>
                <li><Link to="/natural-shea-butter" className="mobile-submenu-link" onClick={closeMobileMenu}>Natural Shea Butter</Link></li>
                <li><Link to="/why-smartshea" className="mobile-submenu-link" onClick={closeMobileMenu}>Why SmartShea</Link></li>
              </ul>
            </li>
            <li className="mobile-nav-item">
              <Link to="/skincare-tips" className="mobile-nav-link" onClick={closeMobileMenu}>Skincare Tips</Link>
            </li>
          </ul>
          <div className="mobile-navbar-icons">
            <Link to="/account" className="mobile-icon-link" onClick={closeMobileMenu}>
              <span className="icon">👤</span> Account
            </Link>
            <Link to="/search" className="mobile-icon-link" onClick={closeMobileMenu}>
              <span className="icon">🔍</span> Search
            </Link>
            <Link to="/cart" className="mobile-icon-link" onClick={closeMobileMenu}>
              <span className="icon">🛒</span> Cart
            </Link>
          </div>
        </div>

        <div className="navbar-icons">
          <Link to="/account" className="icon-link">
            <span className="icon">👤</span>
          </Link>
          <Link to="/search" className="icon-link">
            <span className="icon">🔍</span>
          </Link>
          <Link to="/cart" className="icon-link">
            <span className="icon">🛒</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;