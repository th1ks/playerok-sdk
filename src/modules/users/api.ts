import type { HttpClient } from "../../http.js";
import { GetUserByUsernameResponseSchema } from "./schemas.js";
import type { GetUserByUsernameResponse } from "./types.js";

/** Методы поиска и получения публичных данных пользователей. */
export class UsersAPI {
  constructor(private client: HttpClient) {}

  /**
   * Возвращает профиль пользователя по username.
   *
   * @param username Username без символа `@`.
   * @returns Профиль пользователя, рейтинг и данные аватара.
   * @throws {NotFoundError} Если пользователь не найден.
   *
   * @example
   * ```ts
   * const user = await client.users.getUserByUsername("seller");
   * console.log(user.rating);
   * ```
   */
  async getUserByUsername(username: string): Promise<GetUserByUsernameResponse> {
    const r = await this.client.get(`/users/${username}`);

    return GetUserByUsernameResponseSchema.parse(r);
  }
}
