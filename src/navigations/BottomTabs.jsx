import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomtabNavigation from '../components/BottomtabNavigation';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';
import CategoryScreen from '../screens/HomeScreens/CategoryScreen';
import Profile from '../screens/ProfileScreen/Profile';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomtabNavigation {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="homepage" component={HomeScreen} />
      <Tab.Screen name="category-screen" component={CategoryScreen} />
      <Tab.Screen name="wishlist-screen" component={WishlistScreen} />
      <Tab.Screen name='profile' component={Profile}/>
    </Tab.Navigator>
  );
};

export default BottomTabs;


