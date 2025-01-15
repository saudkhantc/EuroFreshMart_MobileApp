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
import {InterFont, textcolor} from '../../styles/CustomStyles';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/Watermelon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const {width, height} = Dimensions.get('window');

const ForgotPassword = () => {
  const navigation = useNavigation();

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
              <Text style={styles.heading}>Forgot Password!</Text>
            </View>

            <View style={styles.inputSection}>
              <CustomInput
                label="Email Address"
                placeholder="Enter your email"
                //   value={email}
                //   onChangeText={setEmail}
              />
            </View>

            <View style={styles.Button}>
              <CustomButton
                bgColor={textcolor.color3}
                text="Submit"
                width={width * 0.7}
                onPress={() => navigation.navigate('Otp-screen')}
                paddingVertical={12}
                textColor={textcolor.color4}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={18}
              />
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={{fontSize: 12, fontFamily: InterFont.RegularFont}}>
                  Dont have an account?
                </Text>
              </View>
              <View>
              <TouchableOpacity onPress={() => navigation.navigate('Otp-screen')} >
                <Text
                  style={{fontSize: 12, fontFamily: InterFont.SemiBoldFont}}>
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
  inputSection:{
    marginTop:height*0.03
  }
});

export default ForgotPassword;
