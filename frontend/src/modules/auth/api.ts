import { baseApi, baseQuery } from "../../shared/baseApi";
import type { Envelope } from "../../shared/models/Envelope";

export type LoginResponse = {
  accessToken: string;
  userId: string;
  email: string;
  roles: string[];
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      Envelope<LoginResponse>,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "account/login",
        body: { email, password },
        method: "POST",
      }),
      extraOptions: {
        skipRefresh: true,
      },
    }),
    registrarion: builder.mutation<
      string,
      { userName: string; email: string; password: string }
    >({
      query: ({ userName, email, password }) => ({
        url: "account/registration",
        body: { userName, email, password },
        method: "POST",
      }),
      extraOptions: {
        skipRefresh: true,
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
      extraOptions: {
        skipRefresh: true,
      },
    }),
  }),
});

export const { useLoginMutation, useRegistrarionMutation, useLogoutMutation } = authApi;
