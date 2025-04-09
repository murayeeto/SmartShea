import React from 'react';

const NaturalSheaButter = () => {
  return (
    <div className="natural-shea-container">
      <div className="header">
        <h1>The Power of Natural Shea Butter</h1>
        <p>Discover the incredible benefits of this natural wonder for your skin</p>
      </div>
      
      <div className="benefits-section">
        <h2>Key Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Deeply Moisturizing</h3>
            <p>Rich in vitamins A, E, and F, providing essential fatty acids and nutrients for your skin. Shea butter creates a moisture-sealing barrier that keeps skin hydrated for hours.</p>
          </div>
          <div className="benefit-card">
            <h3>Anti-Inflammatory</h3>
            <p>Natural properties help reduce skin inflammation and soothe irritated skin. Contains cinnamic acid, which helps calm skin conditions like eczema and psoriasis.</p>
          </div>
          <div className="benefit-card">
            <h3>Antioxidant Protection</h3>
            <p>Protects your skin from free radicals and environmental damage. The high concentration of vitamins and fatty acids in shea butter neutralizes free radicals that accelerate aging.</p>
          </div>
          <div className="benefit-card">
            <h3>Natural Collagen Booster</h3>
            <p>Stimulates collagen production, improving skin elasticity and reducing the appearance of fine lines and wrinkles.</p>
          </div>
        </div>
      </div>
      
      <div className="science-section">
        <h2>The Science Behind Shea Butter</h2>
        <p>
          Shea butter is derived from the nuts of the shea tree (Vitellaria paradoxa), native to West Africa. 
          It contains high concentrations of fatty acids and vitamins that make it an excellent emollient and skin conditioning agent.
        </p>
        <div className="science-grid">
          <div className="science-card">
            <h3>Fatty Acid Composition</h3>
            <p>Shea butter contains stearic, oleic, linoleic, and palmitic acids that strengthen the skin barrier and lock in moisture.</p>
          </div>
          <div className="science-card">
            <h3>Vitamin Content</h3>
            <p>Rich in vitamins A, E, and F, which are essential for maintaining healthy skin cell function and combating environmental damage.</p>
          </div>
          <div className="science-card">
            <h3>Triterpenes</h3>
            <p>Contains unique compounds called triterpenes, which have anti-inflammatory and antioxidant properties.</p>
          </div>
        </div>
      </div>
      
      <div className="sourcing-section">
        <h2>Our Ethical Sourcing</h2>
        <p>
          At SmartShea, we source our shea butter directly from women's cooperatives in West Africa, 
          ensuring fair trade practices and supporting local communities. Our shea butter is:
        </p>
        <ul className="sourcing-list">
          <li>100% natural and unrefined to preserve all beneficial properties</li>
          <li>Sustainably harvested using traditional methods</li>
          <li>Fair trade certified, supporting women's economic empowerment</li>
          <li>Free from additives, preservatives, and harmful chemicals</li>
        </ul>
      </div>
      
      <div className="usage-section">
        <h2>How to Incorporate Shea Butter in Your Routine</h2>
        <div className="usage-grid">
          <div className="usage-card">
            <h3>Daily Moisturizer</h3>
            <p>Apply SmartShea products after showering to lock in moisture and keep skin hydrated throughout the day.</p>
          </div>
          <div className="usage-card">
            <h3>Targeted Treatment</h3>
            <p>Use on dry patches, rough elbows, heels, and other problem areas that need extra attention.</p>
          </div>
          <div className="usage-card">
            <h3>Anti-Aging Care</h3>
            <p>Apply to fine lines and wrinkles to boost collagen production and improve skin elasticity over time.</p>
          </div>
          <div className="usage-card">
            <h3>Skin Healing</h3>
            <p>Use on minor cuts, burns, and skin irritations to promote healing and reduce inflammation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalSheaButter;