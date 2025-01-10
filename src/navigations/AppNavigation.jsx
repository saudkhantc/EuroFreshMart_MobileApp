import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import AuthScreen from '../screens/AuthScreens/AuthScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="authScreen" component={AuthScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
