import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://apishop-4b364ab6f1c1.herokuapp.com/api/shop",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500 && result?.error?.data.message === "EJE") {
    console.log("sending refresh token");
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshResult = await baseQuery(
      {
        url: "auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const userToken = refreshResult.data.data;
      const userInfo = api.getState().auth.userInfo;
      api.dispatch(loginSuccess({ userToken, userInfo, refreshToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
