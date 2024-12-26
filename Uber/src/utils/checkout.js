import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "./firebaseConfig"; // Đường dẫn đến file cấu hình Firebase

const createOrder = async ({
  driverId,
  userId,
  originalPrice,
  discountCode,
  finalPrice,
  status,
  rideId,
  paymentMethod,
}) => {
  try {
    const orderData = {
      driverId: driverId || null, // Gán null nếu không có tài xế
      userId,
      rideId,
      originalPrice,
      discountCode: discountCode || null, // Gán null nếu không có mã giảm giá
      finalPrice,
      status, // Ví dụ: "paid", "pending", "canceled"
      paymentMethod, // Ví dụ: "Credit Card", "Cash", "E-Wallet"
      createdAt: serverTimestamp(), // Dùng serverTimestamp để lấy thời gian từ Firestore
      updatedAt: serverTimestamp(),
    };

    // Thêm dữ liệu vào Firestore
    const docRef = await addDoc(collection(db, "orders"), orderData);

    console.log("Hóa đơn đã được tạo với ID: ", docRef.id);
    return { id: docRef.id, ...orderData };
  } catch (error) {
    console.error("Lỗi khi tạo hóa đơn: ", error);
    throw new Error("Không thể tạo hóa đơn, vui lòng thử lại!");
  }
};

// // Sử dụng hàm
// (async () => {
//   const invoice = await createInvoiceInFirestore({
//     driverId: "DRV123456",
//     userId: "USR987654",
//     originalPrice: 500000,
//     discountCode: "DISCOUNT10",
//     finalPrice: 450000,
//     status: "paid",
//     rideId: "RIDE56789",
//     paymentMethod: "Credit Card",
//   });

//   console.log("Hóa đơn mới: ", invoice);
// })();