// ListenForResponses.js
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { View, Dimensions, Text, Alert } from "react-native";
import {updateLoading} from "../../redux/slices/app"
const listenForDriverResponses = (rideId,dispatch) => {
  const rideRef = doc(db, "rides", rideId);

  const unsubscribe = onSnapshot(rideRef, async (snapshot) => {
    const rideData = snapshot.data();

    if (rideData && rideData.status === "accepted" && rideData.driver_id) {
      dispatch(updateLoading(false))
      const driverId = rideData.driver_id;
      Alert.alert("Tài xế có mã ",driverId," đã nhận chuyến xe của bạn ")
      // Thực hiện thông báo hoặc xử lý việc tài xế nhận cuốc
      console.log("Cuốc xe đã được nhận bởi tài xế:", driverId);
      // Ngừng lắng nghe khi đã nhận cuốc
      unsubscribe();
    }
  });

  return unsubscribe; // Dùng để dừng lắng nghe nếu cần
};

export default listenForDriverResponses;
