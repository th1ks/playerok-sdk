import * as fs from "node:fs";

export interface CookieStore {
  /** Возвращает cookie по имени. */
  get(name: string): string | undefined;
  /** Сохраняет cookie. */
  set(name: string, value: string): void;
  /** Удаляет cookie. */
  delete(name: string): void;
  /** Возвращает все cookies в формате пар ключ-значение. */
  entries(): [string, string][];
  /** Очищает хранилище cookies. */
  clear(): void;
}

/** Хранилище cookies в памяти текущего процесса. */
export class MemoryCookieStore implements CookieStore {
  private cookies = new Map<string, string>();

  get(name: string): string | undefined {
    return this.cookies.get(name);
  }

  set(name: string, value: string): void {
    this.cookies.set(name, value);
  }

  delete(name: string): void {
    this.cookies.delete(name);
  }

  entries(): [string, string][] {
    return [...this.cookies.entries()];
  }

  clear(): void {
    this.cookies.clear();
  }
}

/**
 * Хранилище cookies в JSON-файле.
 *
 * Подходит для сохранения авторизации между запусками приложения.
 * Не добавляйте файл с cookies в Git.
 */
export class FileCookieStore implements CookieStore {
  private cookies = new Map<string, string>();

  /**
   * Создаёт файловое хранилище cookies.
   *
   * @param path Путь к JSON-файлу, в котором будут сохранены cookies.
   */
  constructor(private readonly path: string) {
    this.load();
  }

  private load(): void {
    try {
      if (!fs.existsSync(this.path)) return;
      const raw = fs.readFileSync(this.path, "utf8");
      const parsed = JSON.parse(raw) as Record<string, string>;
      this.cookies = new Map(Object.entries(parsed));
    } catch {
      this.cookies = new Map();
    }
  }

  private persist(): void {
    try {
      const data = Object.fromEntries(this.cookies.entries());
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2), "utf8");
    } catch {
      void 0;
    }
  }

  get(name: string): string | undefined {
    return this.cookies.get(name);
  }

  set(name: string, value: string): void {
    this.cookies.set(name, value);
    this.persist();
  }

  delete(name: string): void {
    this.cookies.delete(name);
    this.persist();
  }

  entries(): [string, string][] {
    return [...this.cookies.entries()];
  }

  clear(): void {
    this.cookies.clear();
    this.persist();
  }
}
