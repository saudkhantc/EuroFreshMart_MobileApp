import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomtabNavigation from '../components/BottomtabNavigation';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import CartScreen from '../screens/HomeScreens/CartScreen';
import Profile from '../screens/ProfileScreen/Profile';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomtabNavigation {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="homepage" component={HomeScreen} />
      <Tab.Screen name="cart-screen" component={CartScreen} />
      <Tab.Screen name="orderDetails2" component={ForgotPassword} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;


