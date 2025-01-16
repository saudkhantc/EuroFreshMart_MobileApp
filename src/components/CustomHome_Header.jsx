import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import CustomSearchInput from './Custom_SearchInput';
import { useSelector } from 'react-redux'; 
import { selectWishlist } from '../redux/wishlistSlice';

const {width, height} = Dimensions.get('window');

const CustomHome_Header = () => {
  const cartCount = useSelector(state => state.cart.items.length); 

  const wishlist = useSelector(selectWishlist);
  const wishlistCount = wishlist.length;
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity>
          <Feather name="menu" size={32} />
        </TouchableOpacity>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity>
            <AntDesign name="heart" size={28} color="#fff" />
            {wishlistCount > 0 && (
            <View
              style={{
                 position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'red',
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  justifyContent: 'center',
                  alignItems: 'center',
              }}>
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
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'red',
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
});

export default CustomHome_Header;
