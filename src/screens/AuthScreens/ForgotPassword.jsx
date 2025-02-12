import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import API, { ENDPOINTS } from '../API/apiService';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { email } = values;

      await AsyncStorage.setItem('email', email);

      const response = await API.post(ENDPOINTS.FORGOT_PASSWORD, { email });
      console.log('Api responsive',response)

      if (response.message) {
        Alert.alert(response.message || 'OTP sent successfully!');
        navigation.navigate('forgetOtp');
      } else {
        Alert.alert('Failed to send OTP.');
      }
    } catch (error) {
      const errorMessage = error?.response?.message || error.message || 'An error occurred.';
      Alert.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View>
            <AuthHeader image={img1} />
          </View>

          <View style={styles.main}>
            <View>
              <Text style={styles.heading}>Forgot Password!</Text>
            </View>

            <View style={styles.inputSection}>
              {/* Using Controller for form control */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Email Address"
                    placeholder="Enter your email"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.Button}>
              {loading ? (
                <ActivityIndicator size="large" color={textcolor.color3} />
              ) : (
                <CustomButton
                  bgColor={textcolor.color3}
                  text="Submit"
                  width={width * 0.7}
                  onPress={handleSubmit(onSubmit)} 
                  paddingVertical={12}
                  textColor={textcolor.color4}
                  fontFamily={InterFont.SemiBoldFont}
                  fontSize={18}
                  disabled={loading}
                />
              )}
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
                  Don't have an account?
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Otp-screen')}>
                  <Text style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
                    Register
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
  Button: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  inputSection: {
    marginTop: height * 0.03,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default ForgotPassword;



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
//   Alert,
// } from 'react-native';
// import { InterFont, textcolor } from '../../styles/CustomStyles';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import API, { ENDPOINTS } from '../API/apiService';

// const { width, height } = Dimensions.get('window');

// const ForgotPassword = () => {
//   const navigation = useNavigation();
//   const [Loading, setLoading] = useState(false);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setLoading(true);
//     try {
//       await AsyncStorage.setItem("email", values.email);

//       const response = await API.post(ENDPOINTS.FORGOT_PASSWORD, {
//         email: values.email,
//       });


//       if (response.message) {
//         Alert.alert(response.message || "OTP sent successfully!");
//         navigation.navigate("Otp_screen"); 
//       } else {
//         toast.error(response.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       toast.error(error.response.message || "An error occurred.");
//     } finally {
//       setSubmitting(false);
//       setLoading(false);
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
//               <Text style={styles.heading}>Forgot Password!</Text>
//             </View>

//             <View style={styles.inputSection}>
//               <CustomInput
//                 label="Email Address"
//                 placeholder="Enter your email"
//               //   value={email}
//               //   onChangeText={setEmail}
//               />
//             </View>

//             <View style={styles.Button}>
//               {Loading ? (
//                 <ActivityIndicator size='large' color={textcolor.color3} />
//               ) : (
//                 <CustomButton
//                   bgColor={textcolor.color3}
//                   text="Submit"
//                   width={width * 0.7}
//                   onPress={handleSubmit}
//                   paddingVertical={12}
//                   textColor={textcolor.color4}
//                   fontFamily={InterFont.SemiBoldFont}
//                   fontSize={18}
//                   disabled={Loading}
//                 />
//               )}
//             </View>

//             <View style={styles.footer}>
//               <View>
//                 <Text style={{ fontSize: 12, fontFamily: InterFont.RegularFont }}>
//                   Dont have an account?
//                 </Text>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.navigate('Otp-screen')} >
//                   <Text
//                     style={{ fontSize: 12, fontFamily: InterFont.SemiBoldFont }}>
//                     Register
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

//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   footer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 4,
//     alignSelf: 'center',
//     marginTop: height * 0.02,
//   },
//   inputSection: {
//     marginTop: height * 0.03
//   }
// });

// export default ForgotPassword;
