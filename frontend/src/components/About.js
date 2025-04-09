import React from 'react';
// Define image paths from public directory with repository name
const avaImage = '/SmartShea/images/about us/CD5D698B-08BF-4B61-A67F-78A7F44AA884.jpg';       // Ava Larkin
const martinImage = '/SmartShea/images/about us/IMG_0828.jpg';    // Martin Solomon
const ngangImage = '/SmartShea/images/about us/SPOILER_SPOILER_IMG_7484.jpg';     // Ngangseh Leboh
const matthewImage = '/SmartShea/images/about us/Resized_IMG-20250407-WA0001_1744056142351.jpg';   // Matthew Little
const christianImage = '/SmartShea/images/about us/HeadShot.png'; // Christian Avila

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
      <h1>About Us</h1>
      <p>
        Welcome to SmartShea, where cutting-edge AI technology meets natural skincare. We're dedicated to helping
        you understand your skin better and find the perfect shea butter products for your unique needs.
      </p>
      
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
      
      <div className="team-section">
        <h2 className="subheading">Our Team</h2>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
