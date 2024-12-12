/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './firebaseConfig';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import HomeStack from './src/navigation/HomeStack';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

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
      {isLoggedIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
