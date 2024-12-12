import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" 
        component={HomeScreen} 
        // options={{
				// 	headerLeft: () => (
				// 		<TouchableOpacity onPress={() => navigation.openDrawer()} >
				// 			<Icon name="bars" size={24} style={{marginHorizontal: 16}}/>
				// 		</TouchableOpacity>
				// 	),
				// 	title: "Home",
				// 	}}
        />
    </Stack.Navigator>
  );
};

export default HomeStack;
