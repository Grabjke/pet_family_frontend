import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Role = "admin" | "participant";

export type AuthState = {
  accessToken: string | undefined;
  userId: string | undefined;
  roles: Role[];
  isAuthenticated: boolean;
  isInitialized: boolean;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  loginError: string | undefined;
  registrationError: string | undefined;
};

const initilAuthState: AuthState = {
  accessToken: undefined,
  roles: [],
  userId: undefined,
  isAuthenticated: false,
  isInitialized: false,
  fetchStatus: "idle",
  loginError: undefined,
  registrationError: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initilAuthState,
  selectors: {
    selectAccessToken: (state) => state.accessToken,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectCurrentUserId: (state) => state.userId,
    selectCurrentUserRoles: (state) => state.roles,
    selectAuthFetchStatus: (state) => state.fetchStatus,
    selectLoginError: (state) => state.loginError,
    selectRegistrationError: (state) => state.registrationError,
    selectIsInitialized: (state) => state.isInitialized,
  },
  reducers: {
    tokenReceived: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string;
        userId: string;
        roles: Role[];
      }>
    ) => {
      state.accessToken = payload.accessToken;
      state.userId = payload.userId;
      state.roles = payload.roles;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.fetchStatus = "succeeded";
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.fetchStatus = "idle";
      state.isAuthenticated = false;
      state.userId = undefined;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
export default authSlice.reducer;
