
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
    
    i18n.changeLanguage(lng).then(() => {
      // Show confirmation notification
      toast({
        title: lng === 'fr' ? 'Langue changée' : 'Language changed',
        description: lng === 'fr' ? 'La langue a été changée en français' : 'Language has been changed to English',
        duration: 3000,
      });
      
      // Always refresh the page to ensure all translations are properly applied
      console.log(`Refreshing page ${location.pathname} after language change to ${lng}`);
      navigate(0);
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
