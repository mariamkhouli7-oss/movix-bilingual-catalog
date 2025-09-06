import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    movies: 'الأفلام',
    series: 'المسلسلات', 
    arabic: 'عربي',
    foreign: 'أجنبي',
    search: 'البحث...',
    login: 'تسجيل الدخول',
    
    // Content
    featured: 'مميز',
    trending: 'الأكثر مشاهدة',
    latest: 'الأحدث',
    topRated: 'الأعلى تقييماً',
    arabicMovies: 'الأفلام العربية',
    foreignMovies: 'الأفلام الأجنبية',
    tvSeries: 'المسلسلات',
    allMovies: 'الأفلام',
    watchNow: 'شاهد الآن',
    addToList: 'أضف للقائمة',
    viewAll: 'عرض المزيد',
    all: 'الكل',
    year: 'السنة',
    quality: 'الجودة',
    country: 'البلد',
    rating: 'التقييم',
    
    // UI
    loading: 'جاري التحميل...',
    error: 'حدث خطأ ما',
    noResults: 'لا توجد نتائج',
  },
  en: {
    // Navigation
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    arabic: 'Arabic',
    foreign: 'Foreign',
    search: 'Search...',
    login: 'Login',
    
    // Content
    featured: 'Featured',
    trending: 'Trending',
    latest: 'Latest',
    topRated: 'Top Rated',
    arabicMovies: 'Arabic Movies',
    foreignMovies: 'Foreign Movies',
    tvSeries: 'TV Series',
    allMovies: 'Movies',
    watchNow: 'Watch Now',
    addToList: 'Add to List',
    viewAll: 'View All',
    all: 'All',
    year: 'Year',
    quality: 'Quality',
    country: 'Country',
    rating: 'Rating',
    
    // UI
    loading: 'Loading...',
    error: 'Something went wrong',
    noResults: 'No results found',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    // Set document direction and language attributes
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
    
    // Update font family based on language
    document.body.className = language === 'ar' 
      ? 'font-cairo' 
      : 'font-cairo';
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};