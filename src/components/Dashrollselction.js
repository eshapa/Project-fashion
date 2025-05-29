import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRole = (role) => {
    if (role === 'tailor') navigate('/TailorTable');
    else if (role === 'shopkeeper') navigate('/ShopTable');
    else if (role === 'orders') navigate('/OrderTable');
  };

  return (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <h1>Welcome to Role-Based Login Portal</h1>
      <p>Select your dashboard to proceed</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginTop: 30 }}>
        <div onClick={() => handleRole('tailor')} style={{ cursor: 'pointer', width: 250, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', borderRadius: 10 }}>
          <img src="https://i.pinimg.com/736x/a7/53/b3/a753b3254d7de8f93146819bcb7b022b.jpg" alt="Tailor" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }} />
          <h3>Tailor Dashboard</h3>
        </div>
        <div onClick={() => handleRole('shopkeeper')} style={{ cursor: 'pointer', width: 250, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', borderRadius: 10 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Shopkeeper" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }} />
          <h3>Shopkeeper Dashboard</h3>
        </div>
        <div onClick={() => handleRole('orders')} style={{ cursor: 'pointer', width: 250, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', borderRadius: 10 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Orders" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }} />
          <h3>Order Dashboard</h3>
        </div>
      </div>
    </div>
  );
}
