import React, { useState } from "react";
import axios from "axios";
import "./OrderForm.css";

const MultiStepOrderForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    occasion: "",
    dueDate: "",
    fabricType: "",
    dressType: "",
    referenceImage: "",
    instructions: "",
    height: "",
    chest: "",
    waist: "",
    hip: "",
    shoulder: "",
    sleeveLength: "",
    inseam: "",
    neck: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/orders", formData);
      alert("Order placed successfully!");
      setFormData({});
      setStep(0);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Personal Details</h2>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Order Details</h2>
            <input name="occasion" placeholder="Occasion" value={formData.occasion} onChange={handleChange} />
            <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
            <input name="fabricType" placeholder="Fabric Type" value={formData.fabricType} onChange={handleChange} />
            <input name="dressType" placeholder="Dress Type" value={formData.dressType} onChange={handleChange} />
            <input name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className="measurements-container">
            <h2>Body Measurements (in inches)</h2>
            <p>Please provide your exact measurements for perfect fitting</p>

            <div className="measurements-grid">
              <div className="measurement-group">
                <h3>Upper Body</h3>
                <div className="measurement-item">
                  <label>Chest</label>
                  <input type="number" name="chest" value={formData.chest} onChange={handleChange} placeholder="Around fullest part" />
                </div>
                <div className="measurement-item">
                  <label>Shoulder</label>
                  <input type="number" name="shoulder" value={formData.shoulder} onChange={handleChange} placeholder="Shoulder to shoulder" />
                </div>
                <div className="measurement-item">
                  <label>Sleeve Length</label>
                  <input type="number" name="sleeveLength" value={formData.sleeveLength} onChange={handleChange} placeholder="Shoulder to wrist" />
                </div>
                <div className="measurement-item">
                  <label>Neck</label>
                  <input type="number" name="neck" value={formData.neck} onChange={handleChange} placeholder="Around neck base" />
                </div>
              </div>

              <div className="measurement-group">
                <h3>Lower Body</h3>
                <div className="measurement-item">
                  <label>Waist</label>
                  <input type="number" name="waist" value={formData.waist} onChange={handleChange} placeholder="Around natural waist" />
                </div>
                <div className="measurement-item">
                  <label>Hip</label>
                  <input type="number" name="hip" value={formData.hip} onChange={handleChange} placeholder="Around fullest part" />
                </div>
                <div className="measurement-item">
                  <label>Inseam</label>
                  <input type="number" name="inseam" value={formData.inseam} onChange={handleChange} placeholder="Crotch to ankle" />
                </div>
              </div>

              <div className="measurement-group">
                <h3>General</h3>
                <div className="measurement-item">
                  <label>Height</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="In inches" />
                </div>
                <div className="measurement-diagram">
                  <img
                    src="https://example.com/size-chart-diagram.jpg"
                    alt="Measurement guide diagram"
                  />
                  <p>How to measure guide</p>
                </div>
              </div>
            </div>

            <div className="measurement-notes">
              <h4>Important Notes:</h4>
              <ul>
                <li>Measure over light clothing</li>
                <li>Keep the measuring tape snug but not tight</li>
                <li>For best results, have someone else measure you</li>
                <li>All measurements should be in inches</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h1>Place Your Tailor Order</h1>
      {renderStep()}

      <div className="button-group">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step < 2 ? (
          <button onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit Order</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepOrderForm;
