/** Поля multipart-формы, выданные upload endpoint. */
export interface UploadFields {
  /** Имя хранилища, в которое загружается файл. */
  bucket: string;

  /** Алгоритм подписи AWS. */
  "X-Amz-Algorithm": string;

  /** Учётные данные AWS для подписанного запроса. */
  "X-Amz-Credential": string;

  /** Дата создания подписи AWS. */
  "X-Amz-Date": string;

  /** Ключ объекта в хранилище. */
  key: string;

  /** Политика загрузки в формате Base64. */
  Policy: string;

  /** Подпись политики загрузки. */
  "X-Amz-Signature": string;
}

/** Нормализованный ответ endpoint получения URL загрузки. */
export interface UploadFileResponse {
  /** Полный URL, на который нужно отправить multipart-форму. */
  url: string;

  /** Поля, которые необходимо добавить в multipart-форму. */
  fields: UploadFields;

  /** Идентификатор файла, если он был возвращён API. */
  file_id: string | undefined;
}

/** Тело запроса подтверждения загрузки. */
export interface ConfirmUploadFileRequest {
  /** Идентификатор загруженного файла. */
  id: string;
}

/** Дополнительные параметры загрузки файла. */
export interface ConfirmUploadOptions {
  /** Включает avatar-режим, сохраняющий исходный GIF без конвертации. */
  fileType?: "avatar";
}
