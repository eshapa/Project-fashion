import React, { useState } from 'react';
import './Herosection.css';
import mendress from './assests/men2.jpg';
import womenTailor from './assests/mainmodel.jpg';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import './Fashion';
import './FashionCards.css';


const HeroSection = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showText, setShowText] = useState(true); // Control overlay visibility

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleExploreTailor = () => {
    window.location.href = "/exploretailor"; // Navigate to tailors page
  };

  const handleExploreDesigner = () => {
    window.location.href = "/exploredesigner"; // Navigate to designers page
  };

  return (
    <div className="hero-wrapper">
      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">
            Crafting Emotions,<br />
            Tailoring Memories
          </h1>
        </div>
        <div className="hero-right">
          <video
            className="hero-video"
            src="https://richardgeorge.uk/wp-content/uploads/2024/05/RG-SS24-Home.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Marquee Text */}
      <div className="marquee-container">
        <p className="marquee-text">
          - Tailoring by Divyluck - Tailoring by Divyluck - Tailoring by Divyluck -
        </p>
      </div>

      {/* Quote Section */}
      <div className="quote-section">
        <p className="quote-text2">
          Appreciation of exquisitely made attire. Here you’ll feel special, and receive a uniquely personal tailoring experience.
        </p>
        <p className="quote-signature">Divyluck</p>
      </div>

      {/* Fullscreen Background Video Section */}
      <div className="video-container">
  <video
    className="background-video"
    src="https://richardgeorge.uk/wp-content/uploads/2024/01/homepage1.mp4"
    autoPlay
    loop
    muted
    playsInline
  ></video>
  
  {/* Add this overlay div right after the video */}
  <div className="video-overlay3"></div>
  
  <div className="video-overlay-text">
   <p className="hero-text"> {/* Added class for the paragraph */}
      We are a tailoring company where<br />
      incredible tailoring is the by-product.<br />
      What we create is feeling and emotion…
    </p>
    <Link to="/alldesigner" className="explore-button">Explore All Tailors</Link>
  </div>
</div>

      {/* Men's Tailoring Section */}
     <div className="below-hero-container">
        <div className="video-left">
          <video src="https://richardgeorge.uk/wp-content/uploads/2024/01/homepage2.mp4" autoPlay muted loop className="hero-video" />
        </div>

        <div className="content-right">
          <div className="mens-card-wrapper">
            <div className="mens-card">
              <div className="mens-img-section">
                <img src={mendress} alt="Men's Fashion" className="mens-img" />
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

          <div className="content-paragraph-wrapper">
            <p className="content-paragraph">
              When you commission a piece from us, we invite you to share the elation and the goosebumps created as a result of crafting a piece of beautiful tailoring that fits, that looks incredible and is, to put it simply, a work of art.
            </p>
            <p className="tailoring-label">MEN’S TAILORING</p>
          </div>
        </div>
      </div>

      {/* Women's Tailoring Section */}
      <div className="below-hero-container women-tailoring-section">
        <div className="image-left">
          <div className="fashion-card">
            <div className="image-container">
              <img src={womenTailor} alt="Women's Fashion" className="main-image" />
            </div>
            <div className={`overlay-text ${showText ? 'show' : ''}`}>
              <h1 className="heading">Eternal Elegance</h1>
              <p className="quote">"Where art meets heritage, and dreams are woven into fabric."</p>
              <p className="sub-quote">A celebration of timeless craftsmanship and culture.</p>
              {/* Change from <a> to <Link> for navigation */}
              <Link to="/exploredesigner" className="explore-btn">
                Explore Designers
              </Link>
            </div>
          </div>
        </div>

        <div className="content-right">
          <p className="content-paragraph">
            “To achieve an immaculate fit requires meticulousness in negotiating the subject's contours and silhouette.
            Sculpting made-to-measure tailoring for Women is in itself a skillful craft.”
          </p>
          <p className="quote-signature">- Esha Prajkta</p>
          <p className="tailoring-label">WOMEN’S TAILORING</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
