// import React, {useState} from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import {InterFont, textcolor} from '../../styles/CustomStyles';
// import {useNavigation} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import AuthHeader from '../../components/AuthHeader';
// import img1 from '../../assets/images/Watermelon.png';
// import {
//   CodeField,
//   Cursor,
//   isLastFilledCell,
// } from 'react-native-confirmation-code-field';
// import CustomButton from '../../components/CustomButton';
// import { useDispatch, useSelector } from 'react-redux';
// import { resendOtpThunk, verifyOtpThunk } from '../../redux/cartSlice';

// const {width, height} = Dimensions.get('window');

// const OtpScreen = () => {
//   const navigation = useNavigation();
//   const [otp, setOtp] = useState('');
//   const dispatch = useDispatch();
//   const [isOtpValid, setIsOtpValid] = useState(true);

//   const otpLoading = useSelector((state) => state.user.otpLoading);      ////
//   const otpError = useSelector((state) => state.user.otpError);
//   const resendOtpLoading = useSelector((state) => state.user.resendOtpLoading);
//   const CELL_COUNT = 6;

//   const handleVerify = () => {
//     // Example logic to validate OTP
//     if (otp.length !== CELL_COUNT) {
//       setIsOtpValid(false);
//       return;
//     } 
//     dispatch(verifyOtpThunk(otp))
//       .unwrap()
//       .then(() => {
//         Alert.alert('Success', 'OTP verified successfully!');
//         navigation.navigate('update-password');
//       })
//       .catch((error) => {
//         setIsOtpValid(false);
//         Alert.alert('Error', error.message || 'Invalid OTP');
//       });
//   };
//   const handleResendOtp = () => {
//     dispatch(resendOtpThunk())
//       .unwrap()
//       .then(() => {
//         Alert.alert('Success', 'OTP has been resent to your phone.');
//       })
//       .catch((error) => {
//         Alert.alert('Error', error.message || 'Failed to resend OTP');
//       });
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
//               <Text style={styles.heading}>OTP Verfification!</Text>
//               <Text style={styles.subheading}>
//                 An OTP code has been sent to your phone.
//               </Text>
//             </View>

//             <View style={styles.CodeFieldInput}>
//               <CodeField
//                 value={otp}
//                 onChangeText={(text) => {
//                   setOtp(text);
//                   setIsOtpValid(true);
//                 }}
//                 cellCount={CELL_COUNT}
//                 rootStyle={styles.codeFieldRoot}
//                 keyboardType="number-pad"
//                 textContentType="oneTimeCode"
//                 renderCell={({index, symbol, isFocused}) => (
//                   <View
//                     key={index}
//                     style={[
//                       styles.cell,
//                       isFocused && styles.focusCell,
//                       !isOtpValid && styles.errorCell,
//                     ]}>
//                     <Text style={styles.cellText}>
//                       {symbol || (isFocused ? <Cursor /> : ' ')}
//                     </Text>
//                   </View>
//                 )}
//               />

//               {!isOtpValid && (
//                 <Text style={styles.errorText}>
//                   Invalid OTP. Please try again.
//                 </Text>
//               )}
//             </View>

//             <View style={styles.Button}>
//             {otpLoading ? (
//                 <ActivityIndicator size="large" color={textcolor.color3} />
//               ) : (
//                 <CustomButton
//                   bgColor={textcolor.color3}
//                   text="Submit"
//                   width={width * 0.7}
//                   onPress={handleVerify}
//                   paddingVertical={12}
//                   textColor={textcolor.color4}
//                   fontFamily={InterFont.SemiBoldFont}
//                   fontSize={18}
//                 />
//               )}
//             </View>

