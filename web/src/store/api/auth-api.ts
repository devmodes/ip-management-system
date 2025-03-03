import { api } from "@store/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSigninMutation,
  useSignupMutation,
  useMeQuery,
  useRefreshTokenMutation,
  useSignoutMutation,
} = authApi;
