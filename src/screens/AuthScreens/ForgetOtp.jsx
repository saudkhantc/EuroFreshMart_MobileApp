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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import CustomButton from '../../components/CustomButton';
import { useDispatch } from 'react-redux';
import { ENDPOINTS } from '../API/apiRoutes';
import API from '../API/apiService';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const CELL_COUNT = 6;

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    try {
      const email = await AsyncStorage.getItem("email"); 
      if (!email) {
        console.error("Email not found in storage");
        return;
      }

      const response = await API.post(ENDPOINTS.CONFIRM_OTP, {
        email,
        otp: otp, 
      });

      if (response && response.message) {
        console.log(response.message || "OTP verified successfully!");
        navigation.navigate('update-password');
      } else {
        console.error(response?.message || "Invalid OTP, please try again.");
      }
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  const handleResend = async () => {
    setIsResending(true);
    try {
      const email = await AsyncStorage.getItem("email");
      const userName = await AsyncStorage.getItem("userName");
  
      if (!email || !userName) {
        console.error("Email or username not found in storage");
        alert("Email or username is missing in storage.");
        return;
      }
  
      const response = await API.post(ENDPOINTS.RESEND_OTP, { email, username: userName });

      if (response && response.message) {
        console.log(response.message || "OTP resent successfully!");
        alert(response.message || "OTP resent successfully!");
      } else {
        console.error("Failed to resend OTP.");
        alert("Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      if (error.response) {
        console.error("Error Response:", error.response);
        alert(error.response.message || "An error occurred while resending OTP.");
      } else {
        alert("An error occurred while resending OTP.");
      }
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

            <View style={styles.Button}>
                {loading ?(
                    <ActivityIndicator size="large" color={textcolor.color3}/>
                ):(
              <CustomButton
                bgColor={textcolor.color3}
                text="Submit"
                width={width * 0.7}
                onPress={() => handleSubmit({ otp }, { setSubmitting: () => {} })}
                paddingVertical={12}
                textColor={textcolor.color4}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={18}
                disabled={loading}
              />
                )}
            </View>

            <View>
              <TouchableOpacity disabled={isResending} onPress={handleResend}>
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

