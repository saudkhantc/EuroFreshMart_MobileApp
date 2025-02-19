// import React from 'react';
// import {View, Image, StyleSheet, Dimensions} from 'react-native';
// import Swiper from 'react-native-swiper';
// import img1 from '../assets/images/sliderImage.png';

// const {width, height} = Dimensions.get('window');

// const ImageSlider = () => {
//   const images = [img1, img1];

//   return (
//     <View style={styles.container}>
//       <Swiper
//         style={styles.wrapper}
//         showsButtons={false}
//         autoplay={true}
//         showsPagination={false}
//         autoplayTimeout={3}>
//         {images.map((image, index) => (
//           <View key={index} style={styles.slide}>
//             <Image source={image} style={styles.image} />
//           </View>
//         ))}
//       </Swiper>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     borderRadius: 20,   
//   },
//   wrapper: {
//     height: height * 0.27,
//   },
//   slide: {
//     width: width * 0.9,
//     height: height * 0.27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//   },
//   image: {
//     width: width * 0.86,
//     height: height * 0.27,
//     borderRadius: 20,
//     resizeMode: 'contain',
//   },
// });

// export default ImageSlider;
// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
// import Swiper from 'react-native-swiper';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBannersByType } from '../redux/bannerSlice';

// const { width, height } = Dimensions.get('window');

// const ImageSlider = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.banner);
//   const banners = data;

//   useEffect(() => {
//     dispatch(fetchBannersByType("Top Banner"));
//   }, [dispatch]);

//   // Handle loading or error state
//   // if (loading) {
//   //   return (
//   //     <View style={styles.loader}>
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <View style={styles.loader}>
//   //       <Text>Error: {error}</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         style={styles.wrapper}
//         showsButtons={false}
//         autoplay={true}
//         showsPagination={false}
//         autoplayTimeout={3}
//       >
//        {banners?.topBanner[0]?.map((banner, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.slide}
//             >
//               <Image 
//                 source={banner.image } // Ensure the image source is set with 'uri'
//                 style={styles.image}
//               />
//             </TouchableOpacity>
//           ))
// }
//       </Swiper>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderRadius: 20,
//   },
//   wrapper: {
//     height: height * 0.27,
//   },
//   slide: {
//     width: width * 0.9,
//     height: height * 0.27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//   },
//   image: {
//     width: width * 0.86,
//     height: height * 0.27,
//     borderRadius: 20,
//     resizeMode: 'contain', // Ensure the image scales correctly within the container
//   },
//   noBannersText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#888',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ImageSlider;

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
    <View style={styles.container}>
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
  container: {
    flex: 1,
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
    //backgroundColor:'red'
  },
  image: {
    width: width *0.9,
    height: height * 0.27,
    borderRadius: 20,
     //resizeMode:'contain'
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
