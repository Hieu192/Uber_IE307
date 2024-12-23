import React,{useEffect, useState} from "react";
import { Image, StyleSheet } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View, Dimensions, Alert,Text } from "react-native";
import CreateRide from "../CreateRide"
import listenForDriverResponses from "../LIstenForResponse";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector,useDispatch } from 'react-redux';
import RippleDot from "../RippleDot"
const OrderMap = ({ origin,destination }) => {
  const dispatch=useDispatch()
  const {isLoading} = useSelector(state => state.app);
  console.log("loading lala",isLoading)
  useEffect(()=>{
    console.log("da vao")
   CreateRide(origin.value,destination.description,dispatch )

  },[])

  return (
    <View style={styles.container}>
      {/* Hiển thị spinner nếu đang loading */}
      {/* <Spinner
        visible={isLoading}
        textContent={"Đang tìm tài xế cho bạn..."}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <Text style={{padding:"20",fontSize:20}}>Hệ thống đang tìm tài xế phù hợp </Text>
       <RippleDot/>
      {/* Nội dung hiển thị khi không còn loading */}
      {!isLoading && <Text style={styles.successText}>Tài xế đã được tìm thấy!</Text>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerTextStyle: {
    color: "#1fff1f",
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
});

export default OrderMap;
