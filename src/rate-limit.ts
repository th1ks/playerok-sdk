export interface RateLimiterOptions {
  /** Максимальное количество одновременно выполняющихся запросов. */
  maxConcurrent?: number | undefined;
  /** Минимальный интервал между стартами запросов в миллисекундах. */
  minInterval?: number | undefined;
}

/** Ограничитель параллельности и частоты выполнения asynchronous-операций. */
export class RateLimiter {
  private readonly maxConcurrent: number;
  private readonly minInterval: number;

  private active = 0;
  private lastStart = 0;
  private queue: Array<() => void> = [];

  /** Создаёт ограничитель с безопасными значениями по умолчанию. */
  constructor(options: RateLimiterOptions = {}) {
    this.maxConcurrent = Math.max(1, options.maxConcurrent ?? 5);
    this.minInterval = Math.max(0, options.minInterval ?? 0);
  }

  /** Выполняет функцию после получения разрешения от ограничителя. */
  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  private async acquire(): Promise<void> {
    if (this.active >= this.maxConcurrent) {
      await new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.active++;

    if (this.minInterval > 0) {
      const wait = this.lastStart + this.minInterval - Date.now();
      if (wait > 0) {
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
    }
    this.lastStart = Date.now();
  }

  private release(): void {
    this.active--;
    const next = this.queue.shift();
    if (next) next();
  }
}
