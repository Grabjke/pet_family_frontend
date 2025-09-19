import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginResponse } from "../modules/auth/api";
import type { Envelope } from "./models/Envelope";
import { authActions } from "../modules/auth/authSlice";
import type { AppState } from "./redux";
import { Mutex } from "async-mutex";

const BASE_URL = "http://localhost:8080/api";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as AppState;
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithRefresh: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const authResponse = await baseQuery(
          {
            url: "/account/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (authResponse.data) {
          const data = authResponse.data as Envelope<LoginResponse>;

          if (data.result) {
            api.dispatch(
              authActions.tokenReceived({
                accessToken: data.result.accessToken,
                userId: data.result.userId,
                roles: data.result.roles,
              })
            );
          }
        } else {
          api.dispatch(authActions.logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
