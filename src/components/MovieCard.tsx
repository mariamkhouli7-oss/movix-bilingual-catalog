import { Play, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import { useLanguage } from '@/contexts/LanguageContext';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
  const { language, t } = useLanguage();
  
  const title = language === 'ar' ? movie.title_ar : movie.title_en;
  const description = language === 'ar' ? movie.description_ar : movie.description_en;

  const handleCardClick = () => {
    const path = movie.type === 'movie' ? `/movie/${movie.id}` : `/series/${movie.id}`;
    window.location.href = path;
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCardClick();
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to list functionality would go here
    console.log('Added to list:', movie.title_en);
  };

  return (
    <div className={`movie-card group cursor-pointer ${className}`} onClick={handleCardClick}>
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Button size="sm" className="btn-ripple glow" onClick={handleWatchClick}>
              <Play className="w-4 h-4 mr-1" fill="currentColor" />
              {t('watchNow')}
            </Button>
            <Button variant="outline" size="sm" className="btn-ripple" onClick={handleAddClick}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quality Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
        >
          {movie.quality}
        </Badge>

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded-lg px-2 py-1">
          <Star className="w-3 h-3 text-accent fill-current" />
          <span className="text-xs font-medium text-white">
            {movie.rating}
          </span>
        </div>

        {/* Type Badge */}
        <Badge 
          variant="outline" 
          className="absolute bottom-2 left-2 bg-background/80 text-foreground border-border/40"
        >
          {movie.type === 'movie' ? (language === 'ar' ? 'فيلم' : 'Movie') : (language === 'ar' ? 'مسلسل' : 'Series')}
        </Badge>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{movie.year}</span>
          <span>{movie.country}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 pt-2">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge 
              key={genre}
              variant="secondary"
              className="text-xs bg-muted text-muted-foreground"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};