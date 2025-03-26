
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { cn } from '@/lib/utils';
import { Gavel, Library, Columns, BookOpen, ScrollText, Users, MessageSquare, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/ui-elements/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <motion.section 
        className={cn(
          "container mx-auto px-4 text-center", 
          isMobile ? "pt-28 pb-12" : "py-32 mt-16"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className={cn("mb-6 flex justify-center", isMobile ? "py-3" : "py-[24px]")}>
            <Logo size={isMobile ? "md" : "lg"} variant="default" withText={false} />
          </div>
          <h1 className={cn(
            "font-bold mb-6 text-masonic-blue-900",
            isMobile ? "text-3xl" : "text-4xl md:text-5xl"
          )}>
            La plateforme digitale pour toutes les loges maçonniques
          </h1>
          <p className={cn(
            "mb-8 text-gray-600 mx-auto",
            isMobile ? "text-base max-w-xl" : "text-xl mb-10 max-w-3xl"
          )}>
            Créez votre espace de loge personnalisé et connectez vos frères et sœurs en quelques clics
          </p>
          <div className={cn(
            "flex justify-center gap-4",
            isMobile ? "flex-col" : "flex-col sm:flex-row"
          )}>
            <Link to="/register" className={cn(
              "btn-primary",
              isMobile && "w-full"
            )}>
              Créer votre loge
            </Link>
            <Link to="/join" className={cn(
              "btn-secondary",
              isMobile && "w-full"
            )}>
              J'ai un code d'invitation
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className={cn(
        "container mx-auto px-4 py-20 bg-gray-50",
        isMobile && "py-12"
      )}>
        <h2 className={cn(
          "font-bold text-center mb-12 text-masonic-blue-900",
          isMobile ? "text-2xl mb-8" : "text-3xl"
        )}>
          Fonctionnalités 100% Maçonniques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Communications sécurisées" 
            description="Actualités de la Loge, messagerie interne dédiée et sécurisée, notifications personnalisées." 
            icon={<MessageSquare className="w-10 h-10 text-masonic-blue-700" />} 
          />
          <FeatureCard 
            title="Gestion des tenues" 
            description="Agenda des tenues, confirmation de présence, gestion des agapes et visiteurs, feuille de présence." 
            icon={<Gavel className="w-10 h-10 text-masonic-blue-700" />} 
          />
          <FeatureCard 
            title="Planches et documents" 
            description="Accès aux planches, rituels, documents de la Loge et de l'Obédience." 
            icon={<ScrollText className="w-10 h-10 text-masonic-blue-700" />} 
          />
          <FeatureCard 
            title="Annuaire des membres" 
            description="Carnet d'adresses avec contacts, profil personnalisable, calcul d'itinéraire vers le temple." 
            icon={<Users className="w-10 h-10 text-masonic-blue-700" />} 
          />
          <FeatureCard 
            title="Bibliothèque maçonnique" 
            description="Catalogue d'ouvrages disponibles, système de réservation, références maçonniques." 
            icon={<Library className="w-10 h-10 text-masonic-blue-700" />} 
          />
          <FeatureCard 
            title="Accès visiteurs" 
            description="QR code pour visiteurs, validation humaine pour les calendriers, sécurité renforcée." 
            icon={<Columns className="w-10 h-10 text-masonic-blue-700" />} 
          />
        </div>
      </section>

      {/* Pricing */}
      <section className={cn(
        "container mx-auto px-4 py-20",
        isMobile && "py-12"
      )}>
        <h2 className={cn(
          "font-bold text-center mb-12 text-masonic-blue-900",
          isMobile ? "text-2xl mb-8" : "text-4xl"
        )}>
          Nos Prix : 1 € symbolique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <PricingCard 
            title="Basique Mensuel" 
            price="1 €" 
            period="mois" 
            features={[
              "1€/mois par membre", 
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
              "Messagerie sécurisée", 
              "Agenda des tenues", 
              "Planches et documents", 
              "Gestion des présences", 
              "Bibliothèque maçonnique"
            ]} 
            buttonText="Offre Spéciale" 
            to="/register?plan=annual" 
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className={cn(
        "container mx-auto px-4 py-20 bg-gray-50",
        isMobile && "py-12"
      )}>
        <h2 className={cn(
          "font-bold text-center mb-12 text-masonic-blue-900",
          isMobile ? "text-2xl mb-8" : "text-3xl"
        )}>
          Ce que disent nos utilisateurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
      <section className={cn(
        "container mx-auto px-4 py-20 text-center",
        isMobile && "py-12"
      )}>
        <div className="max-w-4xl mx-auto">
          <h2 className={cn(
            "font-bold mb-6 text-masonic-blue-900",
            isMobile ? "text-2xl" : "text-3xl"
          )}>
            Prêt à franchir le pas?
          </h2>
          <p className={cn(
            "mb-8 text-gray-600",
            isMobile ? "text-base" : "text-xl mb-10"
          )}>
            Rejoignez les centaines de loges qui utilisent déjà notre plateforme
          </p>
          <Link to="/register" className={cn(
            "btn-primary inline-block",
            isMobile && "w-full"
          )}>
            Créer votre espace loge
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all h-full",
        isMobile ? "p-4 flex items-start" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn(
        "text-masonic-blue-700",
        isMobile ? "mr-4 mt-1" : "mb-4"
      )}>
        {icon}
      </div>
      <div>
        <h3 className={cn(
          "font-bold mb-2 text-masonic-blue-900",
          isMobile ? "text-lg" : "text-xl"
        )}>
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const PricingCard = ({
  title,
  price,
  period = "mois",
  features,
  buttonText,
  featured = false,
  to
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "rounded-lg border-2 h-full flex flex-col",
        featured ? 'border-masonic-blue-700 shadow-lg' : 'border-gray-200 shadow-sm',
        isMobile ? "p-4" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={cn(
        "font-bold mb-2",
        featured ? "text-masonic-blue-900" : "text-gray-900",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h3>
      <p className={cn(
        "font-bold mb-4",
        isMobile ? "text-2xl" : "text-3xl"
      )}>
        {price}
        <span className="text-sm font-normal text-gray-500">/{period}</span>
      </p>
      <ul className="mb-6 space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Link 
        to={to} 
        className={cn(
          "w-full py-2 rounded-lg font-bold text-center",
          featured ? 'bg-masonic-blue-700 text-white hover:bg-masonic-blue-600' : 'border border-masonic-blue-700 text-masonic-blue-700 hover:bg-masonic-blue-50'
        )}
      >
        {buttonText}
        {isMobile && <ChevronRight className="inline-block ml-1 h-4 w-4" />}
      </Link>
    </motion.div>
  );
};

const Testimonial = ({ quote, author }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm",
        isMobile ? "p-4" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className={cn(
        "italic text-gray-700 mb-4",
        isMobile ? "text-base" : "text-lg"
      )}>
        "{quote}"
      </p>
      <p className="text-masonic-blue-700 font-medium">— {author}</p>
    </motion.div>
  );
};

export default Index;
