import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack'
import DestinationSearch from "../screens/DestinationSearch";
import SearchResults from "../screens/SearchResults";
import CheckoutType from "../screens/CheckoutType";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import SearchResultsStack from "./SearchResultsStack";
import DiscountScreen from "../screens/Discount";

import FindDriver from "../screens/FindDriver";
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
              <Stack.Screen name={"Discount"} component={DiscountScreen} options={{
          headerShown: true, 
          title: "Ưu đãi của bạn",
        }}/>
      <Stack.Screen name={"FindDriver"} component={FindDriver} options={{
          headerShown: true, 
          title: "Tìm tài xế ",
        }}/>
    </Stack.Navigator>
  );
};

export default HomeStack;
