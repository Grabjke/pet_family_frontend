import { baseApi } from "../../shared/baseApi";
import type { Envelope } from "../../shared/models/Envelope";
import type { VolunteersPaginatedResponse } from "./volunteersSlice";

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
  }),
});

export const { useGetVolunteersQuery, useGetVolunteerByIdQuery } =
  volunteersApi;