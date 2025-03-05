import React, { useState, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import profile from "../../assets/images/Profile.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const EditProfile = () => {
  const navigation = useNavigation();

  // State for managing form fields and switches
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle to enable editing

  // Load user data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedNotifications = await AsyncStorage.getItem('notificationsEnabled');
        const storedTwoFactor = await AsyncStorage.getItem('isTwoFactorEnabled');

        if (storedUsername) {
          setFormData((prevData) => ({
            ...prevData,
            username: storedUsername,
          }));
        }

        if (storedEmail) {
          setFormData((prevData) => ({
            ...prevData,
            email: storedEmail,
          }));
        }

        setNotificationsEnabled(storedNotifications === 'true');
        setIsTwoFactorEnabled(storedTwoFactor === 'true');
      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Handle change in input fields
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save updated data to AsyncStorage
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', formData.username);
      await AsyncStorage.setItem('email', formData.email);
      await AsyncStorage.setItem('password', formData.password);
      await AsyncStorage.setItem('notificationsEnabled', String(notificationsEnabled));
      await AsyncStorage.setItem('isTwoFactorEnabled', String(isTwoFactorEnabled));

      Alert.alert('Information saved successfully!');
      setIsEditing(false); // Disable editing after saving
    } catch (error) {
      console.log('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile information.');
    }
  };

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
            
          </View>

          <View style={styles.imageContainer}>
            <Image source={profile} style={styles.profileImage} />
          </View>
        </View>

        <View style={styles.body}>
          {/* Profile Section */}
          <CustomInput
            label="Name"
            value={formData.username}
            onChangeText={(value) => handleChange('username', value)}
            editable={isEditing}
            labelStyle={styles.inputLabel}
          />
          <CustomInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            editable={isEditing}
            labelStyle={styles.inputLabel}
          />
          <CustomInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            editable={isEditing}
            labelStyle={styles.inputLabel}
          />

          {/* Notification Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Notification Settings</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
               // disabled={!isEditing}
              />
            </View>
          </View>

          {/* Account Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Account Settings</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Enable Two-Factor Authentication</Text>
              <Switch
                value={isTwoFactorEnabled}
                onValueChange={setIsTwoFactorEnabled}
               // disabled={!isEditing}
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              bgColor={textcolor.color3}
              text="Save"
              width={width * 0.3}
              onPress={handleSave}
              paddingVertical={6}
              textColor={textcolor.color1}
              fontFamily={InterFont.SemiBoldFont}
              fontSize={16}
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
    width: '75%',
    height: '75%',
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
  settingsSection: {
    marginVertical: 12,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color1,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: textcolor.color1,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
});

export default EditProfile;
