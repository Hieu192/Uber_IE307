import { useNavigation } from "@react-navigation/native";
import TripHistoryScreen from "../screens/TripsHistory";
import { createStackNavigator } from '@react-navigation/stack'
import TripDetailScreen from "../screens/TripDetailScreen";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Stack = createStackNavigator();
const TripStack = () => {
  const navigation = useNavigation()
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TripHistory"
          component={TripHistoryScreen}
          options={{ headerLeft: () => (
                      <TouchableOpacity onPress={() => navigation.openDrawer()} >
                        <Icon name="bars" size={24} style={{marginHorizontal: 16}}/>
                      </TouchableOpacity>
                    ),
                    title: "Các chuyến đi của tôi ", }}
        />
        <Stack.Screen
          name="TripDetailScreen"
          component={TripDetailScreen}
          options={{ 
            headerShown: true, 
            title: 'Chi tiết chuyến đi', 
            drawerLockMode: 'locked-closed' 
        }}
        />
      </Stack.Navigator>
    );
  };
  
  export default TripStack;