//             <View>
//             {resendOtpLoading ? (
//                 <ActivityIndicator size="small" color={textcolor.color1} />
//               ) : (
//                 <TouchableOpacity onPress={handleResendOtp}>
//                   <Text style={styles.resendText}>Resend OTP</Text>
//                 </TouchableOpacity>
//               )}
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
//   subheading: {
//     fontSize: 14,
//     fontFamily: InterFont.RegularFont,
//     color: textcolor.color2,
//   },
//   CodeFieldInput: {
//     marginTop: height * 0.05,
//   },
//   codeFieldRoot: {
//     // marginTop: 20,
//   },
//   cell: {
//     width: width * 0.12,
//     height: height * 0.065,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#F2F2F2',
//   },
//   focusCell: {
//     borderColor: textcolor.color3,
//   },
//   cellText: {
//     fontSize: 20,
//     fontFamily: InterFont.MediumFont,
//     color: textcolor.color2,
//   },
//   errorCell: {
//     borderColor: 'red',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//     fontSize: 12,
//     fontFamily: InterFont.RegularFont,
//   },

//   resendText: {
//     color: textcolor.color1,
//     fontSize: 12,
//     fontFamily: InterFont.SemiBoldFont,
//     textAlign: 'center',
//   },
//   Button: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
// });

// export default OtpScreen;

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
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtpThunk, verifyOtpThunk } from '../../redux/cartSlice';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(true);

  const otpLoading = useSelector((state) => state.user.otpLoading);
  const otpError = useSelector((state) => state.user.otpError);
  const resendOtpLoading = useSelector((state) => state.user.resendOtpLoading);

  const CELL_COUNT = 6;

  const handleVerify = () => {
    if (otp.length !== CELL_COUNT) {
      setIsOtpValid(false);
      return;
    }
    dispatch(verifyOtpThunk(otp))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'OTP verified successfully!');
        navigation.navigate('update-password');
      })
      .catch((error) => {
        setIsOtpValid(false);
        Alert.alert('Error', error.message || 'Invalid OTP');
      });
  };

  const handleResendOtp = () => {
    dispatch(resendOtpThunk())
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'OTP has been resent to your phone.');
      })
      .catch((error) => {
        Alert.alert('Error', error.message || 'Failed to resend OTP');
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
              <Text style={styles.heading}>OTP Verification!</Text>
              <Text style={styles.subheading}>
                An OTP code has been sent to your phone.
              </Text>
            </View>

            <View style={styles.CodeFieldInput}>
              <CodeField
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  setIsOtpValid(true);
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[
                      styles.cell,
                      isFocused && styles.focusCell,
                      !isOtpValid && styles.errorCell,
                    ]}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : ' ')}
                    </Text>
                  </View>
                )}
              />

              {!isOtpValid && (
                <Text style={styles.errorText}>
                  Invalid OTP. Please try again.
                </Text>
              )}
            </View>

            <View style={styles.Button}>
              {otpLoading ? (
                <ActivityIndicator size="large" color={textcolor.color3} />
              ) : (
                <CustomButton
                  bgColor={textcolor.color3}
                  text="Submit"
                  width={width * 0.7}
                  onPress={handleVerify}
                  paddingVertical={12}
                  textColor={textcolor.color4}
                  fontFamily={InterFont.SemiBoldFont}
                  fontSize={18}
                />
              )}
            </View>

            <View>
              {resendOtpLoading ? (
                <ActivityIndicator size="small" color={textcolor.color1} />
              ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
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
  subheading: {
    fontSize: 14,
    fontFamily: InterFont.RegularFont,
    color: textcolor.color2,
  },
  CodeFieldInput: {
    marginTop: height * 0.05,
  },
  codeFieldRoot: {
    // marginTop: 20,
  },
  cell: {
    width: width * 0.12,
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
  },
  focusCell: {
    borderColor: textcolor.color3,
  },
  cellText: {
    fontSize: 20,
    fontFamily: InterFont.MediumFont,
    color: textcolor.color2,
  },
  errorCell: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 12,
    fontFamily: InterFont.RegularFont,
  },
  resendText: {
    color: textcolor.color1,
    fontSize: 12,
    fontFamily: InterFont.SemiBoldFont,
    textAlign: 'center',
  },
  Button: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});

export default OtpScreen;