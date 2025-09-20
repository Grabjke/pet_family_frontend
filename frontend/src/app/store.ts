import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../shared/baseApi";
import authReducer from "../modules/auth/authSlice";
import { router } from "./router";

export const extraArgument = {
  router,
};

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(baseApi.middleware),
});
