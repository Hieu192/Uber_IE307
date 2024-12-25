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
   const updateNotificationStatus = async (notificationId, status,driverId) => {
    try {
      console.log('cập nhật')
      console.log("mã thông báo",notificationId)
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { status });
      if (status == "accepted") {
        const docSnap = await getDoc(notificationRef);
        await acceptRide(docSnap.data().ride_id, docSnap.data().driver_id);
      }
      else{
        const driverRef = doc(db, "drivers", driverId);
        await updateDoc(driverRef, { isAvailable:true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  export  default  updateNotificationStatus;