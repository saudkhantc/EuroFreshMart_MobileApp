import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomtabNavigation from '../components/BottomtabNavigation';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import UpdatePassword from '../screens/AuthScreens/UpdatePassword';
import CartScreen from '../screens/HomeScreens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';
import CategoryScreen from '../screens/HomeScreens/CategoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomtabNavigation {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="homepage" component={HomeScreen} />
      <Tab.Screen name="category-screen" component={CategoryScreen} />
      <Tab.Screen name="wishlist-screen" component={WishlistScreen} />
      <Tab.Screen name="update-password" component={UpdatePassword} />
    </Tab.Navigator>
  );
};

export default BottomTabs;


