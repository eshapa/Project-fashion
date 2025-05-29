import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderStatus.css';

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSuccess = location.state?.success || false;
  const message = location.state?.message || '';

  const successSound = useRef(null);
  const errorSound = useRef(null);

  useEffect(() => {
    // Create audio objects
    const successAudio = new Audio('/success-fanfare.mp3');
    const errorAudio = new Audio('/fail.mp3');

    successAudio.volume = 1;
    errorAudio.volume = 1;

    successSound.current = successAudio;
    errorSound.current = errorAudio;

    const playAudio = async () => {
      try {
        if (isSuccess) {
          await successSound.current.play();
        } else {
          await errorSound.current.play();
        }
      } catch (err) {
        console.warn('Autoplay failed. User interaction may be required.', err);
      }
    };

    playAudio();

    return () => {
      if (successSound.current) {
        successSound.current.pause();
        successSound.current.currentTime = 0;
      }
      if (errorSound.current) {
        errorSound.current.pause();
        errorSound.current.currentTime = 0;
      }
    };
  }, [isSuccess]);

  const handleButtonClick = () => {
    navigate(isSuccess ? '/' : '/order-form');
  };

  return (
    <div className={`order-status-container ${isSuccess ? 'success' : 'error'}`}>
      <div className="order-status-content">
        <h1 className="status-title">
          {isSuccess ? '🎉 Order Placed Successfully! 🎉' : '❌ Order Failed ❌'}
        </h1>
        <p className="status-message">
          {message || (isSuccess ? 'Thank you for your order!' : 'Please try again.')}
        </p>

        <button onClick={handleButtonClick} className="status-button pulse">
          {isSuccess ? 'Continue Shopping' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
