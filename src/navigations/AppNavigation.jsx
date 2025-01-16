import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import AuthScreen from '../screens/AuthScreens/AuthScreen';
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import OtpScreen from '../screens/AuthScreens/OtpScreen';
import UpdatePassword from '../screens/AuthScreens/UpdatePassword';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import BottomTabs from './BottomTabs';
import CategoryScreen from '../screens/HomeScreens/CategoryScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="authScreen" component={AuthScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="forgot-password" component={ForgotPassword} />
        <Stack.Screen name="Otp-screen" component={OtpScreen} />
        <Stack.Screen name="update-password" component={UpdatePassword} />
        <Stack.Screen name="home-screen" component={HomeScreen} />
        <Stack.Screen name="bottom-tabs" component={BottomTabs} />
         <Stack.Screen name="category-screen" component={CategoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
