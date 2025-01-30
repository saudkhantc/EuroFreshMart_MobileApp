// import React from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {InterFont, textcolor} from '../../styles/CustomStyles';
// import {useNavigation} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';

// const {width, height} = Dimensions.get('window');

// const Register = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}>
//           <View>
//             <AuthHeader image={img1} />
//           </View>

//           <View style={styles.main}>
//             <View>
//               <Text style={styles.heading}>Register</Text>
//             </View>

//             <View>
//             <CustomInput
//                 label="Username"
//                 placeholder="Enter your Name"
//                 //   value={email}
//                 //   onChangeText={setEmail}
//               />
//               <CustomInput
//                 label="Email Address"
//                 placeholder="Enter your email"
//                 //   value={email}
//                 //   onChangeText={setEmail}
//               />
//               <CustomInput
//                 label="Password"
//                 placeholder="Enter your password"
//                 //   value={password}
//                 //   onChangeText={setPassword}
//                 secureTextEntry={true}
//               />
//             </View>

//             <View style={styles.Button}>
//               <CustomButton
//                 bgColor={textcolor.color3}
//                 text="Register"
//                 width={width * 0.7}
//                 onPress={() => navigation.navigate('login')}
//                 paddingVertical={12}
//                 textColor={textcolor.color4}
//                 fontFamily={InterFont.SemiBoldFont}
//                 fontSize={18}
//               />
//             </View>

//             <View style={styles.footer}>
//               <View>
//                 <Text style={{fontSize: 12, fontFamily: InterFont.RegularFont}}>
//                   Already have an account?
//                 </Text>
//               </View>
//               <View>
//               <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                 <Text
//                   style={{fontSize: 12, fontFamily: InterFont.SemiBoldFont}}>
//                   Login
//                 </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   main: {
//     paddingHorizontal: width * 0.1,
//     paddingVertical: height * 0.02,
//   },
//   heading: {
//     fontFamily: InterFont.BoldFont,
//     fontSize: width * 0.07,
//     color: textcolor.color1,
//   },
//   forgotText: {
//     textAlign: 'right',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//   },
//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   footer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 4,
//     alignSelf: 'center',
//     marginTop: height * 0.01,
//   },
// });

// export default Register;

// import React from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { InterFont, textcolor } from '../../styles/CustomStyles';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

// const { width, height } = Dimensions.get('window');

// // Validation Schema
// const RegisterSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(3, 'Username must be at least 3 characters')
//     .required('Username is required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const Register = () => {
//   const navigation = useNavigation();

//   // Initialize react-hook-form
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(RegisterSchema), // Integrate Yup validation
//   });

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log(data); // Log form data
//     navigation.navigate('login'); // Navigate to login screen
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}>
//           <View>
//             <AuthHeader image={img1} />
//           </View>

//           <View style={styles.main}>
//             <View>
//               <Text style={styles.heading}>Register</Text>
//             </View>

//             {/* Username Input */}
//             <Controller
//               control={control}
//               name="username"
//               defaultValue=""
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   label="Username"
//                   placeholder="Enter your Name"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                 />
//               )}
//             />
//             {errors.username && (
//               <Text style={styles.errorText}>{errors.username.message}</Text>
//             )}

//             {/* Email Input */}
//             <Controller
//               control={control}
//               name="email"
//               defaultValue=""
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   label="Email Address"
//                   placeholder="Enter your email"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                 />
//               )}
//             />
//             {errors.email && (
//               <Text style={styles.errorText}>{errors.email.message}</Text>
//             )}

//             {/* Password Input */}
//             <Controller
//               control={control}
//               name="password"
//               defaultValue=""
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   label="Password"
//                   placeholder="Enter your password"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   secureTextEntry={true}
//                 />
//               )}
//             />
//             {errors.password && (
//               <Text style={styles.errorText}>{errors.password.message}</Text>
//             )}

//             {/* Register Button */}
//             <View style={styles.Button}>
//               <CustomButton
//                 bgColor={textcolor.color3}
//                 text="Register"
//                 width={width * 0.7}
//                 onPress={handleSubmit(onSubmit)}
//                 paddingVertical={12}
//                 textColor={textcolor.color4}
//                 fontFamily={InterFont.SemiBoldFont}
//                 fontSize={18}
//               />
//             </View>

