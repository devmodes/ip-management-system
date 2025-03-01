import { IPAddress } from "@lib/types/ip-address";
import { api } from "@store/api";

export const ipAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createIPAddress: builder.mutation({
      query: (data: Omit<IPAddress, "id" | "created_at">) => ({
        url: `/ip-addresses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ipAddress", id: "list" }],
    }),
    ipAddressList: builder.query({
      query: () => ({
        url: "/ip-addresses",
      }),
      providesTags: [{ type: "ipAddress", id: "list" }],
    }),
    updateIPAddress: builder.mutation({
      query: (data: Omit<IPAddress, "created_at">) => ({
        url: `/ip-addresses/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "ipAddress", id: "list" }],
    }),
    deleteIPAddress: builder.mutation({
      query: (id: string) => ({
        url: `/ip-addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ipAddress", id: "list" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateIPAddressMutation,
  useIpAddressListQuery,
  useUpdateIPAddressMutation,
  useDeleteIPAddressMutation,
} = ipAddressApi;
