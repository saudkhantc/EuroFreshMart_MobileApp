// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Initial state combining registration and OTP states
// const initialState = {
//   user: null,
//   loading: false,
//   otpLoading: false,
//   resendOtpLoading: false,
//   error: null,
//   emailError: null,
//   otpError: null,
//   successMessage: null,
//   isVerified: false,
//   registrationSuccess: false
// };

// // Registration thunk
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       // Store user data in AsyncStorage
//       await AsyncStorage.multiSet([
//         ['email', userData.email],
//         ['userName', JSON.stringify(userData.username)]
//       ]);

//       const response = await API.post(ENDPOINTS.REGISTER, userData);

//       if (response.data?.message === "User Already Exist with this username") {
//         return rejectWithValue({
//           type: 'username',
//           message: "User already exists with this username"
//         });
//       }

//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Registration failed";
      
//       if (errorMessage.includes("email")) {
//         return rejectWithValue({
//           type: 'email',
//           message: "User already exists with this email"
//         });
//       }

//       return rejectWithValue({
//         type: 'general',
//         message: errorMessage
//       });
//     }
//   }
// );

// // OTP verification thunk
// export const verifyOTP = createAsyncThunk(
//   'user/verifyOTP',
//   async ({ otp }, { rejectWithValue }) => {
//     try {
//       const userName = await AsyncStorage.getItem('userName');
//       if (!userName) {
//         return rejectWithValue('User name not found in storage.');
//       }

//       const cleanedUserName = userName.replace(/['"]+/g, '');
//       const response = await API.post(
//         `${ENDPOINTS.VERIFICATION}/${cleanedUserName}`,
//         { code: otp }
//       );

//       if (response && response.success) {
//         return response.data;
//       }
//       return rejectWithValue(response?.message || 'OTP verification failed.');
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'OTP verification failed'
//       );
//     }
//   }
// );

// // Resend OTP thunk
// export const resendOTP = createAsyncThunk(
//   'user/resendOTP',
//   async (_, { rejectWithValue }) => {
//     try {
//       const userName = await AsyncStorage.getItem('userName');
//       if (!userName) {
//         return rejectWithValue('User name not found.');
//       }

//       const response = await API.post(ENDPOINTS.RESEND_OTP, {
//         username: userName
//       });

//       if (response && response.success) {
//         return response.data;
//       }
//       return rejectWithValue(response?.message || 'Failed to resend OTP.');
//     } catch (error) {
//       return rejectWithValue('OTP has already been sent! Please verify first.');
//     }
//   }
// );

// // Unified user slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     resetUserState: (state) => {
//       return initialState;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//       state.emailError = null;
//       state.otpError = null;
//       state.successMessage = null;
//     },
//     setVerificationStatus: (state, action) => {
//       state.isVerified = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Registration cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.emailError = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.registrationSuccess = true;
//         state.error = null;
//         state.emailError = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.registrationSuccess = false;
//         if (action.payload?.type === 'email') {
//           state.emailError = action.payload.message;
//         } else {
//           state.error = action.payload?.message || 'Registration failed';
//         }
//       })

//       // OTP verification cases
//       .addCase(verifyOTP.pending, (state) => {
//         state.otpLoading = true;
//         state.otpError = null;
//         state.successMessage = null;
//       })
//       .addCase(verifyOTP.fulfilled, (state) => {
//         state.otpLoading = false;
//         state.isVerified = true;
//         state.successMessage = 'OTP verified successfully!';
//         state.otpError = null;
//       })
//       .addCase(verifyOTP.rejected, (state, action) => {
//         state.otpLoading = false;
//         state.otpError = action.payload;
//       })

//       // Resend OTP cases
//       .addCase(resendOTP.pending, (state) => {
//         state.resendOtpLoading = true;
//         state.otpError = null;
//       })
//       .addCase(resendOTP.fulfilled, (state) => {
//         state.resendOtpLoading = false;
//         state.successMessage = 'OTP sent successfully!';
//       })
//       .addCase(resendOTP.rejected, (state, action) => {
//         state.resendOtpLoading = false;
//         state.otpError = action.payload;
//       });
//   }
// });

// // Export actions
// export const {
//   resetUserState,
//   clearErrors,
//   setVerificationStatus
// } = userSlice.actions;

// // Selectors
// export const selectUser = state => state.user.user;
// export const selectLoading = state => state.user.loading;
// export const selectOtpLoading = state => state.user.otpLoading;
// export const selectResendOtpLoading = state => state.user.resendOtpLoading;
// export const selectError = state => state.user.error;
// export const selectEmailError = state => state.user.emailError;
// export const selectOtpError = state => state.user.otpError;
// export const selectSuccessMessage = state => state.user.successMessage;
// export const selectIsVerified = state => state.user.isVerified;
// export const selectRegistrationSuccess = state => state.user.registrationSuccess;

// export default userSlice.reducer;