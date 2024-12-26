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
  import { db } from "../../firebaseConfig";
  import listenForDriverResponses from "./ListenForResponse";
  import sendNotificationByDistance from "./SendNotification";
  import { updateLoading, createRide,setDrivers } from "../redux/slices/app";
  import { useDispatch } from "react-redux";
  
  const CreateRide = async (dispatch,ride,user_id,user_location) => {
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
      sendNotificationByDistance(user_location,[2,5,10],rideRef.id,dispatch);
    } catch (error) {
      console.error("Lỗi khi tạo cuốc xe:", error);
    }
  };
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
  