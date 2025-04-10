import React, { useState } from 'react';

const Products = () => {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('all');

  // Product data
  const products = [
    {
      id: 1,
      name: 'SmartShea Workday Moisturizer',
      type: 'all',
      description: 'Lightweight daily moisturizer perfect for work and everyday use. Absorbs quickly without leaving a greasy residue.',
      price: '$17.50',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'SmartShea Hydrating Cream',
      type: 'dry',
      description: 'Intense hydration for dry skin with pure shea butter. Locks in moisture for up to 24 hours.',
      price: '$17.50'
    },
    {
      id: 3,
      name: 'SmartShea Oil Control Cleanser',
      type: 'oily',
      description: 'Balances oil production with natural shea extracts. Removes excess oil without stripping skin.',
      price: '$16.99'
    },
    {
      id: 4,
      name: 'SmartShea Balancing Moisturizer',
      type: 'normal',
      description: 'Maintains optimal skin hydration with light shea formula. Perfect for everyday use.',
      price: '$17.50',
      badge: 'New'
    },
    {
      id: 5,
      name: 'SmartShea Gentle Exfoliating Scrub',
      type: 'all',
      description: 'Gentle exfoliation with shea butter microbeads. Removes dead skin cells without irritation.',
      price: '$15.99'
    },
    {
      id: 6,
      name: 'SmartShea Night Repair Cream',
      type: 'dry',
      description: 'Overnight repair with concentrated shea butter. Wake up to nourished, revitalized skin.',
      price: '$18.99',
      badge: 'Popular'
    },
    {
      id: 7,
      name: 'SmartShea Mattifying Toner',
      type: 'oily',
      description: 'Reduces pore appearance with clarifying shea extracts. Helps control shine throughout the day.',
      price: '$16.50'
    },
    {
      id: 8,
      name: 'SmartShea Combination Skin Solution',
      type: 'combination',
      description: 'Targeted formula for combination skin concerns. Balances oily and dry areas for a uniform complexion.',
      price: '$17.50'
    }
  ];

  // Filter types
  const skinTypes = [
    { id: 'all', label: 'All Products' },
    { id: 'dry', label: 'Dry Skin' },
    { id: 'oily', label: 'Oily Skin' },
    { id: 'normal', label: 'Normal Skin' },
    { id: 'combination', label: 'Combination Skin' }
  ];

  // Filter products based on active filter
  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.type === activeFilter || product.type === 'all');

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our SmartShea Products</h1>
        <p>
          Discover our range of naturally sourced shea butter products designed for different skin types.
          For personalized recommendations, use our AI-powered Skin Analyzer tool.
        </p>
      </div>
      
      {/* Filter buttons */}
      <div className="product-filters">
        {skinTypes.map(type => (
          <button
            key={type.id}
            className={`filter-button ${activeFilter === type.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className={`product-card ${product.type}`}>
            <div className="product-content">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <h3 className="product-name">{product.name}</h3>
              <span className={`product-type ${product.type}`}>
                {product.type === 'all' ? 'All Skin Types' : `${product.type.charAt(0).toUpperCase() + product.type.slice(1)} Skin`}
              </span>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
              <div className="product-actions">
                <button className="product-button view">View Details</button>
                <button className="product-button cart">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;