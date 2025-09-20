import axios, { type AxiosResponse } from "axios";
import type { Envelope } from "../shared/models/Envelope";
import { api } from "./api";
import type { LoginResponse } from "../shared/models/LoginResponse";

const API_URL = "https://localhost:7000/api";

export class AccountsService {
  static async refresh() {
    return await axios.post<Envelope<LoginResponse>>(
      API_URL + "account/refresh",
      {},
      {
        withCredentials: true,
      }
    );
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<Envelope<LoginResponse>>> {
    return await api.post<Envelope<LoginResponse>>("account/login", {
      email,
      password,
    });
  }
}
