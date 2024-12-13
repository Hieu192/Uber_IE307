import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from './styles.js'
import NewOrderPopup from "../../components/NewOrderPopup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import listenToNotifications from "../../components/LIstenForNotification/index.js";
const origin = {latitude: 28.450927, longitude: -16.260845};
const destination = {latitude: 37.771707, longitude: -122.4053769};


const HomeScreen = () => {
  const [car, setCar] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null)
  const [newOrders, setNewOrders] = useState([]);
  
  const fetchCar = async () => {
    try {

     // setCar(carData.data.getCar);
    } catch (e) {
      console.error(e);
    }
  }

  const fetchOrders = async () => {
    try {
       // setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    listenToNotifications("22xi8iSa5YctKqQcFoxR")
    fetchCar();
    fetchOrders();
  }, []);

  const onDecline = () => {
    //setNewOrders(newOrders.slice(1));
  }

  const onAccept = async (newOrder) => {
    try {
  
      //setOrder(orderData.data.updateOrder);
    } catch (e) {

    }

   // setNewOrders(newOrders.slice(1));
  }

  const onGoPress = async () => {
    // Update the car and set it to active
    try {
    
     // setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate
    // Update the car and set it to active
    try {
      //setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }

  const onDirectionFound = (event) => {
    console.log("Direction found: ", event);
   
  }

  const getDestination = () => {
   
  }

  const renderBottomTitle = () => {
    // if (order && order.isFinished) {
    //   return (
    //     <View style={{ alignItems: 'center' }}>
    //       <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center', backgroundColor: '#cb1a1a', width: 200, padding: 10,  }}>
    //         <Text style={{color: 'white', fontWeight: 'bold'}}>COMPLETE {order.type}</Text>
    //       </View>
    //       <Text style={styles.bottomText}>{order.user.username}</Text>
    //     </View>
    //   )
    // }

    // if (order && order.pickedUp) {
    //   return (
    //     <View style={{ alignItems: 'center' }}>
    //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //         <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
    //         <View style={{ backgroundColor: '#d41212', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
    //           <FontAwesome name={"user"} color={"white"} size={20} />
    //         </View>
    //         <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
    //       </View>
    //       <Text style={styles.bottomText}>Dropping off {order?.user?.username}</Text>
    //     </View>
    //   )
    // }

    if (order) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{ backgroundColor: '#1e9203', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order?.user?.username}</Text>
        </View>
      )
    }
    if (car?.isActive) {
      return (
        <Text style={styles.bottomText}>You're online</Text>
      )
    }
    return (<Text style={styles.bottomText}>You're offline</Text>);
  }

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 28.450627,
          longitude: -16.263045,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        {order && (
          <MapViewDirections
            origin={{
              latitude: car?.latitude,
              longitude: car?.longitude,
            }}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'green' }}>$</Text>
          {' '}
          0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, right: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={onGoPress}
        style={styles.goButton}>
        <Text style={styles.goText}>
          {car?.isActive ? 'END' : 'GO'}
        </Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name={"options"} size={30} color="#4a4a4a"/>
          {renderBottomTitle()}
        <Entypo name={"menu"} size={30} color="#4a4a4a" />
      </View>

   
    </View>
  );
};

export default HomeScreen;
