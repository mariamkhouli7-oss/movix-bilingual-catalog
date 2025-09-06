import { useState } from 'react';
import { Search, User, Globe, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const { language, toggleLanguage, t, direction } = useLanguage();
  const [searchValue, setSearchValue] = useState('');

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'movies', href: '/movies' },
    { key: 'series', href: '/series' },
    { key: 'arabic', href: '/arabic' },
    { key: 'foreign', href: '/foreign' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl">
              <Play className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold gradient-text">
              {language === 'ar' ? 'موفيكس' : 'Movix'}
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                className="btn-ripple text-foreground hover:text-primary"
                asChild
              >
                <a href={item.href}>{t(item.key)}</a>
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
              <Input
                type="text"
                placeholder={t('search')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={`bg-muted/50 border-muted-foreground/20 ${
                  direction === 'rtl' ? 'pr-10 text-right' : 'pl-10'
                }`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="btn-ripple flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {language === 'ar' ? 'EN' : 'عر'}
              </span>
            </Button>

            {/* Login */}
            <Button variant="outline" size="sm" className="btn-ripple">
              <User className="w-4 h-4 mr-2" />
              {t('login')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};