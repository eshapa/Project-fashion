import { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

export default function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    userId: "",
    tailorId: "",
    shopId: "",
    fabricDetails: [],
    tailorCharge: 0,
    paymentMode: "UPI",
    upiScreenshot: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/payments/create", paymentData);
    alert("Payment recorded!");
    console.log(res.data);
  };

  const totalFabricCost = paymentData.fabricDetails.reduce(
    (acc, item) => acc + item.quantity * item.pricePerMeter,
    0
  );

  const totalAmount = totalFabricCost + Number(paymentData.tailorCharge);

  return (
    <div className="max-w-xl mx-auto p-4 shadow-xl rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment Portal</h2>
      
      <div className="space-y-2">
        {/* Inputs for userId, tailorId, shopId, tailorCharge, etc. */}
        {/* Example Fabric Details Entry */}
        <button onClick={() => setPaymentData({...paymentData, fabricDetails: [...paymentData.fabricDetails, { type: "", quantity: 1, pricePerMeter: 100 }]})}>
          Add Fabric
        </button>

        {paymentData.fabricDetails.map((fabric, index) => (
          <div key={index} className="flex gap-2">
            <input
              placeholder="Fabric Type"
              onChange={(e) => {
                const newDetails = [...paymentData.fabricDetails];
                newDetails[index].type = e.target.value;
                setPaymentData({ ...paymentData, fabricDetails: newDetails });
              }}
            />
            <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                const newDetails = [...paymentData.fabricDetails];
                newDetails[index].quantity = Number(e.target.value);
                setPaymentData({ ...paymentData, fabricDetails: newDetails });
              }}
            />
            <input
              type="number"
              placeholder="Price per meter"
              onChange={(e) => {
                const newDetails = [...paymentData.fabricDetails];
                newDetails[index].pricePerMeter = Number(e.target.value);
                setPaymentData({ ...paymentData, fabricDetails: newDetails });
              }}
            />
          </div>
        ))}

        <select
          value={paymentData.paymentMode}
          onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
        >
          <option value="UPI">UPI</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        {paymentData.paymentMode === "UPI" && (
          <div className="text-center my-4">
            <p>Scan this QR to pay:</p>
            <QRCode value="upi://pay?pa=your-upi@upi&pn=TailorShop&am=500" size={150} />
            <input
              type="text"
              placeholder="Enter payment screenshot URL"
              onChange={(e) =>
                setPaymentData({ ...paymentData, upiScreenshot: e.target.value })
              }
              className="block mt-2 w-full"
            />
          </div>
        )}
      </div>

      <div className="mt-4">
        <p><strong>Total Fabric:</strong> ₹{totalFabricCost}</p>
        <p><strong>Tailor Charge:</strong> ₹{paymentData.tailorCharge}</p>
        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Confirm Payment
      </button>
    </div>
  );
}
