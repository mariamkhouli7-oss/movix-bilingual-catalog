import { Header } from '@/components/Header';
import { AutoRotatingHero } from '@/components/AutoRotatingHero';
import { CategorySection } from '@/components/CategorySection';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { demoMovies } from '@/data/movies';

const Index = () => {
  const { t, language } = useLanguage();

  // Organize content like the reference site
  const featuredMovies = demoMovies.filter(movie => movie.featured || movie.trending);
  const arabicMovies = demoMovies.filter(movie => movie.isArabic);
  const foreignMovies = demoMovies.filter(movie => !movie.isArabic);
  const latestMovies = demoMovies.slice().sort((a, b) => b.year - a.year);
  const highRatedMovies = demoMovies.filter(movie => movie.rating >= 8.5);
  const seriesContent = demoMovies.filter(movie => movie.type === 'series');
  const movieContent = demoMovies.filter(movie => movie.type === 'movie');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Animated Logo Section */}
      <AnimatedLogo />
      
      {/* Auto-Rotating Hero Section */}
      <AutoRotatingHero movies={featuredMovies} />
      
      {/* Dynamic Content Sections - Organized like ArabSeed */}
      <main className="space-y-16 pb-16">
        
        {/* Latest Releases */}
        <CategorySection 
          title={t('latest')}
          movies={latestMovies}
          filters={['movie', 'series', 'arabic', 'foreign']}
        />
        
        {/* Arabic Content */}
        <CategorySection 
          title={language === 'ar' ? 'الأفلام العربية' : 'Arabic Movies'}
          movies={arabicMovies}
          filters={['Drama', 'Romance', 'Comedy', 'Action']}
        />
        
        {/* Foreign Content */}
        <CategorySection 
          title={language === 'ar' ? 'الأفلام الأجنبية' : 'Foreign Movies'}
          movies={foreignMovies}
          filters={['Action', 'Thriller', 'Sci-Fi', 'Horror']}
        />
        
        {/* Top Rated */}
        <CategorySection 
          title={language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated'}
          movies={highRatedMovies}
          filters={['movie', 'series']}
        />
        
        {/* Series */}
        <CategorySection 
          title={language === 'ar' ? 'المسلسلات' : 'TV Series'}
          movies={seriesContent}
          filters={['Drama', 'Mystery', 'Romance', 'Historical']}
        />
        
        {/* Movies */}
        <CategorySection 
          title={language === 'ar' ? 'الأفلام' : 'Movies'}
          movies={movieContent}
          filters={['Action', 'Thriller', 'Drama', 'Sci-Fi']}
        />
        
      </main>
    </div>
  );
};

export default Index;
