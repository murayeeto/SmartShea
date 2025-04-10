import React, { useState, useRef } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

const SkinAnalyzer = ({ setResult, setLoading, setError }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!preview) {
      setError("Please select or capture an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/api/analyze`, {
        image: preview
      });
      
      setResult(response.data);
    } catch (err) {
      setError("Error analyzing image: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="skin-analyzer-container">
      <div className="skin-analyzer-header">
        <h2>Discover Your Perfect SmartShea Match</h2>
        <p>Upload a photo of your skin and our AI will analyze it to recommend the ideal SmartShea products for your unique skin type</p>
      </div>
      
      <div className="skin-analyzer-content">
        <div className="skin-analyzer-card">
          {!preview ? (
            <div className="upload-area">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" width="60" height="60">
                  <path d="M12,4 L12,16 M7,9 L12,4 L17,9" stroke="#7ab51d" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M4,14 L4,18 C4,19.1046 4.89543,20 6,20 L18,20 C19.1046,20 20,19.1046 20,18 L20,14" stroke="#7ab51d" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Upload Your Skin Photo</h3>
              <p>For best results, use a well-lit, front-facing photo with no makeup</p>
              <div className="button-group">
                <button
                  className="upload-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Select Image
                </button>
                <button
                  onClick={() => setShowInstructions(true)}
                  className="secondary-button how-it-works-button"
                >
                  How It Works
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="preview-area">
              <div className="preview-container">
                <img src={preview} alt="Preview" className="image-preview" />
              </div>
              <div className="button-group preview-buttons">
                <button className="analyze-button" onClick={handleSubmit}>Analyze My Skin</button>
                <button className="reset-button" onClick={resetForm}>Try Another Photo</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="skin-analyzer-info">
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#7ab51d" strokeWidth="2"/>
                <path d="M12,7 L12,13 M12,16 L12,17" stroke="#7ab51d" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>How It Works</h3>
            <p>Our advanced AI analyzes your skin's texture, tone, and characteristics to determine your skin type and recommend the perfect SmartShea products.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12,2 L15.09,8.26 L22,9.27 L17,14.14 L18.18,21.02 L12,17.77 L5.82,21.02 L7,14.14 L2,9.27 L8.91,8.26 L12,2 Z" fill="none" stroke="#7ab51d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Personalized Results</h3>
            <p>Get tailored SmartShea product recommendations based on your unique skin type, whether it's dry, oily, normal, or combination.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12,21 L10,19 L7,19 C5.34315,19 4,17.6569 4,16 L4,6 C4,4.34315 5.34315,3 7,3 L17,3 C18.6569,3 20,4.34315 20,6 L20,16 C20,17.6569 18.6569,19 17,19 L14,19 L12,21 Z" fill="none" stroke="#7ab51d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8,7 L16,7 M8,11 L16,11 M8,15 L12,15" stroke="#7ab51d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Expert Advice</h3>
            <p>Along with product recommendations, receive skincare tips and advice tailored to your specific skin needs.</p>
          </div>
        </div>
      </div>

      {/* Instructions Popup */}
      {showInstructions && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h1 className="popup-title">PERFECT SKIN ANALYSIS</h1>
              <button className="popup-close" onClick={() => setShowInstructions(false)}>×</button>
            </div>
            <div className="popup-content">
              <h2>Get Ready for Your Skin Analysis</h2>
              <div className="instructions-title">FOLLOW THESE SIMPLE STEPS</div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M7,12 L17,12 M12,7 L12,17" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M9,9 L15,15 M9,15 L15,9" stroke="#7ab51d" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  <h4>Remove Accessories</h4>
                  <p>Take off your glasses and ensure there's no bangs on your forehead for accurate analysis.</p>
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="12" r="5" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M12,4 L12,2 M12,22 L12,20 M4,12 L2,12 M22,12 L20,12 M6,6 L4.5,4.5 M18,18 L16.5,16.5 M6,18 L4.5,19.5 M18,6 L16.5,7.5" stroke="#7ab51d" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  <h4>Good Lighting</h4>
                  <p>Ensure you're in a well-lighted environment for the most accurate skin analysis.</p>
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <rect x="8" y="4" width="3" height="12" rx="1.5" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <circle cx="9.5" cy="18" r="2" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M9,4 L9,2 M9,22 L9,20" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M13,12 L20,12 M13,8 L18,8 M13,16 L16,16" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M15,12 L15,8 M18,12 L18,8" stroke="#7ab51d" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  <h4>No Makeup</h4>
                  <p>Testing with no makeup will provide more accurate results about your natural skin condition.</p>
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="10" r="6" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <circle cx="12" cy="10" r="2" fill="none" stroke="#7ab51d" strokeWidth="1.5"/>
                    <path d="M12,16 L12,20 M8,20 L16,20" stroke="#7ab51d" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  <h4>Face Position</h4>
                  <p>Look straight at the camera and keep your face centered in the frame for best results.</p>
                </div>
              </div>
              
              <button className="get-started-button" onClick={() => setShowInstructions(false)}>
                I'M READY TO START
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinAnalyzer;