import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API, { ENDPOINTS } from "../API/apiService";
import CustomButton from "../../components/CustomButton";
import { InterFont, textcolor } from "../../styles/CustomStyles";
import RNHTMLtoPDF from 'react-native-html-to-pdf'; 
import Share from 'react-native-share'; 

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params;  
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

  // PDF Generation function
  const generateInvoice = async () => {
    try {
      const orderData = order.data;
      
      // Construct the HTML content for the invoice
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; font-size: 20px; }
              .invoice-details { margin-top: 20px; }
              .order-details { margin-top: 10px; border-collapse: collapse; width: 100%; }
              .order-details th, .order-details td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .order-details th { background-color: #f2f2f2; }
              .total-price { font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Order Invoice</h2>
              <p>Apnadookan, Finland</p>
              <p>Contact: +358 45 2069311</p>
              <hr>
            </div>
            <div class="invoice-details">
              <p><strong>Order ID:</strong> ${orderData._id}</p>
              <p><strong>Status:</strong> ${orderData.status}</p>
              <p><strong>Paid At:</strong> ${new Date(orderData.paidAt).toLocaleString()}</p>
              <p><strong>Created At:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
            </div>
            <div class="order-details">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.cart.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="total-price">
              <p>Total Price: $${orderData.totalPrice}</p>
              <p>Delivery Charges: $${orderData.otherPrice.deliveryCharges}</p>
              <p>Other Charges: $${orderData.otherPrice.otherCharges}</p>
            </div>
            <div class="shipping-address">
              <h3>Shipping Address</h3>
              <p><strong>Full Name:</strong> ${orderData.shippingAddress.Address.fullName}</p>
              <p><strong>Street:</strong> ${orderData.shippingAddress.Address.street}</p>
              <p><strong>City:</strong> ${orderData.shippingAddress.Address.city}</p>
              <p><strong>Phone  Number:</strong> ${orderData.shippingAddress.Address.phoneNumber}</p>
              <p><strong>Email:</strong> ${orderData.shippingAddress.Address.email}</p>
              <p><strong>State:</strong> ${orderData.shippingAddress.Address.state}</p>
              <p><strong>Postal Code:</strong> ${orderData.shippingAddress.Address.postalCode}</p>
            </div>
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `Invoice_${orderData._id}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
    //  Alert.alert("Download Complete", `Invoice saved to ${file.filePath}`);
      console.log("Download Complete", `Invoice saved to ${file.filePath}`);

      // Share the generated PDF
      const shareOptions = {
        title: 'Share Invoice PDF',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
        message: 'Here is your order invoice!',
      };

      await Share.open(shareOptions);
      console.log("Shared successfully:", file.filePath);

    } catch (error) {
      console.log("Error generating invoice:", error);
     // Alert.alert("Download Failed", "There was an error generating the invoice.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollViewcontainer}>
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
                      <View>
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
          
          <View style={{ alignSelf: 'center' }}>
            <CustomButton
              text={'Download & Share'}
              width={'50%'}
              onPress={generateInvoice}  // Trigger PDF generation and share
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
  container: {
    flex: 1,
  },
  ScrollViewcontainer: {
    flexGrow: 1,
  },
  header: {
    padding: 14,
  },
  content: {
    paddingHorizontal: 20,
  },
  detailsContainer: {
    marginTop: 10,
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
