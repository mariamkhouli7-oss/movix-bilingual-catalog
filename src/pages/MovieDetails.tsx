import { useParams } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { demoMovies } from '@/data/movies';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t, direction } = useLanguage();
  
  const movie = demoMovies.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('error')}</h1>
          <p className="text-muted-foreground">{t('noResults')}</p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'العودة' : 'Go Back'}
          </Button>
        </main>
      </div>
    );
  }

  const title = language === 'ar' ? movie.title_ar : movie.title_en;
  const description = language === 'ar' ? movie.description_ar : movie.description_en;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={movie.backdrop}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-12">
          <div className="max-w-4xl">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {language === 'ar' ? 'العودة' : 'Back'}
            </Button>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Poster */}
              <div className="md:col-span-1">
                <img
                  src={movie.poster}
                  alt={title}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {title}
                  </h1>
                  
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                    <span className="text-xl font-bold text-foreground">
                      {movie.year}
                    </span>
                    <span>•</span>
                    <Badge variant="outline" className="border-accent/30 text-accent">
                      {movie.quality}
                    </Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="font-medium">{movie.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{movie.country}</span>
                  </div>

                  {/* Type */}
                  <Badge className="mb-4">
                    {movie.type === 'movie' ? (language === 'ar' ? 'فيلم' : 'Movie') : (language === 'ar' ? 'مسلسل' : 'Series')}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>

                {/* Genres */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    {language === 'ar' ? 'الأنواع' : 'Genres'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre) => (
                      <Badge 
                        key={genre}
                        variant="secondary"
                        className="bg-muted/50"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="btn-ripple glow bg-gradient-to-r from-primary to-primary/80"
                  >
                    <Play className="w-5 h-5 mr-2" fill="currentColor" />
                    {t('watchNow')}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="btn-ripple"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {t('addToList')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;