
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';
import API from '../API/apiService';

const { width, height } = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();
 const route = useRoute();
  const {id} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  
  const fetchProductDetails = async () => {
    try {
      const response = await API.get(`/inventory/${id}`);
     // console.log(response)
      setProduct(response);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    fetchProductDetails();
  }, [id]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }


    const handleBackPress = () => {
        navigation.goBack();
      };
 
  
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
          <Image source={{ uri: product.imageUrl }} style={styles.Image} />

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
            <Text style={styles.ProductName}>{product.name}</Text>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Text style={styles.PriceText}>€ {product.price}</Text>
              <Text style={styles.UnitText}></Text>
            </View>
            <Text style={styles.RetailPriceText}>€ {product.retailPrice}</Text>
          </View>
          <View style={{marginVertical: height * 0.012}}>
                      <View style={{marginVertical: height * 0.012}}>
                         <View>
                          <Text style={styles.DescText}>Description</Text>
                           <Text style={styles.DescDetails}>
                           {product.description}
                           </Text>
                         </View>
                         <View style={{marginTop: height * 0.01}}>
                           <Text style={styles.DescText}>Origin</Text>
                          <Text style={styles.DescDetails}>
                            {product.description}
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
    height: height * 0.35,
    resizeMode:'contain',
    marginTop:5
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
    color: textcolor.color2,
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
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import API from '../API/apiService';

// const ProductDetails = ({ navigation }) => {
  // const route = useRoute();
  // const { productId } = route.params;
  
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   fetchProductDetails();
  // }, []);
  
  // const fetchProductDetails = async () => {
  //   try {
  //     const response = await API.get(`/inventory/${productId}`);
  //     console.log(response)
  //     setProduct(response.category);
  //   } catch (error) {
  //     console.error('Error fetching product details:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (!product) {
  //   return <Text>Product not found</Text>;
  // }

//   return (
//     <View style={styles.container}>
     
//       <Text style={styles.title}>{product.name}</Text>
//       <Text style={styles.price}>${product.price}</Text>
//       <Text style={styles.description}>{product.description}</Text>
      
//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.button} >
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Add to Wishlist</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   image: { width: '100%', height: 300, resizeMode: 'contain' },
//   title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
//   price: { fontSize: 20, color: 'green', marginBottom: 10 },
//   description: { fontSize: 16, color: '#555', marginBottom: 20 },
//   actions: { flexDirection: 'row', justifyContent: 'space-between' },
//   button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
// });

// export default ProductDetails;




// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   Dimensions,
// //   Image,
// //   TouchableOpacity,
// // } from 'react-native';
// // import React,{useState} from 'react';
// // import {SafeAreaView} from 'react-native-safe-area-context';
// // import img1 from '../../assets/images/productDetail.jpeg';
// // import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// // import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
// // import {useNavigation} from '@react-navigation/native';
// // import {InterFont, textcolor} from '../../styles/CustomStyles';
// // import CustomButton from '../../components/CustomButton';

// // const {width, height} = Dimensions.get('window');

// // const ProductDetails = ({route}) => {
// //   const navigation = useNavigation();
// //   const { productId, productname, pricetext, unittxt, retailprice, imageSource } = route.params;
// //   const handleBackPress = () => {
// //     navigation.goBack();
// //   };
// //   const [quantity, setQuantity] = useState(0);
  
// //   const incrementQuantity = () => {
// //     setQuantity(prevQuantity => prevQuantity + 1);
// //   };

// //   const decrementQuantity = () => {
// //     if (quantity > 0) {
// //       setQuantity(prevQuantity => prevQuantity - 1);
// //     }
// //   };
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView
// //         contentContainerStyle={styles.scrollContainer}
// //         showsVerticalScrollIndicator={false}>
// //         <View style={styles.imageContainer}>
// //           <Image source={img1} style={styles.Image} />

// //           <View style={styles.iconContainer}>
// //             <TouchableOpacity onPress={handleBackPress}>
// //               <AntDesign
// //                 name="arrowleft"
// //                 size={30}
// //                 color="#fff"
// //                 style={styles.icon}
// //               />
// //             </TouchableOpacity>

// //             <TouchableOpacity>
// //               <FontAwesome
// //                 name="shopping-cart"
// //                 size={30}
// //                 color="#fff"
// //                 style={styles.icon}
// //               />
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         <View style={styles.ProductDetails}>
// //           <View style={styles.TextContainer}>
// //             <View>
// //               <Text
// //                 style={{
// //                   fontSize: 24,
// //                   fontFamily: InterFont.SemiBoldFont,
// //                   color: textcolor.color2,
// //                 }}>
// //                 Fresh Carrot
// //               </Text>
// //             </View>

