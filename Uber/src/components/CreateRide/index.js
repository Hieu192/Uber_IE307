// CreateRide.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const createRide = async (start_location, end_location) => {
  try {
    // Tạo cuốc xe trong Firestore
    const rideRef = await addDoc(collection(db, "rides"), {
      start_location,
      end_location,
      createdAt: new Date(),
      status: "pending", // Trạng thái ban đầu
    });

    console.log("Cuốc xe được tạo với ID:", rideRef.id);
    createRideNotification(rideRef.id);
  } catch (error) {
    console.error("Lỗi khi tạo cuốc xe:", error);
  }
};
async function createRideNotification(ride_id) {
  try {
    // Gửi thông báo đến từng tài xế
    const driversRef = query(
      collection(db, "drivers"),
      where("isAvailable", "==", true) // Lọc tài xế đang sẵn sàng
    );
    const driversSnapshot = await getDocs(driversRef);

    // Gửi thông báo tới tài xế
    driversSnapshot.forEach(async (doc) => {
      await addDoc(collection(db, "notifications"), {
        ride_id,
        driver_id: doc.id,
        createdAt: new Date(),
        status:"pending"
      });
      await updateDoc(doc.id, { isAvailable: false });
    });
    console.log("Thông báo đã gửi tới tài xế.");
  } catch (error) {
    console.error("Lỗi khi gửi thông báo:", error);
  }
}
export default createRide;
