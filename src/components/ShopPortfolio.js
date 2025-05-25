import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShopPortfolio.css';

const ShopPortfolio = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shopInfo, setShopInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const collectionsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all shops and find current shop info
        const shopRes = await axios.get('http://localhost:5000/api/shops/all');
        const currentShop = shopRes.data.find(shop => shop._id === shopId);
        setShopInfo(currentShop);

        // Fetch categories and subtypes (fabrics) by shopId
        const fabricRes = await axios.get(`http://localhost:5000/api/fabrics/shop/${shopId}`);
        setCategories(fabricRes.data);

        setTimeout(() => {
          setShowContent(true);
        }, 1000);
      } catch (err) {
        setError('Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  const filteredCategories = categories.filter(cat =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.subtypes.some(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return (
    <div className="bossy-loading">
      <div className="bossy-spinner"></div>
    </div>
  );

  if (error) return <div className="bossy-error">{error}</div>;
  if (!shopInfo) return <div className="bossy-not-found">SHOP NOT FOUND</div>;

  return (
    <div className="bossy-portfolio">
      {!showContent && (
        <div className="bossy-shop-name-reveal">
          <h1>{shopInfo.shopName.toUpperCase()}</h1>
        </div>
      )}

      {showContent && (
        <>
          {/* Hero/Intro can go here */}

          <div className="bossy-categories" ref={collectionsRef}>
            <div className="bossy-section-header">
              <h2>SHOP COLLECTIONS</h2>
              <p>EXPLORE OUR RANGE OF HANDWOVEN MASTERPIECES</p>
            </div>

            <div className="bossy-search-container">
              <input
                type="text"
                placeholder="Search categories or fabrics..."
                className="bossy-search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredCategories.length > 0 ? (
              <div className="bossy-categories-grid">
                {filteredCategories.map((cat, idx) => (
                  <div key={idx} className="bossy-category-section">
                    <h3 className="bossy-category-title">{cat.categoryName.toUpperCase()}</h3>

                    <div className="bossy-subcategories-grid">
                      {cat.subtypes.map((sub, subIdx) => (
                        <div key={subIdx} className="bossy-subcategory-card">
                          <h4>{sub.name.toUpperCase()}</h4>
                          <p className="bossy-price">₹{sub.price}</p>

                          <div className="bossy-images-grid">
                            {sub.images && sub.images.map((img, i) => (
                              <img
                                key={i}
                                src={`http://localhost:5000/uploads/portfolio/${img}`}
                                alt={`${sub.name}-${i}`}
                                className="bossy-grid-image"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/fabricdetails/${cat.categoryName}/${sub._id}`)}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="bossy-empty">NO COLLECTIONS FOUND</p>
            )}
          </div>
        </>
      )}
  

     
      {/* Scoped Internal CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&family=Great+Vibes&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

        .portfolio-wrapper {
          font-family: 'Poppins', sans-serif;
          color: #333;
        }

        .portfolio-hero {
          position: relative;
          height: 60vh;
          background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
          margin-bottom: 3rem;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 2rem;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: fadeIn 1.5s ease-in-out;
        }

        .hero-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .intro-section {
          display: flex;
          max-width: 1200px;
          margin: 0 auto 5rem;
          padding: 0 2rem;
          gap: 3rem;
        }

        .intro-left {
          flex: 1;
          min-width: 300px;
        }

        .intro-left h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .intro-left h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(to right, #6e48aa, #9d50bb);
          border-radius: 3px;
        }

        .intro-left p {
          line-height: 1.8;
          color: #555;
        }

        .intro-right {
          flex: 1;
          min-width: 300px;
        }

        .owner-portrait {
          position: relative;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .owner-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .owner-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          color: white;
        }

        .owner-info h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .owner-info p {
          font-style: italic;
          margin-bottom: 1rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.9rem;
        }

        .showcase-section {
          max-width: 1200px;
          margin: 0 auto 5rem;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .section-header h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(to right, #6e48aa, #9d50bb);
          border-radius: 3px;
        }

        .section-header p {
          color: #777;
          font-size: 1.1rem;
        }

        .fabric-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .fabric-card {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .fabric-card:hover {
          transform: translateY(-5px);
        }

        .card-image-container {
          position: relative;
          height: 300px;
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          color: white;
        }

        .image-overlay h4 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .image-overlay p {
          font-style: italic;
        }

        .categories-section {
          max-width: 1200px;
          margin: 0 auto 5rem;
          padding: 0 2rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .category-card {
          background: #f9f9f9;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .category-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .subcategory-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .subcategory-item {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .subcategory-item h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .subcategory-item p {
          color: #6e48aa;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .subcategory-images {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .subcategory-images img {
          height: 100px;
          width: auto;
          border-radius: 5px;
          object-fit: cover;
        }

        .empty-message {
          text-align: center;
          color: #777;
          font-style: italic;
          padding: 2rem 0;
        }

        .contact-section {
          background: #f5f5f5;
          padding: 4rem 2rem;
          text-align: center;
        }

        .contact-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .loading-spinner {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 5px solid rgba(110, 72, 170, 0.3);
          border-radius: 50%;
          border-top-color: #6e48aa;
          animation: spin 1s ease-in-out infinite;
          margin: 2rem auto;
          display: block;
        }

        .error-message {
          color: #d9534f;
          text-align: center;
          padding: 2rem;
          font-weight: 600;
        }

        .not-found {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .intro-section {
            flex-direction: column;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .fabric-gallery {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .category-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ShopPortfolio;