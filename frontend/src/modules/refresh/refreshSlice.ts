export type Response = {
  accessToken: string;
  refreshToken: string;
  roles: string[];
  email: string;
  userId: string;
};

export type RefreshResponse = {
  result: Response;
};
