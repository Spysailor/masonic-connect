
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' }
];

const LanguageSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  
  const changeLanguage = (lng: string) => {
    if (lng === i18n.language) return;
    
    // Stocker la langue explicitement
    localStorage.setItem('i18nextLng', lng);
    
    // Appliquer un effet de transition avant le changement de langue
    document.body.classList.add('language-transition');
    
    i18n.changeLanguage(lng).then(() => {
      // Montrer une notification de confirmation
      const successMessage = lng === 'fr' 
        ? 'La langue a été changée en français' 
        : 'Language has been changed to English';
      
      toast({
        title: i18nWithFallback(
          'language.changed', 
          lng === 'fr' ? 'Langue changée' : 'Language changed'
        ),
        description: successMessage,
        duration: 3000,
      });
      
      // Mise à jour de l'attribut lang du document sans rechargement
      document.documentElement.lang = lng;
      
      // Réinitialiser la classe de transition après un court délai
      setTimeout(() => {
        document.body.classList.remove('language-transition');
      }, 300);
    }).catch(error => {
      console.error('Error changing language:', error);
      toast({
        title: i18nWithFallback('language.error', 'Error'),
        description: i18nWithFallback('language.changeFailed', 'Failed to change language.'),
        variant: 'destructive',
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={cn(
          "flex items-center rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors",
          className
        )}
        aria-label={i18nWithFallback('language.change', 'Change language')}
      >
        <Globe className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AnimatePresence mode="wait">
          {languages.map((language) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  "cursor-pointer",
                  i18n.language === language.code && "font-bold text-masonic-blue-700 bg-masonic-blue-50"
                )}
              >
                {language.label}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
