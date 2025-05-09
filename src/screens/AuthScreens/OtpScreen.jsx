import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import CustomButton from '../../components/CustomButton';
import API from '../API/apiService';
import { ENDPOINTS } from '../API/apiRoutes';
import { useDispatch } from 'react-redux';
import { verifyAdmin, verifyFailure } from '../../redux/loginSlice';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');  // State to handle OTP errors
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState(''); // State for handling API errors
  const [isSuccess, setIsSuccess] = useState(''); // State for success message

  const CELL_COUNT = 6;

  const handleVerifyOtp = async (values, { setSubmitting }) => {
    setOtpError(''); 
    setApiError('');
    setIsSuccess('');

    try {
      const userName = await AsyncStorage.getItem('userName');
      if (!userName) {
        setOtpError('User name not found in storage.');
        setSubmitting(false);
        return;
      }

      const cleanedUserName = userName.replace(/['"]+/g, '');
  
      const response = await API.post(`${ENDPOINTS.VERIFICATION}/${cleanedUserName}`, { code: values.otp });

      if (response && response.success) {
        setIsSuccess('OTP verified successfully!');
        dispatch(verifyAdmin());
        navigation.navigate("login");
      } else {
        setApiError(response?.message || 'OTP verification failed.');
        dispatch(verifyFailure());
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
  
      if (error.response) {
        setApiError(error.response?.data?.message || 'An error occurred while verifying the OTP.');
      } else if (error.request) {
        setApiError('No response from server. Please check your internet connection.');
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const userName = await AsyncStorage.getItem("userName");

      if (!userName) {
        setApiError('User name not found.');
        setIsResending(false);
        return;
      }

      const response = await API.post(`${ENDPOINTS.RESEND_OTP}`, { username: userName });

      if (response && response.success) {
        setIsSuccess('OTP sent successfully!');
      } else {
        setApiError(response?.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      setApiError('OTP has already been sent! Please verify first.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View>
            <AuthHeader image={img1} />
          </View>

          <View style={styles.main}>
            <View>
              <Text style={styles.heading}>OTP Verification!</Text>
              <Text style={styles.subheading}>An OTP code has been sent to your email.</Text>
            </View>

            <View style={styles.CodeFieldInput}>
              <CodeField
                value={otp}
                onChangeText={setOtp}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={[styles.cell, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : ' ')}</Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.errorMessages}>
              {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
              {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
              {isSuccess ? <Text style={styles.successText}>{isSuccess}</Text> : null}
            </View>

            <View style={styles.Button}>
              <CustomButton
                bgColor={textcolor.color3}
                text="Submit"
                width={width * 0.7}
                onPress={() => handleVerifyOtp({ otp }, { setSubmitting: () => {} })}
                paddingVertical={12}
                textColor={textcolor.color4}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={18}
              />
            </View>

            <View>
              <TouchableOpacity onPress={handleResend} disabled={isResending}>
                <Text style={styles.resendText}>{isResending ? 'Resending...' : 'Resend OTP'}</Text>
              </TouchableOpacity>
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
  errorMessages: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: InterFont.RegularFont,
  },
  successText: {
    color: 'green',
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
