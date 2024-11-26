import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {CartProvider} from "../contexts/CartContext";
import HomeScreen from "../screens/Home"; 
import ProductItem from "../component/ProductItem";
import CartPage from "../screens/Cart";
import ProductDetail from "../screens/ProductDetail";
import SearchScreen from "../screens/SearchScreen";
import ShopSCreen from "../screens/ShopScreen";
const Stack = createStackNavigator();

const Rootnavi = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",  // sửa thành backgroundColor
          },
          headerTintColor: "#FEAB",
          headerTransparent: true,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 20,  // sửa thành headerLeftContainerStyle
          },
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
        />
        <Stack.Screen
        name= "CartPage"
        component={CartPage}
        options={{ title: "Cart" }}
        />
        <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: "Product Detail" }}
        />
        <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{title: "Search"}}
        />
        <Stack.Screen
        name ="ShopScreen"
        component={ShopSCreen}
        options={{title:"Shop"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default Rootnavi;
