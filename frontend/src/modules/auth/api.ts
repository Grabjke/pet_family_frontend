import { baseApi } from "../../shared/baseApi";
import type { Envelope } from "../../shared/models/Envelope";
import type { Role } from "./authSlice";

export type LoginResponse = {
  accessToken: string;
  userId: string;
  email: string;
  roles: Role[];
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
    }),
  }),
});

export const { useLoginMutation, useRegistrarionMutation } = authApi;
