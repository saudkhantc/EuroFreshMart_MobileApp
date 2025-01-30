// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    user:cartReducer,
    // cart: cartReducer,
    // wishlist: wishlistReducer,
  },
});

export default store;  
