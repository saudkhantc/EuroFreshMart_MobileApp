import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomtabNavigation from '../components/BottomtabNavigation';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import Login from '../screens/AuthScreens/Login';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import UpdatePassword from '../screens/AuthScreens/UpdatePassword';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomtabNavigation {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="homepage" component={HomeScreen} />
      <Tab.Screen name="orderDetails" component={Login} />
      <Tab.Screen name="orderDetails2" component={ForgotPassword} />
      <Tab.Screen name="update-password" component={UpdatePassword} />
    </Tab.Navigator>
  );
};

export default BottomTabs;


