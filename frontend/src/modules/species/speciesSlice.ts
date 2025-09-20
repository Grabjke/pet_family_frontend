export type Species = {
  id: string;
  title: string;
};

export type SpeciesPaginatedResponse = {
  result: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Species[];
    page: number;
    pageSize: number;
    totalCount: number;
  };
  timeGenerated: string;
};
