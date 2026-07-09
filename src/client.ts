import { FileAPI } from "./api/fille.js";
import { ViewerAPI } from "./api/viewer.js";
import { HttpClient } from "./http.js";
import { AuthAPI } from "./modules/auth/api.js";

export class PlayerokClient {
  public readonly http: HttpClient;
  public readonly auth: AuthAPI;
  public readonly viewer: ViewerAPI;
  public readonly file: FileAPI;

  constructor(options: { token?: string }) {
    this.http = new HttpClient(
      "https://bff.playerok.com/rest-api/public",
      options.token,
    );

    this.auth = new AuthAPI(this.http);
    this.viewer = new ViewerAPI(this.http);
    this.file = new FileAPI(this.http);
  }
}
