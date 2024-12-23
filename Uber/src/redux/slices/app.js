import { createSlice } from "@reduxjs/toolkit";
//import axios from "../../utils/axios";
// import S3 from "../../utils/s3";
import { v4 } from "uuid";
// ----------------------------------------------------------------------
const initialState = {
  user: {},
  users: [], // all users of app who are not friends and not requested yet
  ride_id: null,
  isLoading: false,
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
    updateLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateRide(state, action) {
      state.ride_id = action.payload;
    },
 
  },
});

// Reducer
export default slice.reducer;
export const {
  fetchUser,
  updateUser,
  updateLoading,
  updateUsers,
  updateRide
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



