import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import profile from "../../assets/images/Profile.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../API/apiRoutes';
import API from '../API/apiService';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('order');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables to manage user profile data
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        const storedUserEmail = await AsyncStorage.getItem("email");
        const storedUserAddress = await AsyncStorage.getItem("address");

        setUserName(storedUserName || "");
        setUserEmail(storedUserEmail || "");
        setUserAddress(storedUserAddress || "");
      } catch (error) {
        console.log("Error loading user data:", error);
      }
    };
    
    loadUserData(); // Call the function on component mount
  }, []);

  const handleSave = async () => {
    try {

      if (userAddress !== "" && userAddress !== (await AsyncStorage.getItem("address"))) {
        await AsyncStorage.setItem("address", userAddress);
      }

      const storedUserName = await AsyncStorage.getItem("userName");
      const storedUserEmail = await AsyncStorage.getItem("email");
  
      if (userName !== storedUserName) {
        await AsyncStorage.setItem("userName", userName);
      }
  
      if (userEmail !== storedUserEmail) {
        await AsyncStorage.setItem("email", userEmail);
      }
  
      // Show success message
      Alert.alert("Success", "Your profile information has been saved!");
    } catch (error) {
      console.log("Error saving user data:", error);
      Alert.alert("Error", "Failed to save profile information.");
    }
  };
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("address");

      setUserName(""); // Clear username from state


    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Fetch orders (this code is unchanged)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = await AsyncStorage.getItem("_id");

        if (!userId) {
          Alert.alert("Error", "User ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const apiUrl = `${ENDPOINTS.GET_USERORDER}/${userId}`;
        const res = await API.get(apiUrl);

        if (res.orders && res.orders.length > 0) {
          setOrders(res.orders);
        } else {
          setError("No orders found for this user.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err.response || err.message);
        setError(err.message || "Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderPress = (orderId, event) => {
    event.persist();
    navigation.navigate('orderDetails', { id: orderId });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.nametext}>{userName}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.heading}>Profile</Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('order')}>
              <Text
                style={[styles.tabText, activeTab === 'order' && { color: textcolor.color3, borderBottomWidth: 3, borderColor: textcolor.color3 }]}>
                Order ({orders.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('favorite')}>
              <Text
                style={[styles.tabText, activeTab === 'favorite' && { color: textcolor.color3, borderBottomWidth: 3, borderColor: textcolor.color3 }]}>
                Profile Information
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render content based on the selected tab */}
          {activeTab === 'order' ? (
            <ScrollView style={styles.orderContainer}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderHeaderText}>Order ID</Text>
                <Text style={styles.orderHeaderText}>Date</Text>
                <Text style={styles.orderHeaderText}>Value</Text>
              </View>

              {orders.map((order, index) => (
                <View key={index} style={styles.orderRow}>
                  <Text style={styles.orderText}>{order._id}</Text>
                  <Text style={styles.orderText}>{new Date(order.createdAt).toLocaleDateString()}</Text>
                  <Text style={styles.orderText}>{order.totalPrice}</Text>
                  <TouchableOpacity style={styles.viewButton} onPress={(event) => handleOrderPress(order._id, event)}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.orderContainer}>
              <CustomInput value={userName} label={'Full Name'}  />
              <CustomInput value={userEmail} label={"Email"} />
              <CustomInput value={userAddress} label={"Address"} onChangeText={setUserAddress} />
                <View style={{alignSelf:'center'}}>
                  
              <CustomButton
                text={"Save"}
                width={width * 0.3}
                onPress={handleSave} // Call handleSave when the Save button is pressed
                paddingVertical={10}
                textColor={textcolor.color4}
                bgColor={textcolor.color3}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={16}
              />
                </View>
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
    height:60,
    
  },
  orderText: {
    flex: 1,
    textAlign: 'center',
    fontSize:12
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
   label: {
      fontSize: 14,
      fontFamily: InterFont.MediumFont,
      color: textcolor.color2,
      marginBottom: 4,
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      height: height * 0.06,
      borderColor: '#ccc',
      borderWidth: 0.5,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: 16,
      color: textcolor.color2,
      backgroundColor: '#F2F2F2',
    },
});

export default Profile;
