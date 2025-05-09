// 
// import React, { useState } from 'react';
// import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import { InterFont, textcolor } from '../styles/CustomStyles';
// import { useDispatch } from 'react-redux';
// import { addItemToCart, removeItemFromCart } from '../redux/cartSlice';
// import { addToWishlist } from '../redux/wishlistSlice';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const CustomCard = ({ imageSource, productname, pricetext, unittxt, retailprice, id,description }) => {  
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [isInCart, setIsInCart] = useState(false);

//   const handleAddToCart = () => {
//     const item = {
//       id,
//       image: imageSource,
//       name: productname,
//       price: pricetext,
//     };
//     dispatch(addItemToCart(item));
//     setIsInCart(true);
//   };

//   const handleRemoveFromCart = () => {
//     dispatch(removeItemFromCart(id));
//     setIsInCart(false);
//   };

//   // const handleAddToWishlist = () => {
//   //   const item = { productId: id, name: productname, price: pricetext, image: imageSource };
//   //   dispatch(addToWishlist(item));
//   // };
//   const handleAddToWishlist = () => {
//     const item = { 
//       id:id, 
//       name: productname, 
//       price: pricetext, 
//       image: imageSource 
//     };
//     dispatch(addToWishlist(item));
//   };

//   const navigateToProductDetails = () => {
//     navigation.navigate('product-details', {
//       productId: id,
//       imageSource,
//       productname,
//       pricetext,
//       unittxt,
//       retailprice,
//       description
//     });
  
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.card} onPress={navigateToProductDetails}>
//         <View>
//           <Image source={imageSource} style={styles.Image} />
//           <TouchableOpacity
//             style={styles.wishlistIcon}
//             onPress={handleAddToWishlist}>
//             <Ionicons name="heart-outline" size={24} color="#FFF" />
//           </TouchableOpacity>
//         </View>

//         <View style={{ paddingHorizontal: 6, paddingVertical: 3, gap: 2 }}>
//           <View>
//             <Text style={styles.ProductName}>{productname}</Text>
//           </View>

//           <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
//             <Text style={styles.PriceText}>{pricetext}</Text>
//             <Text style={styles.UnitText}>{unittxt}</Text>
//           </View>

//           <View>
//             <Text style={styles.RetailPriceText}>{retailprice}</Text>
//           </View>
//         </View>

//         <TouchableOpacity onPress={isInCart ? handleRemoveFromCart : handleAddToCart}>
//           <View style={{ paddingHorizontal: 4, paddingBottom: 4 }}>
//             <View style={styles.Icon}>
//               {isInCart ? (
//                 <Ionicons name="trash-outline" size={30} color="#EE0004" />
//               ) : (
//                 <Ionicons name="add-circle-outline" size={30} color="#7A53B9" />
//               )}
//             </View>
//           </View>
//         </TouchableOpacity>
//       </TouchableOpacity>
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
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   Image: {
//     width: width * 0.42,
//     height: height * 0.14,
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
//     shadowOffset: { width: 0, height: 1 },
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
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { InterFont, textcolor } from '../styles/CustomStyles';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishlistSlice';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CustomCard = ({ imageSource, productname, pricetext, unittxt, retailprice, id,description }) => {  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    const item = {
      id,
      image: imageSource,
      name: productname,
      price: pricetext,
    };
    dispatch(addItemToCart(item));
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(id));
    setIsInCart(false);
  };

  // const handleAddToWishlist = () => {
  //   const item = { productId: id, name: productname, price: pricetext, image: imageSource };
  //   dispatch(addToWishlist(item));
  // };
  const handleAddToWishlist = () => {
    const item = { 
      id:id, 
      name: productname, 
      price: pricetext, 
      image: imageSource 
    };
    dispatch(addToWishlist(item));
  };

  const navigateToProductDetails = () => {
    navigation.navigate('product-details', {
      productId: id,
      imageSource,
      productname,
      pricetext,
      unittxt,
      retailprice,
      description
    });
  
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={navigateToProductDetails}>
        <View>
          <Image source={imageSource} style={styles.Image} />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={handleAddToWishlist}>
            <Ionicons name="heart-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 6, paddingVertical: 3, gap: 2 }}>
          <View>
            <Text style={styles.ProductName}>{productname}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            <Text style={styles.PriceText}>{pricetext}</Text>
            <Text style={styles.UnitText}>{unittxt}</Text>
          </View>

          <View>
            <Text style={styles.RetailPriceText}>{retailprice}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={isInCart ? handleRemoveFromCart : handleAddToCart}>
          <View style={{ paddingHorizontal: 4, paddingBottom: 4 }}>
            <View style={styles.Icon}>
              {isInCart ? (
                <Ionicons name="trash-outline" size={30} color="#EE0004" />
              ) : (
                <Ionicons name="add-circle-outline" size={30} color="#7A53B9" />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  Image: {
    width: width * 0.42,
    height: height * 0.14,
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
    shadowOffset: { width: 0, height: 1 },
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