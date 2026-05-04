import { baseApi } from "../../shared/baseApi";
import type { SpeciesPaginatedResponse } from "./speciesSlice";
import type { BreedsPaginatedResponse } from "../breed/breedSlice";

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
    getBreedsBySpeciesId: builder.query<
      BreedsPaginatedResponse,
      { id: string; page: number; pageSize: number }
    >({
      query: ({ id, page, pageSize }) => ({
        url: `species/${id}`,
        params: { Page: page, PageSize: pageSize },
      }),
    }),
  }),
});

export const { useGetSpeciesQuery, useGetBreedsBySpeciesIdQuery } = speciesApi;
