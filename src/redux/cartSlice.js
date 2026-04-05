import { createSlice } from '@reduxjs/toolkit';

// Initial state with cart items, search, and totals
const initialState = {
  items: [],
  search: '',
  totalItems: 0,
  totalAmount: 0
};

// Create Redux slice for cart state and actions.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart (prevents duplicates, increments quantity)
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...product, 
          quantity: 1 
        });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Remove product from cart completely
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Recalculate totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Update quantity (min 1)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        
        // Recalculate totals
        state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },

    // Search filter for ProductList
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    // Clear entire cart (for Checkout)
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    }
  }
});

// Export all actions for dispatching cart updates
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  setSearch, 
  clearCart 
} = cartSlice.actions;

// Selectors for useSelector hooks in components
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectSearchQuery = (state) => state.cart.search;

// Default export reducer
export default cartSlice.reducer;