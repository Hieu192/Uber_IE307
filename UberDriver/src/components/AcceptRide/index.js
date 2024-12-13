import { doc, getDoc, updateDoc, runTransaction } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { View, Dimensions, Text, Alert } from "react-native";
async function acceptRide(rideId, driverId) {
  const rideRef = doc(db, "rides", rideId);
  console.log("ma tai xe",driverId)
  console.log("ma chuyen xe",rideId)
  try {
    await runTransaction(db, async (transaction) => {
      const rideDoc = await transaction.get(rideRef);

      if (!rideDoc.exists()) {
        throw new Error("Chuyến xe không tồn tại.");
      }

      const rideData = rideDoc.data();

      // Kiểm tra trạng thái chuyến xe
      if (rideData.status !== "pending") {
        console.log("trang thai chuyen xe",rideData.status)
        Alert.alert("Chuyến xe đã được nhận bởi tài xế khác.");
      }
      else{
        Alert.alert("Bạn đã nhận chuyến xe thành công.");
        // Cập nhật trạng thái và gán tài xế
        transaction.update(rideRef, {
          status: "accepted",
          driver_id: driverId,
          acceptedAt: new Date(),
        });
        console.log("Bạn đã nhận chuyến xe thành công.");
      }
      // Cập nhật trạng thái và gán tài xế
      // transaction.update(rideRef, {
      //   status: "accepted",
      //   driver_id: driverId,
      //   acceptedAt: new Date(),
      // });
    });

    //console.log("Bạn đã nhận chuyến xe thành công.");
  } catch (error) {
    console.error("Không thể nhận chuyến xe:", error.message);
  }
}
export default acceptRide