import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TailorPortfolio.css';
import im from '../components/assests/img.png';

const TailorProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tailorData, setTailorData] = useState(location.state?.tailor || null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const fashionQuotes = [
    "Fashion is the armor to survive everyday life",
    "Clothes mean nothing until someone lives in them",
    "Style is a way to say who you are without speaking",
    "Elegance is when the inside is as beautiful as the outside"
  ];
  const [currentQuote] = useState(fashionQuotes[Math.floor(Math.random() * fashionQuotes.length)]);

  useEffect(() => {
    const fetchTailor = async () => {
      if (!tailorData) {
        try {
          const res = await axios.get(`http://localhost:5000/api/tailors/${id}`);
          setTailorData(res.data);
        } catch (error) {
          console.error('Error fetching tailor:', error);
        }
      }
    };

    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/images/${id}`);
        setImages(res.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTailor();
    fetchImages();
  }, [id, tailorData]);

  const groupByCategory = (images) => {
    return images.reduce((grouped, img) => {
      const cat = img.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(img);
      return grouped;
    }, {});
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Portfolio...</p>
      </div>
    );
  }

  if (!tailorData) return <p className="error-message">Tailor data not found.</p>;

  const categorizedImages = groupByCategory(images);
  const categories = ['All', ...Object.keys(categorizedImages)];
  const filteredImages = activeCategory === 'All' ? images : categorizedImages[activeCategory] || [];

  const handleStitchClick = () => {
    navigate(`/orderform/${id}`, { state: { tailor: tailorData } });
  };

  const handleContactClick = () => {
    navigate(`/chat/${id}`, { state: { tailor: tailorData } });
  };

  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <header className="split-hero">
        <div className="left-panel">
          <h1 className="name-title">{tailorData.name.toUpperCase()}</h1>
          <h2 className="portfolio-title">PROFILE</h2>
          <div className="stats-grid">
            <div className="stat-card black-card">
              <span className="stat-number">{tailorData.experience}+</span>
              <span className="stat-label">YEARS EXPERIENCE</span>
            </div>
            <div className="stat-card black-card">
              <span className="stat-number">{images.length}+</span>
              <span className="stat-label">CREATIONS</span>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="quote-container">
            <p className="inspirational-quote">"{currentQuote}"</p>
            <div className="signature">— {tailorData.name.split(' ')[0]}</div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">ABOUT THE ARTIST</h2>
        <div className="about-grid">
          <div className="about-card glass-card">
            <h3>SPECIALTY</h3>
            <p>{tailorData.specialty}</p>
          </div>
          <div className="about-card glass-card">
            <h3>STYLE</h3>
            <p>{tailorData.tailorType}</p>
          </div>
          <div className="about-card glass-card">
            <h3>LOCATION</h3>
            <p>{tailorData.city}</p>
          </div>
          <div className="about-card glass-card">
            <h3>PRICING</h3>
            <p>{tailorData.pricingModel}</p>
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="highlight-section">
        <h2 className="section-title">TAILOR IN ACTION</h2>
        <div className="highlight-image-container black-card">
          <img src={im} alt="Tailor at work" className="highlight-image" />
          <div className="highlight-overlay">
            <p className="highlight-caption">Crafting excellence with every stitch.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <div className="section-header">
          <h2 className="section-title">MASTERPIECES</h2>
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredImages.length > 0 ? (
          <div className="masonry-gallery">
            {filteredImages.map((img) => (
              <div key={img._id} className="gallery-item black-card">
                <img
                  src={`http://localhost:5000${img.imagePath}`}
                  alt={img.caption}
                  className="gallery-image"
                />
                <div className="image-overlay">
                  <p className="image-caption">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-gallery">No creations in this category yet.</p>
        )}
      </section>

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button className="action-button glass-button" onClick={handleContactClick}>
          Contact
        </button>
        <button className="action-button black-button" onClick={handleStitchClick}>
          Stitch with This Tailor
        </button>
      </div>
    </div>
  );
};

export default TailorProfile;
