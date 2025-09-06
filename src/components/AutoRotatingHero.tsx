import { useState, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import { useLanguage } from '@/contexts/LanguageContext';

interface AutoRotatingHeroProps {
  movies: Movie[];
}

export const AutoRotatingHero = ({ movies }: AutoRotatingHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, t } = useLanguage();
  
  const currentMovie = movies[currentIndex];
  const title = language === 'ar' ? currentMovie?.title_ar : currentMovie?.title_en;
  const description = language === 'ar' ? currentMovie?.description_ar : currentMovie?.description_en;

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (!currentMovie) return null;

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden group">
      {/* Background Image with Crossfade */}
      <div className="absolute inset-0 z-0">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={movie.backdrop}
              alt={language === 'ar' ? movie.title_ar : movie.title_en}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="lg"
            className="absolute left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 hover:bg-black/40"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="absolute right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 hover:bg-black/40"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="max-w-2xl space-y-6">
          {/* Featured Badge */}
          <Badge className="bg-primary/20 text-primary border-primary/30 animate-fade-in">
            {t('featured')}
          </Badge>

          {/* Title with Animation */}
          <h1 
            key={`${currentMovie.id}-title`}
            className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in"
          >
            {title}
          </h1>

          {/* Meta Info */}
          <div 
            key={`${currentMovie.id}-meta`}
            className="flex flex-wrap items-center gap-4 text-muted-foreground animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-lg font-medium text-foreground">
              {currentMovie.year}
            </span>
            <span>•</span>
            <Badge variant="outline" className="border-accent/30 text-accent">
              {currentMovie.quality}
            </Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>{currentMovie.rating}</span>
            </div>
            <span>•</span>
            <span>{currentMovie.country}</span>
          </div>

          {/* Description */}
          <p 
            key={`${currentMovie.id}-desc`}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {description}
          </p>

          {/* Genres */}
          <div 
            key={`${currentMovie.id}-genres`}
            className="flex flex-wrap gap-2 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            {currentMovie.genre.map((genre) => (
              <Badge 
                key={genre}
                variant="secondary"
                className="bg-muted/50 text-foreground"
              >
                {genre}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div 
            className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              size="lg" 
              className="btn-ripple glow bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              {t('watchNow')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-ripple border-foreground/20 hover:bg-foreground/10"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('addToList')}
            </Button>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};