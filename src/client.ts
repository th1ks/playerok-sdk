import { HttpClient, type HttpClientOptions } from "./http.js";
import { AuthAPI } from "./modules/auth/api.js";
import { BannerAPI } from "./modules/banners/api.js";
import { FileAPI } from "./modules/file/api.js";
import { ItemsAPI } from "./modules/items/api.js";
import { UsersAPI } from "./modules/users/api.js";
import { ViewerAPI } from "./modules/viewer/api.js";

export interface PlayerokClientOptions extends HttpClientOptions {
  /** Базовый URL REST API. По умолчанию используется публичный Playerok API. */
  baseUrl?: string;
}

const DEFAULT_BASE_URL = "https://bff.playerok.com/rest-api/public";

/**
 * Главный клиент для работы с Playerok API.
 *
 * Все специализированные модули доступны как свойства одного экземпляра:
 * `auth`, `viewer`, `file`, `users`, `banners` и `items`.
 *
 * @example
 * ```ts
 * const client = new PlayerokClient({
 *   token: process.env.PLAYEROK_TOKEN,
 * });
 *
 * const viewer = await client.viewer.get();
 * console.log(viewer.username);
 * ```
 */
export class PlayerokClient {
  /** Низкоуровневый HTTP-клиент с retry, timeout, cookie-store и rate limit. */
  public readonly http: HttpClient;
  /** Методы авторизации через email и одноразовый код. */
  public readonly auth: AuthAPI;
  /** Методы профиля, уведомлений, чатов и выбранной карты. */
  public readonly viewer: ViewerAPI;
  /** Методы загрузки обычных и avatar-файлов. */
  public readonly file: FileAPI;
  /** Методы поиска пользователей. */
  public readonly users: UsersAPI;
  /** Методы получения рекламных баннеров. */
  public readonly banners: BannerAPI;
  /** Методы управления публикацией товаров. */
  public readonly items: ItemsAPI;

  /** Создаёт клиент и инициализирует все API-модули. */
  constructor(options: PlayerokClientOptions = {}) {
    const { baseUrl = DEFAULT_BASE_URL, ...httpOptions } = options;

    this.http = new HttpClient(baseUrl, httpOptions);

    this.auth = new AuthAPI(this.http);
    this.viewer = new ViewerAPI(this.http);
    this.file = new FileAPI(this.http);
    this.users = new UsersAPI(this.http);
    this.banners = new BannerAPI(this.http);
    this.items = new ItemsAPI(this.http);
  }
}
