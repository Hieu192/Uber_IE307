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
import { db } from "../../../firebaseConfig";
import acceptRide from "../AcceptRide";
const updateNotificationStatus = async (notificationId, status) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, { status });
    if (status == "accepted") {
      const docSnap = await getDoc(notificationRef);
      await acceptRide(docSnap.data().ride_id, docSnap.data().driver_id);
    }
  } catch (err) {
    console.log(err);
  }
};
const showPopup = (notificationId) => {
  Alert.alert(
    "Chuyến xe mới!", // Tiêu đề
    "Bạn có chuyến xe càn nhận?", // Nội dung
    [
      {
        text: "Từ chối",
        onPress: () => {
          console.log("bạn đã từ chối chuyến xe")
          updateNotificationStatus(notificationId, "rejected");
        },
        style: "cancel",
      },
      {
        text: "Nhận chuyến",
        onPress: () => {
          updateNotificationStatus(notificationId, "accepted");
        },
      },
    ],
    { cancelable: false }
  );
};
function listenToNotifications(driver_id) {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("driver_id", "==", driver_id),
    where("status", "==", "pending") // Lọc theo trạng thái 'pending'
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const notification = change.doc.data();
        const notificationId = change.doc.id;
       // console.log("Thông báo mới:", notification.message);
        console.log(notificationId);
        showPopup(notificationId);
        // Xử lý thông báo,hiển thị popup hoặc cập nhật giao diện
      }
    });
  });

  return unsubscribe; // Có thể sử dụng để dừng lắng nghe khi cần
}

export default listenToNotifications;
