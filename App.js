import { Routes, Route, useLocation } from 'react-router-dom';
import Newnav from './components/Newnav'; // Use Newnav instead of Navbar
//import VastraKosh from './components/VastraKosh';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmailPopup from './components/EmailPopup';
import Roll from './components/Roll';
import Fashion from './components/Fashion';
import ExploreDesigners from './components/ExploreDesigner';
import ExploreTailor from './components/ExploreTailor';
import ShopRegistration from './components/ShopRegistration';
import Navbar from './components/Navbar'; // Home page navbar
import TailorRegistration from './components/Tailorregistration';
import UserRegistration from './components/userRegistration';
import HeroSection from './components/Herosection';
import AllDesigner from './components/Alldesigner';
import VastraKosh from './src/components/VastraKosh';
import PaymentForm  from './src/components/Paymentform';
import PaymentSuccessPage from './src/components/PaymentSuccessPage';
import FabricCategoryPage from './components/FabricCategoryPage';


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <EmailPopup />

      {/* Show Newnav only if not on home page */}
      {isHomePage ? <Navbar /> : <Newnav />}

      <Routes>
        <Route path="/" element={<Fashion />} /> {/* Assuming Fashion is your homepage */}
        <Route path="/herosection" element={<HeroSection />} />
        <Route path="/ExploreDesigner" element={<ExploreDesigners />} />
        <Route path="/ExploreTailor" element={<ExploreTailor />} />
        <Route path="/Alldesigner" element={<AllDesigner />} />
        <Route path="/Roll" element={<Roll />} />
       {/* // <Route path="/VastraKosh" element={<VastraKosh />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopregistration" element={<ShopRegistration />} />
         <Route path="/tailorregistration" element={<TailorRegistration />} />
          <Route path="/userRegistration" element={<UserRegistration/>} />
            <Route path="/VastraKosh.js" element={<VastraKosh/>} />
        {/* Add similar routes for tailor and user registration if needed */}
         <Route path="/fabric/:name" element={<FabricCategoryPage />} />
             <Route path="/paymentform" element={<PaymentForm/>} />
             <Route path="/payment-success/:paymentId" element={<PaymentSuccessPage />} /> {/* 🔥 Just this added */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;