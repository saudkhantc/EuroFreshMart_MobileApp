import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHome_Header from '../../components/CustomHome_Header';
import ImageSlider from '../../components/ImageSlider';
import Categories from '../../components/Categories';
import CustomCard from '../../components/CustomCard';
import carrot from '../../assets/images/carrot.jpeg';
import chilli from '../../assets/images/chilli.jpeg';
import onion from '../../assets/images/onion.jpeg';
import potatoes from '../../assets/images/potatoes.jpeg';

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

          <View style={styles.CardContent}>
            <View style={styles.cardContainer}>
              <CustomCard
               id="carrot" 
                imageSource={carrot}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
              <CustomCard
               id="chilli"
                imageSource={chilli}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
              <CustomCard
                imageSource={onion}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
              <CustomCard
                imageSource={potatoes}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
              <CustomCard
                imageSource={potatoes}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
              <CustomCard
                imageSource={potatoes}
                productname="Fresh Carrot"
                pricetext="€ 19,000"
                unittxt="/Kg"
                retailprice="€ 21,000"
              />
            </View>
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
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  sliderContainer: {
    marginTop: -height * 0.14,
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
    marginBottom: height * 0.07
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});

export default HomeScreen;
