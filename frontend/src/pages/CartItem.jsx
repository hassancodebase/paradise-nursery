import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartCount, selectCartItems, selectCartTotal } from '../features/cart/CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  return (
    <main className="page-shell cart-page">
      <div className="cart-heading">
        <div><p className="eyebrow">YOUR LITTLE JUNGLE</p><h1>Shopping <em>cart.</em></h1><p className="intro-copy">Your next favorite things are just a few clicks away.</p></div>
        <div className="cart-total-plants"><span>{count.toString().padStart(2, '0')}</span><small>PLANTS IN CART</small></div>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon"><ShoppingBag size={30} /></div>
          <h2>Your cart is ready to grow.</h2>
          <p>Looks like you haven't picked your plants yet. Let's find a little green for your space.</p>
          <Link to="/plants" className="button button-dark">Explore plants <ArrowRight size={17} /></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-panel">
            <div className="cart-list-head"><span>YOUR SELECTION ({items.length})</span><button className="clear-cart" onClick={() => dispatch(clearCart())}>Clear cart</button></div>
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info"><h3>{item.name}</h3><p>Indoor plant · Ready to grow</p><span className="cart-unit-price">${item.price.toFixed(2)} <small>/ plant</small></span></div>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item.id))}><Minus size={15} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item.id))}><Plus size={15} /></button>
                  </div>
                  <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
                  <button className="delete-button" aria-label={`Delete ${item.name}`} onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={16} /><span>Remove</span></button>
                </div>
              </article>
            ))}
            <Link to="/plants" className="continue-link"><ArrowLeft size={17} /> Continue shopping</Link>
          </section>
          <aside className="order-summary">
            <p className="eyebrow">THE DETAILS</p><h2>Order summary</h2>
            <div className="summary-row"><span>Plants ({count} items)</span><span>${total.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span className="free-label">Calculated later</span></div>
            <div className="summary-row"><span>Taxes</span><span>Calculated later</span></div>
            <div className="summary-divider" />
            <div className="summary-total"><span>Estimated total</span><strong>${total.toFixed(2)}</strong></div>
            <p className="summary-note">Delivery and taxes will be calculated at checkout.</p>
            <button className="button button-dark checkout-button" onClick={() => window.alert('Coming Soon! Checkout is not available in this demo.')}>Checkout <ArrowRight size={17} /></button>
            <div className="secure-note"><ShoppingBag size={15} /> A little green is on its way.</div>
          </aside>
        </div>
      )}
      <footer className="site-footer"><span>Paradise Nursery</span><span>Every home deserves a little jungle.</span></footer>
    </main>
  );
}