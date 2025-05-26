// FabricDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FabricDetails.css';

const FabricDetail = () => {
  const { categoryName, subtypeId } = useParams();
  const navigate = useNavigate(); // ✅ added for navigation
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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("fabricCart")) || [];
    const selectedFabric = {
      fabricName: fabric.name,
      price: fabric.price,
      image: images?.[0] || 'default-image.jpg',
      shopId: fabric.shopId,
      categoryName,
      subtypeId
    };
    cart.push(selectedFabric);
    localStorage.setItem("fabricCart", JSON.stringify(cart));
    alert("Fabric added to cart!");

    // ✅ Redirect back to order form
    navigate("/orderform/:id");
  };

  return (
    <div className="fabric-detail-container">
      <div className="breadcrumb">Home / Fabrics / {fabric.name}</div>

      <div className="fabric-content">
        <div className="fabric-image-container">
          <img
            src={`http://localhost:5000/uploads/portfolio/${images?.[0] || 'default-image.jpg'}`}
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

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FabricDetail;
