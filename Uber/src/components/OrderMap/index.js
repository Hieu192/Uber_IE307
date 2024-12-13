import React,{useEffect, useState} from "react";
import { Image, StyleSheet } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View, Dimensions, Alert,Text } from "react-native";
import CreateRide from "../CreateRide"
import Spinner from "react-native-loading-spinner-overlay";
const OrderMap = ({ origin,destination }) => {
  const [loading, setLoading] = useState(true);
  console.log("Dia diem nhap vao",origin.value,destination.description)
  useEffect(()=>{
    console.log("da vao")
   CreateRide(origin.value,destination.description )
  },[])
  const getImage = () => {
    if (type.type === 'Xe máy tiết kiệm') {
      return require('../../assets/images/bike-1.png');
    }
    if (type.type === 'Xe máy Bình Dương') {
      return require('../../assets/images/bike-1.png');
    }
    if (type.type === 'Ô tô tiết kiệm') {
      return require('../../assets/images/taxi-2.png');
    }
    if (type.type === 'Ô tô Bình Dương') {
      return require('../../assets/images/taxi-2.png');
    }
    return require('../../assets/images/taxi-1.png');
  }

  return (
    <View style={styles.container}>
      {/* Hiển thị spinner nếu đang loading */}
      <Spinner
        visible={loading}
        textContent={"Đang tìm tài xế cho bạn..."}
        textStyle={styles.spinnerTextStyle}
      />

      {/* Nội dung hiển thị khi không còn loading */}
      {!loading && <Text style={styles.successText}>Tài xế đã được tìm thấy!</Text>}
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
