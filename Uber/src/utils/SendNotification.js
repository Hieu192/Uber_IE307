import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Đảm bảo bạn đã cấu hình Firestore
import calculateDistance from "./GetDistance";
import { setDrivers } from "../redux/slices/app";
const monitorResponses = (ride_id, resolve, reject) => {
  const notificationsRef = query(
    collection(db, "notifications"),
    where("ride_id", "==", ride_id)
  );

  const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => doc.data());
    const accepted = notifications.find((n) => n.status === "accepted");
    const pending = notifications.find((n) => n.status === "pending");
    console.log("Nội dung các thông báo", notifications);
    if (accepted) {
      console.log("Phát hiện tài xế đồng ý.");
      resolve(true); // Có tài xế đồng ý
      unsubscribe(); // Dừng lắng nghe
    } else if (!pending) {
      console.log("Tất cả tài xế trong vòng này đã từ chối.");
      resolve(false); // Không còn tài xế nào để chờ
      unsubscribe(); // Dừng lắng nghe
    }
  });

  // Hủy lắng nghe nếu cần
  return unsubscribe;
};
// Hàm kiểm tra xem thông báo đã tồn tại chưa
const notificationExists = async (ride_id, driver_id) => {
  const notificationsRef = query(
    collection(db, "notifications"),
    where("ride_id", "==", ride_id),
    where("driver_id", "==", driver_id)
  );
  const snapshot = await getDocs(notificationsRef);
  return !snapshot.empty; // Trả về `true` nếu đã tồn tại thông báo
};

const sendNotificationByDistance = async (
  center,
  radiusList,
  ride_id,
  vehicle,
  dispatch
) => {
  try {
    let hasResponse = false; // Biến kiểm tra có phản hồi hay không
    console.log("--------------------------------");
    console.log("Kiểm tra ::: ", center, radiusList, ride_id, vehicle);
    // Lấy danh sách tài xế đang sẵn sàng
    const driversRef = query(
      collection(db, "drivers"),
      where("isAvailable", "==", true),
      where("vehicle", "==", vehicle),
    );
    const driversSnapshot = await getDocs(driversRef);
    const drivers = driversSnapshot.docs.map((doc) => ({
      id: doc.id, // Lấy ID của document
      ...doc.data(), // Lấy dữ liệu của document
    }));
    // Cập nhật danh sách tài xế trong phạm vi
    dispatch(setDrivers(drivers));
    for (const radius of radiusList) {
      console.log("--------------------------------");
      console.log(`Đang gửi thông báo cho bán kính ${radius} km...`);

      for (const driverDoc of driversSnapshot.docs) {
        const driverData = driverDoc.data();
        const driverLocation = driverData.location;

        if (!driverLocation) continue;

        const distance = calculateDistance(
          center.latitude,
          center.longitude,
          driverLocation.latitude,
          driverLocation.longitude
        );
        console.log(
          "khoảng cách từ tài xế tới bạn",
          driverDoc.id,
          "  ",
          distance
        );
        if (distance <= radius) {
          // Kiểm tra xem tài xế đã nhận thông báo cho chuyến đi này chưa
          const alreadyNotified = await notificationExists(
            ride_id,
            driverDoc.id
          );

          if (alreadyNotified) {
            console.log(
              `Tài xế ${driverData.name} đã nhận thông báo trước đó.`
            );
            continue;
          }
          // Gửi thông báo cho tài xế trong phạm vi

          try {
            await addDoc(collection(db, "notifications"), {
              ride_id,
              driver_id: driverDoc.id,
              createdAt: new Date(),
              status: "pending",
            });

            // Cập nhật trạng thái tài xế
            await updateDoc(doc(db, "drivers", driverDoc.id), {
              isAvailable: false,
            });

            console.log(
              `Thông báo đã gửi tới tài xế ${driverDoc.id} trong phạm vi ${radius} km.`
            );
          } catch (error) {
            console.error("Lỗi khi gửi thông báo:", error);
          }
        }
      }

      // Lắng nghe phản hồi từ tài xế
      await new Promise((resolve, reject) => {
        const unsubscribe = monitorResponses(ride_id, (response) => {
          hasResponse = response;
          resolve(); // Dừng chờ nếu có phản hồi
        });

        // Tự động hủy lắng nghe sau 30 giây nếu không có phản hồi
        setTimeout(() => {
          if (!hasResponse) {
            console.log("Không có phản hồi trong bán kính này.");
            resolve(); // Tiếp tục vòng lặp cho bán kính tiếp theo
          }
          unsubscribe();
        }, 30000);
      });
      // Kiểm tra trạng thái của các thông báo sau 15 giây nếu không có phản hồi
      setTimeout(async () => {
        // Kiểm tra tất cả thông báo
        const notificationsRef = query(
          collection(db, "notifications"),
          where("ride_id", "==", ride_id),
          where("status", "==", "pending")
        );
        const snapshot = await getDocs(notificationsRef);
        snapshot.forEach(async (notificationDoc) => {
          const notification = notificationDoc.data();
          const driver_id = notification.driver_id;

          // Cập nhật trạng thái notification thành "rejected"
          await updateDoc(doc(db, "notifications", notificationDoc.id), {
            status: "rejected",
          });

          // Cập nhật lại trạng thái tài xế thành "available"
          await updateDoc(doc(db, "drivers", driver_id), {
            isAvailable: true,
          });

          console.log(`Cập nhật trạng thái "rejected" cho tài xế ${driver_id}`);
        });
      }, 15000); // Kiểm tra sau 15 giây

      if (hasResponse) {
        console.log("Đã có tài xế phản hồi, dừng vòng lặp.");
        break; // Thoát khỏi vòng lặp nếu có phản hồi
      }
    }

    if (!hasResponse) {
      console.log("Không có tài xế nào phản hồi trong tất cả các bán kính.");
      // Xử lý nếu không có tài xế nào phản hồi
    }
  } catch (error) {
    console.error("Lỗi trong sendNotificationByDistance:", error);
  }
};
export default sendNotificationByDistance;
