
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/ui-elements/Logo';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <motion.section 
        className="container mx-auto px-4 py-32 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
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
          <FeatureCard 
            title="Communications sécurisées" 
            description="Actualités de la Loge, messagerie interne dédiée et sécurisée, notifications personnalisées."
            icon={<MessageSquare className="w-12 h-12 text-masonic-blue-700" />}
            symbolType="eye"
          />
          <FeatureCard 
            title="Gestion des tenues" 
            description="Agenda des tenues, confirmation de présence, gestion des agapes et visiteurs, feuille de présence."
            icon={null}
            symbolType="temple"
          />
          <FeatureCard 
            title="Planches et documents" 
            description="Accès aux planches, rituels, documents de la Loge et de l'Obédience."
            icon={null}
            symbolType="all-seeing-eye-triangle"
          />
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
    </div>
  );
};

// Utility components
const FeatureCard = ({ title, description, icon, symbolType }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-4 text-masonic-blue-700">
      {icon || <MasonicSymbol type={symbolType} size={48} />}
    </div>
    <h3 className="text-xl font-bold mb-2 text-masonic-blue-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Index;
