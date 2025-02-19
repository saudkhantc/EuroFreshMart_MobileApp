import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CustomCartIcon = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items); 

  return (
    <View style={styles.iconContainer}>
     
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={width * 0.09} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('cart-screen')} 
      >
        <Ionicons name="cart-sharp" size={width*0.09} color="#fff" />
        {cartItems.length > 0 && (
          <View style={styles.badge}>
            <Text style={{ color: 'white', fontSize: 12 }}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: 1, 
  },
  cartButton: {
    marginLeft: 20,
    position: 'relative', 
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomCartIcon;
