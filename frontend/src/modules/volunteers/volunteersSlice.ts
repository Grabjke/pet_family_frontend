import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";

export type VolunteerId = string;
export type Requisites = {
  title: string;
  description: string;
};
export type Path = {
  path: string;
};
export type PathToStorage = {
  path: Path;
};
export type Photo = {
  pathToStorage: PathToStorage;
  isMain: boolean;
};

export type Volunteer = {
  id: VolunteerId;
  name: string;
  surName: string;
  patronymic?: string;
  description: string;
  experience: number;
  email: string;
  phoneNumber: string;
  donationInfo?: Requisites[];
  photos?: Photo[];
  socialNetworks?: SocialNetwork[];
  dateOfCreation?: string;
};

export type SocialNetwork = {
  id: string;
  name: string;
  link: string;
};

export type VolunteersPaginatedResponse = {
  result: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Volunteer[];
    page: number;
    pageSize: number;
    totalCount: number;
  };
  timeGenerated: string;
};

export type VolunteersState = {
  volunteers: Volunteer[];
  volunteersState: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: VolunteersState = {
  volunteers: [],
  volunteersState: "idle",
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
    setVolunteers: (state, { payload: volunteers }: PayloadAction<Volunteer[]>) => {
      state.volunteers = volunteers;
      state.volunteersState = "succeeded";
    },
    setVolunteersStateIsPending: (state) => {
      state.volunteersState = "pending";
    },
    setVolunteersStateIsFailed: (state) => {
      state.volunteersState = "failed";
    },
  },
});

export default volunteersSlice.reducer;

export const {
  setVolunteers,
  setVolunteersStateIsPending,
  setVolunteersStateIsFailed,
} = volunteersSlice.actions;