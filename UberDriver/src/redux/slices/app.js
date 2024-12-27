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
import axiosInstance from "../../utils/axios"
// ----------------------------------------------------------------------
const initialState = {
  driver_location:null,
  isLoading: false,
  notification_id: null,
  ride:null,
  direction:null
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
    updateDirection(state, action) {
      state.direction = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { updateNotification,updateRide,updateLocation,updateDirection} = slice.actions;
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
      const directionResponse = await axiosInstance.get("/Direction", {
        params: {
          origin: docSnap.data().start_location.coordinate.latitude + "," + docSnap.data().start_location.coordinate.longitude,
          destination:  docSnap.data().end_location.coordinate.latitude + "," + docSnap.data().end_location.coordinate.longitude,
          alternatives: false,
          vehicle: "bike", //car, bike, taxi, truck, hd
        },
      });
      console.log(directionResponse.data.routes[0].legs[0])
      dispatch(updateDirection(directionResponse.data.routes[0]))
    } catch (error) {
      console.error(error);
    }

  };
}