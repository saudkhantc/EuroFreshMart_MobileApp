import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileInformation() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedAddress = await AsyncStorage.getItem('address');

        if (storedUserName) setUserName(storedUserName);
        if (storedEmail) setEmail(storedEmail);
        if (storedAddress) setAddress(storedAddress);
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Handle address change
  const handleAddressChange = (text) => {
    setAddress(text);
    setIsButtonDisabled(text.trim() === '');
  };

  // Save data to AsyncStorage
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('address', address);

      Alert.alert('Success', 'Information saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
      Alert.alert('Error', 'Failed to save information.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={userName}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={handleAddressChange}
          multiline
          numberOfLines={6}
          style={styles.textarea}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isButtonDisabled}
          style={[styles.saveButton, isButtonDisabled && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    paddingTop: 10,
    textAlignVertical: 'top', // Ensures text starts from top in multiline TextInput
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ACE03A',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileInformation;
