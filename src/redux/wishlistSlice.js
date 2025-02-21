// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       const item = action.payload;
//       // Check if item already exists in the wishlist
//       const existingItem = state.items.find((i) => i.id === item.id);
//       if (!existingItem) {
//         state.items.push(item);
//       }
//     },
//     removeFromWishlist: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);  // Use action.payload directly
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// export const selectWishlist = (state) => state.wishlist.items;

// export default wishlistSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadWishlistFromStorage = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('wishlist');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Could not load wishlist from AsyncStorage', e);
    return [];
  }
};

const saveWishlistToStorage = async (wishlist) => {
  try {
    const serializedState = JSON.stringify(wishlist);
    await AsyncStorage.setItem('wishlist', serializedState);
  } catch (e) {
    console.error('Could not save wishlist to AsyncStorage', e);
  }
};

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (!existingItem) {
        state.items.push(item);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.items;

// Load wishlist from storage on app startup
export const initializeWishlist = () => async (dispatch) => {
  const storedWishlist = await loadWishlistFromStorage();
  dispatch(setWishlist(storedWishlist));
};

export default wishlistSlice.reducer;
