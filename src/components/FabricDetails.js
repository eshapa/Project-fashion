import React from 'react';
import './FabricDetails.css'; // We'll create this CSS file next

const FabricDetail = () => {
  const fabric = {
    name: "Premium Crepe Fabric",
    price: 249.00,
    originalPrice: 269.00,
    quantity: 50.0,
    description: "Crepe is a silk, wool or synthetic fiber fabric with a distinctively crisp, crimped appearance. It has a flowy and luxurious feel that drapes beautifully. Our premium crepe is soft to the touch while maintaining excellent structure.",
    features: [
      "Top choice of designers",
      "Versatile use, premium look",
      "Soft to the touch with a luxurious feel",
      "Expertly crafted yarn brings colors to life"
    ],
    imageUrl: "/path-to-your-fabric-image.jpg" // Replace with actual image path
  };

  const discounts = [
    { range: "₹2500 - ₹4999", discount: "5% off" },
    { range: "₹5000 - ₹7999", discount: "10% off" },
    { range: "₹8000 - ₹12000", discount: "15% off" },
    { range: "Above ₹12000", discount: "20% off" }
  ];

  return (
    <div className="fabric-detail-container">
      <div className="breadcrumb">Home / Fabrics / Crepe</div>
      
      <div className="fabric-content">
        <div className="fabric-image-container">
          <img src={fabric.imageUrl} alt={fabric.name} className="fabric-image" />
        </div>
        
        <div className="fabric-info">
          <h1 className="fabric-title">{fabric.name}</h1>
          
          <div className="quantity-info">
            <h3>Quantity in meters</h3>
            <p>{fabric.quantity} meters in stock</p>
          </div>
          
          <div className="pricing">
            <span className="current-price">₹{fabric.price.toFixed(2)}</span>
            <span className="original-price">₹{fabric.originalPrice.toFixed(2)} /meter</span>
            <span className="tax-info">Inclusive of all taxes</span>
          </div>
          
          <ul className="features-list">
            {fabric.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <div className="action-buttons">
            <button className="add-to-cart">ADD TO CART</button>
            <button className="buy-now">BUY NOW</button>
          </div>
          
          <div className="discount-table">
            <h3>Discount Table</h3>
            <table>
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
        </div>
      </div>
      
      <div className="brand-values">
        <h2>When you choose Fabcurate you choose</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Exceptional</h3>
            <p>Quality</p>
          </div>
          <div className="value-item">
            <h3>Value For</h3>
            <p>Money</p>
          </div>
          <div className="value-item">
            <h3>Trust Of</h3>
            <p>Brand</p>
          </div>
          <div className="value-item">
            <h3>DESCRIPTION</h3>
            <p>FABRIC ESTIMATOR</p>
          </div>
          <div className="value-item">
            <h3>SHIPPING</h3>
            <p>WASHCARE</p>
          </div>
        </div>
      </div>
      
      <div className="full-description">
        <h3>Description</h3>
        <p>{fabric.description}</p>
      </div>
    </div>
  );
};

export default FabricDetail;