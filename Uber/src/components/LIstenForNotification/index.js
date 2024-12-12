import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
const updateNotificationStatus = async (notificationId, status) => {
  const notificationRef = doc(db, "notifications", notificationId);
  await updateDoc(notificationRef, { status });
  console.log("Trạng thái thông báo đã được cập nhật.");
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
        console.log("Thông báo mới:", notification.message);

        // Xử lý thông báo,hiển thị popup hoặc cập nhật giao diện
      }
    });
  });

  return unsubscribe; // Có thể sử dụng để dừng lắng nghe khi cần
}

// Ví dụ sử dụng
const driver_id = "driver123";
listenToNotifications(driverId);
