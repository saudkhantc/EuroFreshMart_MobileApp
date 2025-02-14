// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
const store = configureStore({
  reducer: {
   // user:userReducer,
    login:loginReducer,
     cart: cartReducer,
     wishlist: wishlistReducer,
  },
});

export default store;  
