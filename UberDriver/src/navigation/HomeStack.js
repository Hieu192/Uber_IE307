import React from "react";
import HomeScreen from "../screens/HomeScreen";
import DirectionScreen from "../screens/Direction/index";
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from "@react-navigation/native";
import {TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/AntDesign";
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
              <Stack.Screen name="Direction" 
        component={DirectionScreen} 
         options={{
				 	headerLeft: () => (
				 		<TouchableOpacity onPress={() => navigation.openDrawer()} >
				 			<Icon name="bars" size={24} style={{marginHorizontal: 16}}/>
				 		</TouchableOpacity>
				 	),
				 	title: "Direction",
					headerShown:false
				 	}
				}
        />
    </Stack.Navigator>
  );
};

export default HomeStack;
