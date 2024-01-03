import { createSlice } from "@reduxjs/toolkit";

const loadTokenTosessionStorage = () => {
  const token = sessionStorage.getItem("userToken");
  if (token !== undefined && token !== null) {
    return token;
  }
  return null;
};

const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken: loadTokenTosessionStorage(), // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.success = true;
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(action.payload.userInfo)
      );
      sessionStorage.setItem("userToken", action.payload.userToken);
      sessionStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.success = false;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("refreshToken");
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectCurrentToken = (state) => state.auth.userToken;
