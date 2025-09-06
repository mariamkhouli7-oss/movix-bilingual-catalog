export interface Movie {
  id: string;
  title_en: string;
  title_ar: string;
  type: 'movie' | 'series';
  year: number;
  country: string;
  quality: 'HD' | 'FHD' | '4K';
  rating: number;
  poster: string;
  backdrop: string;
  genre: string[];
  description_en: string;
  description_ar: string;
  featured?: boolean;
  trending?: boolean;
  isArabic: boolean;
}