import { HttpClient, type HttpClientOptions } from "./http.js";
import { AuthAPI } from "./modules/auth/api.js";
import { BannerAPI } from "./modules/banners/api.js";
import { FileAPI } from "./modules/file/api.js";
import { ItemsAPI } from "./modules/items/api.js";
import { UsersAPI } from "./modules/users/api.js";
import { ViewerAPI } from "./modules/viewer/api.js";

export interface PlayerokClientOptions extends HttpClientOptions {
  baseUrl?: string;
}

const DEFAULT_BASE_URL = "https://bff.playerok.com/rest-api/public";

export class PlayerokClient {
  public readonly http: HttpClient;
  public readonly auth: AuthAPI;
  public readonly viewer: ViewerAPI;
  public readonly file: FileAPI;
  public readonly users: UsersAPI;
  public readonly banners: BannerAPI;
  public readonly items: ItemsAPI;

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
