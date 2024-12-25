import { db } from '../../firebaseConfig'; // Đảm bảo bạn đã cấu hình Firestore
import calculateDistance from "./GetDistance"
// Hàm tính khoảng cách giữa 2 điểm


// Hàm tìm tài xế trong phạm vi
const sendNotificationByDistance = async (center, radius) => {
  const collectionName = 'drivers'; // Tên collection trong Firestore
  const snapshot = await db.collection(collectionName).get();
  
  snapshot.forEach(doc => {
    const driverData = doc.data();
    const driverLocation = driverData.location; // Lấy tọa độ tài xế
    const driverLat = driverLocation.latitude;
    const driverLon = driverLocation.longitude;
    
    // Tính khoảng cách từ tài xế đến điểm trung tâm
    const distance = calculateDistance(center.latitude, center.longitude, driverLat, driverLon);
    
    if (distance <= radius) {
      console.log(`Tài xế ${driverData.name} trong phạm vi ${radius} km`);
      // Gửi thông báo cho tài xế

    }
  });
};
export default sendNotificationByDistance
