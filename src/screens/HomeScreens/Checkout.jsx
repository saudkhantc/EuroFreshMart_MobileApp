import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cart from '../../assets/images/cart.png';
import mail from '../../assets/images/mail.png';
import check from '../../assets/images/check.png';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

const Checkout = ({navigation}) => {
  const [paymentMode, setPaymentMode] = useState(null);

  const RadioButton = ({ value }) => {
    return (
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={() => setPaymentMode(value)}
      >
        <View
          style={[
            styles.radioButton,
            paymentMode === value && styles.radioButtonSelected,
          ]}
        />
      </TouchableOpacity>
    );
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
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={width * 0.07} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="cart-sharp" size={width * 0.07} color="white" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Image source={cart} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={[styles.button, { borderColor: '#ACE03A' }]}>
              <Image source={mail} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Image source={check} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cartcontainer}>
          <Text style={styles.carttext}>Details</Text>
          <View style={styles.line2} />
          <ScrollView style={{height:height*0.5}}>
           
              {/* Deatil here */}
           
          </ScrollView>

          <View style={styles.line2} />
          <Text style={styles.totalText}>Payment Mode</Text>
          <View style={styles.summaryContainer}>
      
            <View style={styles.summaryRow}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="bank-outline" size={20} />
                <Text style={styles.summaryText}>Bank Transfer</Text>
              </View>
              <RadioButton value="bankTransfer" />
            </View>

           
            <View style={styles.summaryRow}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="credit-card" size={20} />
                <Text style={styles.summaryText}>Credit Card</Text>
              </View>
              <RadioButton value="creditCard" />
            </View>

            <View style={styles.summaryRow}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="currency-eur" size={20} />
                <Text style={styles.summaryText}>Cash on Delivery</Text>
              </View>
              <RadioButton value="cashOnDelivery" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <CustomButton
          text={'Done'}
          width={width * 0.4}
          onPress={() => navigation.navigate('orderDone')}
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

export default Checkout;

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
    width: width * 0.20,
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
  summaryContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: height*0.1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: textcolor.color1,
    fontWeight: 'normal',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  summaryAmount: {
    fontSize: 16,
    color: textcolor.color1,
    fontWeight: 'normal',
  },
  totalRow: {
    borderTopColor: textcolor.color8,
    marginTop: 5,
  },
  totalText: {
    fontWeight: 'bold',
    color: textcolor.color2,
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  radioButtonSelected: {
    backgroundColor: '#333', 
  },
  footerContainer: {
    width: '100%',
    height: height*0.11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
  
  },
});



