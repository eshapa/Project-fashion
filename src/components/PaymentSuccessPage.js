import React, { useEffect, useState } from "react";
import BillSummary from "../components/BillSummary"; // Adjust path as needed
import axios from "axios";

const PaymentSuccessPage = ({ paymentId }) => {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`/api/payments/${paymentId}`);
        setPayment(res.data.payment);
      } catch (error) {
        console.error("Failed to fetch payment", error);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (!payment) return <div>Loading bill...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <BillSummary payment={payment} />
    </div>
  );
};

export default PaymentSuccessPage;
