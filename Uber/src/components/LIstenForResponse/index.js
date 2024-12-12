// ListenForResponses.js
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const listenForDriverResponses = (rideId) => {
  const responsesRef = collection(db, "rides", rideId, "responses");

  const unsubscribe = onSnapshot(responsesRef, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        const { driverId } = change.doc.data();
        console.log("Tài xế nhận cuốc:", driverId);

        // Cập nhật trạng thái cuốc xe và tài xế
        await updateDoc(doc(db, "rides", rideId), {
          status: "accepted",
          acceptedBy: driverId,
        });

        console.log("Cuốc xe đã được nhận bởi tài xế:", driverId);

        // Ngừng lắng nghe
        unsubscribe();
      }
    });
  });

  return unsubscribe; // Dùng để dừng lắng nghe nếu cần
};

export default listenForDriverResponses;
