// AcceptRide.js
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

const acceptRide = async (rideId, driverId) => {
  try {
    // Ghi phản hồi của tài xế vào Firestore
    // Tham chiếu đến document cần cập nhật
    const rideRef = doc(db, "rides", rideId);

    // Cập nhật trường status
    await updateDoc(rideRef, {
      status: "accepted",
      driverId: "driver123",
    });

    console.log("Tài xế đã nhận cuốc:", driverId);
  } catch (error) {
    console.error("Lỗi khi nhận cuốc:", error);
  }
};

export default acceptRide;
