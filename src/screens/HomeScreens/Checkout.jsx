import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Button, Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cart from '../../assets/images/cart.png';
import mail from '../../assets/images/mail.png';
import check from '../../assets/images/check.png';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';
import CustomCartIcon from './CustomCartIcon';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/CustomInput';
import OrderSummary from '../../components/OrderSummary';
import { ENDPOINTS } from '../API/apiRoutes';
import API from '../API/apiService';
import { clearCart } from '../../redux/cartSlice';

const { width, height } = Dimensions.get('window');

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { cartItems, total ,deliveryCharges,otherCharges} = route.params;
  const [orderData, setOrderData] = useState([]);
  const [paymentMode, setPaymentMode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    state: "",
    city: "",
    postalCode: "",
    email: "",
  });
  const [dropOffInstructions, setDropOffInstructions] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);



  // Calculate total items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedStreet = await AsyncStorage.getItem("address");

        setAddress((prevAddress) => ({
          ...prevAddress,
          fullName: storedUserName || "",
          email: storedEmail || "",
          street: storedStreet || "",
        }));
      } catch (error) {
        console.log("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setErrors({});
    let hasError = false;

    // Validate form fields
    if (!address.fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Full name is required." }));
      hasError = true;
    }
    if (!validateEmail(address.email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
      hasError = true;
    }
    if (!address.phoneNumber.trim() || !/^\d{10,13}$/.test(address.phoneNumber)) {
      setErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Phone number must be between 10 to 13 digits.",
      }));
      hasError = true;
    }
    if (!address.street.trim()) {
      setErrors((prev) => ({ ...prev, street: "Street address is required." }));
      hasError = true;
    }
    if (!address.city.trim()) {
      setErrors((prev) => ({ ...prev, city: "City is required." }));
      hasError = true;
    }
    if (!address.state.trim()) {
      setErrors((prev) => ({ ...prev, state: "State is required." }));
      hasError = true;
    }
    if (!address.postalCode.trim() || !/^\d{5}$/.test(address.postalCode)) {
      setErrors((prev) => ({ ...prev, postalCode: "Enter a valid 5-digit postal code." }));
      hasError = true;
    }
    if (!dropOffInstructions) {
      setErrors((prevState) => ({
        ...prevState,
        dropOffInstructions: "Drop off instructions are required.",
      }));
      hasError = true;
    }
    if (hasError) return;

    try {
      const userId = await AsyncStorage.getItem("_id");
      console.log('User ID:', userId);
      if (!userId) {
        Alert.alert("Error", "You must be logged in to place an order.");
        return;
      }

      // Create the order object
      const order = {
      cart:cartItems,
      shippingAddress: {
        Address: address,
        DropOffInstructions: dropOffInstructions,
      },
      totalPrice: total,
      otherPrice: {
        deliveryCharges: deliveryCharges,
        otherCharges: otherCharges,
      },
      userId: userId,
    };
      
      setLoading(true); // Start loading

      // Handle the API request for order creation
      const response = await API.post(ENDPOINTS.CREATE_ORDER, order);
      console.log("Order submission response:", response);
      
      if (response.success) {
       // Alert.alert("Order created successfully.");
        dispatch(clearCart());
        
        navigation.navigate("orderDone");  // Navigate to success screen
      } else {
        console.error("Order creation failed:", response);
        Alert.alert("Error", "Order creation failed. Please try again.");
      }

      // If payment mode is credit card, handle Stripe payment
      if (paymentMode === "creditCard") {
        const { data } = await axios.post(
          "https://apnadookan.com/api/process",
          { amount: Math.round(total) },
          { headers: { "Content-Type": "application/json" } }
        );

        const client_secret = data.client_secret;
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        });

        if (error) {
          Alert.alert("Payment failed! Please try again.");
          console.error("Payment error:", error);
        } else if (paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status,
            type: "Credit Card",
          };
          const res = await API.post(ENDPOINTS.CREATE_ORDER, order);
          console.log("Payment success response:", res);
          if (res.success) {
            dispatch(clearCart());
            //Alert.alert("Payment successful!");
           navigation.navigate("orderDone");
          } else {
            Alert.alert("Payment failed. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Order submission error sdfbshfv:", error.message);
      Alert.alert("Order submission failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const RadioButton = ({ value }) => {
    return (
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={() => setPaymentMode(value)}
      >
        <View
          style={[styles.radioButton, paymentMode === value && styles.radioButtonSelected]}
        />
      </TouchableOpacity>
    );
  };


  const handleSaveAddress = () => {
    // After the user saves the new address, we close the modal
    setModalVisible(false);
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
              <CustomCartIcon />
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
          <ScrollView style={{ height: height * 0.8 }} nestedScrollEnabled={true}>
            {/* Personal Details */}
            <CustomInput
              label={"Full Name"}
              placeholder="Full Name"
              value={address.fullName}
            onChangeText={(value) => setAddress({ ...address, fullName: value })}
            />
            <CustomInput
              label={"Email"}
              placeholder="Email Address"
              value={address.email}
              onChangeText={(value) => setAddress({ ...address, email: value })}
            />
            <CustomInput
             label={"Phone Number"}
              placeholder="Phone Number"
              value={address.phoneNumber}
              onChangeText={(text) => setAddress({ ...address, phoneNumber: text })}
              keyboardType="phone-pad"
            />
            {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
            
            <Text style={styles.carttext}>Address Details</Text>
           <View style={[styles.inputcontainer,{marginVertical:10}]}>
             <Ionicons name="location" size={25} color="black"/>
            <Text> {`${address.street} ${address.city} ${address.state} ${address.postalCode}`}</Text>
           </View>
           <View style={styles.inputcontainer}>
           <CustomInput
             label={'Street'}
              placeholder="Street Address"
              customWidth={width * 0.40}
              value={address.street}
              onChangeText={(value) => setAddress({ ...address, street: value })}
            />
            {errors.street ? <Text style={styles.errorText}>{errors.street}</Text> : null}
            <CustomInput
              label={"City"}
              placeholder="City"
              customWidth={width * 0.40}
              value={address.city}
              onChangeText={(value) => setAddress({ ...address, city: value })}
            />
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
           </View>
           <View style={styles.inputcontainer}>
            <CustomInput
                          placeholder="State"
                          value={address.state}
                          customWidth={width*0.40}
                          onChangeText={(value) => setAddress({ ...address, state: value })}
                        />
                        {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
            <CustomInput
              placeholder="Postal Code"
              value={address.postalCode}
              customWidth={width*0.40}
              onChangeText={(value) => setAddress({ ...address, postalCode: value })}
              keyboardType="numeric"
            />
            {errors.postalCode ? <Text style={styles.errorText}>{errors.postalCode}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
              <Text style={styles.editText}>Edit Address</Text>
            </TouchableOpacity>
            <View style={{marginVertical:10}}>
            <Text style={styles.carttext}>Drop Off Instruction</Text>
            <TextInput
               style={[styles.textarea, { height: height * 0.15 ,borderWidth:1,borderRadius:20,padding:14}]} 
                multiline={true} 
               textAlignVertical='top'
               numberOfLines={4} 
               value={dropOffInstructions}
               onChangeText={(text) => setDropOffInstructions(text)}
                  />
                   {errors.dropOffInstructions ? <Text style={styles.errorText}>{errors.dropOffInstructions}</Text> : null}
                 </View>

                        {/* order summary */}
                        <View style={styles.header}>
        <Text style={styles.carttext}>Order Summary</Text>
        <Text style={styles.totalItems}>Total Items in Cart: {totalItems}</Text>
      </View>
                 <View>
                  {cartItems.map((item, index) => (
                           <View key={index} style={styles.itemContainer}>
                             <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                             <View style={styles.itemDetails}>
                               <Text style={styles.itemName} numberOfLines={1} >{item.name}</Text>
                               <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>
                 
                               <View style={styles.quantityContainer}>
                                 <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                                 <Text style={styles.totalPrice}>
                                   Total: €{(item.price * item.quantity).toFixed(2)}
                                 </Text>
                               </View>
                             </View>
                           </View>
                         ))}
                 </View>
            <View style={styles.line2} />
            <Text style={styles.totalItems}>Total: €{total}</Text>
      
          </ScrollView>

          <View style={styles.line2} />
          <Text style={styles.totalText}>Payment Mode</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="bank-outline" size={20}  />
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
          onPress={handleSubmit}
          //onPress={() => navigation.navigate('orderDone')}
          paddingVertical={10}
          textColor={textcolor.color4}
          bgColor={textcolor.color3}
          fontFamily={InterFont.SemiBoldFont}
          fontSize={16}
        />
      </View>

      {/* Edit Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Street Address"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              placeholder="City"
              style={styles.input}
              value={address.city}
              onChangeText={(value) => setAddress({ ...address, city: value })}
            />
            <TextInput
              placeholder="Postal Code"
              style={styles.input}
              value={address.postalCode}
            onChangeText={(value) => setAddress({ ...address, postalCode: value })}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={handleSaveAddress}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Save Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 16,
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
  inputcontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10
  },
  input: {
    borderColor: textcolor.color8,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    fontSize: 16,
    color: textcolor.color1,
  },
  summaryContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: height * 0.1,
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
  saveButton: {
    backgroundColor: textcolor.color3,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: textcolor.color3,
    borderRadius: 5,
    alignItems: 'center',
  },
  editText: {
    color: textcolor.color1,
    fontWeight:'700',
    fontSize: 16,
  },

  header: {                        // order section
    gap: 8,
  },
 
  totalItems: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom:5
  },
  // itemsList: {
  //   maxHeight: 300,
  // },
  itemContainer: {
    flexDirection: 'row',
   gap: 10,
   marginBottom: 7,
    overflow:'hidden',
    //width:'100%',
    height:height*0.16,
    backgroundColor:'white',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius:10,
    paddingTop:10
    
  },
  itemImage: {
    width: 100,
    height: 90,
    borderRadius: 10,
    resizeMode:'contain'
  },
  itemDetails: {
    flexDirection: 'column',
    gap: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink:1,
    width:width*0.50
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  quantity: {
    fontSize: 14,
    color: '#696969',
  },
  totalPrice: {
    fontSize: 14,
    color: '#FF0000',
  },
  footerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  
});


//import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import React, { useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import cart from '../../assets/images/cart.png';
// import mail from '../../assets/images/mail.png';
// import check from '../../assets/images/check.png';
// import { InterFont, textcolor } from '../../styles/CustomStyles';
// import CustomButton from '../../components/CustomButton';
// import CustomCartIcon from './CustomCartIcon';

// const { width, height } = Dimensions.get('window');

// const Checkout = ({navigation}) => {
//   const [paymentMode, setPaymentMode] = useState(null);

//   const RadioButton = ({ value }) => {
//     return (
//       <TouchableOpacity
//         style={styles.radioButtonContainer}
//         onPress={() => setPaymentMode(value)}
//       >
//         <View
//           style={[
//             styles.radioButton,
//             paymentMode === value && styles.radioButtonSelected,
//           ]}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
//         <View style={styles.headerContainer}>
//           <ImageBackground
//             source={require('../../assets/images/Header.png')}
//             style={styles.headerImage}
//           >
//             <View style={styles.iconContainer}>
//             <CustomCartIcon/>
//             </View>
//           </ImageBackground>
//         </View>

//         <View style={styles.body}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button}>
//               <Image source={cart} style={styles.image} />
//             </TouchableOpacity>
//             <View style={styles.line} />
//             <TouchableOpacity style={[styles.button, { borderColor: '#ACE03A' }]}>
//               <Image source={mail} style={styles.image} />
//             </TouchableOpacity>
//             <View style={styles.line} />
//             <TouchableOpacity style={styles.button}>
//               <Image source={check} style={styles.image} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.cartcontainer}>
//           <Text style={styles.carttext}>Details</Text>
//           <View style={styles.line2} />
//           <ScrollView style={{height:height*0.5}}>
           
//                          {/* Deatil here */}
//           </ScrollView>
//           <View style={styles.line2} />
//           <Text style={styles.totalText}>Payment Mode</Text>
//           <View style={styles.summaryContainer}>
      
//             <View style={styles.summaryRow}>
//               <View style={{ flexDirection: 'row' }}>
//                 <MaterialCommunityIcons name="bank-outline" size={20} />
//                 <Text style={styles.summaryText}>Bank Transfer</Text>
//               </View>
//               <RadioButton value="bankTransfer" />
//             </View>

           
//             <View style={styles.summaryRow}>
//               <View style={{ flexDirection: 'row' }}>
//                 <MaterialCommunityIcons name="credit-card" size={20} />
//                 <Text style={styles.summaryText}>Credit Card</Text>
//               </View>
//               <RadioButton value="creditCard" />
//             </View>

//             <View style={styles.summaryRow}>
//               <View style={{ flexDirection: 'row' }}>
//                 <MaterialCommunityIcons name="currency-eur" size={20} />
//                 <Text style={styles.summaryText}>Cash on Delivery</Text>
//               </View>
//               <RadioButton value="cashOnDelivery" />
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Footer Section */}
//       <View style={styles.footerContainer}>
//         <CustomButton
//           text={'Done'}
//           width={width * 0.4}
//           onPress={() => navigation.navigate('orderDone')}
//           paddingVertical={10}
//           textColor={textcolor.color4}
//           bgColor={textcolor.color3}
//           fontFamily={InterFont.SemiBoldFont}
//           fontSize={16}
//         />
//       </View>
//     </View>
//   );
// };

// export default Checkout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollview: {
//     flexGrow: 1,
//   },
//   headerContainer: {
//     width: '100%',
//     height: height * 0.23,
//     overflow: 'hidden',
//   },
//   headerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     padding: width * 0.05,
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: width * 0.3,
//     alignItems: 'center',
//   },
//   button: {
//     width: width * 0.15,
//     height: width * 0.15,
//     borderRadius: (width * 0.15) / 2,
//     borderWidth: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: textcolor.color8,
//   },
//   line: {
//     alignSelf: 'center',
//     height: 3,
//     backgroundColor: textcolor.color8,
//     width: width * 0.20,
//     marginBottom: 10,
//   },
//   image: {
//     width: width * 0.07,
//     height: width * 0.07,
//     tintColor: textcolor.color8,
//   },
//   cartcontainer: {
//     marginHorizontal: 20,
//     marginTop: 12,
//     marginBottom: 20,
//   },
//   carttext: {
//     fontSize: 20,
//     color: textcolor.color1,
//     fontFamily: InterFont.SemiBoldFont,
//     marginLeft: 12,
//   },
//   line2: {
//     height: 1,
//     backgroundColor: textcolor.color8,
//     width: '100%',
//     marginVertical: 10,
//   },
//   summaryContainer: {
//     marginHorizontal: 10,
//     marginTop: 5,
//     marginBottom: height*0.1,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 6,
//     alignItems: 'center',
//   },
//   summaryText: {
//     fontSize: 16,
//     color: textcolor.color1,
//     fontWeight: 'normal',
//     marginHorizontal: 8,
//     alignSelf: 'center',
//   },
//   summaryAmount: {
//     fontSize: 16,
//     color: textcolor.color1,
//     fontWeight: 'normal',
//   },
//   totalRow: {
//     borderTopColor: textcolor.color8,
//     marginTop: 5,
//   },
//   totalText: {
//     fontWeight: 'bold',
//     color: textcolor.color2,
//   },
  // radioButtonContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // radioButton: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: '#333',
  // },
  // radioButtonSelected: {
  //   backgroundColor: '#333', 
  // },
//   footerContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
// });