import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";

export type PetId = string;
export type VolunteerId = string;
export type SpeciesId = string;
export type BreedId = string;
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

export type Pet = {
  id: PetId;
  volunteerId: VolunteerId;
  name: string;
  description: string;
  speciesId: SpeciesId;
  breedId: BreedId;
  colour: string;
  healthInformation: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  weight: number;
  height: number;
  ownersPhoneNumber: string;
  castration: boolean;
  birthday: string;
  isVaccinated: boolean;
  helpStatus: string;
  requisites: Requisites[];
  photos: Photo[];
  dateOfCreation: string;
  position: number;
};

export type PetsPaginatedResponse = {
  result: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Pet[];
    page: number;
    pageSize: number;
    totalCount: number;
  };
  timeGenerated: string;
};
export type PetsState = {
  pets: Pet[];
  petsState: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: PetsState = {
  pets: [],
  petsState: "idle",
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets: (state, { payload: pets }: PayloadAction<Pet[]>) => {
      state.pets = pets;
      state.petsState = "succeeded";
    },
    setPetsStateIsPending: (state) => {
      state.petsState = "pending";
    },
    setPetsStateIsFailed: (state) => {
      state.petsState = "failed";
    },
  },
});

export default petsSlice.reducer;

export const { setPets, setPetsStateIsPending, setPetsStateIsFailed } =
  petsSlice.actions;
