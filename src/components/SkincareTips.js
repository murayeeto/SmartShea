import React from 'react';

const SkincareTips = () => {
  return (
    <div className="skincare-tips-container">
      <div className="header">
        <h1>Essential Skincare Tips</h1>
        <p>Follow these essential tips for healthy, radiant skin</p>
      </div>
      
      <div className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Daily Cleansing</h3>
            <p>Gently cleanse your face twice daily to remove dirt, oil, and impurities that can clog pores and cause breakouts.</p>
          </div>
          <div className="benefit-card">
            <h3>Stay Hydrated</h3>
            <p>Drink plenty of water throughout the day to maintain skin elasticity and promote a healthy, radiant complexion.</p>
          </div>
          <div className="benefit-card">
            <h3>Sun Protection</h3>
            <p>Apply broad-spectrum sunscreen daily, even on cloudy days, to protect your skin from harmful UV rays and prevent premature aging.</p>
          </div>
          <div className="benefit-card">
            <h3>Consistent Moisturizing</h3>
            <p>Use SmartShea products daily to lock in moisture and create a protective barrier for your skin against environmental stressors.</p>
          </div>
        </div>
      </div>
      
      <div className="tips-section">
        <h2>Seasonal Skincare Advice</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Winter</h3>
            <p>Use richer moisturizers and avoid hot showers that can strip your skin of natural oils. Consider adding a humidifier to your home to combat dry indoor air.</p>
          </div>
          <div className="tip-card">
            <h3>Spring</h3>
            <p>Exfoliate to remove dead skin cells from winter and adjust your moisturizer to a lighter formula as humidity increases.</p>
          </div>
          <div className="tip-card">
            <h3>Summer</h3>
            <p>Increase sun protection, use oil-free products if you're prone to oiliness, and consider keeping facial mists in the refrigerator for a cooling effect.</p>
          </div>
          <div className="tip-card">
            <h3>Fall</h3>
            <p>Repair summer sun damage with antioxidant-rich products and gradually transition to more hydrating formulas as the weather cools.</p>
          </div>
        </div>
      </div>
      
      <div className="routine-section">
        <h2>Building Your Skincare Routine</h2>
        <div className="routine-steps">
          <div className="step-card">
            <h3>Step 1: Cleanse</h3>
            <p>Start with a gentle cleanser appropriate for your skin type.</p>
          </div>
          <div className="step-card">
            <h3>Step 2: Tone</h3>
            <p>Balance your skin's pH with an alcohol-free toner.</p>
          </div>
          <div className="step-card">
            <h3>Step 3: Treat</h3>
            <p>Apply serums or treatments targeting specific skin concerns.</p>
          </div>
          <div className="step-card">
            <h3>Step 4: Moisturize</h3>
            <p>Lock in hydration with SmartShea's natural shea butter products.</p>
          </div>
          <div className="step-card">
            <h3>Step 5: Protect</h3>
            <p>Finish with SPF during the day to shield your skin from UV damage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkincareTips;