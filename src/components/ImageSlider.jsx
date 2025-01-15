import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import img1 from '../assets/images/sliderImage.png';

const {width, height} = Dimensions.get('window');

const ImageSlider = () => {
  const images = [img1, img1];

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        showsPagination={false}
        autoplayTimeout={3}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,   
  },
  wrapper: {
    height: height * 0.27,
  },
  slide: {
    width: width * 0.9,
    height: height * 0.27,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  image: {
    width: width * 0.86,
    height: height * 0.27,
    borderRadius: 20,
    resizeMode: 'contain',
  },
});

export default ImageSlider;
