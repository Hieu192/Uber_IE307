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
      console.log("id  là",id)
      console.log("data là",data)
      state.ride = { id, ...data };
      console.log({ id, ...data});
    },
    updateRide(state, action) {
       const { type,location } = action.payload;
       console.log("giá trị startt",location.start.coordinate)
       console.log("giá trị end",location.end.coordinate)
       console.log(state.ride)
      if(type=="location"){
        state.ride.start_location=location.start
        state.ride.end_location=location.end
      }
    },
    setDrivers(state, action) {
      state.drivers = action.payload
    },
    clearDrivers(state) {
      state.drivers = []
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
  clearDrivers
} = slice.actions;
// ----------------------------------------------------------------------

// export function FetchUsers() {
//   console.log("vai");
//   return async (dispatch, getState) => {
//     console.log("token là :", getState().auth.token);
//     await axios
//       .get(
//         "/user/get-users",

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Thông tin user là :", response.data);
//         dispatch(slice.actions.updateUsers({ users: response.data.data }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }
