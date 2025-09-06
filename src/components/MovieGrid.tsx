import { MovieCard } from './MovieCard';
import { Movie } from '@/types/movie';
import { useLanguage } from '@/contexts/LanguageContext';

interface MovieGridProps {
  movies: Movie[];
  title: string;
  className?: string;
}

export const MovieGrid = ({ movies, title, className = '' }: MovieGridProps) => {
  const { t } = useLanguage();

  if (movies.length === 0) {
    return (
      <section className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <p className="text-muted-foreground text-center py-12">
            {t('noResults')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};