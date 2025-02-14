import React from 'react';
import { View, ScrollView, StyleSheet ,Dimensions} from 'react-native';
import { ProductData } from '../data/Productdata';
import CustomCard from './CustomCard';

const {width, height} = Dimensions.get('window');

const ProductList = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productContainer}>
        {ProductData.map((item) => (
          <CustomCard
            key={item.id}
            id={item.id}
            imageSource={item.imageSource}
            productname={item.productname}
            pricetext={item.pricetext}
            unittxt={item.unittxt}
            retailprice={item.retailprice}
            description={item.description}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: height * 0.02,
    marginBottom: height * 0.08,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  
});

export default ProductList;
