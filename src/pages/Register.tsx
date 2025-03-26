
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import Logo from '@/components/ui-elements/Logo';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    lodge: 'Universalys',
    obedience: 'Grande Loge de l\'Île Maurice',
    rite: 'Rite Écossais Ancien et Accepté',
    degree: '1',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateStep1 = () => {
    const { firstName, lastName, email, password, passwordConfirm } = formData;
    
    if (!firstName || !lastName || !email) {
      toast.error(t('common.fillAllRequiredFields', 'Please fill all required fields'));
      return false;
    }
    
    if (!email.includes('@')) {
      toast.error(t('common.invalidEmail', 'Please enter a valid email address'));
      return false;
    }
    
    if (password.length < 8) {
      toast.error(t('common.passwordMinLength', 'Password must be at least 8 characters long'));
      return false;
    }
    
    if (password !== passwordConfirm) {
      toast.error(t('common.passwordMismatch', 'Passwords do not match'));
      return false;
    }
    
    return true;
  };
  
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { lodge, obedience, degree } = formData;
    
    if (!lodge || !obedience || !degree) {
      toast.error(t('common.fillAllRequiredFields', 'Please fill all required fields'));
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      toast.error(t('register.demoNotice'));
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
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
                {t('register.title')}
              </h1>
              <p className="text-center text-gray-600 mb-2">
                {t('register.joinLodge')}
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                {t('register.obedienceRite')}
              </p>
              
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 1 ? 'bg-masonic-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      1
                    </div>
                    <span className="ml-2 text-sm font-medium">{t('register.step1')}</span>
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
                    <span className="ml-2 text-sm font-medium">{t('register.step2')}</span>
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
                          {t('register.firstName')} *
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
                          {t('register.lastName')} *
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
                        {t('register.email')} *
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
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.password')} *
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-masonic"
                        placeholder={t('register.passwordPlaceholder')}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.confirmPassword')} *
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
                    
                    <div className="pt-4">
                      <AnimatedButton
                        type="button"
                        variant="primary"
                        fullWidth
                        onClick={handleNextStep}
                      >
                        {t('register.continue')}
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
                      <label htmlFor="lodge" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.lodge')} *
                      </label>
                      <input
                        id="lodge"
                        name="lodge"
                        type="text"
                        value={formData.lodge}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="obedience" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.obedience')} *
                      </label>
                      <input
                        id="obedience"
                        name="obedience"
                        type="text"
                        value={formData.obedience}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="rite" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.rite')} *
                      </label>
                      <input
                        id="rite"
                        name="rite"
                        type="text"
                        value={formData.rite}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('register.degree')} *
                      </label>
                      <select
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="input-masonic"
                        required
                      >
                        <option value="1">{t('register.degree1')}</option>
                        <option value="2">{t('register.degree2')}</option>
                        <option value="3">{t('register.degree3')}</option>
                      </select>
                    </div>
                    
                    <div className="pt-4 flex space-x-4">
                      <AnimatedButton
                        type="button"
                        variant="secondary"
                        onClick={handlePrevStep}
                      >
                        {t('register.back')}
                      </AnimatedButton>
                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? t('register.creating') : t('register.create')}
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
            
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-600">
              {t('register.haveAccount')}{' '}
              <Link to="/login" className="text-masonic-blue-700 hover:text-masonic-blue-600 font-medium">
                {t('register.signIn')}
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-masonic-blue-700">
              {t('login.backToHome')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