//             {/* Footer */}
//             <View style={styles.footer}>
//               <View>
//                 <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
//                   Already have an account?
//                 </Text>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                   <Text
//                     style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
//                     Login
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   main: {
//     paddingHorizontal: width * 0.1,
//     paddingVertical: height * 0.02,
//   },
//   heading: {
//     fontFamily: InterFont.BoldFont,
//     fontSize: width * 0.07,
//     color: textcolor.color1,
//   },
//   forgotText: {
//     textAlign: 'right',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//   },
//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   footer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 4,
//     alignSelf: 'center',
//     marginTop: height * 0.01,
//   },
//   errorText: {
//     fontSize: 12,
//     color: 'red',
//     fontFamily: InterFont.RegularFont,
//     marginTop: 5,
//   },
// });

// export default Register;

// import React, { useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { InterFont, textcolor } from '../../styles/CustomStyles';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import { BASE_URL } from '../../utils/String';
// import axios from 'axios';

// const { width, height } = Dimensions.get('window');

// const Register = () => {
//   const navigation = useNavigation();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
 
//   const [usernameError, setUsernameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     let isValid = true;

//     if (!username) {
//       setUsernameError('Username is required');
//       isValid = false;
//     } else {
//       setUsernameError('');
//     }

//     if (!email) {
//       setEmailError('Email is required');
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError('Please enter a valid email address');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       isValid = false;
//     } else if (password.length < 6) {
//       setPasswordError('Password must be at least 6 characters');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     return isValid;
//   };

//   const handleRegister = async () => {
//     if (validateForm()) {
//       setLoading(true);

//       try {
//         const response = await axios.post(`${BASE_URL}/auth/register`, {
//           username,
//           email,
//           password,
//         });

//         if (response.data.success) {

//           navigation.navigate('login');
//         } else {
//           alert('Registration failed: ' + response.data.message);
//         }
//       } catch (error) {
//         alert('An error occurred: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };


//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}>
//           <View>
//             <AuthHeader image={img1} />
//           </View>

//           <View style={styles.main}>
//             <View>
//               <Text style={styles.heading}>Register</Text>
//             </View>

//             <View>
//               <CustomInput
//                 label="Username"
//                 placeholder="Enter your Name"
//                 value={username}
//                 onChangeText={setUsername}
//               />
//               {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

//               <CustomInput
//                 label="Email Address"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//               {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//               <CustomInput
//                 label="Password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={true}
//               />
//               {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            
//             </View>

//             <View style={styles.Button}>
//               {loading ? (
//                 <ActivityIndicator size='large' color={textcolor.color3} />
//               ) : (
//               <CustomButton
//                 bgColor={textcolor.color3}
//                 text="Register"
//                 width={width * 0.7}
//                 onPress={handleRegister}
//                 paddingVertical={12}
//                 textColor={textcolor.color4}
//                 fontFamily={InterFont.SemiBoldFont}
//                 fontSize={18}
//               />
//               )}

//             </View>

//             <View style={styles.footer}>
//               <View>
//                 <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
//                   Already have an account?
//                 </Text>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                   <Text style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
//                     Login
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   main: {
//     paddingHorizontal: width * 0.1,
//     paddingVertical: height * 0.02,
//   },
//   heading: {
//     fontFamily: InterFont.BoldFont,
//     fontSize: width * 0.07,
//     color: textcolor.color1,
//   },
//   forgotText: {
//     textAlign: 'right',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//   },
//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   footer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 4,
//     alignSelf: 'center',
//     marginTop: height * 0.01,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//     marginHorizontal: 7
//   },
// });

// export default Register;

// import React, { useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks

// import { InterFont, textcolor } from '../../styles/CustomStyles';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import { signupUserThunk,setCreatorFormData } from '../../redux/cartSlice';

// const { width, height } = Dimensions.get('window');

// const Register = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // Access creatorFormData from the Redux store
//   const { creatorFormData, loading, error } = useSelector((state) => state.user);

//   // Handle form validation
//   const [usernameError, setUsernameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const validateForm = () => {
//     let isValid = true;

//     if (!creatorFormData.username) {
//       setUsernameError('Username is required');
//       isValid = false;
//     } else {
//       setUsernameError('');
//     }

//     if (!creatorFormData.email) {
//       setEmailError('Email is required');
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(creatorFormData.email)) {
//       setEmailError('Please enter a valid email address');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!creatorFormData.password) {
//       setPasswordError('Password is required');
//       isValid = false;
//     } else if (creatorFormData.password.length < 6) {
//       setPasswordError('Password must be at least 6 characters');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     const data = {
//       username,
//       email,
//       password,
//     }

//     return isValid;
//   };

//   const handleRegister = () => {
//       dispatch(signupUserThunk(data))
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}>
//           <View>
//             <AuthHeader image={img1} />
//           </View>

//           <View style={styles.main}>
//             <View>
//               <Text style={styles.heading}>Register</Text>
//             </View>

//             <View>
//               <CustomInput
//                 label="Username"
//                 placeholder="Enter your Name"
//                 value={creatorFormData.username}
//                 onChangeText={(text) => dispatch(setCreatorFormData({ username: text }))}
//               />
//               {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

//               <CustomInput
//                 label="Email Address"
//                 placeholder="Enter your email"
//                 value={creatorFormData.email}
//                 onChangeText={(text) => dispatch(setCreatorFormData({ email: text }))}
//               />
//               {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//               <CustomInput
//                 label="Password"
//                 placeholder="Enter your password"
//                 value={creatorFormData.password}
//                 onChangeText={(text) => dispatch(setCreatorFormData({ password: text }))}
//                 secureTextEntry={true}
//               />
//               {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//             </View>

//             <View style={styles.Button}>
//               {loading ? (
//                 <ActivityIndicator size='large' color={textcolor.color3} />
//               ) : (
//                 <CustomButton
//                   bgColor={textcolor.color3}
//                   text="Register"
//                   width={width * 0.7}
//                   onPress={handleRegister}
//                   paddingVertical={12}
//                   textColor={textcolor.color4}
//                   fontFamily={InterFont.SemiBoldFont}
//                   fontSize={18}
//                 />
//               )}
//             </View>

//             <View style={styles.footer}>
//               <View>
//                 <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
//                   Already have an account?
//                 </Text>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                   <Text style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
//                     Login
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   main: {
//     paddingHorizontal: width * 0.1,
//     paddingVertical: height * 0.02,
//   },
//   heading: {
//     fontFamily: InterFont.BoldFont,
//     fontSize: width * 0.07,
//     color: textcolor.color1,
//   },
//   forgotText: {
//     textAlign: 'right',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//   },
//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   footer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 4,
//     alignSelf: 'center',
//     marginTop: height * 0.01,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//     marginHorizontal: 7
//   },
// });

// export default Register;

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';         ///  backend code
import { signupUserThunk } from '../../redux/cartSlice';        ///

const { width, height } = Dimensions.get('window');

// Validation Schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();                 ///
  const { loading, error } = useSelector((state) => state.user);   ///

  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema), 
  });


  const onSubmit =async (data) => {
    console.log('Form data submitted:', data);
   await dispatch(signupUserThunk(data))          /////
      .unwrap()
      .then(() => {
        console.log('User registered successfully!');
        navigation.navigate('Otp-screen');
      })
      .catch((error) => {
        console.log('Registration failed:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <AuthHeader image={img1} />
          </View>

          <View style={styles.main}>
            <View>
              <Text style={styles.heading}>Register</Text>
            </View>

            
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Username"
                  placeholder="Enter your Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Email Address"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

           
            {error && (
              <Text style={styles.errorText}>{error.message || 'Registration failed'}</Text>
            )}

         
            <View style={styles.Button}>
              <CustomButton
                bgColor={textcolor.color3}
                text={loading ? 'Registering...' : 'Register'} 
                width={width * 0.7}
                onPress={handleSubmit(onSubmit)} 
                paddingVertical={12}
                textColor={textcolor.color4}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={18}
                disabled={loading} 
              />
            </View>

            
            <View style={styles.footer}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
                  Already have an account?
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text
                    style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  main: {
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.02,
  },
  heading: {
    fontFamily: InterFont.BoldFont,
    fontSize: width * 0.07,
    color: textcolor.color1,
  },
  forgotText: {
    textAlign: 'right',
    fontSize: 12,
    fontFamily: InterFont.RegularFont,
  },
  Button: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    fontFamily: InterFont.RegularFont,
    marginTop: 5,
  },
});

export default Register;