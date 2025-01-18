import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomSearchInput from '../../components/Custom_SearchInput';

const { width, height } = Dimensions.get('window');

const Cart = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/Header.png')}
            style={styles.headerImage}
          >
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={width * 0.07} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="cart-sharp" size={width * 0.07} color="white" />
              </TouchableOpacity>
            </View>
              
            <View style={styles.searchInputContainer}>
              <CustomSearchInput
                placeholder={"Search for Fruit, Groce ..."}
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  headerContainer: {
    width: '100%',
    height: height * 0.23,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    padding: width * 0.05, 
  },
  searchInputContainer: {
    alignSelf: 'center',
    width: width * 0.8, 
    marginTop:10
  },
});


