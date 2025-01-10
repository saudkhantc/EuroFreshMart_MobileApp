import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {textcolor} from '../styles/CustomStyles';

const {width, height} = Dimensions.get('window');
const AuthHeader = ({image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authHeader: {
    width: width * 1,
    height: height * 0.3,
    backgroundColor: textcolor.color3,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 1,
    height: height * 0.3,
    resizeMode: 'contain',
  },
});

export default AuthHeader;
