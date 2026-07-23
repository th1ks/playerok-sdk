import type { HttpClient } from "../../http.js";
import { GetUserByUsernameResponseSchema } from "./schemas.js";
import type { GetUserByUsernameResponse } from "./types.js";

export class UsersAPI {
  constructor(private client: HttpClient) {}

  async getUserByUsername(username: string): Promise<GetUserByUsernameResponse> {
    const r = await this.client.get(`/users/${username}`);

    return GetUserByUsernameResponseSchema.parse(r);
  }
}
