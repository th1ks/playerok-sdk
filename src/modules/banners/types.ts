/** Набор URL изображения баннера для разных размеров экрана. */
export interface BannerImages {
  /** Изображение малого размера. */
  sm: string;

  /** Изображение среднего размера. */
  md: string;

  /** Изображение большого размера. */
  lg: string;

  /** Изображение максимального размера. */
  xl: string;
}

/** Рекламный баннер Playerok. */
export interface PromoBanner {
  /** UUID баннера. */
  id: string;

  /** Название баннера. */
  name: string;

  /** Ссылка, на которую ведёт баннер. */
  url: string;

  /** Изображения баннера для разных размеров экрана. */
  images: BannerImages;
}

/** Ответ API со списком промо-баннеров. */
export interface PromoBannersResponse {
  /** Доступные промо-баннеры. */
  items: PromoBanner[];
}
