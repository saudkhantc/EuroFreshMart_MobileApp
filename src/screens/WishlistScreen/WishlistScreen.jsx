// import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import img1 from '../../assets/images/heart.png';
import img2 from '../../assets/images/fruits.png';
import { InterFont } from '../../styles/CustomStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
import { removeFromWishlist } from '../../redux/wishlistSlice';
import CustomCartIcon from '../HomeScreens/CustomCartIcon';


const { width, height } = Dimensions.get('window');

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const wishlistItems = useSelector(state => state.wishlist.items);  // Get wishlist items from Redux store

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));  // Dispatch add to cart action
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
    <View key={item.productId} style={styles.productRow}>
      <View style={styles.productInfoContainer}>
        <View>
          <Image source={item.image } style={{ width: 110, height: 90 ,borderRadius:20}} />
        </View>

        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.price}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => handleRemoveFromWishlist(item.id)}>
              <AntDesign name="heart" size={20} color="#EE0004" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleAddToCart(item)}>
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
  },
  productInfoContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  productName: {
    fontSize: 18,
    fontFamily: InterFont.RegularFont,
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