// //             <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
// //               <Text
// //                 style={{
// //                   fontSize: 18,
// //                   fontFamily: InterFont.SemiBoldFont,
// //                   color: textcolor.color3,
// //                 }}>
// //                 $ 18,000
// //               </Text>
// //               <Text
// //                 style={{
// //                   fontFamily: InterFont.RegularFont,
// //                   color: '#828282',
// //                   fontSize: 12,
// //                 }}>
// //                 /kg
// //               </Text>
// //             </View>
// //           </View>

// //           <View style={{marginTop: height * 0.01}}>
// //             <Text
// //               style={{
// //                 fontSize: 18,
// //                 fontFamily: InterFont.SemiBoldFont,
// //                 color: textcolor.color2,
// //                 textAlign: 'center',
// //               }}>
// //               Details
// //             </Text>
// //           </View>

// //           <View style={{marginVertical: height * 0.012}}>
// //             <View>
// //               <Text style={styles.DescText}>Description</Text>
// //               <Text style={styles.DescDetails}>
// //                 The carrot is a root vegetable, most commonly observed as orange
// //                 in color, though purple, black, red, white, and yellow cultivars
// //                 exist, all of which are domesticated forms of the wild carrot,
// //                 Daucus carota, native to Europe and Southwestern Asia.
// //               </Text>
// //             </View>
// //             <View style={{marginTop: height * 0.01}}>
// //               <Text style={styles.DescText}>Origin</Text>
// //               <Text style={styles.DescDetails}>
// //                 The carrot is a root vegetable, most commonly observed as orange
// //                 in color, though purple, black, red, white, and yellow cultivars
// //                 exist, all of which are domesticated forms of the wild carrot,
// //                 Daucus carota, native to Europe and Southwestern Asia.
// //               </Text>
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>

// //       <View style={styles.footer}>
// //         <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
// //           <TouchableOpacity onPress={decrementQuantity}
// //             style={{
// //               borderWidth: 1,
// //               borderColor: '#ACE03A',
// //               borderRadius: 5,
// //               padding: 2,
// //             }}>
// //             <AntDesign name="minus" color="#ACE03A" size={20} />
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={{
// //               borderWidth: 1,
// //               borderColor: '#ACE03A',
// //               borderRadius: 5,
// //               padding: 2,
// //               width: width * 0.11,
// //               height: height * 0.055,
// //               justifyContent: 'center',
// //               backgroundColor: textcolor.color3,
// //             }}>
// //             <Text
// //               style={{
// //                 fontSize: 18,
// //                 fontFamily: InterFont.SemiBoldFont,
// //                 textAlign: 'center',
// //               }}>
// //               {quantity}
// //             </Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity  onPress={incrementQuantity}
// //             style={{
// //               borderWidth: 1,
// //               borderColor: '#ACE03A',
// //               borderRadius: 5,
// //               padding: 2,
// //             }}>
// //             <AntDesign name="plus" color="#ACE03A" size={20} />
// //           </TouchableOpacity>
// //         </View>

// //         <View>
// //           <CustomButton
// //             bgColor={textcolor.color3}
// //             text="Add to cart"
// //             width={width * 0.38}
// //             onPress={() => navigation.navigate('cart-screen')}
// //             paddingVertical={10}
// //             textColor={textcolor.color4}
// //             fontFamily={InterFont.SemiBoldFont}
// //             fontSize={16}
// //           />
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   scrollContainer: {
// //     flexGrow: 1,
// //   },
// //   imageContainer: {
// //     position: 'relative',
// //   },
// //   Image: {
// //     width: '100%',
// //     height: height * 0.4,
// //   },
// //   iconContainer: {
// //     position: 'absolute',
// //     top: height * 0.02,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// //     paddingHorizontal: 10,
// //   },
// //   icon: {},
// //   ProductDetails: {
// //     paddingHorizontal: 20,
// //   },
// //   TextContainer: {
// //     paddingVertical: 10,
// //     gap: 2,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#BDBDBD',
// //   },
//   // DescText: {
//   //   fontSize: 16,
//   //   fontFamily: InterFont.SemiBoldFont,
//   //   color: '#7A53B9',
//   // },
//   // DescDetails: {
//   //   fontSize: 13,
//   //   fontFamily: InterFont.RegularFont,
//   //   color: '#828282',
//   // },
// //   footer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     backgroundColor: '#fff',
// //     shadowColor: '#000',
// //     shadowOffset: {width: 0, height: -2},
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// // });

// // export default ProductDetails;