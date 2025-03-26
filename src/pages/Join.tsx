
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import Logo from '@/components/ui-elements/Logo';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Join = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const invitationCode = searchParams.get('code');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [codeValid, setCodeValid] = useState(false);
  const [lodgeInfo, setLodgeInfo] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    degree: '1',
  });

  // Simulate code verification
  useEffect(() => {
    if (invitationCode) {
      setTimeout(() => {
        // Assume the code is valid for this demo
        if (invitationCode && invitationCode.length > 8) {
          setCodeValid(true);
          setLodgeInfo({
            name: 'Universalys',
            obedience: 'Grande Loge de l\'Île Maurice',
            rite: 'Rite Écossais Ancien et Accepté',
          });
        } else {
          toast.error(t('join.invalidCodeDescription'));
        }
        setVerifying(false);
        setLoading(false);
      }, 1500);
    } else {
      setVerifying(false);
      setLoading(false);
    }
  }, [invitationCode, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    const { firstName, lastName, email } = formData;
    
    if (!firstName || !lastName || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return false;
    }
    
    if (!email.includes('@')) {
      toast.error("Veuillez saisir une adresse email valide");
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { password, passwordConfirm } = formData;
    
    if (!password || password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    
    if (password !== passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      toast.success("Compte créé avec succès! Vous allez être redirigé vers la page de connexion.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  if (loading && verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <Logo />
        <div className="mt-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-masonic-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">{t('join.verifyingCode')}</h2>
          <p className="text-gray-600 mt-2">{t('join.verifyingCodeDescription')}</p>
        </div>
      </div>
    );
  }

  if (!invitationCode || !codeValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <Logo />
        <div className="mt-8 text-center max-w-md">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{t('join.invalidCode')}</h2>
          <p className="text-gray-600 mt-2 mb-6">
            {t('join.invalidCodeDescription')}
          </p>
          <Link to="/" className="text-masonic-blue-700 hover:underline">
            {t('join.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-2">
              <Logo />
            </div>
            <div className="flex justify-center mb-6">
              <MasonicSymbol type="square-compass" size={48} />
            </div>
            
            <h1 className="text-2xl font-bold text-center text-masonic-blue-900 mb-2">
              {t('join.title', { lodgeName: lodgeInfo?.name })}
            </h1>
            <p className="text-center text-gray-600 mb-2">
              {t('join.subtitle')}
            </p>
            <p className="text-center text-gray-500 text-sm mb-6">
              {lodgeInfo?.obedience} • {lodgeInfo?.rite}
            </p>
            
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 1 ? 'bg-masonic-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">{t('join.personalInfo')}</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${currentStep >= 2 ? 'bg-masonic-blue-700' : 'bg-gray-200'}`} style={{ width: currentStep > 1 ? '100%' : '0%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 2 ? 'bg-masonic-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">{t('join.security')}</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${currentStep >= 3 ? 'bg-masonic-blue-700' : 'bg-gray-200'}`} style={{ width: currentStep > 2 ? '100%' : '0%' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 3 ? 'bg-masonic-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium">{t('join.confirmation')}</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('join.firstName')} *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('join.lastName')} *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('join.email')} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-masonic"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('join.degree')} *
                    </label>
                    <select
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="input-masonic"
                      required
                    >
                      <option value="1">{t('join.initiation')}</option>
                      <option value="2">{t('join.companion')}</option>
                      <option value="3">{t('join.master')}</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <AnimatedButton
                      type="button"
                      variant="primary"
                      fullWidth
                      onClick={handleNextStep}
                    >
                      {t('join.continue')}
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('join.password')} *
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-masonic"
                      placeholder={t('join.passwordPlaceholder')}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('join.confirmPassword')} *
                    </label>
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      className="input-masonic"
                      required
                    />
                  </div>
                  
                  <div className="pt-4 flex space-x-4">
                    <AnimatedButton
                      type="button"
                      variant="secondary"
                      onClick={handlePrevStep}
                    >
                      {t('join.back')}
                    </AnimatedButton>
                    <AnimatedButton
                      type="button"
                      variant="primary"
                      fullWidth
                      onClick={handleNextStep}
                    >
                      {t('join.continue')}
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{t('join.allReady')}</h2>
                    <p className="text-gray-600 mb-6">
                      {t('join.almostJoining', { lodgeName: lodgeInfo?.name })}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">{t('join.summary')}</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">{t('join.lastName')}:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="text-gray-500">{t('join.email')}:</span> {formData.email}</p>
                      <p><span className="text-gray-500">{t('join.degree')}:</span> {
                        formData.degree === '1' ? t('join.initiation') : 
                        formData.degree === '2' ? t('join.companion') : 
                        t('join.master')
                      }</p>
                      <p><span className="text-gray-500">Loge:</span> {lodgeInfo?.name}</p>
                      <p><span className="text-gray-500">Obédience:</span> {lodgeInfo?.obedience}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-4">
                    <AnimatedButton
                      type="button"
                      variant="secondary"
                      onClick={handlePrevStep}
                    >
                      {t('join.back')}
                    </AnimatedButton>
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? t('join.creating') : t('join.create')}
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Join;
