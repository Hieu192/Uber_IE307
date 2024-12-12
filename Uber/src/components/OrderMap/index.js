import React,{useEffect} from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View, Dimensions, Alert,Text } from "react-native";
import CreateRide from "../CreateRide"
const OrderMap = ({ origin,destination }) => {
  console.log("Dia diem nhap vao",origin.value,destination.description)
  useEffect(()=>{
    console.log("da vao")
   CreateRide(origin.value,destination.description )
  },[])
  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  };

  return <Text>Đang tìm tài xế cho bạn</Text>


};

export default OrderMap;
