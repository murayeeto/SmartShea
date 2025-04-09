import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import SkinAnalyzer from './components/SkinAnalyzer';
import Result from './components/Result';
import SkincareTips from './components/SkincareTips';
import NaturalSheaButter from './components/NaturalSheaButter';
import WhySmartShea from './components/WhySmartShea';
import Quiz from './components/Quiz';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Set Home as the default page */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/skincare-tips" element={<SkincareTips />} />
          <Route path="/why-smartshea" element={<WhySmartShea />} />
          <Route path="/natural-shea-butter" element={<NaturalSheaButter />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/skin-tester" element={
            <div>
              <div className="header">
                <h1>SmartShea Skin Analysis</h1>
                <p>Take a photo of your skin to get an analysis and personalized SmartShea product recommendations</p>
              </div>
              
              <div className="card">
                <SkinAnalyzer
                  setResult={setResult}
                  setLoading={setLoading}
                  setError={setError}
                />
              </div>
              
              {loading && (
                <div className="card">
                  <p>Analyzing your skin...</p>
                </div>
              )}
              
              {error && (
                <div className="card">
                  <p style={{ color: 'red' }}>{error}</p>
                </div>
              )}
              
              {result && (
                <div className="card">
                  <Result result={result} />
                </div>
              )}
            </div>
          } />
          {/* Redirect any unknown paths to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;