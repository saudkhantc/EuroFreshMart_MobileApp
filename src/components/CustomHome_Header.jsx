import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import CustomSearchInput from './Custom_SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlist } from '../redux/wishlistSlice';
import CustomDrawer from './CustomDrawer';
import { InterFont } from '../styles/CustomStyles';
import { useNavigation } from '@react-navigation/native';
// Add the action here
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local storage handling
import { logout } from '../redux/loginSlice';

const { width, height } = Dimensions.get('window');

const CustomHome_Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const cartCount = useSelector(state => state.cart.items.length);
  const wishlist = useSelector(selectWishlist);
  const wishlistCount = wishlist.length;

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Handle Logout
  const handleLogout = async () => {
    // Remove user data from local storage
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('email');
    
    // Dispatch logout action to update Redux state
    dispatch(logout());
    
    // Navigate to the home or login screen
    navigation.navigate('login'); // Or 'home' if you prefer
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Feather name="menu" size={32} />
        </TouchableOpacity>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('wishlist-screen')}>
            <AntDesign name="heart" size={28} color="#fff" />
            {wishlistCount > 0 && (
              <View style={styles.badge}>
                <Text style={{ color: '#fff', fontSize: 12 }}>
                  {wishlistCount}
                </Text>

                <TEXS></TEXS>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => navigation.navigate('cart-screen')}
          >
            <FontAwesome name="shopping-cart" size={30} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.SearchInput_Section}>
        <CustomSearchInput
          placeholder="Search for fruits,groceries..."
        />
      </View>

      <View>
        <CustomDrawer visible={drawerVisible} onClose={toggleDrawer}>
          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
              navigation.navigate('bottom-tabs');
            }}
          >
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
              navigation.navigate('profile');
            }}
          >
            <Text style={styles.drawerItem}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
              navigation.navigate('editprofile');
            }}
          >
            <Text style={styles.drawerItem}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.drawerItem}>Logout</Text>
          </TouchableOpacity>
        </CustomDrawer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SearchInput_Section: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.025,
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
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  drawerItem: {
    color: '#000',
    fontSize: 18,
    marginVertical: 10,
    fontFamily: InterFont.SemiBoldFont,
  },
});

export default CustomHome_Header;
