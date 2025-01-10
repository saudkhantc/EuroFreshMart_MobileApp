import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {InterFont, textcolor} from '../styles/CustomStyles';

const {width, height} = Dimensions.get('window');

const CustomButton = ({bgColor, text, width, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: bgColor, width: width}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: height * 0.065,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: InterFont.BoldFont,
    color: textcolor.color4,
  },
});

export default CustomButton;
