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
  ActivityIndicator,
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

const { width, height } = Dimensions.get('window');


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    //.min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema), 
  });

  
  const onSubmit = async (data) => {
    setLoading(true);

   
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
              <Text style={styles.heading}>Login</Text>
            </View>
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

            <View>
              <TouchableOpacity onPress={() => navigation.navigate('forgot-password')}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

         
            <View style={styles.Button}>
              {loading ? (
                <ActivityIndicator size="large" color={textcolor.color3} />
              ) : (
                <CustomButton
                  bgColor={textcolor.color3}
                  text="Login"
                  width={width * 0.7}
                  onPress={handleSubmit(onSubmit)} 
                  paddingVertical={12}
                  textColor={textcolor.color4}
                  fontFamily={InterFont.SemiBoldFont}
                  fontSize={18}
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
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
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
    marginTop: height * 0.02,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: InterFont.RegularFont,
    marginHorizontal: 7,
  },
});

export default Login;
