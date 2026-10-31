
import { Leaf, ShoppingCart, LogOut, UserRound } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartCount } from '../features/cart/CartSlice.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const count = useSelector(selectCartCount);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Paradise Nursery home">
        <span className="brand-mark"><Leaf size={21} /></span>
        <span>
          paradise<span className="brand-light"> nursery</span>
        </span>
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>

        <NavLink to="/cart" className="cart-nav">
          <ShoppingCart size={19} aria-hidden="true" />
          <span>Cart</span>
          <span className="cart-badge" aria-label={`${count} items in cart`}>
            {count}
          </span>
        </NavLink>

        {!loading && (
          isAuthenticated ? (
            <>
              <NavLink to="/account">
                My Account
              </NavLink>
              <span className="nav-user">
                <UserRound size={16} />
                {user.name}
              </span>

              <button
                type="button"
                className="nav-auth-button"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="nav-register">
                Sign Up
              </NavLink>
            </>
          )
        )}
      </nav>
    </header>
  );
}
