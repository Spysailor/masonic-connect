
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { HomeIcon, ArrowLeft, AlertCircle } from "lucide-react";
import Header from '@/components/layout/Header';
import Logo from '@/components/ui-elements/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto py-12">
          <div className="mb-6 flex justify-center">
            <Logo size={isMobile ? "md" : "lg"} withText={false} />
          </div>
          
          <div className="mb-6 flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className={cn(
            "font-bold mb-3 text-masonic-blue-900",
            isMobile ? "text-4xl" : "text-5xl"
          )}>
            404
          </h1>
          
          <h2 className={cn(
            "font-semibold mb-4 text-gray-800",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            {t('errors.pageNotFound', 'Page non trouvée')}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {t('errors.pageNotFoundMessage', 'La page que vous recherchez n\'existe pas ou a été déplacée.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton to="/" variant="primary" size={isMobile ? "md" : "lg"}>
              <HomeIcon className="h-4 w-4 mr-2" />
              {t('common.backToHome', 'Retour à l\'accueil')}
            </AnimatedButton>
            
            <AnimatedButton 
              to="#" 
              variant="secondary" 
              size={isMobile ? "md" : "lg"}
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.goBack', 'Retour en arrière')}
            </AnimatedButton>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>{t('errors.reportIssue', 'Si vous pensez qu\'il s\'agit d\'une erreur, veuillez contacter l\'administrateur.')}</p>
            <p className="mt-1">{t('errors.path', 'Chemin')} : <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
