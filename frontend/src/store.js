import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/CartSlice.jsx';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});