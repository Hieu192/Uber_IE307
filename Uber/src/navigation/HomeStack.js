import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack'
import DestinationSearch from "../screens/DestinationSearch";
import SearchResults from "../screens/SearchResults";
import OrderScreen from "../screens/OrderScreen";
import CheckoutType from "../screens/CheckoutType";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import SearchResultsStack from "./SearchResultsStack";

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" 
        component={HomeScreen} 
        options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.openDrawer()} >
							<Icon name="bars" size={24} style={{marginHorizontal: 16}}/>
						</TouchableOpacity>
					),
					title: "Home",
					}}
        />
      <Stack.Screen name={"DestinationSearch"} component={DestinationSearch} options={{
          headerShown: true, 
          title: "Tìm kiếm điểm đến",
        }}/>
      <Stack.Screen name={"SearchResults"} component={SearchResults} options={{
          headerShown: false, 
        }}/>
      <Stack.Screen name={"checkoutType"} component={CheckoutType} options={{
          headerShown: true, 
          title: "Phương thức thanh toán",
        }}/>
      <Stack.Screen name={"OrderPage"} component={OrderScreen} options={{
          headerShown: true, 
          title: "Thanh toán",
        }}/>
    </Stack.Navigator>
  );
};

export default HomeStack;
