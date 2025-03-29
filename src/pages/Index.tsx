
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { cn } from '@/lib/utils';
import { Gavel, Library, Columns, BookOpen, ScrollText, Users, MessageSquare, ChevronRight, Compass, Square } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/ui-elements/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      
      {/* Hero Section with Masonic Background */}
      <motion.section 
        className={cn(
          "relative overflow-hidden", 
          isMobile ? "pt-28 pb-12" : "py-32 mt-16"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Geometric Masonic Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/3d63f44f-46a0-44e5-9782-31078be30c5e.png')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className={cn("mb-6 flex justify-center", isMobile ? "py-3" : "py-[24px]")}>
              <div className="relative">
                <Logo size={isMobile ? "md" : "lg"} variant="default" withText={false} />
                <motion.div 
                  className="absolute -inset-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                >
                  <div className="absolute inset-0 rounded-full bg-masonic-blue-500/10 animate-pulse"></div>
                </motion.div>
              </div>
            </div>
            
            <motion.h1 
              className={cn(
                "font-bold mb-6 bg-gradient-to-r from-masonic-blue-700 via-masonic-blue-600 to-masonic-blue-800 bg-clip-text text-transparent",
                isMobile ? "text-3xl" : "text-4xl md:text-5xl"
              )}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('index.heroTitle')}
            </motion.h1>
            
            <motion.p 
              className={cn(
                "mb-8 text-gray-600 mx-auto",
                isMobile ? "text-base max-w-xl" : "text-xl mb-10 max-w-3xl"
              )}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t('index.heroSubtitle')}
            </motion.p>
            
            <motion.div 
              className={cn(
                "flex justify-center gap-4",
                isMobile ? "flex-col" : "flex-col sm:flex-row"
              )}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link to="/register" className={cn(
                "btn-primary group relative overflow-hidden",
                isMobile && "w-full"
              )}>
                <span className="relative z-10">{t('index.createLodge')}</span>
                <span className="absolute inset-0 bg-masonic-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
              
              <Link to="/join" className={cn(
                "btn-secondary group relative overflow-hidden",
                isMobile && "w-full"
              )}>
                <span className="relative z-10">{t('index.invitationCode')}</span>
                <span className="absolute inset-0 bg-masonic-blue-50 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Masonic Symbols Floating */}
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
          <MasonicSymbol type="square-compass" size="100%" />
        </div>
        <div className="absolute top-20 right-10 w-16 h-16 opacity-10">
          <MasonicSymbol type="eye" size="100%" />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={cn(
        "relative py-20",
        isMobile && "py-12"
      )}>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-masonic-blue-200 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
            <div className="mx-4 flex items-center justify-center w-8 h-8 rounded-full border border-masonic-blue-300">
              <Compass className="h-4 w-4 text-masonic-blue-600" />
            </div>
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
          </div>
          
          <h2 className={cn(
            "font-bold text-center mb-12 text-masonic-blue-900",
            isMobile ? "text-2xl mb-8" : "text-3xl"
          )}>
            {t('index.featuresTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title={t('features.secureComms.title')} 
              description={t('features.secureComms.description')}
              icon={<MessageSquare className="w-10 h-10 text-masonic-blue-600" />} 
            />
            <FeatureCard 
              title={t('features.tenueManagement.title')} 
              description={t('features.tenueManagement.description')} 
              icon={<Gavel className="w-10 h-10 text-masonic-blue-600" />} 
            />
            <FeatureCard 
              title={t('features.documents.title')} 
              description={t('features.documents.description')} 
              icon={<ScrollText className="w-10 h-10 text-masonic-blue-600" />} 
            />
            <FeatureCard 
              title={t('features.memberDirectory.title')} 
              description={t('features.memberDirectory.description')} 
              icon={<Users className="w-10 h-10 text-masonic-blue-600" />} 
            />
            <FeatureCard 
              title={t('features.masonicLibrary.title')} 
              description={t('features.masonicLibrary.description')} 
              icon={<Library className="w-10 h-10 text-masonic-blue-600" />} 
            />
            <FeatureCard 
              title={t('features.visitorAccess.title')} 
              description={t('features.visitorAccess.description')} 
              icon={<Columns className="w-10 h-10 text-masonic-blue-600" />} 
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={cn(
        "relative py-20 bg-gradient-to-b from-gray-50 to-white",
        isMobile && "py-12"
      )}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-masonic-blue-200 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
            <div className="mx-4 flex items-center justify-center w-8 h-8 rounded-full border border-masonic-blue-300">
              <Square className="h-4 w-4 text-masonic-blue-600" />
            </div>
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
          </div>
          
          <h2 className={cn(
            "font-bold text-center mb-12 text-masonic-blue-900",
            isMobile ? "text-2xl mb-8" : "text-4xl"
          )}>
            {t('index.pricingTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PricingCard 
              title={t('pricing.basicMonthly.title')} 
              price={t('pricing.basicMonthly.price')} 
              period={t('pricing.basicMonthly.period')} 
              features={[
                t('pricing.basicMonthly.features.0'), 
                t('pricing.basicMonthly.features.1'), 
                t('pricing.basicMonthly.features.2'), 
                t('pricing.basicMonthly.features.3'), 
                t('pricing.basicMonthly.features.4'), 
                t('pricing.basicMonthly.features.5')
              ]} 
              buttonText={t('pricing.basicMonthly.button')} 
              to="/register" 
            />
            <PricingCard 
              title={t('pricing.basicAnnual.title')} 
              price={t('pricing.basicAnnual.price')} 
              period={t('pricing.basicAnnual.period')} 
              featured={true} 
              features={[
                t('pricing.basicAnnual.features.0'), 
                t('pricing.basicAnnual.features.1'), 
                t('pricing.basicAnnual.features.2'), 
                t('pricing.basicAnnual.features.3'), 
                t('pricing.basicAnnual.features.4'), 
                t('pricing.basicAnnual.features.5')
              ]} 
              buttonText={t('pricing.basicAnnual.button')} 
              to="/register?plan=annual" 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={cn(
        "relative py-20 bg-gradient-to-b from-white to-gray-50",
        isMobile && "py-12"
      )}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-masonic-blue-200 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
            <div className="mx-4 flex items-center justify-center w-8 h-8 rounded-full border border-masonic-blue-300">
              <BookOpen className="h-4 w-4 text-masonic-blue-600" />
            </div>
            <div className="h-[1px] w-16 bg-masonic-blue-300"></div>
          </div>
          
          <h2 className={cn(
            "font-bold text-center mb-12 text-masonic-blue-900",
            isMobile ? "text-2xl mb-8" : "text-3xl"
          )}>
            {t('index.testimonialTitle')}
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
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={cn(
        "relative py-20 bg-gradient-to-b from-gray-50 to-white text-center",
        isMobile && "py-12"
      )}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-masonic-blue-200 to-transparent"></div>
        
        {/* Decorative Masonic Symbol */}
        <div className="absolute opacity-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <img src="/lovable-uploads/3691058f-ded8-4c1e-b51c-b5e8acb5815b.png" alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={cn(
              "font-bold mb-6 text-masonic-blue-900",
              isMobile ? "text-2xl" : "text-3xl"
            )}>
              {t('index.readyTitle')}
            </h2>
            <p className={cn(
              "mb-8 text-gray-600",
              isMobile ? "text-base" : "text-xl mb-10"
            )}>
              {t('index.readySubtitle')}
            </p>
            <Link to="/register" className={cn(
              "btn-primary inline-block group relative overflow-hidden",
              isMobile && "w-full"
            )}>
              <span className="relative z-10">{t('index.createSpace')}</span>
              <span className="absolute inset-0 bg-masonic-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "relative bg-white rounded-lg border border-gray-200 hover:border-masonic-blue-300 hover:shadow-md transition-all h-full group",
        isMobile ? "p-4 flex items-start" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-masonic-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-masonic-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-masonic-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-masonic-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className={cn(
        "text-masonic-blue-600 group-hover:text-masonic-blue-700 transition-colors",
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
        "rounded-lg border-2 h-full flex flex-col relative overflow-hidden",
        featured ? 'border-masonic-blue-500 shadow-lg' : 'border-gray-200 shadow-sm',
        isMobile ? "p-4" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-masonic-blue-500 text-white text-xs px-3 py-1 rotate-45 transform translate-x-5 -translate-y-1 shadow-sm">
            Recommandé
          </div>
        </div>
      )}
      
      <h3 className={cn(
        "font-bold mb-2",
        featured ? "text-masonic-blue-900" : "text-gray-900",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h3>
      <p className={cn(
        "font-bold mb-4",
        isMobile ? "text-2xl" : "text-3xl",
        featured ? "text-masonic-blue-700" : "text-gray-900"
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
          "w-full py-2 rounded-lg font-bold text-center group relative overflow-hidden",
          featured ? 'bg-masonic-blue-700 text-white hover:bg-masonic-blue-600' : 'border border-masonic-blue-700 text-masonic-blue-700 hover:bg-masonic-blue-50'
        )}
      >
        <span className="relative z-10">
          {buttonText}
          {isMobile && <ChevronRight className="inline-block ml-1 h-4 w-4" />}
        </span>
        {featured && (
          <span className="absolute inset-0 bg-masonic-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
        )}
        {!featured && (
          <span className="absolute inset-0 bg-masonic-blue-50 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
        )}
      </Link>
    </motion.div>
  );
};

const Testimonial = ({ quote, author }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm relative",
        isMobile ? "p-4" : "p-6"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative quote mark */}
      <div className="absolute top-4 left-4 text-4xl text-masonic-blue-100 font-serif">"</div>
      <div className="absolute bottom-4 right-4 text-4xl text-masonic-blue-100 font-serif rotate-180">"</div>
      
      <p className={cn(
        "italic text-gray-700 mb-4 relative z-10",
        isMobile ? "text-base" : "text-lg"
      )}>
        "{quote}"
      </p>
      <div className="flex items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-masonic-blue-100 text-masonic-blue-700 mr-3">
          <Users className="w-4 h-4" />
        </div>
        <p className="text-masonic-blue-700 font-medium">— {author}</p>
      </div>
    </motion.div>
  );
};

export default Index;
