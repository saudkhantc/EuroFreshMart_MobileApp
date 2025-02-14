
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId, imageSource, productname, pricetext, unittxt, retailprice,description } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.Image} />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign
                name="arrowleft"
                size={30}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome
                name="shopping-cart"
                size={30}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.ProductDetails}>
          <View style={styles.TextContainer}>
            <Text style={styles.ProductName}>{productname}</Text>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Text style={styles.PriceText}>{pricetext}</Text>
              <Text style={styles.UnitText}>{unittxt}</Text>
            </View>
            <Text style={styles.RetailPriceText}>{retailprice}</Text>
          </View>
          <View style={{marginVertical: height * 0.012}}>
                      <View style={{marginVertical: height * 0.012}}>
                         <View>
                          <Text style={styles.DescText}>Description</Text>
                           <Text style={styles.DescDetails}>
                           {description}
                           </Text>
                         </View>
                         <View style={{marginTop: height * 0.01}}>
                           <Text style={styles.DescText}>Origin</Text>
                          <Text style={styles.DescDetails}>
                            {description}
                           </Text>
                         </View>
                       </View>
                    </View>
        </View>
      </ScrollView>

      {/* Footer with Quantity and Add to Cart Button */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={decrementQuantity}
            style={styles.quantityButton}>
            <AntDesign name="minus" color="#ACE03A" size={20} />
          </TouchableOpacity>

          <View style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>

          <TouchableOpacity onPress={incrementQuantity}
            style={styles.quantityButton}>
            <AntDesign name="plus" color="#ACE03A" size={20} />
          </TouchableOpacity>
        </View>

        <View>
          <CustomButton
            bgColor={textcolor.color3}
            text="Add to cart"
            width={width * 0.38}
            onPress={() => navigation.navigate('cart-screen')}
            paddingVertical={10}
            textColor={textcolor.color4}
            fontFamily={InterFont.SemiBoldFont}
            fontSize={16}
          />
        </View>
      </View>
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
  imageContainer: {
    position: 'relative',
  },
  Image: {
    width: '100%',
    height: height * 0.4,
  },
  iconContainer: {
    position: 'absolute',
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  ProductDetails: {
    paddingHorizontal: 20,
  },
  TextContainer: {
    paddingVertical: 10,
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  ProductName: {
    fontSize: 24,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color2,
  },
  PriceText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color3,
  },
  RetailPriceText: {
    fontFamily: InterFont.MediumFont,
    color: textcolor.color3,
  },
  UnitText: {
    fontFamily: InterFont.RegularFont,
    color: '#828282',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ACE03A',
    borderRadius: 5,
    padding: 2,
  },
  quantityDisplay: {
    borderWidth: 1,
    borderColor: '#ACE03A',
    borderRadius: 5,
    padding: 2,
    width: width * 0.11,
    height: height * 0.055,
    justifyContent: 'center',
    backgroundColor: textcolor.color3,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
    textAlign: 'center',
  },
  DescText: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
    color: '#7A53B9',
  },
  DescDetails: {
    fontSize: 13,
    fontFamily: InterFont.RegularFont,
    color: '#828282',
  },
});

