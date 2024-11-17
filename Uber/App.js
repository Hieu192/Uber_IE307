import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import * as Location from 'expo-location'; // Sử dụng thư viện Expo Location
import {withAuthenticator} from 'aws-amplify-react-native';
import {Amplify} from 'aws-amplify';
import config from './aws-exports';
import Router from './src/navigation/Root';

// Cấu hình AWS Amplify
Amplify.configure(config);

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
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
};

export default withAuthenticator(App);
