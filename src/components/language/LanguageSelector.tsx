
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

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' }
];

/**
 * Composant pour changer la langue de l'application
 */
const LanguageSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Liste des pages qui nécessitent un rechargement pour appliquer complètement les traductions
    const needsRefreshPaths = [
      '/bibliotheque',
      '/planches',
      '/register',
      '/login',
      '/join'
    ];
    
    // Vérifie si la page actuelle nécessite un rechargement
    const needsRefresh = needsRefreshPaths.some(path => {
      if (path === '/bibliotheque') {
        return location.pathname === path && location.search.includes('type=planche');
      }
      return location.pathname === path;
    });
      
    if (needsRefresh) {
      // Force le rechargement pour garantir l'application des traductions
      navigate(0);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={cn(
          "flex items-center rounded-md p-2 text-gray-600 hover:text-masonic-blue-700 hover:bg-masonic-blue-50/50 transition-colors",
          className
        )}
        aria-label={t('common:language.switchLanguage')}
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
