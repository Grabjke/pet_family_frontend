export type Breed = {
  id: string;
  name: string;
  speciesId: string;
};

export type BreedsPaginatedResponse = {
  result: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Breed[];
    page: number;
    pageSize: number;
    totalCount: number;
  };
  timeGenerated: string;
};
