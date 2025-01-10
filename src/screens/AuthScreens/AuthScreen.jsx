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

          <View style={{alignItems:"center",}}>
          <CustomButton
        bgColor={textcolor.color3}
        text="Login"
       width={width * 0.6}
        onPress={() => Alert.alert('Cancel Pressed!')}
      />
          <CustomButton
        bgColor={textcolor.color5}
        text="Register"
       width={width * 0.6}
        onPress={() => Alert.alert('Cancel Pressed!')}
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
});

export default AuthScreen;
