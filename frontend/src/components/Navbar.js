import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (submenuId) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [submenuId]: !prev[submenuId]
    }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="SmartShea Logo" className="logo-image" />
            </Link>
          </div>
          <ul className="nav-menu">
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
          <div className="navbar-icons">
            <Link to="/account" className="icon-link">
              <span className="icon">👤</span>
            </Link>
            <Link to="/search" className="icon-link">
              <span className="icon">🔍</span>
            </Link>
          </div>
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-close" onClick={toggleMobileMenu}>×</div>
        </div>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={() => toggleSubmenu('shop')}>
              Shop <span className="toggle-submenu">{openSubmenus.shop ? '-' : '+'}</span>
            </Link>
            <ul className={`mobile-submenu ${openSubmenus.shop ? 'open' : ''}`}>
              <li><Link to="/products" className="mobile-submenu-link" onClick={toggleMobileMenu}>Products</Link></li>
              <li><Link to="/products" className="mobile-submenu-link" onClick={toggleMobileMenu}>Gift Packages</Link></li>
            </ul>
          </li>
          <li className="mobile-nav-item">
            <Link to="/quizzes" className="mobile-nav-link" onClick={() => toggleSubmenu('quizzes')}>
              Quizzes <span className="toggle-submenu">{openSubmenus.quizzes ? '-' : '+'}</span>
            </Link>
            <ul className={`mobile-submenu ${openSubmenus.quizzes ? 'open' : ''}`}>
              <li><Link to="/quizzes" className="mobile-submenu-link" onClick={toggleMobileMenu}>Skin Type Quiz</Link></li>
              <li><Link to="/quizzes" className="mobile-submenu-link" onClick={toggleMobileMenu}>Product Finder</Link></li>
            </ul>
          </li>
          <li className="mobile-nav-item">
            <Link to="/skin-tester" className="mobile-nav-link" onClick={toggleMobileMenu}>Find Your Skintype</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about" className="mobile-nav-link" onClick={() => toggleSubmenu('about')}>
              About <span className="toggle-submenu">{openSubmenus.about ? '-' : '+'}</span>
            </Link>
            <ul className={`mobile-submenu ${openSubmenus.about ? 'open' : ''}`}>
              <li><Link to="/about" className="mobile-submenu-link" onClick={toggleMobileMenu}>About Us</Link></li>
              <li><Link to="/natural-shea-butter" className="mobile-submenu-link" onClick={toggleMobileMenu}>Natural Shea Butter</Link></li>
              <li><Link to="/why-smartshea" className="mobile-submenu-link" onClick={toggleMobileMenu}>Why SmartShea</Link></li>
            </ul>
          </li>
          <li className="mobile-nav-item">
            <Link to="/skincare-tips" className="mobile-nav-link" onClick={toggleMobileMenu}>Skincare Tips</Link>
          </li>
        </ul>
        <div className="mobile-navbar-icons">
          <Link to="/account" className="mobile-icon-link" onClick={toggleMobileMenu}>
            <span className="icon">👤</span> Account
          </Link>
          <Link to="/search" className="mobile-icon-link" onClick={toggleMobileMenu}>
            <span className="icon">🔍</span> Search
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;