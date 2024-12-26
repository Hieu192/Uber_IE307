import { useNavigation } from "@react-navigation/native";
import TripHistoryScreen from "../screens/TripsHistory";
import { createStackNavigator } from '@react-navigation/stack'
import TripDetailScreen from "../screens/TripDetailScreen";

const Stack = createStackNavigator();
const TripStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TripHistory"
          component={TripHistoryScreen}
          options={{ headerShown: false, title: 'Các chuyến đi của tôi' }}
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