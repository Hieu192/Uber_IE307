import  './firebaseConfig';  
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import * as Location from 'expo-location'; // Sử dụng thư viện Expo Location
import Router from './src/navigation/Root';
import AuthStack from "./src/navigation/AuthStack"
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  // Yêu cầu quyền truy cập vị trí
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      // Trên Android, yêu cầu quyền truy cập vị trí
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } else if (Platform.OS === 'ios') {
      // Trên iOS, yêu cầu quyền truy cập vị trí
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
