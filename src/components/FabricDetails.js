import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FabricDetails.css';

const FabricDetail = () => {
  const { categoryName, subtypeId } = useParams();
  const [fabric, setFabric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFabric = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/fabrics/${categoryName}/${subtypeId}`);
        setFabric(res.data);
      } catch (err) {
        setError('Failed to load fabric details');
      } finally {
        setLoading(false);
      }
    };

    fetchFabric();
  }, [categoryName, subtypeId]);

  if (loading) return <div className="fabric-loading">Loading fabric details...</div>;
  if (error) return <div className="fabric-error">{error}</div>;
  if (!fabric) return <div className="fabric-not-found">Fabric Not Found</div>;

  const images = fabric.images;

  const discounts = [
    { range: "₹2500 - ₹4999", discount: "5% off" },
    { range: "₹5000 - ₹7999", discount: "10% off" },
    { range: "₹8000 - ₹12000", discount: "15% off" },
    { range: "Above ₹12000", discount: "20% off" }
  ];

  return (
    <div className="fabric-detail-container">
      <div className="breadcrumb">Home / Fabrics / {fabric.name}</div>

      <div className="fabric-content">
        <div className="fabric-image-container">
         <img
  src={`http://localhost:5000/uploads/portfolio/${images && images.length > 0 ? images[0] : 'default-image.jpg'}`}
  alt={fabric.name}
  className="fabric-image"
/>

        </div>

        <div className="fabric-info">
          <h1 className="fabric-title">{fabric.name}</h1>

          <div className="quantity-info">
            <h3>Quantity in meters</h3>
            <p>{fabric.quantity} meters in stock</p>
          </div>

          <div className="pricing">
            <span className="current-price">₹{fabric.price.toFixed(2)}</span>
            {fabric.originalPrice && (
              <span className="original-price">
                ₹{fabric.originalPrice.toFixed(2)} /meter
              </span>
            )}
            <span className="tax-info">Inclusive of all taxes</span>
          </div>

          {fabric.features && fabric.features.length > 0 && (
            <ul className="features-list">
              {fabric.features.map((feature, index) => (
                <li key={index} className="feature-item">✓ {feature}</li>
              ))}
            </ul>
          )}

          <div className="discount-section">
            <h4>BUY MORE, SAVE MORE!</h4>
            <ul>
              {discounts.map((d, idx) => (
                <li key={idx}>
                  {d.range}: <strong>{d.discount}</strong>
                </li>
              ))}
            </ul>
          </div>

          <button className="add-to-cart-btn">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default FabricDetail;
