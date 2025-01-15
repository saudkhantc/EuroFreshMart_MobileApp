// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import img1 from '../assets/images/carrot.jpeg';
// import {InterFont, textcolor} from '../styles/CustomStyles';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

// const {width, height} = Dimensions.get('window');
// const CustomCard = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <View>
//           <Image source={img1} style={styles.Image} />
//         </View>
//         <View style={{padding: 8, gap: 4}}>
//           <View>
//             <Text style={styles.heading}>Fresh Carrot</Text>
//           </View>

//           <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
//             <Text style={styles.PriceText}>€ 19,000</Text>
//             <Text style={styles.UnitText}>/Kg</Text>
//           </View>

//           <View>
//             <Text style={styles.RetailPriceText}>€ 21,000</Text>
//           </View>
//         </View>

//         <TouchableOpacity>
//           <View style={{paddingHorizontal: 4, paddingBottom: 4}}>
//             <View style={styles.Icon}>
//               <Ionicons name="add-circle-outline" size={34} color="#7A53B9" />
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   card: {
//     width: width * 0.4,
//     borderRadius: 15,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   Image: {
//     width: width * 0.4,
//     height: height * 0.16,
//     resizeMode: 'cover',
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,
//   },
//   heading: {
//     fontSize: 14,
//     fontFamily: InterFont.SemiBoldFont,
//     color: textcolor.color2,
//   },
//   PriceText: {
//     fontFamily: InterFont.BoldFont,
//     color: '#EE0004',
//     fontSize: 13,
//   },
//   RetailPriceText: {
//     fontFamily: InterFont.MediumFont,
//     color: textcolor.color3,
//   },
//   UnitText: {
//     fontFamily: InterFont.RegularFont,
//     color: '#828282',
//     fontSize: 10,
//   },
//   Icon: {
//     alignItems: 'flex-end',
//   },
// });

// export default CustomCard;

// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import img1 from '../assets/images/carrot.jpeg';
// import {InterFont, textcolor} from '../styles/CustomStyles';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

// const {width, height} = Dimensions.get('window');
// const CustomCard = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         {/* Image Section with Heart Icon */}
//         <View>
//           <Image source={img1} style={styles.Image} />
//           <TouchableOpacity style={styles.wishlistIcon}>
//             <Ionicons name="heart-outline" size={24} color="#FFF" />
//           </TouchableOpacity>
//         </View>

//         {/* Text Section */}
//         <View style={{padding: 8, gap: 4}}>
//           <View>
//             <Text style={styles.ProductName}>Fresh Carrot</Text>
//           </View>

//           <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
//             <Text style={styles.PriceText}>€ 19,000</Text>
//             <Text style={styles.UnitText}>/Kg</Text>
//           </View>

//           <View>
//             <Text style={styles.RetailPriceText}>€ 21,000</Text>
//           </View>
//         </View>

//         {/* Add to Cart Section */}
//         <TouchableOpacity>
//           <View style={{paddingHorizontal: 4, paddingBottom: 4}}>
//             <View style={styles.Icon}>
//               <Ionicons name="add-circle-outline" size={34} color="#7A53B9" />
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   card: {
//     width: width * 0.42,
//     borderRadius: 15,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   Image: {
//     width: width * 0.42,
//     height: height * 0.16,
//     resizeMode: 'cover',
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,
//   },
//   wishlistIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#241A10',
//     padding: 4,
//     borderRadius: 50,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   ProductName: {
//     fontSize: 14,
//     fontFamily: InterFont.SemiBoldFont,
//     color: textcolor.color2,
//   },
//   PriceText: {
//     fontFamily: InterFont.BoldFont,
//     color: '#EE0004',
//     fontSize: 13,
//   },
//   RetailPriceText: {
//     fontFamily: InterFont.MediumFont,
//     color: textcolor.color3,
//   },
//   UnitText: {
//     fontFamily: InterFont.RegularFont,
//     color: '#828282',
//     fontSize: 10,
//   },
//   Icon: {
//     alignItems: 'flex-end',
//   },
// });

// export default CustomCard;


import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import Ionicons from 'react-native-vector-icons/dist/Ionicons';
  import {InterFont, textcolor} from '../styles/CustomStyles';
  
  const {width, height} = Dimensions.get('window');
  
  const CustomCard = ({imageSource, productname, pricetext, unittxt, retailprice}) => {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Image Section with Heart Icon */}
          <View>
            <Image source={imageSource} style={styles.Image} />
            <TouchableOpacity style={styles.wishlistIcon}>
              <Ionicons name="heart-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
  
          {/* Text Section */}
          <View style={{padding: 5, gap: 3}}>
            <View>
              <Text style={styles.ProductName}>{productname}</Text>
            </View>
  
            <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
              <Text style={styles.PriceText}>{pricetext}</Text>
              <Text style={styles.UnitText}>{unittxt}</Text>
            </View>
  
            <View>
              <Text style={styles.RetailPriceText}>{retailprice}</Text>
            </View>
          </View>
  
          {/* Add to Cart Section */}
          <TouchableOpacity>
            <View style={{paddingHorizontal: 4, paddingBottom: 4}}>
              <View style={styles.Icon}>
                <Ionicons name="add-circle-outline" size={34} color="#7A53B9" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {},
    card: {
      width: width * 0.42,
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    Image: {
      width: width * 0.42,
      height: height * 0.15,
      resizeMode: 'cover',
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    wishlistIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#241A10',
      padding: 4,
      borderRadius: 50,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    ProductName: {
      fontSize: 14,
      fontFamily: InterFont.SemiBoldFont,
      color: textcolor.color2,
    },
    PriceText: {
      fontFamily: InterFont.BoldFont,
      color: '#EE0004',
      fontSize: 13,
    },
    RetailPriceText: {
      fontFamily: InterFont.MediumFont,
      color: textcolor.color3,
    },
    UnitText: {
      fontFamily: InterFont.RegularFont,
      color: '#828282',
      fontSize: 10,
    },
    Icon: {
      alignItems: 'flex-end',
    },
  });
  
  export default CustomCard;
  