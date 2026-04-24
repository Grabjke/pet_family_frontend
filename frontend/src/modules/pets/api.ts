import type { FilterParams } from "../../pages/Main/MainPage";
import { baseApi } from "../../shared/baseApi";
import { cleanQueryParams } from "../../shared/clearQueryParams";
import type { PetsPaginatedResponse, Pet } from "./petsSlice";
import type { Envelope } from "../../shared/models/Envelope";

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
    getPetById: builder.query<Envelope<Pet>, string>({
      query: (petId) => ({
        url: `volunteers/pets/${petId}`,
      }),
    }),
  }),
});

export const { useGetPetsQuery, useGetPetByIdQuery } = petsApi;
