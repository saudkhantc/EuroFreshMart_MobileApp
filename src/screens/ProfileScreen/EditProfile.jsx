import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import profile from "../../assets/images/Profile.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
const { width, height } = Dimensions.get('window');

const EditProfile = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="cart-sharp" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image source={profile} style={styles.profileImage} />
          </View>
        </View>

        <View style={styles.body}>
          <CustomInput
            label="Name"
            placeholder="Enter your Name"
            labelStyle={styles.inputLabel}
          />
          <CustomInput
            label="Email"
            placeholder="Enter your Email"
            labelStyle={styles.inputLabel}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your Password"
            secureTextEntry={true}
            labelStyle={styles.inputLabel}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              bgColor={textcolor.color5}
              text="Save"
              width={width * 0.4}
              height={height * 0.07}
              onPress={() => navigation.navigate('login')}
              paddingVertical={6}
              textColor={textcolor.color4}
              fontFamily={InterFont.SemiBoldFont}
              fontSize={18}
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
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ACE03A',
    height: height * 0.25,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative',
  },
  iconContainer: {
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: "75%",
    height: "75%",
    resizeMode: 'contain',
    marginTop: height * 0.05,
  },
  body: {
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.07,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color1,
    marginBottom: 8,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
});

export default EditProfile;

