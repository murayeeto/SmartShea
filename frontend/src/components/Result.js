import React from 'react';

const Result = ({ result }) => {
  if (!result) return null;

  const { skin_type, recommendation, confidence, predictions } = result;

  // Format confidence as percentage if available
  const confidenceDisplay = confidence !== null && confidence !== undefined
    ? `${(confidence * 100).toFixed(1)}%`
    : 'N/A';

  // SmartShea product recommendations based on skin type
  const sheaRecommendations = {
    dry: "Our SmartShea Hydrating Cream ($17.50) and SmartShea Night Repair Cream ($18.99) are perfect for your dry skin. For everyday use, try our SmartShea Workday Moisturizer ($17.50). The rich concentration of natural shea butter will provide deep hydration and repair your skin barrier.",
    oily: "We recommend our SmartShea Oil Control Cleanser ($16.99) and SmartShea Mattifying Toner ($16.50) for your oily skin. For a lightweight daily option, try our SmartShea Workday Moisturizer ($17.50). These products contain specially formulated shea extracts that balance oil production without stripping your skin.",
    normal: "Your balanced skin will benefit from our SmartShea Balancing Moisturizer ($17.50) and SmartShea Gentle Exfoliating Scrub ($15.99). For everyday use, try our SmartShea Workday Moisturizer ($17.50). These maintain optimal hydration with a light, non-greasy formula of pure shea butter."
  };

  // Icons for each skin type
  const skinTypeIcons = {
    dry: (
      <svg viewBox="0 0 24 24" width="40" height="40">
        <path d="M12,3 C16.9706,3 21,7.02944 21,12 C21,16.9706 16.9706,21 12,21 C7.02944,21 3,16.9706 3,12 C3,7.02944 7.02944,3 12,3 Z" fill="none" stroke="#f1c40f" strokeWidth="2"/>
        <path d="M8,12 C8,9.79086 9.79086,8 12,8 C14.2091,8 16,9.79086 16,12" fill="none" stroke="#f1c40f" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9,16 L15,16" stroke="#f1c40f" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    oily: (
      <svg viewBox="0 0 24 24" width="40" height="40">
        <path d="M12,3 C16.9706,3 21,7.02944 21,12 C21,16.9706 16.9706,21 12,21 C7.02944,21 3,16.9706 3,12 C3,7.02944 7.02944,3 12,3 Z" fill="none" stroke="#e74c3c" strokeWidth="2"/>
        <path d="M8,14 C9.33333,12.6667 10.6667,12 12,12 C13.3333,12 14.6667,12.6667 16,14" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="8" cy="9" r="1" fill="#e74c3c"/>
        <circle cx="12" cy="8" r="1" fill="#e74c3c"/>
        <circle cx="16" cy="9" r="1" fill="#e74c3c"/>
      </svg>
    ),
    normal: (
      <svg viewBox="0 0 24 24" width="40" height="40">
        <path d="M12,3 C16.9706,3 21,7.02944 21,12 C21,16.9706 16.9706,21 12,21 C7.02944,21 3,16.9706 3,12 C3,7.02944 7.02944,3 12,3 Z" fill="none" stroke="#2ecc71" strokeWidth="2"/>
        <path d="M8,13 C9.33333,14.3333 10.6667,15 12,15 C13.3333,15 14.6667,14.3333 16,13" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="8" cy="9" r="1" fill="#2ecc71"/>
        <circle cx="16" cy="9" r="1" fill="#2ecc71"/>
      </svg>
    ),
    combination: (
      <svg viewBox="0 0 24 24" width="40" height="40">
        <path d="M12,3 C16.9706,3 21,7.02944 21,12 C21,16.9706 16.9706,21 12,21 C7.02944,21 3,16.9706 3,12 C3,7.02944 7.02944,3 12,3 Z" fill="none" stroke="#3498db" strokeWidth="2"/>
        <path d="M6,12 L18,12" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8,9 C8,9 9,7 12,7 C15,7 16,9 16,9" fill="none" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8,15 C8,15 9,17 12,17 C15,17 16,15 16,15" fill="none" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return (
    <div className="result">
      <h2>Your Skin Analysis Results</h2>
      
      <div className={`result-card ${skin_type}`}>
        <div className="result-header">
          <div className="skin-type-icon">
            {skinTypeIcons[skin_type] || (
              <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#7ab51d" strokeWidth="2"/>
                <path d="M12,8 L12,12 M12,16 L12,16" stroke="#7ab51d" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <h3>Your Skin Type: <span className="skin-type-name">{skin_type.charAt(0).toUpperCase() + skin_type.slice(1)}</span></h3>
        </div>
        
        <div className="result-details">
          <div className="confidence-meter">
            <div className="confidence-label">Analysis Confidence</div>
            <div className="confidence-bar-container">
              <div
                className="confidence-bar"
                style={{ width: confidenceDisplay }}
              ></div>
            </div>
            <div className="confidence-value">{confidenceDisplay}</div>
          </div>
          
          <div className="recommendation-section">
            <h4>General Recommendation</h4>
            <p>{recommendation}</p>
          </div>
          
          <div className="shea-recommendation">
            <h4>Your SmartShea Recommendation</h4>
            <p>{sheaRecommendations[skin_type] || "We recommend our SmartShea Gentle Exfoliating Scrub ($15.99) and SmartShea Workday Moisturizer ($17.50) which work well for all skin types."}</p>
            <button className="shop-now-button">Shop Recommended Products</button>
          </div>
          
          {predictions && (
            <div className="predictions">
              <h4>Detailed Analysis</h4>
              <ul>
                {Object.entries(predictions).map(([type, score]) => (
                  <li key={type}>
                    <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                    <div className="prediction-bar-container">
                      <div
                        className={`prediction-bar ${type}`}
                        style={{ width: `${(score * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="prediction-value">{(score * 100).toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="skin-types-info">
        <h3>Understanding Skin Types</h3>
        <div className="skin-types-grid">
          <div className="skin-type-info-card normal">
            <div className="skin-type-info-icon">
              {skinTypeIcons.normal}
            </div>
            <h4>Normal Skin</h4>
            <p>Well-balanced skin with good hydration, even tone, and no excess oil or dryness.</p>
            <div className="product-tag">Try: SmartShea Balancing Moisturizer ($17.50)</div>
          </div>
          
          <div className="skin-type-info-card dry">
            <div className="skin-type-info-icon">
              {skinTypeIcons.dry}
            </div>
            <h4>Dry Skin</h4>
            <p>Lacks moisture, may feel tight or show flaking, and can appear dull or rough.</p>
            <div className="product-tag">Try: SmartShea Hydrating Cream ($17.50)</div>
          </div>
          
          <div className="skin-type-info-card oily">
            <div className="skin-type-info-icon">
              {skinTypeIcons.oily}
            </div>
            <h4>Oily Skin</h4>
            <p>Produces excess sebum, appears shiny, and may be prone to enlarged pores and acne.</p>
            <div className="product-tag">Try: SmartShea Oil Control Cleanser ($16.99)</div>
          </div>
          
          <div className="skin-type-info-card combination">
            <div className="skin-type-info-icon">
              {skinTypeIcons.combination}
            </div>
            <h4>Combination Skin</h4>
            <p>Features both oily and dry areas, typically with an oily T-zone and dry cheeks.</p>
            <div className="product-tag">Try: SmartShea Combination Skin Solution ($17.50)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;