import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomSearchInput from '../../components/Custom_SearchInput';
import { InterFont, textcolor } from '../../styles/CustomStyles';

const { width, height } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Apple', image: require('../../assets/images/sliderImage.png') },
  { id: 2, name: 'Carrot', image: require('../../assets/images/onion.jpeg') },
  { id: 3, name: 'Banana', image: require('../../assets/images/onion.jpeg') },
  { id: 4, name: 'Tomato', image: require('../../assets/images/carrot.jpeg') },
  { id: 5, name: 'Potato', image: require('../../assets/images/carrot.jpeg') },
  { id: 6, name: 'Grapes', image: require('../../assets/images/carrot.jpeg') },
];

const CategoryScreen = () => {
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

        <View style={styles.body}>
          <Text style={styles.categorytitle}>Category</Text>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

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
  body: {
    marginHorizontal: 18,
  },
  categorytitle: {
    fontSize: 18,
    color: textcolor.color1,
    fontFamily: InterFont.BoldFont,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop:10 ,
    marginBottom:height*0.08
  },
  categoryCard: {
    width: width * 0.4,
    height: height * 0.26,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
     overflow: 'hidden',
     elevation: 2, 
  },
  categoryImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: textcolor.color1,
    fontFamily: InterFont.SemiBoldFont,
  },
});
