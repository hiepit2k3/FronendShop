import axios from "axios";
import { loginSuccess } from "../redux/features/authSlice";
import store from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/shop",
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    if (
      error.response &&
      error.response.data.status === 500 &&
      error.response.data.message === "EJE"
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/ttf/auth/refresh-token",
          {
            refreshToken,
          }
        );
        const newAccessToken = response.data.data;
        const userInfo = store.getState().auth.userInfo;
        store.dispatch(
          loginSuccess({
            userInfo: userInfo,
            userToken: newAccessToken,
            refreshToken: refreshToken,
          })
        );
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
