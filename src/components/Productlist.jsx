import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { InterFont, textcolor } from '../styles/CustomStyles';
import { useDispatch, useSelector } from 'react-redux';
import { clearInventories, fetchInventories } from '../redux/inventorySlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CustomCard = ({ category }) => {
  const dispatch = useDispatch();
   const navigation=useNavigation();
  const [query, setQuery] = useState("");
  const [productCounts, setProductCounts] = useState({});
  const [count, setCount] = useState(0);

  const { inventories = [], loading, error } = useSelector((state) => state.inventory);
  const wishlistItems = useSelector((state) => state.wishlist.items);        // wishlist  2
  const cartItems = useSelector((state) => state.cart.items);                // cart      3
  const isInCart = (productId) => cartItems.some((cartItem) => cartItem._id === productId);  // cart  3


  useEffect(() => {
    if (category) {
      dispatch(fetchInventories({ categoryId: category._id }));
    }
    return () => {
      dispatch(clearInventories());
    };
  }, [dispatch, category]);

  const handleAddToWishlist = (e, item) => {           //2
    e.stopPropagation();
    const isInWishlist = wishlistItems.some(
      (wishlistItems) => wishlistItems._id === item._id
    );
    if (isInWishlist) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  const handleAddToCart = (product) => {        //3
    if (product) {
      dispatch(addItemToCart({ ...product, quantity: count }));

    }
  };

  const handleRemoveFromCart = (productId) => {      //3
    dispatch(removeItemFromCart(productId));

  };
  const incrementCount = (productId) => {
    setProductCounts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrementCount = (productId) => {
    setProductCounts((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ACE03A" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>{category?.name} </Text>

      <View style={styles.cardcontainer}>

        {inventories.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => (
          <TouchableOpacity key={item._id} style={styles.card} onPress={() => navigation.navigate('product-details/:id', { id: item._id })}>
            <View>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <TouchableOpacity style={styles.wishlistIcon} onPress={(e) => {
                handleAddToWishlist(e, item)
              }}>
                {wishlistItems.some(
                  (wishlistItem) => wishlistItem._id === item._id
                ) ? (
                  <Ionicons name="heart" size={24} color="red" />
                ) : (
                  <Ionicons name="heart-outline" size={24} color="#fff" />
                )}


              </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>€ {item.price}</Text>
                <Text style={styles.unitText}>{item.unit}</Text>
              </View>
              <Text style={styles.retailPriceText}>Retail: €{item.retailPrice}</Text>
              <View>
                <TouchableOpacity onPress={() => isInCart(item._id) ? handleRemoveFromCart(item._id) : handleAddToCart(item)}>
                  <View style={styles.icon}>
                    {isInCart(item._id) ? (
                      <Ionicons name="trash-outline" size={26} color="#EE0004" />
                    ) : (
                      <Ionicons name="add-circle-outline" size={26} color="#7A53B9" />
                    )}
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    width: width * 0.42,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    paddingVertical: 10
  },
  image: {
    width: width * 0.30,
    height: height * 0.14,
    resizeMode: 'contain',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignSelf: 'center',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'grey',
    padding: 4,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 2,
  },
  productName: {
    fontSize: 14,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color2,
    height: 50
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  priceText: {
    fontFamily: InterFont.BoldFont,
    color: '#EE0004',
    fontSize: 13,
  },
  unitText: {
    fontFamily: InterFont.RegularFont,
    color: '#828282',
    fontSize: 10,
  },
  retailPriceText: {
    fontFamily: InterFont.MediumFont,
    color: textcolor.color3,
  },
  iconWrapper: {

  },
  icon: {
    alignItems: 'flex-end',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default CustomCard;

