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
  doc,
  GeoPoint,
  getDoc
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import listenForDriverResponses from "../LIstenForResponse";
import { updateLoading, createRide } from "../../redux/slices/app";
import { setDrivers } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
import calculateDistance from "../../utils/GetDistance";

const CreateRide = async (dispatch,ride,user_id, vehicle) => {
  try {
    console.log("đang xử lí");
    console.log("chuyến xe là ",ride)
    console.log("userid",user_id)
    dispatch(updateLoading(true));
    // Tạo cuốc xe trong Firestore

    const rideRef = await addDoc(collection(db, "rides"), {
      user_id,
      start_location:ride.start_location,
      end_location:ride.end_location,
      createdAt: new Date(),
      status: "pending", // Trạng thái ban đầu
    });
    console.log(rideRef)
    const rideSnapshot = await getDoc(rideRef);
    const rideData = rideSnapshot.data();
     dispatch(createRide({id:rideRef.id,data:rideData}));
    listenForDriverResponses(rideRef.id, dispatch);
    console.log("Cuốc xe được tạo với ID:", rideRef.id);
    createRideNotification(dispatch, rideRef.id, vehicle, ride.start_location);
    return "success";
  } catch (error) {
    console.error("Lỗi khi tạo cuốc xe:", error);
  }
};
async function createRideNotification(dispatch, ride_id, vehicle, originLocation) {
  try {
    const activeDrivers = [];
    console.log("Đang gửi thông báo tới tài xế", vehicle);
    // Gửi thông báo đến từng tài xế
    const driversRef = query(
      collection(db, "drivers"),
      where("isAvailable", "==", true), // Lọc tài xế đang sẵn sàng
      where("vehicle", "==", vehicle), // Lọc tài xế theo loại phương tiện

    );
    const driversSnapshot = await getDocs(driversRef);
    driversSnapshot.forEach((doc) => {
      console.log(doc.data());
      const { location } = doc.data();
      console.log("Tọa độ tài xế:", location.latitude, location.longitude);
      console.log("Tọa độ điểm đến:", originLocation.coordinate.latitude, originLocation.coordinate.longitude);
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        originLocation.coordinate.latitude,
        originLocation.coordinate.longitude
      );
      console.log("Khoảng cách giữa tài xế và điểm đến:", distance);
      if (distance <= 5 ) {
        activeDrivers.push({ id: doc.id, ...doc.data(), distance });
      }
    }
    );
    console.log("Tài xế sẵn sàng 1km:::", activeDrivers);
    // const activeDrivers = driversSnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    dispatch(setDrivers(activeDrivers));
    // Gửi thông báo tới tài xế
    for (const driver of activeDrivers) {
      await addDoc(collection(db, "notifications"), {
        ride_id,
        driver_id: driver.id,
        createdAt: new Date(),
        status: "pending",
      });
    
      // Cập nhật trạng thái của tài xế trong Firestore
      const driverDocRef = doc(db, "drivers", driver.id);
      await updateDoc(driverDocRef, { isAvailable: false });
    }
    // driversSnapshot.forEach(async (doc) => {
    //   await addDoc(collection(db, "notifications"), {
    //     ride_id,
    //     driver_id: doc.id,
    //     createdAt: new Date(),
    //     status: "pending",
    //   });
    //   await updateDoc(doc.ref, { isAvailable: false });
    // });
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
    console.error("Error deleting documents: ", error);
  }
};

export default CreateRide;

