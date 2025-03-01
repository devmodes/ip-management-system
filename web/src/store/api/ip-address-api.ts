import { api } from "@store/api";

export const ipAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    ipAddressList: builder.query({
      query: () => ({
        url: "/ip-addresses",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIpAddressListQuery } = ipAddressApi;
