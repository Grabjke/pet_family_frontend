import { baseApi } from "../../shared/baseApi";
import type { Envelope } from "../../shared/models/Envelope";
import type { VolunteersPaginatedResponse } from "./volunteersSlice";

export interface UpdateMainInfoPetRequest {
  volunteerId: string;
  petId: string;
  name: string;
  description: string;
  speciesId: string;
  breedId: string;
  colour: string;
  healthInformation: string;
  address: {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
  };
  weight: number;
  height: number;
  ownersPhoneNumber: string;
  castration: boolean;
  birthday: string;
  isVaccinated: boolean;
  helpStatus: number;
}

export const volunteersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVolunteers: builder.query<
      VolunteersPaginatedResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: "volunteers",
        params: { page, pageSize },
      }),
    }),
    getVolunteerById: builder.query<Envelope<Volunteer>, string>({
      query: (volunteerId) => ({
        url: `volunteers/${volunteerId}`,
      }),
    }),
    softDeletePet: builder.mutation<
      Envelope<string>,
      { volunteerId: string; petId: string }
    >({
      query: ({ volunteerId, petId }) => ({
        url: `volunteers/volunteers/${volunteerId}/pets/${petId}/hard-deleted`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pet"],
    }),
    updateMainInfoPet: builder.mutation<
      Envelope<string>,
      UpdateMainInfoPetRequest
    >({
      query: ({ volunteerId, petId, ...body }) => ({
        url: `volunteers/volunteers/${volunteerId}/pets/${petId}/update-main-info`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Pet"],
    }),
  }),
});

export const {
  useGetVolunteersQuery,
  useGetVolunteerByIdQuery,
  useSoftDeletePetMutation,
  useUpdateMainInfoPetMutation,
} = volunteersApi;
