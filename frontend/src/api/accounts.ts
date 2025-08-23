import axios from "axios";

const API_URL: string = "https://localhost:7000/api/";

export async function getUsers() {
  const response = await axios.get<string[]>(API_URL + "users");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return response.data;
}
