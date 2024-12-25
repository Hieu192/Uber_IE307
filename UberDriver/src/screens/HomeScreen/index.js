import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import NewOrderPopup from "../../components/NewOrderPopup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import listenToNotifications from "../../utils/listenToNotifications.js";
import DriverStatus from "../../components/DriverStatusToggle";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification/index.js";
import { updateLocation } from "../../redux/slices/app";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const [car, setCar] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  const { user_id,isLoggedIn } = useSelector((state) => state.auth);
    const { notification_id } = useSelector((state) => state.app);
  console.log(user_id);
  console.log(myPosition);
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      getLocation();
    } else {
      console.log("Location permission denied");
    }
  };
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync();
      dispatch(
        updateLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
      setMyPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCar = async () => {
    try {
      // setCar(carData.data.getCar);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      // setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    listenToNotifications(user_id, dispatch);
    requestLocationPermission();

    //fetchCar();
    //fetchOrders();
  }, []);

  const onDecline = () => {
    //setNewOrders(newOrders.slice(1));
  };

  const onAccept = async (newOrder) => {
    try {
      //setOrder(orderData.data.updateOrder);
    } catch (e) {}

    // setNewOrders(newOrders.slice(1));
  };

  const onGoPress = async () => {
    // Update the car and set it to active
    try {
      // setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  };

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    // Update the car and set it to active
    try {
      //setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  };

  const onDirectionFound = (event) => {
    console.log("Direction found: ", event);
  };

  const getDestination = () => {};

  return (
    <View>
         {notification_id && isLoggedIn && <Notification />}

      {myPosition && (
        <MapView
          style={{
            width: "100%",
            height: Dimensions.get("window").height - 170,
          }}
          showsUserLocation={true}
          onUserLocationChange={onUserLocationChange}
          initialRegion={{
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        ></MapView>
      )}

      {/* <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'green' }}>$</Text>
          {' '}
          0.00
        </Text>
      </Pressable> */}
      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{car?.isActive ? "END" : "GO"}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <DriverStatus />
      </View>
    </View>
  );
};

export default HomeScreen;
