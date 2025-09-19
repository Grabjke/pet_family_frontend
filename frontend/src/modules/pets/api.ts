import type { FilterParams } from "../../pages/Main/MainPage";
import { baseApi } from "../../shared/baseApi";
import { cleanQueryParams } from "../../shared/clearQueryParams";
import type { PetsPaginatedResponse } from "./petsSlice";

export const petsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<
      PetsPaginatedResponse,
      FilterParams & { page: number; pageSize: number }
    >({
      query: (params) => ({
        url: "volunteers/pets",
        params: cleanQueryParams(params),
      }),
    }),
  }),
});

export const { useGetPetsQuery } = petsApi;
