// import { createSlice } from '@reduxjs/toolkit';


// const initialState = {
//   items: [], 
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart: (state, action) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (!existingItem) {
//         state.items.push(action.payload); 
//       }
//     },
//     removeItemFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to load cart from AsyncStorage
const loadCartFromAsyncStorage = async () => {
  try {
    const serializedState = await AsyncStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load cart from AsyncStorage", e);
    return [];
  }
};

// Helper function to save cart to AsyncStorage
const saveCartToAsyncStorage = async (cartItems) => {
  try {
    const serializedState = JSON.stringify(cartItems);
    await AsyncStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save cart to AsyncStorage", e);
  }
};

// Initial state
const initialState = {
  items: [],
  isLoaded: false, // Ensures cart loads before UI updates
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex((cartItem) => cartItem._id === item._id);
    
      if (existingItemIndex !== -1) {
        // Create a new array with the updated item to avoid mutation
        state.items = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, 100) }
            : cartItem
        );
      } else {
        state.items = [...state.items, { ...item, quantity: item.quantity || 1 }];
      }
    
      saveCartToAsyncStorage(state.items);
    },
    

    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((cartItem) => cartItem._id !== itemId);
      saveCartToAsyncStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        existingItem.quantity = Math.max(1, Math.min(quantity, 100)); // Ensure min=1, max=100
      }
      saveCartToAsyncStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToAsyncStorage(state.items);
    },
  },
});

// Thunk to load cart data on app startup
export const loadCart = () => async (dispatch) => {
  const cartItems = await loadCartFromAsyncStorage();
  dispatch(setCartItems(cartItems));
};

// Export actions and reducer
export const { setCartItems, addItemToCart, removeItemFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
