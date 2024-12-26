// ListenForResponses.js
import { collection, onSnapshot, doc, updateDoc,getDoc  } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { View, Dimensions, Text, Alert } from "react-native";
import { updateLoading, updateDriver } from "../redux/slices/app";
const listenForDriverResponses = (rideId, dispatch) => {
  const rideRef = doc(db, "rides", rideId);
  console.log("tôi đang lắng  nghe");
  const unsubscribe = onSnapshot(rideRef, async (snapshot) => {
    try {
      const rideData = snapshot.data();

      if (rideData && rideData.status === "accepted" && rideData.driver_id) {
        dispatch(updateLoading(false));
        const driverId = rideData.driver_id;
        const driverRef = doc(db, "drivers", driverId);

        // Lấy tài liệu
        const docSnapshot = await getDoc(driverRef);
        console.log(docSnapshot);
        dispatch(updateDriver(docSnapshot.data()));
        console.log(docSnapshot.data());
        // Thực hiện thông báo hoặc xử lý việc tài xế nhận cuốc
        console.log("Cuốc xe đã được nhận bởi tài xế:", driverId);
        // Ngừng lắng nghe khi đã nhận cuốc
        unsubscribe();
      }
    } catch (err) {
      console.log(err);
    }

    return unsubscribe;
  });
};

export default listenForDriverResponses;
