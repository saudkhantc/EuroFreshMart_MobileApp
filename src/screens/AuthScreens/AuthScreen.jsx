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
import img1 from '../../assets/images/fruit1.png';
import CustomButton from '../../components/CustomButton';
import googleicon from '../../assets/images/google-icon.png';
import facebookicon from '../../assets/images/facebook.png';

const {width, height} = Dimensions.get('window');

const AuthScreen = () => {
  const navigation = useNavigation();

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

          <View style={{alignItems: 'center'}}>
            <CustomButton
              bgColor={textcolor.color3}
              text="Login"
              width={width * 0.7}
              onPress={() => navigation.navigate('login')}
              paddingVertical={12}
              textColor={textcolor.color4}
              fontFamily={InterFont.SemiBoldFont}
              fontSize={18}
            />
            <CustomButton
              bgColor={textcolor.color5}
              text="Register"
              width={width * 0.7}
              onPress={() => navigation.navigate('register')}
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
              bgColor={textcolor.color9}
              text="Google"
              width={width * 0.7}
              onPress={() => console.log('Button Pressed')}
              image={googleicon}
              paddingVertical={10}
              textColor={textcolor.color8}
              fontFamily={InterFont.MediumFont}
              fontSize={14}
            />
            <CustomButton
              bgColor={textcolor.color7}
              text="Facebook"
              width={width * 0.7}
              onPress={() => console.log('Button Pressed')}
              image={facebookicon}
              paddingVertical={10}
              textColor={textcolor.color6}
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
    backgroundColor:"#fff"
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
