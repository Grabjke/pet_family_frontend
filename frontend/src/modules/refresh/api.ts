import { baseApi } from "../../shared/baseApi";
import type { RefreshResponse } from "../../modules/refresh/refreshSlice";

export const refreshApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/account/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useRefreshMutation } = refreshApi;
