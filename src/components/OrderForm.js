import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderForm.css";

const MultiStepOrderForm = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("formData")) || {
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
        referenceImage: "", // <-- reference image URL field
        instructions: "",
        height: "",
        chest: "",
        waist: "",
        hip: "",
        shoulder: "",
        sleeveLength: "",
        inseam: "",
        neck: "",
      }
    );
  });

  const [recentFabric, setRecentFabric] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("fabricCart")) || [];
    if (cart.length > 0) {
      const lastFabric = cart[cart.length - 1];
      setRecentFabric(lastFabric);
      setQuantity(lastFabric.quantityInMeters || 1);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isDueDateValid = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate >= today;
  };

  const handleSubmit = async () => {
    if (!recentFabric) {
      alert("Please add a fabric before submitting the order.");
      return;
    }

    if (!isDueDateValid(formData.dueDate)) {
      alert("Due date must be today or a future date.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/orders", {
        ...formData,
        selectedFabrics: [
          {
            ...recentFabric,
            quantityInMeters: quantity,
          },
        ],
      });

      localStorage.removeItem("fabricCart");
      localStorage.removeItem("formData");
      setFormData({
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
        neck: "",
      });
      setRecentFabric(null);
      setQuantity(1);
      setStep(0);

      navigate("/order-status", {
        state: {
          success: true,
          message: "Your order has been successfully placed!",
        },
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      navigate("/order-status", {
        state: {
          success: false,
          message: "Failed to place the order. Please try again.",
        },
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Personal Details</h2>
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Phone:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>City:</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <label>Address:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            {/* **Here is the added image URL input** */}
            <label>Reference Image URL:</label>
            <input
              type="url"
              name="referenceImage"
              value={formData.referenceImage}
              onChange={handleChange}
              placeholder="Paste image URL here"
            />

            {recentFabric && (
              <>
                <h3 style={{ marginTop: "20px" }}>🧵 The Fabric selected</h3>
                <ul>
                  <li>
                    <strong>Fabric Name:</strong> {recentFabric.fabricName}
                  </li>
                  <li>
                    <strong>Shop ID:</strong> {recentFabric.shopId}
                  </li>
                  <li>
                    <strong>Price:</strong> ₹{recentFabric.price}
                  </li>
                  <li>
                    <strong>Description:</strong>{" "}
                    {recentFabric.description || "N/A"}
                  </li>
                  <li>
                    <strong>Quantity (meters):</strong>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setQuantity(val > 0 ? val : 1);
                      }}
                      style={{ width: "60px", marginLeft: "5px" }}
                    />
                  </li>
                </ul>
              </>
            )}

            <br />
            <button onClick={() => navigate("/explore-shops")}>
              + Select Fabric
            </button>
          </div>
        );

      case 1:
        return (
          <div>
            <h2>Order Details</h2>
            <label>Occasion:</label>
            <input
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
            />

            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />

            <label>Fabric Type:</label>
            <input
              name="fabricType"
              value={formData.fabricType}
              onChange={handleChange}
              required
            />

            <label>Dress Type:</label>
            <input
              name="dressType"
              value={formData.dressType}
              onChange={handleChange}
              required
            />

            <label>Instructions:</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="measurements-container">
            <h2>Body Measurements</h2>
            <div className="grid-measurements">
              <label>Chest (cm):</label>
              <input
                type="number"
                name="chest"
                min="50"
                max="200"
                value={formData.chest}
                onChange={handleChange}
                required
              />

              <label>Waist (cm):</label>
              <input
                type="number"
                name="waist"
                min="40"
                max="200"
                value={formData.waist}
                onChange={handleChange}
                required
              />

              <label>Hip (cm):</label>
              <input
                type="number"
                name="hip"
                min="50"
                max="200"
                value={formData.hip}
                onChange={handleChange}
                required
              />

              <label>Height (cm):</label>
              <input
                type="number"
                name="height"
                min="100"
                max="250"
                value={formData.height}
                onChange={handleChange}
                required
              />

              <label>Shoulder (cm):</label>
              <input
                type="number"
                name="shoulder"
                min="30"
                max="60"
                value={formData.shoulder}
                onChange={handleChange}
                required
              />

              <label>Sleeve Length (cm):</label>
              <input
                type="number"
                name="sleeveLength"
                min="20"
                max="80"
                value={formData.sleeveLength}
                onChange={handleChange}
                required
              />

              <label>Neck (cm):</label>
              <input
                type="number"
                name="neck"
                min="20"
                max="60"
                value={formData.neck}
                onChange={handleChange}
                required
              />

              <label>Inseam (cm):</label>
              <input
                type="number"
                name="inseam"
                min="30"
                max="100"
                value={formData.inseam}
                onChange={handleChange}
                required
              />
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
      <div className="button-group" style={{ marginTop: "20px" }}>
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
