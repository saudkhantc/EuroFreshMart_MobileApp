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
import { InterFont, textcolor } from '../../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { ENDPOINTS } from '../API/apiService';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');

const UpdatePassword = () => {
  const navigation = useNavigation();
  
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const { password, confirmPassword } = values;
    
    try {
      const email = await AsyncStorage.getItem("email");
      if (!email) {
        console.error("Email is missing.");
        setLoading(false);
        return;
      }

      const response = await API.post(ENDPOINTS.RESET_PASS, {
        email,
        password,
        confirmPassword,
      });
      
      if (response?.message) {
        console.log(response.message || "Password reset successful!");
        navigation.navigate("login"); 
      } else {
        console.error("Failed to reset password.");
      }
    } catch (error) {
      console.error(error.response?.message || "An error occurred while resetting password.");
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View>
            <AuthHeader image={img1} />
          </View>

          <View style={styles.main}>
            <Text style={styles.heading}>Change Password</Text>

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}

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
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={styles.loginText}>Register</Text>
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

  footerText: { 
    fontSize: 12 
  },
  loginText: { 
    fontSize: 12, 
    fontWeight: "bold", 
    marginLeft: 5,
    color: "#004D00"
   },
  errorText: { 
    fontSize: 12, 
    color: "red", 
    marginTop: 5
  },
});

export default UpdatePassword;

