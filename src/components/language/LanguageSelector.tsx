
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
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' }
];

const LanguageSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const changeLanguage = (lng: string) => {
    if (lng === i18n.language) return;
    
    // Stocker la langue explicitement avant de la changer
    localStorage.setItem('i18nextLng', lng);
    
    i18n.changeLanguage(lng).then(() => {
      // Montrer une notification de confirmation
      toast({
        title: lng === 'fr' ? 'Langue changée' : 'Language changed',
        description: lng === 'fr' ? 'La langue a été changée en français' : 'Language has been changed to English',
        duration: 3000,
      });
      
      // Forcer un rechargement complet de la page pour s'assurer que toutes les traductions sont correctement appliquées
      window.location.reload();
    }).catch(error => {
      console.error('Error changing language:', error);
      toast({
        title: 'Error',
        description: 'Failed to change language.',
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
        aria-label="Changer de langue"
      >
        <Globe className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={cn(
              "cursor-pointer",
              i18n.language === language.code && "font-bold text-masonic-blue-700 bg-masonic-blue-50"
            )}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
