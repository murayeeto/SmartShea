import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [skinType, setSkinType] = useState('');

  const questions = [
    {
      question: "How does your skin feel after cleansing?",
      options: [
        "Tight and dry",
        "Comfortable and balanced",
        "Oily, especially in the T-zone",
        "Combination of dry and oily"
      ]
    },
    {
      question: "How often do you experience breakouts?",
      options: [
        "Rarely or never",
        "Occasionally",
        "Frequently, especially in the T-zone",
        "Regularly across my face"
      ]
    },
    {
      question: "How would you describe your pores?",
      options: [
        "Small and barely visible",
        "Visible but not enlarged",
        "Enlarged, especially in the T-zone",
        "Enlarged across most of my face"
      ]
    },
    {
      question: "How does your skin react to new products?",
      options: [
        "Often becomes irritated or red",
        "Usually adapts well with minimal reaction",
        "May become oilier or break out",
        "Different areas react differently"
      ]
    },
    {
      question: "By mid-day, how does your skin typically feel?",
      options: [
        "Dry or flaky",
        "Still feels balanced",
        "Shiny and oily, especially in the T-zone",
        "Oily in some areas, dry in others"
      ]
    }
  ];

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const result = calculateSkinType(newAnswers);
      setSkinType(result);
      setShowResults(true);
    }
  };

  const calculateSkinType = (userAnswers) => {
    // Count the frequency of each answer type
    const counts = [0, 0, 0, 0]; // [dry, normal, oily, combination]
    
    userAnswers.forEach(answer => {
      counts[answer]++;
    });
    
    // Find the most frequent answer
    const maxCount = Math.max(...counts);
    const maxIndex = counts.indexOf(maxCount);
    
    // Map index to skin type
    switch(maxIndex) {
      case 0: return "Dry";
      case 1: return "Normal";
      case 2: return "Oily";
      case 3: return "Combination";
      default: return "Normal";
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSkinType('');
  };

  const getRecommendations = (type) => {
    switch(type) {
      case "Dry":
        return {
          routine: "Gentle hydrating cleanser, alcohol-free toner, rich moisturizer, and facial oil.",
          ingredients: "Look for hyaluronic acid, glycerin, ceramides, and shea butter.",
          products: "SmartShea Hydrating Collection is perfect for your skin type."
        };
      case "Normal":
        return {
          routine: "Gentle cleanser, hydrating toner, light moisturizer, and weekly exfoliation.",
          ingredients: "Look for niacinamide, peptides, and antioxidants.",
          products: "SmartShea Balanced Collection will help maintain your skin's natural balance."
        };
      case "Oily":
        return {
          routine: "Foaming cleanser, alcohol-free toner, oil-free moisturizer, and clay masks.",
          ingredients: "Look for salicylic acid, tea tree oil, and lightweight hydrators.",
          products: "SmartShea Oil Control Collection will help manage excess oil production."
        };
      case "Combination":
        return {
          routine: "Gentle cleanser, balancing toner, lightweight moisturizer, and targeted treatments.",
          ingredients: "Look for niacinamide, hyaluronic acid, and gentle exfoliants.",
          products: "SmartShea Balancing Collection addresses both dry and oily areas."
        };
      default:
        return {
          routine: "",
          ingredients: "",
          products: ""
        };
    }
  };

  return (
    <div className="container">
      <div className="card quiz-container">
        <h1 className="quiz-title">Skin Type Quiz</h1>
        
        {!showResults ? (
          <div className="question-container">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{width: `${(currentQuestion / questions.length) * 100}%`}}
              ></div>
            </div>
            <h2 className="question">
              Question {currentQuestion + 1}/{questions.length}: {questions[currentQuestion].question}
            </h2>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className="option-button"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="results-container">
            <h2 className="result-title">Your Skin Type: <span className="skin-type">{skinType}</span></h2>
            
            <div className="result-card">
              <h3>Recommended Routine</h3>
              <p>{getRecommendations(skinType).routine}</p>
            </div>
            
            <div className="result-card">
              <h3>Key Ingredients</h3>
              <p>{getRecommendations(skinType).ingredients}</p>
            </div>
            
            <div className="result-card">
              <h3>Product Recommendations</h3>
              <p>{getRecommendations(skinType).products}</p>
            </div>
            
            <div className="result-actions">
              <button className="primary-button" onClick={resetQuiz}>
                Retake Quiz
              </button>
              <Link to="/products" className="secondary-button">
                Shop Recommended Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;