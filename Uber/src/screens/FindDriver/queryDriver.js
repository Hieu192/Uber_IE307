import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
const queryActiveDrivers = async () => {
//   const db = getFirestore(); // Khởi tạo Firestore
  const driversRef = collection(db, "drivers"); // Đường dẫn đến collection 'drivers'
  const activeDriversQuery = query(driversRef, where("isAvailable", "==", true)); // Điều kiện tài xế đang hoạt động

  try {
    const querySnapshot = await getDocs(activeDriversQuery);
    const activeDrivers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return activeDrivers;
  } catch (error) {
    console.error("Error querying active drivers:", error);
    return [];
  }
};

export default queryActiveDrivers;
