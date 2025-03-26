import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Globe } from 'lucide-react';

/**
 * Composant pour changer la langue de l'application
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  // Liste des langues disponibles
  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];
  
  // Fonction pour changer de langue
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  // Langue actuelle
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={language.code === i18n.language ? 'bg-accent' : ''}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
