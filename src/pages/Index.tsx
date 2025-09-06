import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MovieGrid } from '@/components/MovieGrid';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { demoMovies } from '@/data/movies';

const Index = () => {
  const { t } = useLanguage();

  const featuredMovie = demoMovies.find(movie => movie.featured) || demoMovies[0];
  const trendingMovies = demoMovies.filter(movie => movie.trending);
  const arabicContent = demoMovies.filter(movie => movie.isArabic);
  const foreignContent = demoMovies.filter(movie => !movie.isArabic);
  const latestMovies = demoMovies.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Animated Logo Section */}
      <AnimatedLogo />
      
      {/* Hero Section */}
      <HeroSection featuredMovie={featuredMovie} />
      
      {/* Content Sections */}
      <main className="space-y-12 pb-12">
        {/* Trending */}
        <MovieGrid 
          movies={trendingMovies}
          title={t('trending')}
        />
        
        {/* Latest */}
        <MovieGrid 
          movies={latestMovies}
          title={t('latest')}
        />
        
        {/* Arabic Content */}
        <MovieGrid 
          movies={arabicContent}
          title={t('arabic')}
        />
        
        {/* Foreign Content */}
        <MovieGrid 
          movies={foreignContent}
          title={t('foreign')}
        />
      </main>
    </div>
  );
};

export default Index;
