import { getFirestore, doc, collection, addDoc, serverTimestamp, limit, orderBy, where, query, getDocs, updateDoc } from "firebase/firestore";

// Tham khảo Firestore
import { db } from "../../firebaseConfig";

const saveSearchHistory = async (userId, searchData) => {
  try {
    const historyRef = collection(db, "searchHistories");
    const q = query(
        historyRef,
        where("userId", "==", userId),
        where("place_id", "==", searchData.place_id)
      );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        // Bước 2: Nếu tồn tại, cập nhật thời gian
        const docId = querySnapshot.docs[0].id; // Lấy ID của tài liệu đầu tiên
        const docRef = doc(db, "searchHistories", docId);
  
        await updateDoc(docRef, {
          createdAt: serverTimestamp(), // Cập nhật thời gian
        });
  
        console.log(`Lịch sử tìm kiếm đã được cập nhật: ${docId}`);
      } else {
        await addDoc(historyRef, {
            place_id: searchData.place_id,
            name: searchData.value,
            userId: userId,
            createdAt: serverTimestamp(),
        });
        console.log("Lịch sử tìm kiếm đã được lưu!");
    }   
  } catch (error) {
    console.error("Lỗi khi lưu lịch sử tìm kiếm: ", error);
  }
};

export const getSearchHistory = async (userId) => {
    try {
      const historyRef = collection(db, "searchHistories");
      const q = query(historyRef,where("userId", "==", userId), orderBy("createdAt", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const histories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Lịch sử tìm kiếm: ", histories);
      return histories; // Trả về danh sách lịch sử
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử tìm kiếm: ", error);
      return [];
    }
  };

export default saveSearchHistory;