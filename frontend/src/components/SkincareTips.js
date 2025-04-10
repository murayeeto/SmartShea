import React from 'react';

const SkincareTips = () => {
  return (
    <div className="skincare-tips-container">
      <div className="skincare-hero">
        <h1>Essential Skincare Tips</h1>
        <p>Discover expert advice for healthy, radiant skin with SmartShea</p>
      </div>
      
      <div className="benefits-section">
        <h2>Daily Skincare Essentials</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Daily Cleansing</h3>
            <p>Gently cleanse your face twice daily to remove dirt, oil, and impurities that can clog pores and cause breakouts. Choose a cleanser that matches your skin type for best results.</p>
          </div>
          <div className="benefit-card">
            <h3>Stay Hydrated</h3>
            <p>Drink 8-10 glasses of water daily to maintain skin elasticity and promote a healthy, radiant complexion. Hydration from within is just as important as topical moisturizers.</p>
          </div>
          <div className="benefit-card">
            <h3>Sun Protection</h3>
            <p>Apply broad-spectrum SPF 30+ sunscreen daily, even on cloudy days, to protect your skin from harmful UV rays and prevent premature aging. Reapply every two hours when outdoors.</p>
          </div>
          <div className="benefit-card">
            <h3>Consistent Moisturizing</h3>
            <p>Use SmartShea products daily to lock in moisture and create a protective barrier for your skin against environmental stressors. Apply moisturizer to slightly damp skin for better absorption.</p>
          </div>
        </div>
      </div>
      
      <div className="skin-types-section">
        <h2>Skincare Tips by Skin Type</h2>
        <div className="skin-types-grid">
          <div className="skin-type-card dry">
            <h3>Dry Skin</h3>
            <ul>
              <li>Use cream-based cleansers that don't strip natural oils</li>
              <li>Apply rich, oil-based moisturizers containing shea butter</li>
              <li>Avoid hot water when washing your face</li>
              <li>Consider using a humidifier in your bedroom</li>
              <li>Exfoliate gently only 1-2 times per week</li>
              <li>Look for products with hyaluronic acid and ceramides</li>
              <li>Try overnight moisturizing masks for intense hydration</li>
            </ul>
            <p className="product-recommendation">
              <strong>SmartShea Recommendation:</strong> Our Intense Hydration Cream with pure shea butter and hyaluronic acid
            </p>
          </div>
          
          <div className="skin-type-card oily">
            <h3>Oily Skin</h3>
            <ul>
              <li>Use gel or foam cleansers to remove excess oil</li>
              <li>Don't skip moisturizer - try oil-free, non-comedogenic formulas</li>
              <li>Incorporate products with salicylic acid or niacinamide</li>
              <li>Use clay masks 1-2 times weekly to absorb excess oil</li>
              <li>Blotting papers can help manage midday shine</li>
              <li>Exfoliate 2-3 times weekly to prevent clogged pores</li>
              <li>Consider using lightweight serums instead of heavy creams</li>
            </ul>
            <p className="product-recommendation">
              <strong>SmartShea Recommendation:</strong> Our Oil-Control Moisturizer with balanced shea derivatives
            </p>
          </div>
          
          <div className="skin-type-card combination">
            <h3>Combination Skin</h3>
            <ul>
              <li>Use gentle, balanced cleansers for your entire face</li>
              <li>Consider multi-masking - different masks for different areas</li>
              <li>Apply lighter moisturizers to oily areas, richer ones to dry areas</li>
              <li>Look for products with balancing ingredients like niacinamide</li>
              <li>Exfoliate 2 times weekly, focusing on oilier areas</li>
              <li>Use toners to help balance skin's pH levels</li>
              <li>Adjust your routine seasonally as your skin changes</li>
            </ul>
            <p className="product-recommendation">
              <strong>SmartShea Recommendation:</strong> Our Balancing Facial Lotion with adaptive shea technology
            </p>
          </div>
          
          <div className="skin-type-card sensitive">
            <h3>Sensitive Skin</h3>
            <ul>
              <li>Patch test all new products before full application</li>
              <li>Look for fragrance-free, hypoallergenic formulations</li>
              <li>Minimize your product routine to essential items only</li>
              <li>Avoid products with alcohol, sulfates, and artificial colors</li>
              <li>Use physical (mineral) sunscreens rather than chemical ones</li>
              <li>Incorporate soothing ingredients like aloe, oatmeal, and chamomile</li>
              <li>Avoid extreme water temperatures when cleansing</li>
            </ul>
            <p className="product-recommendation">
              <strong>SmartShea Recommendation:</strong> Our Gentle Relief Cream with unrefined shea butter and colloidal oatmeal
            </p>
          </div>
        </div>
      </div>
      
      <div className="tips-section">
        <h2>Seasonal Skincare Advice</h2>
        <div className="tips-grid">
          <div className="tip-card winter">
            <h3>Winter</h3>
            <p>Use richer moisturizers and avoid hot showers that can strip your skin of natural oils. Consider adding a humidifier to your home to combat dry indoor air. Switch to cream-based cleansers and incorporate facial oils into your nighttime routine for extra protection.</p>
          </div>
          <div className="tip-card spring">
            <h3>Spring</h3>
            <p>Exfoliate to remove dead skin cells from winter and adjust your moisturizer to a lighter formula as humidity increases. Increase your sun protection as you spend more time outdoors. Spring is also a good time to introduce vitamin C serums to brighten winter dullness.</p>
          </div>
          <div className="tip-card summer">
            <h3>Summer</h3>
            <p>Increase sun protection, use oil-free products if you're prone to oiliness, and consider keeping facial mists in the refrigerator for a cooling effect. Cleanse more thoroughly to remove sweat and sunscreen buildup. Lightweight, gel-based moisturizers work best in summer humidity.</p>
          </div>
          <div className="tip-card fall">
            <h3>Fall</h3>
            <p>Repair summer sun damage with antioxidant-rich products and gradually transition to more hydrating formulas as the weather cools. Reintroduce richer night creams and consider adding a weekly hydrating mask to your routine. Fall is ideal for treatments addressing summer pigmentation.</p>
          </div>
        </div>
      </div>
      
      <div className="routine-section">
        <h2>Building Your Perfect Skincare Routine</h2>
        <p className="routine-intro">Follow these steps for a comprehensive skincare regimen that will help maintain healthy, glowing skin</p>
        <div className="routine-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Cleanse</h3>
            <p>Start with a gentle cleanser appropriate for your skin type. Cleanse morning and night to remove impurities, excess oil, and makeup.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Tone</h3>
            <p>Balance your skin's pH with an alcohol-free toner. This prepares your skin to better absorb the products that follow.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Treat</h3>
            <p>Apply serums or treatments targeting specific skin concerns like dark spots, fine lines, or acne. These concentrated formulas deliver active ingredients deep into the skin.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Eye Care</h3>
            <p>Apply eye cream using your ring finger with gentle patting motions. The skin around your eyes is delicate and requires special attention.</p>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <h3>Moisturize</h3>
            <p>Lock in hydration with SmartShea's natural shea butter products. Choose formulations appropriate for your skin type and concerns.</p>
          </div>
          <div className="step-card">
            <div className="step-number">6</div>
            <h3>Protect</h3>
            <p>Finish with SPF during the day to shield your skin from UV damage. This is the most important step for preventing premature aging.</p>
          </div>
        </div>
      </div>
      
      <div className="skincare-tips-cta">
        <h2>Ready to Transform Your Skincare Routine?</h2>
        <p>Discover SmartShea's range of natural, effective products tailored to your unique skin needs</p>
        <button className="primary-button">Shop SmartShea Products</button>
      </div>
    </div>
  );
};

export default SkincareTips;