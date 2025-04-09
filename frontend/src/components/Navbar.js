import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Navbar = () => {
  return (
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
          <Link to="/cart" className="icon-link">
            <span className="icon">🛒</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;