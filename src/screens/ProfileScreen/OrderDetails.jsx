import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import img1 from "../../assets/images/apples.png";
import API, { ENDPOINTS } from "../API/apiService";
import CustomButton from "../../components/CustomButton";
import { InterFont, textcolor } from "../../styles/CustomStyles";

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params;  // Retrieve the passed 'id' parameter
  const navigation = useNavigation();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await API.get(`${ENDPOINTS.GET_ORDERBYID}/${id}`);
        setOrder(res);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch order details.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  if (!order?.data) {
    return <Text style={styles.errorText}>Order data not available.</Text>;
  }
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
        
    <ScrollView contentContainerStyle={styles.ScrollViewcontainer}>
      {/* <View
        // source={img1}
        style={styles.header}
       // imageStyle={{ borderBottomLeftRadius: 100, borderBottomRightRadius: 100 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      </View> */}
      <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>
            </View>
  
      <View style={styles.content}>
        
        {order ? (
          <View style={styles.detailsContainer}>
            
            <Text style={styles.title}>Order Details</Text>

            {/* Payment Info */}
            {order.data.paymentInfo && (
              <View style={styles.section}>
                <Text style={styles.subtitle}>Payment Info:</Text>
                <Text><Text style={styles.bold}>Type:</Text> {order.data.paymentInfo?.type}</Text>
              </View>
            )}

            {/* Cart Items */}
            {order.data.cart && (
              <View style={styles.section}>
                <Text style={styles.subtitle}>Cart Items:</Text>
                {order.data.cart.map((item) => (
                  <View key={item._id} style={styles.cartItem}>            
                   <Image source={{ uri: item.imageUrl }} style={styles.cartItemImage} />  
                 <View >
                 <Text><Text style={styles.bold}>Name:</Text> {item.name}</Text>
                   <Text><Text style={styles.bold}>Quantity:</Text> {item.quantity}</Text>
                   <Text><Text style={styles.bold}>Price:</Text> ${item.price}</Text>
                 </View>
                   
                  </View>
                  
                ))}
              </View>
            )}

            {/* Shipping Address */}
            {order.data.shippingAddress?.Address && (
              <View style={styles.section}>
                <Text style={styles.subtitle}>Shipping Address:</Text>
                <Text><Text style={styles.bold}>Full Name:</Text> {order.data.shippingAddress?.Address?.fullName}</Text>
                <Text><Text style={styles.bold}>Phone Number:</Text> {order.data.shippingAddress?.Address?.phoneNumber}</Text>
                <Text><Text style={styles.bold}>Street:</Text> {order.data.shippingAddress?.Address?.street}</Text>
                <Text><Text style={styles.bold}>State:</Text> {order.data.shippingAddress?.Address?.state}</Text>
                <Text><Text style={styles.bold}>City:</Text> {order.data.shippingAddress?.Address?.city}</Text>
                <Text><Text style={styles.bold}>Postal Code:</Text> {order.data.shippingAddress?.Address?.postalCode}</Text>
                <Text><Text style={styles.bold}>Email:</Text> {order.data.shippingAddress?.Address?.email}</Text>
                <Text><Text style={styles.bold}>Drop-Off Instructions:</Text> {order.data.shippingAddress?.DropOffInstructions}</Text>
              </View>
            )}

            {/* Prices */}
            <View style={styles.section}>
              <Text style={styles.subtitle}>Prices:</Text>
              <Text><Text style={styles.bold}>Total Price:</Text> ${order.data.totalPrice}</Text>
              <Text><Text style={styles.bold}>Delivery Charges:</Text> ${order.data.otherPrice?.deliveryCharges}</Text>
              <Text><Text style={styles.bold}>Other Charges:</Text> ${order.data.otherPrice?.otherCharges}</Text>
            </View>

            {/* Other Info */}
            <View style={styles.section}>
              <Text style={styles.subtitle}>Other Info:</Text>
              <Text><Text style={styles.bold}>Status:</Text> {order.data.status}</Text>
              <Text><Text style={styles.bold}>Paid At:</Text> {new Date(order.data.paidAt).toLocaleString()}</Text>
              <Text><Text style={styles.bold}>Created At:</Text> {new Date(order.data.createdAt).toLocaleString()}</Text>
            </View>
          </View>
        ) : (
          <Text>No order details available.</Text>
        )}
        <View style={{alignSelf:'center'}}>
        <CustomButton text={'Download'}
        width={'50%'}
        onPress={handledownload}
        paddingVertical={10}
        textColor={textcolor.color4}
        bgColor={textcolor.color3}
        fontFamily={InterFont.SemiBoldFont}
        fontSize={14}
        />
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
  ScrollViewcontainer: {
    flexGrow: 1,
   // backgroundColor: '#fff',
  },
  header: {
   padding:14
  },
 
  content: {
   paddingHorizontal: 20,
  },
  detailsContainer: {
    //marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  cartItem: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderDetails;
