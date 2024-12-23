

// CancelTrip.js
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
  import {updateLoading} from "../../redux/slices/app"
  
 const CancelTrip = async (ride_id) => {
    try {

        await updateDoc(doc(db, "rides", ride_id), {
            status: "canceled", // Cập nhật trạng thái thành "canceled"
            canceledAt: serverTimestamp(), // Có thể lưu thêm thời gian hủy
          });
      
          console.log("Chuyến xe đã được hủy!");
 
    } catch (error) {
      console.error("Lỗi khi tạo cuốc xe:", error);
    }
  };
  
  
  
  export default CancelTrip;
  