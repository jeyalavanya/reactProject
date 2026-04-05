import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';

// Configure Redux store with the cart reducer slice.
export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});