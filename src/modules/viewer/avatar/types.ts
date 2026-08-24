import type { Avatar } from "../model/types.js";

/** Тело запроса установки аватара. */
export interface ViewerAvatarRequest {
  /** UUID ранее загруженного avatar-файла. */
  avatarId: string;
}

/** Ответ установки аватара. */
export interface ViewerAvatarResponse {
  /** URL основного изображения аватара. */
  avatarURL: string;

  /** Набор URL обновлённого аватара разных размеров. */
  avatar: Avatar;
}
