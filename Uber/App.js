import './firebaseConfig';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Location from 'expo-location'; // Thư viện Expo Location
import Router from './src/navigation/Root';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';

// Component chính
const MainApp = () => {
  // Lấy trạng thái đăng nhập từ Redux
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Yêu cầu quyền truy cập vị trí
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isLoggedIn ? <Router /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Gói ứng dụng với Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
