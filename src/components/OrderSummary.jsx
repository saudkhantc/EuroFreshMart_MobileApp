import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const OrderSummary = ({ route }) => {
  // Fetching cartItems from route params
 
  const { cartItems } = route.params || { cartItems: [] };

  // Calculate total items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Summary</Text>
        <Text style={styles.totalItems}>Total Items in Cart: {totalItems}</Text>
      </View>

      <ScrollView style={styles.itemsList}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 24,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
  },
  totalItems: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemsList: {
    maxHeight: 300,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  itemImage: {
    width: 180,
    height: 120,
    borderRadius: 16,
  },
  itemDetails: {
    flexDirection: 'column',
    gap: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#696969',
  },
  totalPrice: {
    fontSize: 14,
    color: '#FF0000',
  },
});

export default OrderSummary;
