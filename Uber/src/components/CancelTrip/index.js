// CancelTrip.js
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const CancelTrip = async (ride) => {
  try {
    // Lấy document của chuyến xe
    const rideDocRef = doc(db, "rides", ride.id);
    const rideSnapshot = await getDoc(rideDocRef);

    // Kiểm tra xem document có tồn tại không
    if (!rideSnapshot.exists()) {
      console.error("Chuyến xe không tồn tại!");
      return;
    }

    // Lấy trạng thái hiện tại
    const rideData = rideSnapshot.data();
    const currentStatus = rideData.status;


    if (currentStatus === "onTrip") {
      return;
    }

    // Cập nhật trạng thái thành "canceled"
    await updateDoc(rideDocRef, {
      status: "canceled",
      canceledAt: serverTimestamp(),
    });

    console.log("Chuyến xe đã được hủy!");

  } catch (error) {
    console.error("Lỗi khi hủy chuyến xe:", error);
  }
};

export default CancelTrip;
