import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-8xl font-bold gradient-text">404</div>
        <h1 className="text-2xl font-bold">
          {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' 
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة'
            : 'Sorry, the page you are looking for does not exist'
          }
        </p>
        <Button 
          className="btn-ripple" 
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
