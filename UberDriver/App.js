/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "./firebaseConfig";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar,StyleSheet,Text,View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import HomeStack from "./src/navigation/HomeStack";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/navigation/Root";
import * as Location from "expo-location";
import Notification from  "./src/components/Notification"
const MainApp = () => {
  // Lấy trạng thái đăng nhập từ Redux
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { notification_id } = useSelector((state) => state.app);
  // Yêu cầu quyền truy cập vị trí
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      console.log("You can use the location");
    } else {
      console.log("Location permission denied");
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {isLoggedIn ? <Router /> : <AuthStack />}
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
