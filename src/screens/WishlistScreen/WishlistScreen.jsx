// import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import img1 from '../../assets/images/heart.png';
import img2 from '../../assets/images/fruits.png';
import { InterFont } from '../../styles/CustomStyles';
import { useDispatch, useSelector } from 'react-redux';

import { removeFromWishlist } from '../../redux/wishlistSlice';
import CustomCartIcon from '../HomeScreens/CustomCartIcon';
import { useState } from 'react';
import { addItemToCart } from '../../redux/cartSlice';


const { width, height } = Dimensions.get('window');

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const wishlistItems = useSelector(state => state.wishlist.items);  // Get wishlist items from Redux store

  const handleBackPress = () => {
    navigation.goBack();
  };

  // const handleAddToCart = (item) => {
  //   dispatch(addItemToCart(item));  
  // };
  const handleAddToCart = (product) => {
    dispatch(
      addItemToCart({ ...product, quantity: count, stock: product.quantity })
    );
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));  
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <CustomCartIcon/>
          </View>

          <View style={styles.imageContainer}>
            <Image source={img1} style={styles.Image} />
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.FavProdcut}>
            <Text style={styles.FavText}>Favorite Products ({wishlistItems.length})</Text>
          </View>

          {wishlistItems.length > 0 ? (
  wishlistItems.map(item => (
    <View key={item._id} style={styles.productRow}>
      <View style={styles.productInfoContainer}>
        <View>
          <Image source={{uri: item.imageUrl} } style={styles.imagecart} />
        </View>

        <View>
          <Text style={styles.productName} numberOfLines={2}  ellipsizeMode="tail">{item.name}</Text>
          <Text style={styles.productWeight}>{item.price}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => handleRemoveFromWishlist(item._id)}>
              <AntDesign name="heart" size={20} color="#EE0004" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleAddToCart(item)} style={{marginBottom:10,marginRight:10,alignSelf:'flex-end'}}>
        <AntDesign name="shoppingcart" size={22} color="#292D32" />
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text style={styles.emptyText}>Your wishlist is empty.</Text>
)}

        </View>
      </ScrollView>
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
  header: {
    backgroundColor: '#ACE03A',
    height: height * 0.25,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  iconContainer: {
    top: height * 0.02,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  Image: {
    width: width * 1,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom:height*0.05
  },
  FavProdcut: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  FavText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    overflow:'hidden',
    //width:'100%',
    height:height*0.17,
    backgroundColor:'white',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius:10,
  },
  productInfoContainer: {
    flexDirection: 'row',
    gap: 15,
    flex:1,
    //width:'75%'
  },
  imagecart: {
    width: width * 0.3,
    height: width * 0.25,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productName: {
    fontSize: 17,
    fontFamily: InterFont.RegularFont,
    flexShrink:1,
    width:width*0.50
  },
  productWeight: {
    fontSize: 14,
    fontFamily: InterFont.RegularFont,
    color: '#8B8B8B',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8B8B8B',
  },
});

export default WishlistScreen;
