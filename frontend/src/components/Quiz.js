import React, { useState, useEffect } from 'react';
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
    },
    {
      question: "How does your skin feel in different seasons?",
      options: [
        "Drier year-round, extremely dry in winter",
        "Relatively consistent throughout the year",
        "Oilier year-round, extremely oily in summer",
        "Oily in summer, dry in winter"
      ]
    },
    {
      question: "How does your skin respond to humidity?",
      options: [
        "Feels better and more hydrated",
        "Not much difference",
        "Becomes more oily and prone to breakouts",
        "T-zone becomes oilier, cheeks stay normal"
      ]
    },
    {
      question: "How often do you need to apply moisturizer?",
      options: [
        "Multiple times throughout the day",
        "Once or twice daily is sufficient",
        "Rarely, as it makes my skin feel greasy",
        "Frequently on cheeks, rarely on T-zone"
      ]
    },
    {
      question: "How does your makeup wear throughout the day?",
      options: [
        "Flakes or clings to dry patches",
        "Stays relatively intact",
        "Slides off or becomes very shiny",
        "Fades on nose and forehead, stays put elsewhere"
      ]
    },
    {
      question: "How sensitive is your skin?",
      options: [
        "Very sensitive, often red or irritated",
        "Occasionally sensitive to specific ingredients",
        "Rarely sensitive, but can get oily with heavy products",
        "Sensitive in some areas, resilient in others"
      ]
    },
    {
      question: "How does your skin feel after using a clay mask?",
      options: [
        "Very tight and uncomfortable",
        "Clean and refreshed",
        "Temporarily less oily, then oilier later",
        "Comfortable in some areas, tight in others"
      ]
    },
    {
      question: "How does your skin react to exfoliation?",
      options: [
        "Often becomes irritated or more dry",
        "Becomes smoother and more radiant",
        "Temporarily less oily, then oilier later",
        "Some areas become irritated, others improve"
      ]
    },
    {
      question: "How would you describe the texture of your skin?",
      options: [
        "Often rough or flaky",
        "Generally smooth and even",
        "Smooth but with occasional blemishes",
        "Varies across different areas of face"
      ]
    },
    {
      question: "How does your skin feel in air-conditioned or heated environments?",
      options: [
        "Very dry and tight",
        "Not significantly affected",
        "Less oily and more comfortable",
        "Cheeks become drier, T-zone remains the same"
      ]
    },
    {
      question: "How does your skin look under bright light?",
      options: [
        "Dull or lacking radiance",
        "Even-toned with natural glow",
        "Shiny, especially in the T-zone",
        "Shiny in some areas, dull in others"
      ]
    },
    {
      question: "How does your skin react to stress?",
      options: [
        "Becomes drier or develops dry patches",
        "Minimal changes",
        "Becomes oilier and more prone to breakouts",
        "Develops both dry patches and breakouts"
      ]
    },
    {
      question: "How does your skin feel after a long flight?",
      options: [
        "Very dry and tight",
        "Slightly dehydrated but recovers quickly",
        "Initially dry, then becomes oilier",
        "Oily T-zone but dry cheeks"
      ]
    },
    {
      question: "How does your skin react to sun exposure?",
      options: [
        "Burns easily and becomes drier",
        "Tans gradually with proper protection",
        "Becomes oilier and may break out",
        "Some areas burn while others tan"
      ]
    },
    {
      question: "What type of cleanser works best for your skin?",
      options: [
        "Creamy, non-foaming cleansers",
        "Gentle foaming or gel cleansers",
        "Deep-cleaning or clay-based cleansers",
        "Different cleansers for different areas"
      ]
    },
    {
      question: "How does your skin feel when you don't use moisturizer?",
      options: [
        "Tight, uncomfortable, or flaky",
        "Slightly less hydrated but still comfortable",
        "Actually feels better or less oily",
        "Some areas feel tight, others feel fine"
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
          products: "SmartShea Hydrating Cream ($17.50) and SmartShea Night Repair Cream ($18.99) are perfect for your skin type. For everyday use, try our SmartShea Workday Moisturizer ($17.50)."
        };
      case "Normal":
        return {
          routine: "Gentle cleanser, hydrating toner, light moisturizer, and weekly exfoliation.",
          ingredients: "Look for niacinamide, peptides, and antioxidants.",
          products: "SmartShea Balancing Moisturizer ($17.50) and SmartShea Gentle Exfoliating Scrub ($15.99) will help maintain your skin's natural balance. For everyday use, try our SmartShea Workday Moisturizer ($17.50)."
        };
      case "Oily":
        return {
          routine: "Foaming cleanser, alcohol-free toner, oil-free moisturizer, and clay masks.",
          ingredients: "Look for salicylic acid, tea tree oil, and lightweight hydrators.",
          products: "SmartShea Oil Control Cleanser ($16.99) and SmartShea Mattifying Toner ($16.50) will help manage excess oil production. For a lightweight daily option, try our SmartShea Workday Moisturizer ($17.50)."
        };
      case "Combination":
        return {
          routine: "Gentle cleanser, balancing toner, lightweight moisturizer, and targeted treatments.",
          ingredients: "Look for niacinamide, hyaluronic acid, and gentle exfoliants.",
          products: "SmartShea Combination Skin Solution ($17.50) addresses both dry and oily areas. Pair with SmartShea Gentle Exfoliating Scrub ($15.99) for best results. For everyday use, try our SmartShea Workday Moisturizer ($17.50)."
        };
      default:
        return {
          routine: "",
          ingredients: "",
          products: ""
        };
    }
  };

  // Add animation effect when changing questions
  useEffect(() => {
    // This empty dependency array ensures this only runs once on mount
  }, []);

  // Get skin type color for styling
  const getSkinTypeColor = (type) => {
    switch(type) {
      case "Dry": return "#f1c40f"; // Yellow
      case "Normal": return "#2ecc71"; // Green
      case "Oily": return "#e74c3c"; // Red
      case "Combination": return "#3498db"; // Blue
      default: return "#7ab51d"; // Default green
    }
  };

  return (
    <div className="container">
      <div className="card quiz-container">
        <h1 className="quiz-title">Discover Your Skin Type</h1>
        
        {!showResults ? (
          <div className="question-container">
            <div className="progress-bar">
              <div
                className="progress"
                style={{width: `${(currentQuestion / questions.length) * 100}%`}}
              ></div>
            </div>
            
            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <h2 className="question">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="option-text">{option}</span>
                  <span className="option-icon">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="results-container">
            <div className="result-header">
              <h2 className="result-title">Your Skin Type:</h2>
              <span
                className="skin-type"
                style={{color: getSkinTypeColor(skinType)}}
              >
                {skinType}
              </span>
              <p className="result-description">
                Based on your answers, we've identified your skin type and created personalized recommendations just for you.
              </p>
            </div>
            
            <div className="result-card" style={{borderLeftColor: getSkinTypeColor(skinType)}}>
              <h3>Recommended Routine</h3>
              <p>{getRecommendations(skinType).routine}</p>
            </div>
            
            <div className="result-card" style={{borderLeftColor: getSkinTypeColor(skinType)}}>
              <h3>Key Ingredients</h3>
              <p>{getRecommendations(skinType).ingredients}</p>
            </div>
            
            <div className="result-card" style={{borderLeftColor: getSkinTypeColor(skinType)}}>
              <h3>Product Recommendations</h3>
              <p>{getRecommendations(skinType).products}</p>
            </div>
            
            <div className="result-actions">
              <button className="primary-button" onClick={resetQuiz}>
                <span className="button-icon">↺</span> Retake Quiz
              </button>
              <Link to="/products" className="secondary-button">
                <span className="button-icon">🛍️</span> Shop Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;