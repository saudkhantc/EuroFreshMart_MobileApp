import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import CustomSearchInput from './Custom_SearchInput';
import { useSelector } from 'react-redux'; 
import { selectWishlist } from '../redux/wishlistSlice';
import CustomDrawer from './CustomDrawer';

const {width, height} = Dimensions.get('window');

const CustomHome_Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const cartCount = useSelector(state => state.cart.items.length); 
  const wishlist = useSelector(selectWishlist);
  const wishlistCount = wishlist.length;


  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible); 
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Feather name="menu" size={32} />
        </TouchableOpacity>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity>
            <AntDesign name="heart" size={28} color="#fff" />
            {wishlistCount > 0 && (
            <View
               style={styles.badge}>
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {wishlistCount}
              </Text>
            </View>
          )}
          </TouchableOpacity>

          {/* <TouchableOpacity style={{marginLeft: 20}}>
            <FontAwesome name="shopping-cart" size={30} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <FontAwesome name="shopping-cart" size={30} color="#fff" />
            {cartCount > 0 && (
              <View
                 style={styles.badge}>
                <Text style={{ color: 'white', fontSize: 12 }}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.SearchInput_Section}>
        <CustomSearchInput
          // value={searchQuery}
          // onChange={handleSearchChange}
          placeholder="Search for fruits, vegetables, groce..."
        />
      </View>

      <CustomDrawer visible={drawerVisible} onClose={toggleDrawer}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={styles.drawerItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={styles.drawerItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={styles.drawerItem}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={styles.drawerItem}>Logout</Text>
        </TouchableOpacity>
      </CustomDrawer>
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
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default CustomHome_Header;
