import { createSlice } from "@reduxjs/toolkit";




// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  user_id: null,
  email: "",
  error: false,
  avatar:"",
  name:"",
  isAvailable:false
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const {uid,email,displayName,photoURL,isAvailable} = action.payload;
      state.user_id = uid;
      state.email = email;
      state.avatar = photoURL;
      state.name=displayName;
      state.isLoggedIn=true
      state.isAvailable=isAvailable;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  login,
  logout,
} = slice.actions;


export function Logout() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
}


