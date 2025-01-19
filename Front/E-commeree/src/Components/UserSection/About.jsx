import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h1 className="about-title">Welcome to MernMarket</h1>
        <p className="about-text">
          At <strong>MernMarket</strong>, we blend fashion with technology to deliver a seamless shopping experience. 
          Discover premium clothing for men, women, and kids, tailored to meet your style and budget.
        </p>
        <h2 className="about-subtitle">Why Shop with Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>🛍 Diverse Collections</h3>
            <p>Find everything from everyday essentials to luxurious outfits for special occasions.</p>
          </div>
          <div className="feature">
            <h3>✔ Quality Guaranteed</h3>
            <p>We offer only the best materials and craftsmanship, ensuring value for your money.</p>
          </div>
          <div className="feature">
            <h3>⚡ Seamless Experience</h3>
            <p>
              Powered by cutting-edge technology, enjoy fast loading speeds, secure payments, and intuitive navigation.
            </p>
          </div>
          <div className="feature">
            <h3>💰 Affordable Prices</h3>
            <p>Shop your favorite styles without compromising on quality or breaking the bank.</p>
          </div>
          <div className="feature">
            <h3>🌟 Customer First</h3>
            <p>Enjoy hassle-free returns, dedicated support, and a personalized shopping journey.</p>
          </div>
        </div>
        <p className="about-footer">
          Redefine your wardrobe today with <strong>MernMarket</strong>. Where fashion meets innovation.  
        </p>
      </div>
    </section>
  );
};

export default About;
