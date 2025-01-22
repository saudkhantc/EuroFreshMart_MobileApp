import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const {width,height} = Dimensions.get('window');

const CustomButton = ({
  bgColor,
  text,
  width,
  height,
  onPress,
  image,
  paddingVertical = 12,
  textColor,
  fontFamily,
  fontSize,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          width: width,
          height:height,
          paddingVertical,
          flexDirection: image ? 'row' : 'column',
        },
      ]}
      onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontFamily: fontFamily,
            fontSize,
            marginLeft: image ? width * 0.2 : 0,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: height*0.01,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  text: {
    // marginLeft: width * 0.13,
    textAlign: 'center',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CustomButton;
