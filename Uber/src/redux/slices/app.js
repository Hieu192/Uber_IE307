import { createSlice } from "@reduxjs/toolkit";
//import axios from "../../utils/axios";
// import S3 from "../../utils/s3";
import { v4 } from "uuid";
// ----------------------------------------------------------------------
const initialState = {
  user: {},
  users: [], // all users of app who are not friends and not requested yet
  room_id: null,
  isLoading: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    // Toggle Sidebar
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },

 
  },
});

// Reducer
export default slice.reducer;

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



