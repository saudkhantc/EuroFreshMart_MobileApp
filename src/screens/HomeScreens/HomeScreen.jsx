import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHome_Header from '../../components/CustomHome_Header';
import ImageSlider from '../../components/ImageSlider';
import Categories from '../../components/Categories';
import ProductList from '../../components/Productlist';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomHome_Header />
        </View>

        <View style={styles.sliderContainer}>
          <ImageSlider />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.CategoriesContent}>
            <Categories />
          </View>

          <View >
               <ProductList/>
          </View>
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
    height: height * 0.3,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  sliderContainer: {
    marginTop: -height * 0.12,
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 15,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  CategoriesContent: {
    marginTop:2,
  },
  CardContent: {
    marginTop: height * 0.02,
    marginBottom: height * 0.08
  },
  
});

export default HomeScreen;
