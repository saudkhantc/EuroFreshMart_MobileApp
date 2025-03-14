
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';
import API from '../API/apiService';
import { useDispatch } from 'react-redux';
import { addItemToCart, updateQuantity } from '../../redux/cartSlice';

const { width, height } = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();
 const route = useRoute();
  const {id} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);                // incre/dec 1
  const [maxReached, setMaxReached] = useState(false);    // 1
   const dispatch=useDispatch();                      /// 1

  const fetchProductDetails = async () => {
    try {
      const response = await API.get(`/inventory/${id}`);
     // console.log(response)
      setProduct(response);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    fetchProductDetails();
  }, [id]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#ACE03A" />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }


    const handleBackPress = () => {
        navigation.goBack();
      };
 

      const handleIncrement = () => {                    ///1
        if (count < 100) {
          setCount(prevCount => prevCount + 1);
          setMaxReached(false);
          dispatch(updateQuantity({ productId: id, quantity: count + 1 }));
        } else {
          setMaxReached(true);
          Alert.alert("Limit Reached", "You can only add up to 100 items.");
        }
      };
    
      const handleDecrement = () => {                    //1
        if (count > 1) {
          setCount(prevCount => prevCount - 1);
          setMaxReached(false);
          dispatch(updateQuantity({ productId: id, quantity: count - 1 }));
        }
      };
      const handleAddToCart = () => {
        dispatch(
          addItemToCart({
            _id: id,
            quantity: count,
            price: product.price,
            name: product.name,
            imageUrl: product.imageUrl,
          })
        );
        navigation.navigate('cart-screen')
        //Alert.alert("Success", "Item added to cart!");
      };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.Image} />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign
                name="arrowleft"
                size={30}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity>
              <FontAwesome
                name="shopping-cart"
                size={30}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.ProductDetails}>
          <View style={styles.TextContainer}>
            <Text style={styles.ProductName}>{product.name}</Text>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Text style={styles.PriceText}>€ {product.price}</Text>
              <Text style={styles.UnitText}></Text>
            </View>
            <Text style={styles.RetailPriceText}>€ {product.retailPrice}</Text>
          </View>
          <View style={{marginVertical: height * 0.012}}>
                      <View style={{marginVertical: height * 0.012}}>
                         <View>
                          <Text style={styles.DescText}>Description</Text>
                           <Text style={styles.DescDetails}>
                           {product.description}
                           </Text>
                         </View>
                         <View style={{marginTop: height * 0.01}}>
                           <Text style={styles.DescText}>Origin</Text>
                          <Text style={styles.DescDetails}>
                            {product.description}
                           </Text>
                         </View>
                       </View>
                    </View>
        </View>
      </ScrollView>

      {/* Footer with Quantity and Add to Cart Button */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={handleDecrement}
            style={styles.quantityButton}>
            <AntDesign name="minus" color="#ACE03A" size={20} />
          </TouchableOpacity>

          <View style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{count}</Text>
          </View>

          <TouchableOpacity onPress={handleIncrement}
            style={styles.quantityButton}>
            <AntDesign name="plus" color="#ACE03A" size={20} />
          </TouchableOpacity>
        </View>

        <View>
          <CustomButton
            bgColor={textcolor.color3}
            text="Add to cart"
            width={width * 0.38}
            onPress={handleAddToCart}
            paddingVertical={10}
            textColor={textcolor.color4}
            fontFamily={InterFont.SemiBoldFont}
            fontSize={16}
          />
        </View>
      </View>
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
  imageContainer: {
    position: 'relative',
  },
  Image: {
    width: '100%',
    height: height * 0.30,
    resizeMode:'contain',
    marginTop:height*0.05
  },
  iconContainer: {
    position: 'absolute',
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  ProductDetails: {
    paddingHorizontal: 20,
  },
  TextContainer: {
    paddingVertical: 10,
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  ProductName: {
    fontSize: 24,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color2,
  },
  PriceText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color3,
  },
  RetailPriceText: {
    fontFamily: InterFont.MediumFont,
    color: textcolor.color2,
  },
  UnitText: {
    fontFamily: InterFont.RegularFont,
    color: '#828282',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ACE03A',
    borderRadius: 5,
    padding: 2,
  },
  quantityDisplay: {
    borderWidth: 1,
    borderColor: '#ACE03A',
    borderRadius: 5,
    padding: 2,
    width: width * 0.11,
    height: height * 0.055,
    justifyContent: 'center',
    backgroundColor: textcolor.color3,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
    textAlign: 'center',
  },
  DescText: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
    color: '#7A53B9',
  },
  DescDetails: {
    fontSize: 13,
    fontFamily: InterFont.RegularFont,
    color: '#828282',
  },
});

export default ProductDetails;
