import { getFirestore, doc, collection, addDoc, serverTimestamp, limit, orderBy, where, query, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getMostSearchByUser  = async (userId) => {
    try {
      const MostRef = collection(db, "searchHistories");
      const q = query(MostRef,where("userId", "==", userId), orderBy("amount", "desc"), limit(3));
      const querySnapshot = await getDocs(q);
      const mostUseds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Tìm kiếm nhiều nhất bởi user : ", mostUseds);
      return mostUseds; // Trả về danh sách lịch sử
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử tìm kiếm 1: ", error);
      return [];
    }
  };

  export const getMostSearch = async () => {
    try {
      const MostRef = collection(db, "searchHistories");
      const q = query(MostRef, orderBy("amount", "desc"), limit(3));
      const querySnapshot = await getDocs(q);
      const mostUseds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Tìm kiếm nhiều nhất: ", mostUseds);
      return mostUseds; // Trả về danh sách lịch sử
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử tìm kiếm 2: ", error);
      return [];
    }
  };