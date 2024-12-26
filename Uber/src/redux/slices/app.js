import { createSlice } from "@reduxjs/toolkit";
//import axios from "../../utils/axios";
// import S3 from "../../utils/s3";
import { v4 } from "uuid";
// ----------------------------------------------------------------------
const initialState = {
  user: {},
  ride: {},
  isLoading: false,
  driver: {},
  drivers: [],
  user_location:null,
  driver_id: null
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    updateDriver(state, action) {
      state.driver = action.payload;
    },
    updateLoading(state, action) {
      state.isLoading = action.payload;
    },
    createRide(state, action) {
      const {id,data} = action.payload;
      state.ride = { id, ...data };
    },
    updateRide(state, action) {
       const { type,location } = action.payload;
      if(type=="location"){
        state.ride.start_location=location.start
        state.ride.end_location=location.end
      }
    },
    updateLocation(state, action) {
      state.user_location=action.payload
   },
    setDrivers(state, action) {
      state.drivers = action.payload
    },
    clearDrivers(state) {
      state.drivers = []
    },
    setDriverId(state, action) {
      state.driver_id = action.payload
    }
  },
});

// Reducer
export default slice.reducer;
export const {
  fetchUser,
  updateUser,
  updateLoading,
  updateRide,
  createRide,
  updateDriver,
  setDrivers,
  clearDrivers,
  updateLocation,
  setDriverId
} = slice.actions;
// ----------------------------------------------------------------------


