export type Role = {
  name: string;
};
export type Response = {
  accessToken: string;
  refreshToken: string;
  roles: Role[];
  email: string;
  userId: string;
};

export type RefreshResponse = {
  result: Response;
};
