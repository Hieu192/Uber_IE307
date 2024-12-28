import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Đường dẫn đến file cấu hình Firebase

const createOrder = async ({
  userId,
  originalPrice,
  discountCode,
  finalPrice,
  rideId,
  paymentMethod,
}) => {
  try {
    const orderData = {
      userId: userId,
      rideId: rideId,
      originalPrice: originalPrice,
      discountCode: discountCode || null, 
      finalPrice: finalPrice,
      status: "pending", // Ví dụ: "paid", "pending", "canceled"
      paymentMethod: paymentMethod, // Ví dụ: "Credit Card", "Cash", "E-Wallet"
      createdAt: serverTimestamp(),
    };
    console.log("Đang tạo hóa đơn với dữ liệu: ", orderData);
    // Thêm dữ liệu vào Firestore
    const docRef = await addDoc(collection(db, "orders"), orderData);

    console.log("Hóa đơn đã được tạo với ID: ", docRef.id);
    return { id: docRef.id, ...orderData };
  } catch (error) {
    console.error("Lỗi khi tạo hóa đơn: ", error);
    throw new Error("Không thể tạo hóa đơn, vui lòng thử lại!");
  }
};

export const updateOrder = async ({
  driverId,
  orderId,
}) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const updatedData = { driverId };
    console.log("Đang cập nhật hóa đơn với ID:", orderId, "và dữ liệu:", updatedData);

    await updateDoc(orderRef, updatedData); // Cập nhật dữ liệu
    console.log("Hóa đơn đã được cập nhật thành công!");
    return { id: orderId, ...updatedData };
  } catch (error) {
    console.error("Lỗi khi cập nhật hóa đơn: ", error);
    throw new Error("Không thể cập nhật hóa đơn, vui lòng thử lại!");
  }
};

export default createOrder;

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