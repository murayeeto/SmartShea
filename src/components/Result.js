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
    dry: "Our Hydrating Shea Butter Cream and Nourishing Shea Night Cream are perfect for your dry skin. The rich concentration of natural shea butter will provide deep hydration and repair your skin barrier.",
    oily: "We recommend our Oil Control Shea Butter Cleanser and Mattifying Shea Toner for your oily skin. These products contain specially formulated shea extracts that balance oil production without stripping your skin.",
    normal: "Your balanced skin will benefit from our Balancing Shea Moisturizer. It maintains optimal hydration with a light, non-greasy formula of pure shea butter."
  };

  return (
    <div className="result">
      <h2>Your Skin Analysis Results</h2>
      <div className={`result-card ${skin_type}`}>
        <h3>Skin Type: {skin_type.charAt(0).toUpperCase() + skin_type.slice(1)}</h3>
        <p><strong>Confidence:</strong> {confidenceDisplay}</p>
        <p><strong>General Recommendation:</strong> {recommendation}</p>
        
        <div className="shea-recommendation">
          <h4>Your SmartShea Recommendation:</h4>
          <p>{sheaRecommendations[skin_type] || "We recommend our Gentle Shea Exfoliating Scrub which works well for all skin types."}</p>
        </div>
        
        {predictions && (
          <div className="predictions">
            <h4>Detailed Analysis:</h4>
            <ul>
              {Object.entries(predictions).map(([type, score]) => (
                <li key={type}>
                  <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {(score * 100).toFixed(1)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>About Skin Types</h3>
        <ul>
          <li><strong>Normal:</strong> Well-balanced skin with good hydration, even tone, and no excess oil or dryness. Our light shea formulations help maintain this balance.</li>
          <li><strong>Dry:</strong> Lacks moisture, may feel tight or show flaking, and can appear dull or rough. Our rich shea butter products provide deep hydration.</li>
          <li><strong>Oily:</strong> Produces excess sebum, appears shiny, and may be prone to enlarged pores and acne. Our specialized shea extracts help control oil without over-drying.</li>
        </ul>
      </div>
    </div>
  );
};

export default Result;