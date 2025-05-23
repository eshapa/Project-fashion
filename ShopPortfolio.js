import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ShopPortfolio.css';

const ShopPortfolio = () => {
  const { shopId } = useParams();
  const [shopInfo, setShopInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopRes = await axios.get(`http://localhost:5000/api/shops/all`);
        const allShops = shopRes.data;
        const currentShop = allShops.find(shop => shop._id === shopId);
        setShopInfo(currentShop);

        const fabricRes = await axios.get(`http://localhost:5000/api/fabrics/shop/${shopId}`);
        setCategories(fabricRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load shop data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  if (loading) return <div className="loading">Loading shop portfolio...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!shopInfo) return <div className="no-shop">Shop not found</div>;

  return (
    <div className="portfolio-container">
      {/* Handwritten Portfolio Title with Gradient Underline */}
      <h1 className="portfolio-heading">Portfolio</h1>

      <div className="shop-header">
        <div className="shop-image-container">
          <img 
            src={shopInfo.shopImage || "/assests/shopimg.jpg"} 
            alt={shopInfo.shopName}
          />
        </div>
        <div className="shop-info">
          <h1 className="shop-title animated-title">{shopInfo.shopName}</h1>
          <p className="shop-detail"><strong>Owner:</strong> {shopInfo.owner}</p>
          <p className="shop-detail"><strong>Email:</strong> {shopInfo.email}</p>
          <p className="shop-detail"><strong>Contact:</strong> {shopInfo.contact}</p>
          <p className="shop-detail"><strong>Location:</strong> {shopInfo.location}</p>
          <p className="shop-detail"><strong>Experience:</strong> {shopInfo.experience || '20+'}+ years</p>
        </div>
      </div>

      <div className="categories-portfolio">
        <h3 className="categories-title">Our Fabric Collections</h3>
        {categories.length > 0 ? (
          <div className="category-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-block">
                <h4>{cat.categoryName}</h4>
                <div className="subcategory-grid">
                  {cat.subtypes.map((sub, subIdx) => (
                    <div key={subIdx} className="subcategory-card">
                      <h5>{sub.name}</h5>
                      <p><strong>Price:</strong> ₹{sub.price}</p>
                      <div className="image-gallery">
                        {sub.images && sub.images.map((img, i) => (
                          <img
                            key={i}
                            src={`http://localhost:5000/uploads/portfolio/${img}`}
                            alt={`${sub.name}-${i}`}
                            className="portfolio-image"
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
          <p>No fabric categories uploaded yet.</p>
        )}
      </div>

      {/* Scoped Internal CSS for handwritten heading */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .portfolio-heading {
          text-align: center;
          font-family: 'Great Vibes', cursive;
          font-size: 3.5rem;
          font-weight: 500;
          color: #2c2c2c;
          margin-bottom: 20px;
          position: relative;
          animation: fadeSlideIn 1.8s ease forwards;
          opacity: 0;
        }

        .portfolio-heading::after {
          content: '';
          display: block;
          width: 150px;
          height: 4px;
          margin: 0 auto;
          background: linear-gradient(to right, #7b2ff7, #f2f2f2);
          border-radius: 2px;
          margin-top: 10px;
        }

        @keyframes fadeSlideIn {
          0% {
            transform: translateX(-50%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ShopPortfolio;
