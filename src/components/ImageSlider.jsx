import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBannersByType } from '../redux/bannerSlice';

const { width, height } = Dimensions.get('window');

const ImageSlider = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banners);
  const banners = data?.banners || {}; 
  const { topBanner, loading, error } = banners;

  useEffect(() => {
    dispatch(fetchBannersByType("Top Banner"));
  }, [dispatch]);

  // Handle loading or error state
  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{}}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        showsPagination={false}
        autoplayTimeout={3}
      >
        {Array.isArray(topBanner) && topBanner.length > 0 ? (
          topBanner.map((banner, index) => (
            <TouchableOpacity key={index} style={styles.slide}>
              <Image 
                source={{ uri: banner.image }} 
                style={styles.image}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noBannersText}>No banners available</Text>
        )}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
 
  wrapper: {
    height: height * 0.20,
    backgroundColor:'#ACD43A'
  },
  slide: {
    width: width * 0.9,
    height: height * 0.15,
    borderRadius: 20,
    //backgroundColor:'red'
  },
  image: {
    width: width *0.9,
    height: height * 0.20,
     resizeMode:'contain',
  },
  noBannersText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageSlider;
