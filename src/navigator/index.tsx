import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Product from '../screens/product';
import Wishlist from '../screens/wishlist';
import Cart from '../screens/cart';
import Splash from '../screens/splash';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="Cart" component={Cart} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
