import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { ENDPOINTS } from "../screens/API/apiService";

export const fetchInventories = createAsyncThunk(
  "inventory/fetchInventories",
  async ({ categoryId, page, limit }, thunkAPI) => {
    try {
      const response = await API.get(
        `${ENDPOINTS.GET_INVENTORIES}/${categoryId}?page=${page}&limit=${limit}`
      );
     // console.log('aasdsahv',response)
      return response.inventoryItems; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
        state.inventories = action.payload;  
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      });
  },
});

export const { clearInventories } = inventorySlice.actions;

export default inventorySlice.reducer;
