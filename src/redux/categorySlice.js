// // src/redux/slices/categoriesSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API, { ENDPOINTS } from "../screens/API/apiService";

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get(ENDPOINTS.GET_CATEGORIES);
//   //    console.log('responsive',response)
//       return response?.categories || []; 
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setCategories: (state, action) => {
//       state.items = action.payload;
//       state.loading = false;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to load categories";
//       });
//   },
// });

// export const { setCategories, setLoading } = categoriesSlice.actions;
// export default categoriesSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { ENDPOINTS } from "../screens/API/apiService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(ENDPOINTS.GET_CATEGORIES);
      return response?.categories || [];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCategory: null,  // New state to store selected category
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedCategory: (state, action) => {     //2 
      state.selectedCategory = action.payload; // Store selected category
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
        if (!state.selectedCategory && action.payload.length > 0) {   // 2
          state.selectedCategory = action.payload[0]; // Default to first category
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load categories";
      });
  },
});

export const { setCategories, setLoading, setSelectedCategory } = categoriesSlice.actions;   //
export default categoriesSlice.reducer;
