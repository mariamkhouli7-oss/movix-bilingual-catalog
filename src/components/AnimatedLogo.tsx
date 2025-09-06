import { Play, Film } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AnimatedLogo = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-12 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Animated Icon Container */}
        <div className="relative">
          {/* Rotating Ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Pulsing Ring */}
          <div className="absolute inset-2 w-20 h-20 rounded-full border border-accent/40 animate-pulse" />
          
          {/* Main Logo Background */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-2xl shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-500">
            {/* Animated Play Icon */}
            <div className="relative">
              <Play 
                className="w-8 h-8 text-white drop-shadow-lg animate-bounce" 
                fill="currentColor"
                style={{ animationDuration: '2s' }}
              />
              
              {/* Floating Film Icons */}
              <Film 
                className="absolute -top-1 -right-1 w-3 h-3 text-accent opacity-60 animate-ping" 
                style={{ animationDelay: '0.5s' }}
              />
              <Film 
                className="absolute -bottom-1 -left-1 w-3 h-3 text-accent opacity-40 animate-ping" 
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </div>
        </div>

        {/* Brand Name with Typewriter Effect */}
        <div className="text-center space-y-2">
          <h1 className="relative overflow-hidden">
            <span className="block text-5xl md:text-6xl font-black gradient-text animate-fade-in">
              {language === 'ar' ? (
                <span className="font-cairo">موفيكس</span>
              ) : (
                <span className="font-cairo">Movix</span>
              )}
            </span>
            
            {/* Animated Underline */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent animate-slide-in-right" style={{ animationDelay: '1s', width: '100%' }} />
          </h1>
          
          {/* Subtitle with Fade In */}
          <p className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in" style={{ animationDelay: '1.5s' }}>
            {language === 'ar' ? (
              <span className="font-cairo">اكتشف عالم السينما والمسلسلات</span>
            ) : (
              <span className="font-cairo">Discover Amazing Movies & Series</span>
            )}
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + (i * 0.5)}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};