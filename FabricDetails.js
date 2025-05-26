import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FabricDetails.css';
import { FaShieldAlt, FaMoneyBillWave, FaHandshake } from "react-icons/fa";

const FabricDetail = () => {
  const { categoryName, subtypeId } = useParams();
  const [fabric, setFabric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
   const navigate = useNavigate();

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

  const handleZipCodeCheck = () => {
    console.log('Checking zip code:', zipCode);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const discounts = [
    { range: "₹2500 - ₹4999", discount: "5% off" },
    { range: "₹5000 - ₹7999", discount: "10% off" },
    { range: "₹8000 - ₹12000", discount: "15% off" },
    { range: "Above ₹12000", discount: "20% off" }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="content-box">
            <p><strong>Description</strong><br />
              {fabric.name} – often referred to as wonder gossamer, is a sheer, delicate, lightweight, fine and a soft cotton. Fabcurate's digital print cotton mulmul fabric is a step ahead. Adding to the already existing beauty of mulmul are the beautiful digital prints, containing alluring colors. Add a touch of richness in your wardrobe by developing ensembles like saree, suit, dupatta, lehenga, kurta, shirts, cords and much more.
            </p>
            <p><strong>Material</strong><br />{fabric.name}</p>
            <p><strong>Width</strong><br />44 Inches | 112 Cms.</p>
            <p><strong>Weight</strong><br />Approx. 60 grams per meter</p>
            <p><strong>Quality</strong><br />100% {fabric.name}</p>
            <p><strong>Disclaimer</strong><br />Slight difference in color from visible product image is possible.</p>
            <p><strong>Wash Care</strong><br />Gentle hand wash in cold water. Please iron the fabric from the reverse side. Please do not iron on the printed side.</p>
            <p><strong>Note</strong><br />All the taxes and duties will be borne by customers for international orders.</p>
            <p><strong>Mfg. Or Mfg. By</strong><br />Fabcurate</p>
          </div>
        );
      case "estimator":
        return (
          <div className="content-box">
            <p>
              <strong>Confused about how many meters of fabric you need?</strong><br />
              Click on the fabric estimator and you will get the proper idea of it.
            </p>
          </div>
        );
      case "shipping":
        return (
          <div className="content-box">
            <p>
              <strong>Shipping</strong><br />
              Shipping is done in the most effective way i.e. faster and with utmost care.
              Shipment is done all over India and foreign countries too.
            </p>
          </div>
        );
      case "washcare":
        return (
          <div className="content-box">
            <p>
              <strong>Washcare</strong><br />
              Make sure to wash it carefully, so that the originality remains intact.
              If preferred, use dry clean only.
            </p>
          </div>
        );
      default:
        return null;
    }
  };



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

  if (loading) return <div className="fabric-loading">Loading fabric details...</div>;
  if (error) return <div className="fabric-error">{error}</div>;
  if (!fabric) return <div className="fabric-not-found">Fabric Not Found</div>;

  const images = fabric.images || [];

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <span className="stock-status in-stock">In Stock</span>
      </div>

      <div className="product-content">
        <div className="product-image-container">
          <img
            src={`http://localhost:5000/uploads/portfolio/${images.length > 0 ? images[0] : 'default-image.jpg'}`}
            alt={fabric.name}
            className="product-image"
            onClick={() => openModal(images[0])}
          />

          <div className="fabric-info-container">
            <div className="tabs">
              <span
                className={`tab ${activeTab === "description" ? "active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                DESCRIPTION
              </span>
              <span
                className={`tab ${activeTab === "estimator" ? "active" : ""}`}
                onClick={() => setActiveTab("estimator")}
              >
                FABRIC ESTIMATOR
              </span>
              <span
                className={`tab ${activeTab === "shipping" ? "active" : ""}`}
                onClick={() => setActiveTab("shipping")}
              >
                SHIPPING
              </span>
              <span
                className={`tab ${activeTab === "washcare" ? "active" : ""}`}
                onClick={() => setActiveTab("washcare")}
              >
                WASHCARE
              </span>
            </div>
            <div className="tab-content">{renderContent()}</div>
          </div>
        </div>

        <div className="product-info">
          <h2 className="product-title">DivyLuck Has More To Try, More To Show More To Buy</h2>
          <h1 className="fabric-title">{fabric.name}</h1>
          <p className="fabric-subtitle">{fabric.description}</p>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="review-count">16 reviews</span>
          </div>
          <div className="size-section">
            <h3>Quantity in meters</h3>
            <div className="quantity-input">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <span>meters</span>
            </div>
            <p className="stock">{fabric.stock || 0} meters in stock</p>
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

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          </div>

          <div className="discount-section">
            <h4>Discount Table</h4>
            <table className="discount-table">
              <thead>
                <tr>
                  <th>Order Value Range (₹)</th>
                  <th>Discount (%)</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.range}</td>
                    <td>{item.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="prepaid-offer">Additional 10% off on prepaid orders, no minimum order value</p>
          </div>

            <div className="value-props">
    <p className="value-heading">When you choose Fabcurate you choose</p>
    <div className="value-icons">
        <div className="value-item">
        <FaShieldAlt className="value-icon" />
        <span>Exceptional Quality</span>
        </div>
        <div className="value-item">
        <FaMoneyBillWave className="value-icon" />
        <span>Value For Money</span>
        </div>
        <div className="value-item">
        <FaHandshake className="value-icon" />
        <span>Trust Of Brand</span>
                    </div>
                </div>

                <div className="value-tag">
  <div className="value-item1">
    <svg className="tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
    <span>Cash On Delivery</span>
  </div>
  <div className="value-item1">
    <svg className="tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
    <span>Free Shipping Over ₹849</span>
  </div>
</div>


<div className="value-tag2">
  <div className="value-item2">
    <svg className="tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
    <span>Make in India</span>
  </div>
  <div className="value-item2">
    <svg className="tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>Assured Quality</span>
  </div>
</div>
            </div>
           </div>
          </div>

          

      {showModal && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:5000/uploads/portfolio/${selectedImage}`}
              alt="Selected Product"
              className="modal-product-image"
            />
            <button className="modal-close-btn" onClick={closeModal}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricDetail;