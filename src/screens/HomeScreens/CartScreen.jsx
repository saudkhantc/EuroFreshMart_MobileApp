import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import cart from '../../assets/images/cart.png';
import mail from '../../assets/images/mail.png';
import check from '../../assets/images/check.png';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../../redux/cartSlice';
import CustomCartIcon from './CustomCartIcon';

const { width, height } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));

  };
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/Header.png')}
            style={styles.headerImage}
          >
            <View style={styles.iconContainer}>
              <CustomCartIcon/>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { borderColor: '#ACE03A' }]}>
              <Image source={cart} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Image source={mail} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Image source={check} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cartcontainer}>
          <Text style={styles.carttext}>Cart</Text>
          <View style={styles.line2} />
          <Text style={styles.carttext}>Item <Text>( {cartItems.length} )</Text> </Text>

          {/* Cart item list */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 0.5 }} nestedScrollEnabled={true}>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <View key={item.id} style={styles.row}>
                  <Image source={item.image} style={styles.imagecart} />
                  <View style={styles.textContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 3 }}>
                      <Text style={styles.productQuantity}>{item.quantity}</Text>
                      <Text style={{ padding: 1, marginLeft: 9 }}>{item.Price}</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText} onPress={decrementQuantity}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.quantityBox}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                      </View>
                      <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText} onPress={incrementQuantity}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.deleteIconContainer}>
                    <AntDesign name="delete" size={25} color={textcolor.color2} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Your wishlist is empty.</Text>
            )}

          </ScrollView>

          <View style={styles.line2} />
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryAmount}>$ 130</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Tax</Text>
              <Text style={styles.summaryAmount}>$ 130</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Discount</Text>
              <Text style={styles.summaryAmount}>$ 130</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[styles.summaryText, styles.totalText]}>Total</Text>
              <Text style={[styles.summaryAmount, styles.totalText]}>$ 130</Text>
            </View>
          </View>
        </View>

        {/* Footer Section */}

      </ScrollView>
      <View style={styles.footerContainer}>
        <CustomButton
          text={'Proceed to Checkout'}
          width={width * 0.6}
          onPress={() => navigation.navigate('checkout')}
          paddingVertical={12}
          textColor={textcolor.color4}
          bgColor={textcolor.color3}
          fontFamily={InterFont.SemiBoldFont}
          fontSize={14}
        />
      </View>
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
    //  marginBottom: 20
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
    padding: width * 0.05,
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.3,
    alignItems: 'center',
  },
  button: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: textcolor.color8,
  },
  line: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: textcolor.color8,
    width: width * 0.2,
    marginBottom: 10,
  },
  image: {
    width: width * 0.07,
    height: width * 0.07,
    tintColor: textcolor.color8,
  },
  cartcontainer: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  carttext: {
    fontSize: 20,
    color: textcolor.color1,
    fontFamily: InterFont.SemiBoldFont,
    marginLeft: 12,
  },
  line2: {
    height: 1,
    backgroundColor: textcolor.color8,
    width: '100%',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  imagecart: {
    width: width * 0.3,
    height: width * 0.25,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: width * 0.05,
    marginVertical: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  productQuantity: {
    fontSize: width * 0.04,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.3,
    marginTop: width * 0.02,
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: width * 0.06,
    width: width * 0.09,
    height: width * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: textcolor.color3,
  },
  quantityText: {
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  deleteIconContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15
  },
  deleteIcon: {
    fontSize: width * 0.08,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: textcolor.color3,
  },
  quantityBox: {
    width: 40,
    height: 30,
    backgroundColor: '#ACE03A',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  summaryContainer: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  summaryText: {
    fontSize: 16,
    color: '#888888',
    fontWeight: 'normal',
  },
  summaryAmount: {
    fontSize: 16,
    color: '#888888',
    fontWeight: 'normal',
  },
  totalRow: {
    borderTopColor: textcolor.color8,
    marginTop: 7,
  },
  totalText: {
    fontWeight: 'bold',
    color: textcolor.color2,
  },
  footerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8B8B8B',
  },
});
