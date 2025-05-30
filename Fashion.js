import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FashionCards.css';
import imageSource from './assests/mainmodel.jpg';
import mensImage from './assests/men2.jpg';

const FashionShowcase = () => {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreDesigner = () => {
    navigate('/ExploreDesigner'); // Navigate to Women's Tailors page
  };

  const handleExploreTailor = () => {
    navigate('/ExploreTailor'); // Navigate to Men's Tailors page
  };

  return (
    <div className="page-wrapper">
      {/* Women's Fashion Card */}
      <div className="fashion-card">
        <div className="image-container">
          <img src={imageSource} alt="Women's Fashion" className="main-image" />
        </div>
        <div className={`overlay-text ${showText ? 'show' : ''}`}>
          <h1 className="heading">Eternal Elegance</h1>
          <p className="quote">"Where art meets heritage, and dreams are woven into fabric."</p>
          <p className="sub-quote">A celebration of timeless craftsmanship and culture.</p>
          <button className="explore-btn" onClick={handleExploreDesigner}>
            Explore Designers
          </button>
        </div>
      </div>

      {/* Men's Fashion Card */}
      <div className="mens-card-wrapper">
        <div className="mens-card">
          <div className="mens-img-section">
            <img src={mensImage} alt="Men's Fashion" className="mens-img" />
          </div>
          <div className="mens-text-section">
            <h2 className="mens-heading">Regal Threads</h2>
            <p className="mens-quote">"Unfold your personality through the bold elegance of men's couture."</p>
            <p className="mens-sub-quote">Tradition meets innovation — tailored just for you.</p>
            <button className="explore-btn" onClick={handleExploreTailor}>
              Meet Tailor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionShowcase;
