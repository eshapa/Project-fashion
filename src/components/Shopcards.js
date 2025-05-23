import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Shopcards.css';

const ShopCards = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopsWithCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shops/all');
        setShops(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching shops:', err);
        setLoading(false);
      }
    };
    fetchShopsWithCategories();
  }, []);

  if (loading) return <div className="loading">Loading shops...</div>;
  if (shops.length === 0) return <div className="no-shops">No shops found</div>;

  return (
    <div className="shop-cards-container">
      <h1 className="title">Fabric Shops</h1>
      <div className="cards-wrapper">
        {shops.map((shop, index) => (
          <div
            key={shop._id}
            className={`shop-card ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
          >
            <div className="image-container">
              <img 
                src={shop.shopImage || "/assets/shopimg.jpg"} 
                alt={shop.shopName}
                style={{
                  maxHeight: '280px',
                  objectPosition: 'center top'
                }}
              />
            </div>
            <div className="info-container">
              <h2 className="shop-name">{shop.shopName}</h2>
              <p className="shop-specialty">PARTY WEAR</p>
              <p className="shop-details">{shop.location}</p>
              <p className="shop-details">{shop.contact}</p>
              <p className="shop-experience">
                {shop.experience || '20+'}+ years mastering the craft
              </p>

              {shop.categories && shop.categories.length > 0 && (
                <div className="categories-section">
                  <h4>Fabric Categories:</h4>
                  <ul>
                    {shop.categories.map((cat, catIndex) => (
                      <li key={catIndex}>
                        <strong>{cat.categoryName}</strong>
                        <ul>
                          {cat.subtypes && cat.subtypes.length > 0 ? (
                            cat.subtypes.map((sub, subIndex) => (
                              <li key={subIndex}>
                                {sub.name} - ₹{sub.price}
                                {sub.images && sub.images.length > 0 && (
                                  <span> ({sub.images.length} images)</span>
                                )}
                              </li>
                            ))
                          ) : (
                            <li>No subtypes available</li>
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="explore-btn"
                onClick={() => navigate(`/shop-images/${shop._id}`)}
              >
                Discover Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCards;
