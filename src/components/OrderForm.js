import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderForm.css";

const MultiStepOrderForm = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

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

  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [fabricQuantities, setFabricQuantities] = useState({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("fabricCart")) || [];
    setSelectedFabrics(cart);

    const initialQuantities = {};
    cart.forEach((item, idx) => {
      initialQuantities[idx] = item.quantityInMeters || 1;
    });
    setFabricQuantities(initialQuantities);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const fabricsWithQuantities = selectedFabrics.map((fab, index) => ({
      ...fab,
      quantityInMeters: fabricQuantities[index] || 1
    }));

    try {
      await axios.post("http://localhost:5000/orders", {
        ...formData,
        selectedFabrics: fabricsWithQuantities
      });

      alert("Order placed successfully!");
      localStorage.removeItem("fabricCart");
      setSelectedFabrics([]);
      setFabricQuantities({});
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

            <br /><br />
            <button onClick={() => navigate("/explore-shops")}>+ Select Fabric</button>
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
            <h2>Body Measurements</h2>
            <input type="number" name="chest" value={formData.chest} onChange={handleChange} placeholder="Chest" />
            <input type="number" name="waist" value={formData.waist} onChange={handleChange} placeholder="Waist" />
            <input type="number" name="hip" value={formData.hip} onChange={handleChange} placeholder="Hip" />
            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height" />
            <input type="number" name="shoulder" value={formData.shoulder} onChange={handleChange} placeholder="Shoulder" />
            <input type="number" name="sleeveLength" value={formData.sleeveLength} onChange={handleChange} placeholder="Sleeve Length" />
            <input type="number" name="neck" value={formData.neck} onChange={handleChange} placeholder="Neck" />
            <input type="number" name="inseam" value={formData.inseam} onChange={handleChange} placeholder="Inseam" />
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
