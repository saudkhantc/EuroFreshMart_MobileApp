
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';  
import AuthHeader from "../../components/AuthHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import img1 from "../../assets/images/Watermelon.png";
import API, { ENDPOINTS } from "../API/apiService";
import { textcolor } from "../../styles/CustomStyles";

const { width, height } = Dimensions.get("window");

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be  8 characters")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); 
  const [emailError, setEmailError] = useState('');  // use for already 1

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (values) => {
    try {
      console.log("Submitting values:", values); 

      await AsyncStorage.setItem("email", values.email);
      await AsyncStorage.setItem("userName", JSON.stringify(values.username));
  
      setLoading(true);
      const response = await API.post(ENDPOINTS.REGISTER, values);
      console.log("Full API Response:", response); 
  
      if (response.data?.message === "User Already Exist with this username") {
       // Alert.alert("Error", "User already exists with this username.");
      }  else {
        //Alert.alert("Success", "Registration successful! Check your email for verification.");
        navigation.navigate("Otp-screen");
      }
    } catch (error) {
      console.error("Error during registration:", error);
  
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      setEmailError("User already exists with this email", errorMessage);    // 1 for this
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
         <View>
           <AuthHeader image={img1} />
         </View>
          <View style={styles.main}>
            <Text style={styles.heading}>Register</Text>
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput label="Username" placeholder="Enter your Name" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput label="Email Address" placeholder="Enter your email" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput label="Password" placeholder="Enter your password" value={value} onChangeText={onChange} onBlur={onBlur} secureTextEntry={true} />
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <View style={styles.Button}>
              {loading ? (
                <ActivityIndicator size="large" color={textcolor.color3}/>
              ):(             
                 <CustomButton
                bgColor={textcolor.color3}
                text="Register"
                width={width * 0.7}
                onPress={handleSubmit(onSubmit)}
                paddingVertical={12}
                textColor={textcolor.color1}
                disabled={loading}
              />
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.loginText}>Login</Text>
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
     backgroundColor: "#fff" 
    },
  keyboardAvoidingView: { 
    flex: 1
   },
  scrollContainer: { 
    flexGrow: 1
   },
  main: { 
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.03, 
    
  },
  heading: { 
    fontSize: width * 0.07, 
    fontWeight: "bold", 
    color: "#333" 
  },
  Button: { 
    alignItems: "center", 
    marginTop: height * 0.02 
  },
  footer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: height * 0.01 
  },
  footerText: { 
    fontSize: 12 
  },
  loginText: { 
    fontSize: 12, 
    fontWeight: "bold", 
    marginLeft: 5,
    color: "#004D00" },
  errorText: { 
    fontSize: 12, 
    color: "red", 
    marginTop: 5
   },
});

export default Register;


