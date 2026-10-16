import { ArrowRight, Leaf, Sprout } from 'lucide-react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ProductList from './pages/ProductList.jsx';
import CartItem from './pages/CartItem.jsx';

function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-shade" />
      <div className="landing-top"><Link to="/" className="landing-brand"><Leaf size={22} /> Paradise Nursery</Link><span className="landing-note">A greener kind of living</span></div>
      <section className="hero-copy">
        <p className="eyebrow light-eyebrow"><span /> MAKE ROOM FOR NATURE</p>
        <h1>Grow your<br /><em>happy place.</em></h1>
        <p className="hero-description">Thoughtful greenery for slower mornings, cozier corners, and homes that feel alive.</p>
        <Link to="/plants" className="button button-light">Get Started <ArrowRight size={18} /></Link>
        <div className="hero-footnote"><Sprout size={17} /> Find the plant that feels like you</div>
      </section>
      <div className="landing-bottom"><span>ROOTED IN GOOD THINGS</span><span>01 — 03</span></div>
    </main>
  );
}

function ShopLayout({ children }) {
  return <><Navbar />{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<ShopLayout><ProductList /></ShopLayout>} />
      <Route path="/cart" element={<ShopLayout><CartItem /></ShopLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}