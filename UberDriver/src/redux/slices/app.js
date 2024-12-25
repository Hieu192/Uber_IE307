import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
// ----------------------------------------------------------------------
const initialState = {
  driver_location:null,
  isLoading: false,
  notification_id: null,
  ride:null
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateNotification(state, action) {
      state.notification_id = action.payload;
    },
    updateRide(state, action) {
      state.ride = action.payload;
    },
    updateLocation(state, action) {
      state.driver_location = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { updateNotification,updateRide,updateLocation} = slice.actions;
// ---------------------------------------------------------------------
export function UpdateRide(rideId){
  return async (dispatch, getState) => {
    try {
      const docRef = doc(db, "rides", rideId); // Tham chiếu đến document
      const docSnap = await getDoc(docRef); // Lấy dữ liệu document
      if (docSnap.exists()) {
        dispatch(updateRide({
          id: rideId,
          pickUpLocation: docSnap.data().start_location,
          dropOffLocation: docSnap.data().end_location,
        }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }

  };
}