import { Leaf, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/CartSlice.jsx';

export default function Navbar() {
  const count = useSelector(selectCartCount);
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Paradise Nursery home">
        <span className="brand-mark"><Leaf size={21} /></span>
        <span>paradise<span className="brand-light"> nursery</span></span>
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className="cart-nav">
          <ShoppingCart size={19} aria-hidden="true" />
          <span>Cart</span>
          <span className="cart-badge" aria-label={`${count} items in cart`}>{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}