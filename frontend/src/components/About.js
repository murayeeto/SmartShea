import React from 'react';
// Import team member images
import avaImage from '../assets/about us/about-image1.png';       // Ava Larkin
import martinImage from '../assets/about us/about-image2.png';    // Martin Solomon
import ngangImage from '../assets/about us/about-image3.png';     // Ngangseh Leboh
import matthewImage from '../assets/about us/about-image4.png';   // Matthew Little
import christianImage from '../assets/about us/headshot.png'; // Christian Avila

const About = () => {
  // Use imported images in the correct order: Ngangseh, Martin, Christian, Matthew, Ava
  const aboutImages = [
    ngangImage,    // Ngangseh Leboh
    martinImage,   // Martin Solomon
    christianImage, // Christian Avila
    matthewImage,  // Matthew Little
    avaImage       // Ava Larkin
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          Welcome to SmartShea, where cutting-edge AI technology meets natural skincare. We're dedicated to helping
          you understand your skin better and find the perfect shea butter products for your unique needs.
        </p>
      </div>
      
      <div className="story-section">
        <h2 className="subheading">Our Story</h2>
        <p>
          Founded with a vision to revolutionize skincare, SmartShea is an AI-powered business that combines
          the ancient wisdom of natural shea butter with modern technology. Our journey began when we discovered
          the incredible benefits of naturally sourced shea butter and wanted to make these benefits accessible
          to everyone with personalized recommendations.
        </p>
        <p>
          Our AI skin analyzer is the heart of our business. This cutting-edge technology can accurately determine
          your skin type from just a photo and recommend the perfect shea butter product formulation for your
          specific needs. We've trained our AI on thousands of skin samples to ensure it provides the most
          accurate analysis possible.
        </p>
        <p>
          All our shea butter products are ethically sourced from West Africa, where we work directly with
          local communities to ensure fair trade practices. We believe in sustainability and transparency
          throughout our supply chain, from harvesting to the final product that reaches your hands.
        </p>
        <p>
          At SmartShea, we're not just selling skincare products – we're offering a personalized skincare
          experience powered by AI that connects you with the natural healing properties of shea butter
          that's perfect for your unique skin.
        </p>
      </div>
      
      <div className="team-section">
        <div className="team-header">
          <h2 className="subheading">Meet Our Team</h2>
          <p className="team-intro">
            Our diverse team of experts is passionate about combining technology with natural skincare solutions.
            Together, we're revolutionizing the skincare industry with AI-powered personalization.
          </p>
        </div>
        <div className="team-members">
          {aboutImages.map((image, index) => (
            <div key={index} className="team-member">
              <div className="circle-container">
                <img src={image} alt={`Team member ${index + 1}`} className="circle-image" />
              </div>
              <h3 className="team-member-name">
                {index === 0 ? "Ngangseh Leboh" :
                 index === 1 ? "Martin Solomon" :
                 index === 2 ? "Christian Avila" :
                 index === 3 ? "Matthew Little" :
                 "Ava Larkin"}
              </h3>
              <p className="team-member-title">
                {index === 0 ? "Chief Production Officer" :
                 index === 1 ? "Vice President & Chief Marketing Officer" :
                 index === 2 ? "Chief Operations Officer" :
                 index === 3 ? "Chief Technology Officer" :
                 "Chief Executive Officer & Chief Financial Officer"}
              </p>
              <p className="team-member-bio">
                {index === 0 ? "Expert in shea butter production and quality control." :
                 index === 1 ? "Marketing strategist with a passion for natural products." :
                 index === 2 ? "Operations specialist focused on sustainable business practices." :
                 index === 3 ? "AI and technology expert behind our skin analysis system." :
                 "Visionary leader driving SmartShea's mission and growth."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <h2>Experience the SmartShea Difference</h2>
        <p>
          Ready to discover the perfect shea butter products for your unique skin? Try our AI skin analyzer
          or explore our range of ethically sourced, natural shea butter products.
        </p>
        <div className="cta-buttons">
          <a href="#/skin-tester" className="primary-button">Try Skin Analyzer</a>
          <a href="#/products" className="secondary-button">Explore Products</a>
        </div>
      </div>
    </div>
  );
};

export default About;
