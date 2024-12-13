import React, { useState, useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import OrderMap from "../../components/OrderMap";
import { useRoute } from '@react-navigation/native';


const OrderScreen = () => {

  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);
  const route = useRoute();
  const {originPlace, destinationPlace}=route.params
  console.log(route.params.id);

  // Fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // const orderData = await API.graphql(
        //   graphqlOperation(getOrder, { id: route.params.id })
        // );
        //setOrder(orderData.data.getOrder);
      } catch (e) {

      }
    }
    fetchOrder();
  }, [])

  // Subscribe to order updates
  useEffect(() => {
    // const subscription = API.graphql(
    //   graphqlOperation(onOrderUpdated, { id: route.params.id })
    // ).subscribe({
    //   next: ({ value }) => setOrder(value.data.onOrderUpdated),
    //   error: error => console.warn(error)
    // })

    // return () => subscription.unsubscribe();
  }, [])

  // Fetch Car data when order is updated
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }

    const fetchCar = async () => {
      try {
        // const carData = await API.graphql(
        //   graphqlOperation(getCar, { id: order.carId })
        // );
        // console.log(carData);
        // setCar(carData.data.getCar);
      } catch (e) {

      }
    }
    fetchCar();
  }, [order])

  // Subscribe to car updates
  // useEffect(() => {
  //   if (!order?.carId || order.carId === '1') {
  //     return;
  //   }

  //   const subscription = API.graphql(
  //     graphqlOperation(onCarUpdated, { id: order.carId })
  //   ).subscribe({
  //     next: ({ value }) => setCar(value.data.onCarUpdated),
  //     error: error => console.warn(error)
  //   })

  //   return () => subscription.unsubscribe();
  // }, [order])

  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 200}}>
        <OrderMap car={car} origin={originPlace} destination={destinationPlace}/>
      </View>
    </View>
  );
};

export default OrderScreen;
