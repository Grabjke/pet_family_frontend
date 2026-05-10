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
      providesTags: ["Pet"],
    }),
    getPetById: builder.query<Envelope<Pet>, string>({
      query: (petId) => ({
        url: `volunteers/pets/${petId}`,
      }),
    }),
    addPet: builder.mutation<
      string,
      {
        volunteerId: string;
        name: string;
        description: string;
        speciesId: string;
        breedId: string;
        colour: string;
        healthInformation: string;
        address: {
          country: string;
          city: string;
          street: string;
          zipCode: string;
        };
        weight: number;
        height: number;
        ownersPhoneNumber: string;
        castration: boolean;
        birthday: string;
        isVaccinated: boolean;
        helpStatus: number;
      }
    >({
      query: ({ volunteerId, ...body }) => ({
        url: `volunteers/${volunteerId}/pet`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPetsQuery, useGetPetByIdQuery, useAddPetMutation } = petsApi;
