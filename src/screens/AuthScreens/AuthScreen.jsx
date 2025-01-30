import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import img1 from '../../assets/images/fruit1.png';
import CustomButton from '../../components/CustomButton';
import googleicon from '../../assets/images/google-icon.png';
import facebookicon from '../../assets/images/facebook.png';
import { InterFont, textcolor } from '../../styles/CustomStyles';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonSelect = (buttonType) => {
    setSelectedButton(buttonType);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <AuthHeader image={img1} />
        </View>

        <View style={styles.main}>
          <View>
            <Text style={styles.heading}>Already have an account?</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <CustomButton
              bgColor={selectedButton==='login'?textcolor.color3:textcolor.color5}
              text="Login"
              width={width * 0.7}
              onPress={() => {
                handleButtonSelect('login');
                navigation.navigate('login');
              }}
              paddingVertical={12}
              textColor={textcolor.color4}
              fontFamily={InterFont.SemiBoldFont}
              fontSize={18}
            />
            <CustomButton
              bgColor={selectedButton==='register'?textcolor.color3:textcolor.color5}
              text="Register"
              width={width * 0.7}
              onPress={() => {
                handleButtonSelect('register');
                navigation.navigate('register');
              }}
              paddingVertical={12}
              textColor={textcolor.color4}
              fontFamily={InterFont.SemiBoldFont}
              fontSize={18}
            />
          </View>

          <View style={styles.loginSection}>
            <View style={styles.line}></View>
            <View>
              <Text>Or login with</Text>
            </View>
            <View style={styles.line}></View>
          </View>

          <View style={styles.AuthButtons}>
            <CustomButton
              bgColor={selectedButton ==='google'? textcolor.color7:textcolor.color9}
              text="Google"
              width={width * 0.7}
              onPress={() => {
                handleButtonSelect('google')
                console.log('Google Button Pressed')
              }}
              image={googleicon}
              paddingVertical={10}
              textColor={selectedButton === 'google' ? textcolor.color6 : textcolor.color8}
              fontFamily={InterFont.MediumFont}
              fontSize={14}
            />
            <CustomButton
              bgColor={selectedButton==='facebook'?textcolor.color7:textcolor.color9}
              text="Facebook"
              width={width * 0.7}
              onPress={() => {
                handleButtonSelect('facebook')
                console.log('Facebook Button Pressed')
              }}
              image={facebookicon}
              paddingVertical={10}
              textColor={selectedButton === 'facebook' ? textcolor.color6 : textcolor.color8}
              fontFamily={InterFont.MediumFont}
              fontSize={14}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontFamily: InterFont.BoldFont,
    fontSize: width * 0.07,
    color: textcolor.color1,
  },
  loginSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: height * 0.03,
  },
  line: {
    width: width * 0.3,
    borderBottomColor: '#828282',
    borderBottomWidth: 1,
  },
  AuthButtons: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});

export default AuthScreen;
