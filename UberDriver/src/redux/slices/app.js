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
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import axiosInstance from "../../utils/axios";
import getDistance from "../../utils/getDistance";
// ----------------------------------------------------------------------
const initialState = {
  driver_location: null,
  isLoading: false,
  notification_id: null,
  ride: null,
  direction: null,
  order: null,
  timeForResponse: 0,
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
    updateOrder(state, action) {
      state.order = action.payload;
    },
    updateTime(state, action) {
      state.timeForResponse = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  updateNotification,
  updateRide,
  updateLocation,
  updateDirection,
  updateOrder,
  updateTime,
} = slice.actions;
// ---------------------------------------------------------------------
export function UpdateRide(rideId) {
  return async (dispatch, getState) => {
    try {
      const docRef = doc(db, "rides", rideId); // Tham chiếu đến document
      const docSnap = await getDoc(docRef); // Lấy dữ liệu document
      if (docSnap.exists()) {
        dispatch(
          updateRide({
            id: rideId,
            pickUpLocation: docSnap.data().start_location,
            dropOffLocation: docSnap.data().end_location,
          })
        );
        const distance = getDistance(
          getState().app.driver_location?.latitude,
          getState().app.driver_location?.longitude,
          docSnap.data().start_location.coordinate.latitude,
          docSnap.data().end_location.coordinate.longitude
        );
        console.log("distance tính được là", distance);
        if (distance <= 2) {
          dispatch(updateTime(15));
        } else if (distance <= 5) dispatch(updateTime(30));
        else if (distance <= 10) {
          dispatch(updateTime(60));
        }
        else dispatch(updateTime(15));
      } else {
        console.log("No such document!");
      }
      const q = query(collection(db, "orders"), where("rideId", "==", rideId));

      // Lấy kết quả từ Firestore
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          dispatch(updateOrder(doc.data()));
        });
      } else {
        console.log("No matching documents.");
      }
      const directionResponse = await axiosInstance.get("/Direction", {
        params: {
          origin:
            docSnap.data().start_location.coordinate.latitude +
            "," +
            docSnap.data().start_location.coordinate.longitude,
          destination:
            docSnap.data().end_location.coordinate.latitude +
            "," +
            docSnap.data().end_location.coordinate.longitude,
          alternatives: false,
          vehicle: "bike", //car, bike, taxi, truck, hd
        },
      });
      dispatch(updateDirection(directionResponse.data.routes[0]));
    } catch (error) {
      console.error(error);
    }
  };
}
