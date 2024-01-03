import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: data?.token ? `auth/login?token=${data.token}` : "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: "account/update-profile",
        method: "PUT",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `auth/verify-email?email=${data.email}`,
        method: "GET",
      }),
    }),
    forgotPW: builder.mutation({
      query: (data) => ({
        url: "auth/for-got-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateInfoMutation,
  useVerifyEmailMutation,
  useForgotPWMutation,
} = authApi;
