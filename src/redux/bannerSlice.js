import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINTS } from '../screens/API/apiRoutes';
import { baseUrl } from '../screens/API/apiConstants';
import API from '../screens/API/apiService';

// Async thunk to fetch banners by type
export const fetchBannersByType = createAsyncThunk(
  'banners/fetchBannersByType',
  async (bannerType, { rejectWithValue }) => {
    try {
      //console.log(`${baseUrl}${ENDPOINTS.GET_BANNERBYTYPE}/${bannerType}`)
      const response = await API.get(`${baseUrl}/${ENDPOINTS.GET_BANNERBYTYPE}/${bannerType}`);
      return { bannerType, banners: response.banners };  // Ensure to use .data to access response payload
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state for banners
const initialState = {
  loading: false,
  banners: {
    topBanner: [],
    middleBanner: [],
  },
  error: null,
};

// Banner slice with extra reducers for async actions
const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannersByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBannersByType.fulfilled, (state, action) => {
        //console.log("🚀 ~ .addCase ~ action:", action.payload.banners)
        state.loading = false;
        if (action.payload.bannerType === 'Top Banner') {
          state.banners.topBanner = action.payload.banners;
        } else if (action.payload.bannerType === 'Middle Banner') {
          state.banners.middleBanner = action.payload.banners;
        }
        state.error = null;
      })
      .addCase(fetchBannersByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bannerSlice.reducer;
