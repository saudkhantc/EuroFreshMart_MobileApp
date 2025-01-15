import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import { InterFont, textcolor } from '../styles/CustomStyles';

const { height, width } = Dimensions.get('window');

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureText} style={styles.eyeIcon}>
            <Entypo
              name={isSecure ? 'eye-with-line' : 'eye'}
              size={24}
              color={textcolor.color2}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: InterFont.MediumFont,
    color: textcolor.color2,
    marginBottom: 4,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: textcolor.color2,
    backgroundColor: '#F2F2F2',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});

export default CustomInput;
