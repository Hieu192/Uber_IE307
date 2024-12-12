import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import SearchResults from "../screens/SearchResults";
import CheckoutType from "../screens/CheckoutType";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const SearchResultsStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen name={"SearchResults"} component={SearchResults} options={{
          headerShown: false, 
        }}/>
      <Stack.Screen name={"checkoutType"} component={CheckoutType} options={{
          headerShown: true, 
          title: "Phương thức thanh toán",
        }} />
    </Stack.Navigator>
  );
};

export default SearchResultsStack;
