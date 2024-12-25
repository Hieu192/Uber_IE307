import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { View, Dimensions, Text, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import acceptRide from "./acceptRide.js";
import  {updateNotification,UpdateRide} from "../redux/slices/app"

function listenToNotifications(driver_id,dispatch) {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("driver_id", "==", driver_id),
    where("status", "==", "pending") // Lọc theo trạng thái 'pending'
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log("Sự thay đổi là:",change.type)
      if (change.type === "added") {
        const rideId = change.doc.data().ride_id;
        console.log("đang cập nhật")
        dispatch(UpdateRide(rideId))
        const notificationId = change.doc.id;
        dispatch(updateNotification(notificationId));
      }
    });
  });

  return unsubscribe; // Có thể sử dụng để dừng lắng nghe khi cần
}

export default listenToNotifications;