export default ProductDetails;

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React,{useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import img1 from '../../assets/images/productDetail.jpeg';
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// import {useNavigation} from '@react-navigation/native';
// import {InterFont, textcolor} from '../../styles/CustomStyles';
// import CustomButton from '../../components/CustomButton';

// const {width, height} = Dimensions.get('window');

// const ProductDetails = ({route}) => {
//   const navigation = useNavigation();
//   const { productId, productname, pricetext, unittxt, retailprice, imageSource } = route.params;
//   const handleBackPress = () => {
//     navigation.goBack();
//   };
//   const [quantity, setQuantity] = useState(0);
  
//   const incrementQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(prevQuantity => prevQuantity - 1);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.imageContainer}>
//           <Image source={img1} style={styles.Image} />

//           <View style={styles.iconContainer}>
//             <TouchableOpacity onPress={handleBackPress}>
//               <AntDesign
//                 name="arrowleft"
//                 size={30}
//                 color="#fff"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity>
//               <FontAwesome
//                 name="shopping-cart"
//                 size={30}
//                 color="#fff"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.ProductDetails}>
//           <View style={styles.TextContainer}>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 24,
//                   fontFamily: InterFont.SemiBoldFont,
//                   color: textcolor.color2,
//                 }}>
//                 Fresh Carrot
//               </Text>
//             </View>

//             <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontFamily: InterFont.SemiBoldFont,
//                   color: textcolor.color3,
//                 }}>
//                 $ 18,000
//               </Text>
//               <Text
//                 style={{
//                   fontFamily: InterFont.RegularFont,
//                   color: '#828282',
//                   fontSize: 12,
//                 }}>
//                 /kg
//               </Text>
//             </View>
//           </View>

//           <View style={{marginTop: height * 0.01}}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: InterFont.SemiBoldFont,
//                 color: textcolor.color2,
//                 textAlign: 'center',
//               }}>
//               Details
//             </Text>
//           </View>

//           <View style={{marginVertical: height * 0.012}}>
//             <View>
//               <Text style={styles.DescText}>Description</Text>
//               <Text style={styles.DescDetails}>
//                 The carrot is a root vegetable, most commonly observed as orange
//                 in color, though purple, black, red, white, and yellow cultivars
//                 exist, all of which are domesticated forms of the wild carrot,
//                 Daucus carota, native to Europe and Southwestern Asia.
//               </Text>
//             </View>
//             <View style={{marginTop: height * 0.01}}>
//               <Text style={styles.DescText}>Origin</Text>
//               <Text style={styles.DescDetails}>
//                 The carrot is a root vegetable, most commonly observed as orange
//                 in color, though purple, black, red, white, and yellow cultivars
//                 exist, all of which are domesticated forms of the wild carrot,
//                 Daucus carota, native to Europe and Southwestern Asia.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
//           <TouchableOpacity onPress={decrementQuantity}
//             style={{
//               borderWidth: 1,
//               borderColor: '#ACE03A',
//               borderRadius: 5,
//               padding: 2,
//             }}>
//             <AntDesign name="minus" color="#ACE03A" size={20} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{
//               borderWidth: 1,
//               borderColor: '#ACE03A',
//               borderRadius: 5,
//               padding: 2,
//               width: width * 0.11,
//               height: height * 0.055,
//               justifyContent: 'center',
//               backgroundColor: textcolor.color3,
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: InterFont.SemiBoldFont,
//                 textAlign: 'center',
//               }}>
//               {quantity}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity  onPress={incrementQuantity}
//             style={{
//               borderWidth: 1,
//               borderColor: '#ACE03A',
//               borderRadius: 5,
//               padding: 2,
//             }}>
//             <AntDesign name="plus" color="#ACE03A" size={20} />
//           </TouchableOpacity>
//         </View>

//         <View>
//           <CustomButton
//             bgColor={textcolor.color3}
//             text="Add to cart"
//             width={width * 0.38}
//             onPress={() => navigation.navigate('cart-screen')}
//             paddingVertical={10}
//             textColor={textcolor.color4}
//             fontFamily={InterFont.SemiBoldFont}
//             fontSize={16}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   Image: {
//     width: '100%',
//     height: height * 0.4,
//   },
//   iconContainer: {
//     position: 'absolute',
//     top: height * 0.02,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   icon: {},
//   ProductDetails: {
//     paddingHorizontal: 20,
//   },
//   TextContainer: {
//     paddingVertical: 10,
//     gap: 2,
//     borderBottomWidth: 1,
//     borderBottomColor: '#BDBDBD',
//   },
  // DescText: {
  //   fontSize: 16,
  //   fontFamily: InterFont.SemiBoldFont,
  //   color: '#7A53B9',
  // },
  // DescDetails: {
  //   fontSize: 13,
  //   fontFamily: InterFont.RegularFont,
  //   color: '#828282',
  // },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default ProductDetails;