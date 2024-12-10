import { createSlice } from "@reduxjs/toolkit";




// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      const {email,isLoggedIn} = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.email = email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = "";
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    // await axios
    //   .post(
    //     "/auth/reset-password",
    //     {
    //       ...formValues,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     dispatch(
    //       slice.actions.logIn({
    //         isLoggedIn: true,
    //         token: response.data.token,
    //       })
    //     );
    //     dispatch(
    //       showSnackbar({ severity: "success", message: response.data.message })
    //     );
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: false })
    //     );
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(showSnackbar({ severity: "error", message: error.message }));
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: true })
    //     );
    //   });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    // await axios
    //   .post(
    //     "/auth/forgot-password",
    //     {
    //       ...formValues,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);

    //     dispatch(
    //       showSnackbar({ severity: "success", message: response.data.message })
    //     );
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: false })
    //     );
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(showSnackbar({ severity: "error", message: error.message }));
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: true })
    //     );
    //   });
  };
}

export function Login(response) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.logIn({
        isLoggedIn: true,
        email: response.email,
      })
    );
  };
}

export function Logout() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    // await axios
    //   .post(
    //     "/auth/register",
    //     {
    //       ...formValues,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     dispatch(
    //       slice.actions.updateRegisterEmail({ email: formValues.email })
    //     );

    //     dispatch(
    //       showSnackbar({ severity: "success", message: response.data.message })
    //     );
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: false })
    //     );
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(showSnackbar({ severity: "error", message: error.message }));
    //     dispatch(
    //       slice.actions.updateIsLoading({ error: true, isLoading: false })
    //     );
    //   })
    //   .finally(() => {
    //     if (!getState().auth.error) {
    //       window.location.href = "/auth/verify";
    //     }
    //   });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    // await axios
    //   .post(
    //     "/auth/verify",
    //     {
    //       ...formValues,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     dispatch(slice.actions.updateRegisterEmail({ email: "" }));
    //     window.localStorage.setItem("user_id", response.data.user_id);
    //     dispatch(
    //       slice.actions.logIn({
    //         isLoggedIn: true,
    //         token: response.data.token,
    //       })
    //     );

    //     dispatch(
    //       showSnackbar({ severity: "success", message: response.data.message })
    //     );
    //     dispatch(
    //       slice.actions.updateIsLoading({ isLoading: false, error: false })
    //     );
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(showSnackbar({ severity: "error", message: error.message }));
    //     dispatch(
    //       slice.actions.updateIsLoading({ error: true, isLoading: false })
    //     );
    //   });
  };
}
