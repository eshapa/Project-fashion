import { useNavigate } from 'react-router-dom';
import './Dashwelcome.css';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/pagelogin');
  };

  return (
    <div className="welcome-container">
      <section className="welcome-hero">
        <div className="left-side">
          <h1 className="hero-title">Elevate Your Fashion Business</h1>
          <p className="hero-subtitle">
            Discover the ultimate dashboard for fashion professionals - 
            Tailors, Shopkeepers, and Administrators in one powerful platform
          </p>
          <button className="hero-login-btn" onClick={handleLogin}>
            Login Here
          </button>
        </div>

        <div className="right-side">
          <img
            src={`${process.env.PUBLIC_URL}/col.png`}
            alt="Fashion business dashboard"
            className="welcome-image"
          />
        </div>
      </section>
    </div>
  );
}
