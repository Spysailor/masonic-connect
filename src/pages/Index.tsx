
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { cn } from '@/lib/utils';
import { Gavel, Library, Columns, BookOpen, ScrollText, Users, MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/ui-elements/Logo';

const Index = () => {
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <motion.section className="container mx-auto px-4 py-32 mt-16 text-center" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center py-[24px]">
            <Logo size="lg" variant="default" withText={false} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-masonic-blue-900">
            La plateforme digitale pour toutes les loges maçonniques
          </h1>
          <p className="text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Créez votre espace de loge personnalisé et connectez vos frères et sœurs en quelques clics
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Créer votre loge
            </Link>
            <Link to="/join" className="btn-secondary">
              J'ai un code d'invitation
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-masonic-blue-900">Fonctionnalités 100% Maçonniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="Communications sécurisées" description="Actualités de la Loge, messagerie interne dédiée et sécurisée, notifications personnalisées." icon={<MessageSquare className="w-12 h-12 text-masonic-blue-700" />} />
          <FeatureCard title="Gestion des tenues" description="Agenda des tenues, confirmation de présence, gestion des agapes et visiteurs, feuille de présence." icon={<Gavel className="w-12 h-12 text-masonic-blue-700" />} />
          <FeatureCard title="Planches et documents" description="Accès aux planches, rituels, documents de la Loge et de l'Obédience." icon={<ScrollText className="w-12 h-12 text-masonic-blue-700" />} />
          <FeatureCard title="Annuaire des membres" description="Carnet d'adresses avec contacts, profil personnalisable, calcul d'itinéraire vers le temple." icon={<Users className="w-12 h-12 text-masonic-blue-700" />} />
          <FeatureCard title="Bibliothèque maçonnique" description="Catalogue d'ouvrages disponibles, système de réservation, références maçonniques." icon={<Library className="w-12 h-12 text-masonic-blue-700" />} />
          <FeatureCard title="Accès visiteurs" description="QR code pour visiteurs, validation humaine pour les calendriers, sécurité renforcée." icon={<Columns className="w-12 h-12 text-masonic-blue-700" />} />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-masonic-blue-900">Solutions adaptées à chaque loge</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <PricingCard 
            title="Basique Mensuel" 
            price="1 €" 
            period="mois"
            features={[
              "1€/mois par membre", 
              "Jusqu'à 30 membres", 
              "Messagerie sécurisée", 
              "Agenda des tenues", 
              "Planches et documents", 
              "Gestion des présences", 
              "Bibliothèque maçonnique"
            ]} 
            buttonText="Commencer" 
            to="/register" 
          />
          <PricingCard 
            title="Basique Annuel" 
            price="10 €" 
            period="an"
            featured={true}
            features={[
              "10€/an par membre", 
              "Jusqu'à 30 membres", 
              "Messagerie sécurisée", 
              "Agenda des tenues", 
              "Planches et documents", 
              "Gestion des présences", 
              "Bibliothèque maçonnique"
            ]} 
            buttonText="Offre Spéciale" 
            to="/register?plan=annual" 
          />
          <PricingCard 
            title="Premium" 
            price="19,99 €" 
            period="mois"
            features={[
              "Jusqu'à 100 membres", 
              "Tous les avantages du plan Basique", 
              "Stockage illimité", 
              "Bibliothèque maçonnique", 
              "Tuilage électronique"
            ]} 
            buttonText="Choisir Premium" 
            to="/register?plan=premium" 
          />
          <PricingCard 
            title="Illimité" 
            price="39,99 €" 
            period="mois"
            features={[
              "Membres illimités", 
              "Tous les avantages du plan Premium", 
              "Support prioritaire", 
              "Analytiques avancées", 
              "Personnalisation complète"
            ]} 
            buttonText="Contacter" 
            to="/register?plan=unlimited" 
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-masonic-blue-900">Ce que disent nos utilisateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Testimonial quote="L'application a révolutionné notre façon de communiquer. Je ne peux plus imaginer gérer notre loge sans cet outil." author="V∴M∴ d'une loge à Paris" />
          <Testimonial quote="La simplicité d'utilisation combinée à la sécurité des données font de cette application un incontournable pour toute loge moderne." author="Secrétaire d'une loge à Lyon" />
        </div>
      </section>

      {/* Call to action */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-masonic-blue-900">Prêt à franchir le pas?</h2>
          <p className="text-xl mb-10 text-gray-600">
            Rejoignez les centaines de loges qui utilisent déjà notre plateforme
          </p>
          <Link to="/register" className="btn-primary inline-block">
            Créer votre espace loge
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>;
};

const FeatureCard = ({
  title,
  description,
  icon
}) => <motion.div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all h-full" initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}}>
    <div className="mb-4 text-masonic-blue-700">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-masonic-blue-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>;

const PricingCard = ({
  title,
  price,
  period = "mois",
  features,
  buttonText,
  featured = false,
  to
}) => <motion.div className={cn("p-6 rounded-lg border-2 h-full flex flex-col", featured ? 'border-masonic-blue-700 shadow-lg' : 'border-gray-200 shadow-sm')} initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}}>
    <h3 className={cn("text-xl font-bold mb-2", featured ? "text-masonic-blue-900" : "text-gray-900")}>{title}</h3>
    <p className="text-3xl font-bold mb-4">{price}<span className="text-sm font-normal text-gray-500">/{period}</span></p>
    <ul className="mb-6 space-y-2 flex-grow">
      {features.map((feature, index) => <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">{feature}</span>
        </li>)}
    </ul>
    <Link to={to} className={cn("w-full py-2 rounded-lg font-bold text-center", featured ? 'bg-masonic-blue-700 text-white hover:bg-masonic-blue-600' : 'border border-masonic-blue-700 text-masonic-blue-700 hover:bg-masonic-blue-50')}>
      {buttonText}
    </Link>
  </motion.div>;

const Testimonial = ({
  quote,
  author
}) => <motion.div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm" initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}}>
    <p className="text-lg mb-4 italic text-gray-700">"{quote}"</p>
    <p className="text-masonic-blue-700 font-medium">— {author}</p>
  </motion.div>;

export default Index;
