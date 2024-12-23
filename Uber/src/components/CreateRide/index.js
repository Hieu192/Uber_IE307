// CreateRide.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import listenForDriverResponses from "../LIstenForResponse";
import {useDispatch} from "react-redux"
import {updateLoading,updateRide} from "../../redux/slices/app"
const createRide = async (start_location, end_location,dispatch) => {
  try {

    console.log("đang xử lí")
    dispatch(updateLoading(true))
    // Tạo cuốc xe trong Firestore
    const rideRef = await addDoc(collection(db, "rides"), {
      start_location,
      end_location,
      createdAt: new Date(),
      status: "pending", // Trạng thái ban đầu
    });
    dispatch(updateRide(rideRef.id))
    listenForDriverResponses(rideRef.id,dispatch)
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
      await updateDoc(doc.ref, { isAvailable: false });
    });
    console.log("Thông báo đã gửi tới tài xế.");
  } catch (error) {
    console.error("Lỗi khi gửi thông báo:", error);
  }
}
export const deleteDocuments = async (collectionName, limit) => {
  try {
    const colRef = collection(db, collectionName);
    const querySnapshot = await getDocs(colRef);
    const docsToDelete = querySnapshot.docs.slice(0, limit); // Lấy chỉ số lượng document cần xóa

    // Xóa từng document
    for (const docSnapshot of docsToDelete) {
      await deleteDoc(doc(db, collectionName, docSnapshot.id));
    }

    console.log(`${docsToDelete.length} documents deleted successfully!`);
  } catch (error) {
    console.error('Error deleting documents: ', error);
  }
};


export default createRide;
