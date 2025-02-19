// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import bannerReducer from './bannerSlice'
import categoriesReducer from './categorySlice'
import inventoryReducer from './inventorySlice'
const store = configureStore({
  reducer: {
   // user:userReducer,
    login:loginReducer,
     cart: cartReducer,
     wishlist: wishlistReducer,
     banners: bannerReducer,
     categories: categoriesReducer,
     inventory:inventoryReducer
  },
});

export default store;  
