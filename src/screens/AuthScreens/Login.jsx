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
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { login } from '../../redux/loginSlice';
import API, { ENDPOINTS } from '../API/apiService';
import { textcolor } from '../../styles/CustomStyles';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8,"Password must be  8 characters").required('Password is required'),
});

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
  });
const handleLoginSubmit = async (values, { setSubmitting }) => {
  try {
    setLoading(true);
   // console.log('submit valueeee',values)
    const response = await API.post(ENDPOINTS.LOGIN, values);
   //  console.log("full responsive",response);

    if (response.token) {
      const userRole = response.role;
      const userName = response.username;
      const email = values.email;
      const _id = response._id;

      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("userName", JSON.stringify(userName));
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("_id", _id);

      dispatch(
        login({
          user: { email: values.email, name: userName, id:_id },
          isAdmin: userRole === "admin",
        })
      );

     // alert('login Successful!'); 

      setTimeout(() => {
        if (userRole === "admin") {
          navigation.navigate("Otp-screen"); 
        } else {
          navigation.navigate("bottom-tabs"); 
        }
      });
    } else {
      alert(response.message || "Login failed.");
    }
  } catch (err) {
    console.error("Provide valid email and password. Please try again.");
      console.error(err.message);
  } finally {
    setLoading(false);
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
            <Text style={styles.heading}>Login</Text>

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
                  secureTextEntry={!showPassword}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('forgot-password')}>
              <Text style={styles.forgotText}>
                Forget Password
              </Text>
            </TouchableOpacity>

            <View style={styles.Button}>
              {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
              ) : (
                <CustomButton
                bgColor={textcolor.color3}
                  text="Login"
                  width={width * 0.7}
                  onPress={handleSubmit(handleLoginSubmit)}
                  paddingVertical={12}
                  fontSize={18}
                  disabled={loading} 
                />
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
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
    fontSize: width * 0.07,
    color: '#333',
    fontWeight: 'bold',
  },
  forgotText: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 10,
    color: "#004D00" 
  },
  Button: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  footer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: height * 0.01, 
  },
  footerText: { 
    fontSize: 12 ,
  },
  loginText: { 
    fontSize: 12, 
    fontWeight: "bold", 
    marginLeft: 5,
    color: "#004D00" ,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 7,
  },
});

export default Login;
