import { baseApi } from "../../shared/baseApi";
import type { BreedsPaginatedResponse } from "./breedSlice";

export const breedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBreeds: builder.query<
      BreedsPaginatedResponse,
      { id: string; page: number; pageSize: number }
    >({
      query: ({ id, page, pageSize }) => ({
        url: `species/${id}`,
        params: {
          Page: page,
          PageSize: pageSize,
        },
      }),
    }),
  }),
});

export const { useGetBreedsQuery } = breedApi;
