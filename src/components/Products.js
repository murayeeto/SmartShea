import React from 'react';

const Products = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Hydrating Shea Butter Cream',
      type: 'dry',
      description: 'Intense hydration for dry skin with pure shea butter',
      price: '$19.99'
    },
    {
      id: 2,
      name: 'Oil Control Shea Butter Cleanser',
      type: 'oily',
      description: 'Balances oil production with natural shea extracts',
      price: '$19.99'
    },
    {
      id: 3,
      name: 'Balancing Shea Moisturizer',
      type: 'normal',
      description: 'Maintains optimal skin hydration with light shea formula',
      price: '$20.99'
    },
    {
      id: 4,
      name: 'Gentle Shea Exfoliating Scrub',
      type: 'all',
      description: 'Gentle exfoliation with shea butter microbeads',
      price: '$18.99'
    },
    {
      id: 5,
      name: 'Nourishing Shea Night Cream',
      type: 'dry',
      description: 'Overnight repair with concentrated shea butter',
      price: '$21.99'
    },
    {
      id: 6,
      name: 'Mattifying Shea Toner',
      type: 'oily',
      description: 'Reduces pore appearance with clarifying shea extracts',
      price: '$19.99'
    }
  ];

  return (
    <div className="products-container">
      <h1>Our SmartShea Products</h1>
      <p>
        Discover our range of naturally sourced shea butter products designed for different skin types.
        For personalized recommendations, use our AI-powered Skin Analyzer tool.
      </p>
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className={`product-card ${product.type}`}>
            <h3>{product.name}</h3>
            <p className="product-type">
              For {product.type === 'all' ? 'all skin types' : `${product.type} skin`}
            </p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button className="product-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;