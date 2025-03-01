import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders(headers, {}) {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
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
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
