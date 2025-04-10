import React from 'react';

const Subscriptions = () => {
  // Subscription bundle data
  const subscriptions = [
    {
      id: 1,
      name: '30-Day Essential Bundle',
      type: 'monthly',
      description: 'A monthly supply of essential SmartShea products for your daily skincare routine',
      products: [
        'SmartShea Workday Moisturizer',
        'SmartShea Gentle Exfoliating Scrub'
      ],
      regularPrice: 33.49, // 17.50 + 15.99
      discountedPrice: 29.99, // ~10% off
      savings: '10%'
    },
    {
      id: 2,
      name: '30-Day Dry Skin Bundle',
      type: 'monthly',
      description: 'Specially formulated monthly bundle for dry skin types',
      products: [
        'SmartShea Workday Moisturizer',
        'SmartShea Hydrating Cream',
        'SmartShea Night Repair Cream'
      ],
      regularPrice: 53.99, // 17.50 + 17.50 + 18.99
      discountedPrice: 45.99, // ~15% off
      savings: '15%'
    },
    {
      id: 3,
      name: '30-Day Oily Skin Bundle',
      type: 'monthly',
      description: 'Specially formulated monthly bundle for oily skin types',
      products: [
        'SmartShea Workday Moisturizer',
        'SmartShea Oil Control Cleanser',
        'SmartShea Mattifying Toner'
      ],
      regularPrice: 50.99, // 17.50 + 16.99 + 16.50
      discountedPrice: 42.99, // ~15% off
      savings: '15%'
    },
    {
      id: 4,
      name: '90-Day Essential Bundle',
      type: 'quarterly',
      description: 'A three-month supply of essential SmartShea products for your daily skincare routine',
      products: [
        'SmartShea Workday Moisturizer (3)',
        'SmartShea Gentle Exfoliating Scrub (3)',
        'SmartShea Balancing Moisturizer'
      ],
      regularPrice: 118.47, // (17.50 + 15.99) * 3 + 17.50
      discountedPrice: 94.99, // ~20% off
      savings: '20%'
    },
    {
      id: 5,
      name: '90-Day Dry Skin Bundle',
      type: 'quarterly',
      description: 'Specially formulated quarterly bundle for dry skin types',
      products: [
        'SmartShea Workday Moisturizer (3)',
        'SmartShea Hydrating Cream (3)',
        'SmartShea Night Repair Cream (2)',
        'SmartShea Gentle Exfoliating Scrub'
      ],
      regularPrice: 179.97, // (17.50 + 17.50) * 3 + 18.99 * 2 + 15.99
      discountedPrice: 134.99, // ~25% off
      savings: '25%'
    },
    {
      id: 6,
      name: '90-Day Oily Skin Bundle',
      type: 'quarterly',
      description: 'Specially formulated quarterly bundle for oily skin types',
      products: [
        'SmartShea Workday Moisturizer (3)',
        'SmartShea Oil Control Cleanser (3)',
        'SmartShea Mattifying Toner (2)',
        'SmartShea Gentle Exfoliating Scrub'
      ],
      regularPrice: 170.97, // (17.50 + 16.99) * 3 + 16.50 * 2 + 15.99
      discountedPrice: 127.99, // ~25% off
      savings: '25%'
    }
  ];

  return (
    <div className="subscriptions-container">
      <h1>SmartShea Subscription Bundles</h1>
      <p>
        Subscribe to our curated bundles and save while maintaining a consistent skincare routine.
        Each bundle is designed to provide optimal results for different skin types and needs.
      </p>
      
      <div className="subscription-hero">
        <h2>Transform Your Skincare Routine</h2>
        <p>
          Join our subscription program and enjoy premium SmartShea products delivered right to your door.
          Save up to 25% on your favorite products while maintaining a consistent skincare regimen.
        </p>
      </div>
      
      <div className="subscription-categories">
        <h2>30-Day Bundles</h2>
        <div className="subscription-grid">
          {subscriptions.filter(sub => sub.type === 'monthly').map(subscription => (
            <div key={subscription.id} className="subscription-card">
              <h3>{subscription.name}</h3>
              <p className="subscription-description">{subscription.description}</p>
              <div className="subscription-products">
                <h4>Includes:</h4>
                <ul>
                  {subscription.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <div className="subscription-pricing">
                <p className="regular-price">Regular Price: ${subscription.regularPrice.toFixed(2)}</p>
                <p className="discounted-price">Subscription Price: ${subscription.discountedPrice.toFixed(2)}</p>
                <p className="savings">Save {subscription.savings}</p>
              </div>
              <button className="subscription-button">Subscribe Now</button>
            </div>
          ))}
        </div>
        
        <h2>90-Day Bundles</h2>
        <div className="subscription-grid">
          {subscriptions.filter(sub => sub.type === 'quarterly').map(subscription => (
            <div key={subscription.id} className="subscription-card">
              <h3>{subscription.name}</h3>
              <p className="subscription-description">{subscription.description}</p>
              <div className="subscription-products">
                <h4>Includes:</h4>
                <ul>
                  {subscription.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <div className="subscription-pricing">
                <p className="regular-price">Regular Price: ${subscription.regularPrice.toFixed(2)}</p>
                <p className="discounted-price">Subscription Price: ${subscription.discountedPrice.toFixed(2)}</p>
                <p className="savings">Save {subscription.savings}</p>
              </div>
              <button className="subscription-button">Subscribe Now</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="subscription-benefits">
        <h2>Benefits of Subscribing</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Save Money</h3>
            <p>Enjoy discounts of up to 25% off regular prices with our subscription bundles</p>
          </div>
          <div className="benefit-card">
            <h3>Convenience</h3>
            <p>Receive your skincare essentials automatically without having to reorder</p>
          </div>
          <div className="benefit-card">
            <h3>Consistency</h3>
            <p>Maintain a consistent skincare routine for better results</p>
          </div>
          <div className="benefit-card">
            <h3>Flexibility</h3>
            <p>Easily modify, pause, or cancel your subscription at any time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;