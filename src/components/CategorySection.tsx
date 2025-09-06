import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MovieCard } from './MovieCard';
import { Movie } from '@/types/movie';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategorySectionProps {
  title: string;
  movies: Movie[];
  filters?: string[];
  className?: string;
}

export const CategorySection = ({ title, movies, filters, className = '' }: CategorySectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [scrollPosition, setScrollPosition] = useState(0);
  const { language, direction } = useLanguage();

  const filteredMovies = selectedFilter === 'all' 
    ? movies 
    : movies.filter(movie => 
        movie.genre.some(g => g.toLowerCase().includes(selectedFilter.toLowerCase())) ||
        movie.type === selectedFilter ||
        (selectedFilter === 'arabic' && movie.isArabic) ||
        (selectedFilter === 'foreign' && !movie.isArabic)
      );

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
    if (container) {
      const scrollAmount = 400;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (filteredMovies.length === 0) return null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filteredMovies.length}
            </Badge>
          </div>

          {/* Filters */}
          {filters && filters.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                  className="btn-ripple"
                >
                  {language === 'ar' ? 'الكل' : 'All'}
                </Button>
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="btn-ripple"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Movies Grid/Scroll */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="lg"
            className={`absolute ${direction === 'rtl' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background/90 shadow-lg`}
            onClick={() => scrollContainer('left')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background/90 shadow-lg`}
            onClick={() => scrollContainer('right')}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Scrollable Movie Grid */}
          <div
            id={`scroll-${title.replace(/\s+/g, '-')}`}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-48 md:w-56 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <Button variant="outline" className="btn-ripple">
            {language === 'ar' ? 'عرض المزيد' : 'View All'}
          </Button>
        </div>
      </div>
    </section>
  );
};