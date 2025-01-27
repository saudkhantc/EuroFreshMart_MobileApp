import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import profile from "../../assets/images/Profile.png";

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('order'); // State to track the active tab

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Sample order data
  const orders = [
    { id: '242421', date: '12/01/2025', value: '$150' },
    { id: '242422', date: '13/01/2025', value: '$200' },
  ];

  // Sample favorite data
  const favorites = [
    { id: '992421', date: '12/01/2025', value: '$150' },
    { id: '34422', date: '13/01/2025', value: '$200' },
    { id: '2422', date: '13/01/2025', value: '$200' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('editprofile')}>
              <Feather name="edit" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image source={profile} style={styles.profileImage} />
            <Text style={styles.nametext}>Melissa Peters</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.heading}>Profile</Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => setActiveTab('order')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'order' && {
                    color: textcolor.color3,
                    borderBottomWidth: 3,
                    borderColor: textcolor.color3,
                  },
                ]}>
                Order ( 2 )
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => setActiveTab('favorite')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'favorite' && {
                    color: textcolor.color3,
                    borderBottomWidth: 3,
                    borderColor: textcolor.color3,
                  },
                ]}>
                Favorite Products (3)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render content based on the selected tab */}
          {activeTab === 'order' ? (
            <View style={styles.orderContainer}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderHeaderText}>Order ID</Text>
                <Text style={styles.orderHeaderText}>Date</Text>
                <Text style={styles.orderHeaderText}>Value</Text>
              </View>

              {orders.map((order, index) => (
                <View key={index} style={styles.orderRow}>
                  <Text style={styles.orderText}>{order.id}</Text>
                  <Text style={styles.orderText}>{order.date}</Text>
                  <Text style={styles.orderText}>{order.value}</Text>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.orderContainer}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderHeaderText}>Product ID</Text>
                <Text style={styles.orderHeaderText}>Date</Text>
                <Text style={styles.orderHeaderText}>Value</Text>
              </View>

              {favorites.map((favoriteItem, index) => (
                <View key={index} style={styles.orderRow}>
                  <Text style={styles.orderText}>{favoriteItem.id}</Text>
                  <Text style={styles.orderText}>{favoriteItem.date}</Text>
                  <Text style={styles.orderText}>{favoriteItem.value}</Text>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
    height: height * 0.25,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative',
  },
  iconContainer: {
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: "72%",
    height: "72%",
    resizeMode: 'contain',
  },
  nametext: {
    bottom: -25,
    fontSize: 16,
    color: textcolor.color1,
  },
  body: {
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontFamily: InterFont.BoldFont,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    color: textcolor.color1,
    fontFamily: InterFont.SemiBoldFont,
    textAlign: 'center',
    marginRight: 10,
  },
  orderContainer: {
    width: "100%",
    height: height * 0.5,
    borderWidth: 2,
    borderColor: '#ccc',
    marginVertical: 18,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  orderHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginRight: width * 0.16,
  },
  orderHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e9e9e9',
    alignItems: 'center',
  },
  orderText: {
    flex: 1,
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 14,
  },
  favoriteContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Profile;
