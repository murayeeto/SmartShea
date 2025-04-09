import React, { useState, useRef } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

const SkinAnalyzer = ({ setResult, setLoading, setError }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      setError("Error accessing camera: " + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPreview(dataUrl);
      
      // Convert to blob for upload
      canvas.toBlob((blob) => {
        setImage(new File([blob], "camera-capture.jpg", { type: "image/jpeg" }));
      }, 'image/jpeg');
      
      stopCamera();
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
    <div>
      <h2>Upload or Take a Photo of Your Skin</h2>
      <p>Our AI will analyze your skin and recommend the perfect SmartShea product for you</p>
      
      <button
        onClick={() => setShowInstructions(true)}
        className="secondary-button"
        style={{ marginBottom: '15px' }}
      >
        How It Works
      </button>
      
      {!cameraActive && !preview && (
        <div className="button-group">
          <button onClick={() => fileInputRef.current.click()}>
            Select Image
          </button>
          <button onClick={startCamera}>
            Use Camera
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      )}
      
      {cameraActive && (
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
          <div className="button-group">
            <button onClick={capturePhoto}>Take Photo</button>
            <button onClick={stopCamera}>Cancel</button>
          </div>
        </div>
      )}
      
      {preview && (
        <div>
          <img src={preview} alt="Preview" className="image-preview" />
          <div className="button-group">
            <button onClick={handleSubmit}>Analyze Skin</button>
            <button onClick={resetForm}>Reset</button>
          </div>
        </div>
      )}

      {/* Instructions Popup */}
      {showInstructions && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h1 className="popup-title">PERFECT</h1>
              <button className="popup-close" onClick={() => setShowInstructions(false)}>×</button>
            </div>
            <div className="popup-content">
              <h2>Get Ready to Start Skin Analysis</h2>
              <div className="instructions-title">INSTRUCTIONS</div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M7,12 L17,12 M12,7 L12,17" stroke="#333" strokeWidth="1.5"/>
                    <path d="M9,9 L15,15 M9,15 L15,9" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  Take off your glasses and ensure there's no bangs on your forehead.
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="12" r="5" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M12,4 L12,2 M12,22 L12,20 M4,12 L2,12 M22,12 L20,12 M6,6 L4.5,4.5 M18,18 L16.5,16.5 M6,18 L4.5,19.5 M18,6 L16.5,7.5" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  Make sure that you're in a well-lighted environment.
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <rect x="8" y="4" width="3" height="12" rx="1.5" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <circle cx="9.5" cy="18" r="2" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M9,4 L9,2 M9,22 L9,20" stroke="#333" strokeWidth="1.5"/>
                    <path d="M13,12 L20,12 M13,8 L18,8 M13,16 L16,16" stroke="#333" strokeWidth="1.5"/>
                    <path d="M15,12 L15,8 M18,12 L18,8" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  Testing with no-makeup will get more accurate results.
                </div>
              </div>
              
              <div className="instruction-item">
                <div className="instruction-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <circle cx="12" cy="10" r="6" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <circle cx="12" cy="10" r="2" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M12,16 L12,20 M8,20 L16,20" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="instruction-text">
                  Looking straight to the camera and keep your face in the circle.
                </div>
              </div>
              
              <button className="get-started-button" onClick={() => setShowInstructions(false)}>
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinAnalyzer;