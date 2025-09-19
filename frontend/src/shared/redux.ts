import { useDispatch, useSelector, useStore } from "react-redux";
import type { extraArgument, store } from "../app/store";
import {
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit/react";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState; // Тип состояния
  dispatch: AppDispatch; // Тип dispatch
  extra: typeof extraArgument; // Тип extraArgument
  rejectValue: string; // Тип значения для reject
}>();
