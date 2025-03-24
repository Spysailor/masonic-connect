
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-masonic-blue-900 to-masonic-blue-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <MasonicSymbol type="square-compass" size={40} className="mr-3" />
          <h1 className="text-2xl font-bold">MasonConnect</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded bg-masonic-blue-700 hover:bg-masonic-blue-600 transition-colors">
            Connexion
          </Link>
          <Link to="/register" className="px-4 py-2 rounded bg-white text-masonic-blue-900 hover:bg-blue-100 transition-colors">
            Inscription
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <motion.section 
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">La plateforme digitale pour toutes les loges maçonniques</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Créez votre espace de loge personnalisé et connectez vos frères et sœurs en quelques clics
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="px-6 py-3 rounded-lg bg-white text-masonic-blue-900 font-bold text-lg hover:bg-blue-100 transition-colors">
            Créer votre loge
          </Link>
          <Link to="/join" className="px-6 py-3 rounded-lg border-2 border-white font-bold text-lg hover:bg-masonic-blue-800 transition-colors">
            J'ai un code d'invitation
          </Link>
        </div>
      </motion.section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Fonctionnalités 100% Maçonniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Communications sécurisées" 
            description="Actualités de la Loge, messagerie interne dédiée et sécurisée, notifications personnalisées."
            icon={<MasonicSymbol type="all-seeing-eye" size={48} />}
          />
          <FeatureCard 
            title="Gestion des tenues" 
            description="Agenda des tenues, confirmation de présence, gestion des agapes et visiteurs, feuille de présence."
            icon={<MasonicSymbol type="square-compass" size={48} />}
          />
          <FeatureCard 
            title="Planches et documents" 
            description="Accès aux planches, rituels, documents de la Loge et de l'Obédience."
            icon={<MasonicSymbol type="square-compass-vintage" size={48} />}
          />
          <FeatureCard 
            title="Annuaire des membres" 
            description="Carnet d'adresses avec contacts, profil personnalisable, calcul d'itinéraire vers le temple."
            icon={<MasonicSymbol type="square-compass" size={48} />}
          />
          <FeatureCard 
            title="Bibliothèque maçonnique" 
            description="Catalogue d'ouvrages disponibles, système de réservation, références maçonniques."
            icon={<MasonicSymbol type="all-seeing-eye" size={48} />}
          />
          <FeatureCard 
            title="Accès visiteurs" 
            description="QR code pour visiteurs, validation humaine pour les calendriers, sécurité renforcée."
            icon={<MasonicSymbol type="square-compass-vintage" size={48} />}
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Solutions adaptées à chaque loge</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            title="Basique" 
            price="9,99 €" 
            features={[
              "Jusqu'à 30 membres",
              "Messagerie sécurisée",
              "Agenda des tenues",
              "Planches et documents",
              "Gestion des présences"
            ]}
            buttonText="Commencer"
          />
          <PricingCard 
            title="Premium" 
            price="19,99 €" 
            featured={true}
            features={[
              "Jusqu'à 100 membres",
              "Tous les avantages du plan Basique",
              "Stockage illimité",
              "Bibliothèque maçonnique",
              "Tuilage électronique"
            ]}
            buttonText="Choisir Premium"
          />
          <PricingCard 
            title="Illimité" 
            price="39,99 €" 
            features={[
              "Membres illimités",
              "Tous les avantages du plan Premium",
              "Support prioritaire",
              "Analytiques avancées",
              "Personnalisation complète"
            ]}
            buttonText="Contacter"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Testimonial 
            quote="L'application a révolutionné notre façon de communiquer. Je ne peux plus imaginer gérer notre loge sans cet outil."
            author="V∴M∴ d'une loge à Paris"
          />
          <Testimonial 
            quote="La simplicité d'utilisation combinée à la sécurité des données font de cette application un incontournable pour toute loge moderne."
            author="Secrétaire d'une loge à Lyon"
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Prêt à franchir le pas?</h3>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Rejoignez les centaines de loges qui utilisent déjà notre plateforme
        </p>
        <Link to="/register" className="px-8 py-4 rounded-lg bg-white text-masonic-blue-900 font-bold text-lg hover:bg-blue-100 transition-colors">
          Créer votre espace loge
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-masonic-blue-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <MasonicSymbol type="square-compass" size={32} className="mr-3" />
              <h2 className="text-xl font-bold">MasonConnect</h2>
            </div>
            <div className="flex flex-wrap gap-8">
              <Link to="/profile" className="text-blue-200 hover:text-white">À propos</Link>
              <Link to="/profile" className="text-blue-200 hover:text-white">Confidentialité</Link>
              <Link to="/profile" className="text-blue-200 hover:text-white">Conditions d'utilisation</Link>
              <Link to="/profile" className="text-blue-200 hover:text-white">Contact</Link>
            </div>
          </div>
          <div className="text-center mt-8 text-blue-300 text-sm">
            © {new Date().getFullYear()} MasonConnect. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Utility components
const FeatureCard = ({ title, description, icon }) => (
  <motion.div 
    className="bg-masonic-blue-800 p-6 rounded-lg hover:bg-masonic-blue-700 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-4 text-blue-300">{icon}</div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-blue-200">{description}</p>
  </motion.div>
);

const PricingCard = ({ title, price, features, buttonText, featured = false }) => (
  <motion.div 
    className={cn(
      "p-6 rounded-lg border-2",
      featured ? 'border-white bg-masonic-blue-800' : 'border-masonic-blue-700 bg-masonic-blue-800/50'
    )}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-3xl font-bold mb-4">{price}<span className="text-sm font-normal">/mois</span></p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-400 mr-2">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={cn(
      "w-full py-2 rounded-lg font-bold",
      featured 
        ? 'bg-white text-masonic-blue-900 hover:bg-blue-100' 
        : 'bg-masonic-blue-700 text-white hover:bg-masonic-blue-600'
    )}>
      {buttonText}
    </button>
  </motion.div>
);

const Testimonial = ({ quote, author }) => (
  <motion.div 
    className="bg-masonic-blue-800/50 p-6 rounded-lg border border-masonic-blue-700"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-lg mb-4 italic">"{quote}"</p>
    <p className="text-blue-300 font-medium">— {author}</p>
  </motion.div>
);

export default Index;
