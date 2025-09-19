import { baseApi } from "../../shared/baseApi";
import type { SpeciesPaginatedResponse } from "./speciesSlice";

export const speciesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecies: builder.query<
      SpeciesPaginatedResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: "species",
        params: { page, pageSize },
      }),
    }),
  }),
});

export const { useGetSpeciesQuery } = speciesApi;
