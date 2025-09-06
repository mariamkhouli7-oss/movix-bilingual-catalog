import { Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  featuredMovie: Movie;
}

export const HeroSection = ({ featuredMovie }: HeroSectionProps) => {
  const { language, t } = useLanguage();
  
  const title = language === 'ar' ? featuredMovie.title_ar : featuredMovie.title_en;
  const description = language === 'ar' ? featuredMovie.description_ar : featuredMovie.description_en;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredMovie.backdrop}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          {/* Featured Badge */}
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {t('featured')}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="text-lg font-medium text-foreground">
              {featuredMovie.year}
            </span>
            <span>•</span>
            <Badge variant="outline" className="border-accent/30 text-accent">
              {featuredMovie.quality}
            </Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>{featuredMovie.rating}</span>
            </div>
            <span>•</span>
            <span>{featuredMovie.country}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {featuredMovie.genre.map((genre) => (
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
          <div className="flex flex-wrap items-center gap-4 pt-4">
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
    </section>
  );
};