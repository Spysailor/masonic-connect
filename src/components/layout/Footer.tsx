
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui-elements/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-600 text-sm">
              La plateforme dédiée aux Francs-Maçons pour se connecter, partager et grandir ensemble.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/agenda" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Agenda
                </Link>
              </li>
              <li>
                <Link to="/freres" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Frères
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Ressources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/bibliotheque" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Bibliothèque
                </Link>
              </li>
              <li>
                <Link to="/bibliotheque?type=document" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/bibliotheque?type=planche" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Planches
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Messages
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Légal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/conditions" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-600 hover:text-masonic-blue-700 text-sm">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MasonConnect. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-masonic-blue-700">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-masonic-blue-700">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
