import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios';



const initialState = {
  user: null,
  loading: false, 
  error: null, 
  otpLoading: false, // Loading state for OTP verification
  otpError: null, // Error state for OTP verification
  resendOtpLoading: false, // Loading state for resend OTP
  resendOtpError: null, // Error state for resend OTP
};


export const signupUserThunk = createAsyncThunk(
  'user/signupUserThunk',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Final Creator form data:', data);
      //const response = await axios.post('https://eurofreshmart-backend-xho8.onrender.com/api/auth/register', data);
      const response = await axiosInstance.post('/api/auth/register', data);
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log('Error:', error.response.data);
      return rejectWithValue(error.response.data); 
    }
  }
);

// Async thunk for OTP verification
export const verifyOtpThunk = createAsyncThunk(
  'user/verifyOtpThunk',
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/verify-otp/${username}', { otp });
      console.log('OTP verification response:', response);
      return response.data;
    } catch (error) {
      console.log('OTP verification error:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for resending OTP
export const resendOtpThunk = createAsyncThunk(
  'user/resendOtpThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/send-otp');
      console.log('Resend OTP response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Resend OTP error:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.otpLoading = false;
      state.otpError = null;
      state.resendOtpLoading = false;
      state.resendOtpError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })

      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.user = action.payload.data; 
      })
      
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      
           // OTP code
      .addCase(verifyOtpThunk.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.user = action.payload.data; // Update user state if OTP is verified
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })
      // Resend OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.resendOtpLoading = true;
        state.resendOtpError = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state, action) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.resendOtpError = action.payload;
      });
  },
});


export const { resetUserState } = cartSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectOtpLoading = (state) => state.user.otpLoading;
export const selectOtpError = (state) => state.user.otpError;
export const selectResendOtpLoading = (state) => state.user.resendOtpLoading;
export const selectResendOtpError = (state) => state.user.resendOtpError
export default cartSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { axiosInstance } from '../../Axios';


// const initialState = {
//   user:null,
//   loading: false,
//   error: null,
//  // items: [], 
// };

// export const signupUserThunk = createAsyncThunk(
//   'user/signupUserThunk',
//   async (data, {getState, rejectWithValue}) => {
//     try {
//       const state = getState();
//       console.log('final Creator form : ', data);
//       const response = await axiosInstance.post('/auth/register', data);
//       console.log('Api response : ', response.data);
//       return response.data;
//     } catch (error) {
//       // console.log('Error : ',error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// const cartSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setCreatorFormData: (state, action) => {
//       state.creatorFormData = {...state.creatorFormData, ...action.payload};
//       console.log('Creator form data on update', state.creatorFormData);
//     },
//     resetCreatorFormData: state => {
//       state.creatorFormData = {};
//     },
//   },
//   extraReducers: builder => {
//     builder
//     .addCase(signupUserThunk.pending, (state, action) => {
//       state.loading = true;
//     })
//     .addCase(signupUserThunk.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.data;
//     })
//     .addCase(signupUserThunk.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   }
// });


// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState,
// //   reducers: {
// //     addItemToCart: (state, action) => {
// //       const existingItem = state.items.find(item => item.id === action.payload.id);
// //       if (!existingItem) {
// //         state.items.push(action.payload); // Add only if item doesn't exist
// //       }
// //     },
// //     removeItemFromCart: (state, action) => {
// //       state.items = state.items.filter(item => item.id !== action.payload);
// //     },
// //   },
// //});

// export const {setCreatorFormData,  } = cartSlice.actions;
// export default cartSlice.reducer;

// export const selectUser = (state)=>state.user.user