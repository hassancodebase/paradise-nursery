
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/CartSlice.jsx';

// Load the previously saved cart when the application starts.
const loadCart = () => {
  try {
    const savedCart = localStorage.getItem('paradiseCart');

    if (!savedCart) {
      return { items: [] };
    }

    const parsedCart = JSON.parse(savedCart);

    // Make sure the saved data has the expected structure.
    if (!parsedCart || !Array.isArray(parsedCart.items)) {
      return { items: [] };
    }

    return parsedCart;
  } catch (error) {
    console.error('Could not load saved cart:', error);
    return { items: [] };
  }
};

// Create the Redux store with the restored cart.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

// Save the cart whenever Redux state changes.
store.subscribe(() => {
  try {
    const cartState = store.getState().cart;

    localStorage.setItem(
      'paradiseCart',
      JSON.stringify(cartState)
    );
  } catch (error) {
    console.error('Could not save cart:', error);
  }
});
