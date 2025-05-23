import { Routes, Route, useLocation } from 'react-router-dom';
import Newnav from './components/Newnav'; // Use Newnav instead of Navbar
import VastraKosh from './components/VastraKosh';
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
import FabricCategoryPage from './components/FabricCategoryPage';
import TailorDetails from './components/Tailordetails';
import Shopimages from './components/Shopimages';
import TailorPortfolio from './components/TailorPortfolio';
import ShopCards from './components/Shopcards';
import ShopPortfolio from './components/ShopPortfolio';
import OrderForm from './components/OrderForm';
import TailorChat from './components/TailorChat';
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
        <Route path="/vastrakosh" element={<VastraKosh />} />
         {/* <Route path="/" element={<VastraKosh />} />y */}
    <Route path="/explore-shops" element={<ShopCards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopregistration" element={<ShopRegistration />} />
         <Route path="/tailorregistration" element={<TailorRegistration />} />
          <Route path="/userRegistration" element={<UserRegistration/>} />
            <Route path="/fabric/:name" element={<FabricCategoryPage />} />
          <Route path="/tailordetails/:id" element={<TailorDetails/>} />
                    <Route path="/vastrakosh" element={<VastraKosh/>} />
                  <Route path="/shopimages/:shopId" element={<Shopimages />} />
<Route path="/tailor/:id" element={<TailorPortfolio/>} />
 <Route path="/shop-cards" element={<ShopCards />} />
 <Route path="/shop-images/:shopId" element={<ShopPortfolio />} />
<Route path="/orderform/:id" element={<OrderForm />} />
        <Route path="/chat/:id" element={<TailorChat />} />


             {/* 🔥 Just this added */}
        {/* Add similar routes for tailor and user registration if needed */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;