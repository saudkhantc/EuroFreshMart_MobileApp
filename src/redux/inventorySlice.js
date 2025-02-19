import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { ENDPOINTS } from "../screens/API/apiService";

// Async thunk to fetch inventories
export const fetchInventories = createAsyncThunk(
  "inventory/fetchInventories",
  async ({ categoryId, page, limit }, thunkAPI) => {
    try {
      // Assuming you use axios or fetch to call your API
      const response = await API.get(
        `${ENDPOINTS.GET_INVENTORIES}/${categoryId}?page=${page}&limit=${limit}`
      );
      return response.data; // Ensure your API returns data in the correct format
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Inventory slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearInventories: (state) => {
      state.inventories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories = action.payload;  // Store the fetched inventory data
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle the error if fetch fails
      });
  },
});

// Export actions
export const { clearInventories } = inventorySlice.actions;

// Export reducer
export default inventorySlice.reducer;
