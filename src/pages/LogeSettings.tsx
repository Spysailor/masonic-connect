
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { Globe, Mail, Palette, Shield, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';
import MasonicSymbol from '@/components/masonic/MasonicSymbols';

const LogeSettings = () => {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    name: 'Universalys',
    obedience: 'Grande Loge de l\'Île Maurice',
    rite: 'Rite Écossais Ancien et Accepté',
    language: 'fr',
    primaryColor: '#0f4c81',
    secondaryColor: '#bf9b30',
    logoType: 'square-compass',
    isPublic: false,
    allowGuestAccess: false,
    requireEmailVerification: true,
    require2FA: false,
  });

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (tab: string) => {
    setSaving(true);
    
    // Simulate saving to the backend
    setTimeout(() => {
      toast.success(t('logeSettings.saveSuccess', { tab }));
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-masonic-blue-900">{t('logeSettings.title')}</h1>
                <p className="text-gray-600 mt-1">{t('logeSettings.subtitle')}</p>
              </div>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/invitations">
                    <Users className="h-4 w-4 mr-2" />
                    {t('invitations.title')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/freres">
                    <Users className="h-4 w-4 mr-2" />
                    {t('logeSettings.memberManagement')}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t('logeSettings.configurationOf')} {settings.name}</CardTitle>
              <CardDescription>{t('logeSettings.modifySettings')}</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="general" className="w-full px-6">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="general" className="flex-1">
                  <Globe className="h-4 w-4 mr-2" />
                  {t('logeSettings.tabs.general')}
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex-1">
                  <Palette className="h-4 w-4 mr-2" />
                  {t('logeSettings.tabs.appearance')}
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('logeSettings.tabs.security')}
                </TabsTrigger>
                <TabsTrigger value="membership" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  {t('logeSettings.tabs.membership')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-0 space-y-6">
                <CardContent className="px-0 pt-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lodge-name">{t('logeSettings.general.lodgeName')}</Label>
                      <Input 
                        id="lodge-name" 
                        value={settings.name} 
                        onChange={(e) => handleChange('name', e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="obedience">{t('logeSettings.general.obedience')}</Label>
                      <Input 
                        id="obedience" 
                        value={settings.obedience} 
                        onChange={(e) => handleChange('obedience', e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rite">{t('logeSettings.general.rite')}</Label>
                      <Input 
                        id="rite" 
                        value={settings.rite} 
                        onChange={(e) => handleChange('rite', e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="language">{t('logeSettings.general.mainLanguage')}</Label>
                      <Select 
                        value={settings.language}
                        onValueChange={(value) => handleChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('logeSettings.general.selectLanguage')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">{t('logeSettings.general.languages.french')}</SelectItem>
                          <SelectItem value="en">{t('logeSettings.general.languages.english')}</SelectItem>
                          <SelectItem value="es">{t('logeSettings.general.languages.spanish')}</SelectItem>
                          <SelectItem value="de">{t('logeSettings.general.languages.german')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => handleSave(t('logeSettings.tabs.general').toLowerCase())}
                    disabled={saving}
                  >
                    {saving ? t('logeSettings.saving') : t('logeSettings.saveChanges')}
                  </AnimatedButton>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <CardContent className="px-0 pt-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primary-color">{t('logeSettings.appearance.primaryColor')}</Label>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Input 
                            id="primary-color" 
                            value={settings.primaryColor} 
                            onChange={(e) => handleChange('primaryColor', e.target.value)} 
                          />
                        </div>
                        <div 
                          className="w-10 h-10 rounded-md border border-gray-300" 
                          style={{ backgroundColor: settings.primaryColor }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="secondary-color">{t('logeSettings.appearance.secondaryColor')}</Label>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Input 
                            id="secondary-color" 
                            value={settings.secondaryColor} 
                            onChange={(e) => handleChange('secondaryColor', e.target.value)} 
                          />
                        </div>
                        <div 
                          className="w-10 h-10 rounded-md border border-gray-300" 
                          style={{ backgroundColor: settings.secondaryColor }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>{t('logeSettings.appearance.lodgeLogo')}</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {['square-compass', 'square-compass-vintage', 'g-letter'].map(logo => (
                          <div
                            key={logo}
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                              settings.logoType === logo ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => handleChange('logoType', logo)}
                          >
                            <MasonicSymbol type={logo as any} size={48} />
                            <span className="mt-2 text-xs text-center">
                              {logo === 'square-compass' && t('logeSettings.appearance.logoTypes.squareCompass')}
                              {logo === 'square-compass-vintage' && t('logeSettings.appearance.logoTypes.vintage')}
                              {logo === 'g-letter' && t('logeSettings.appearance.logoTypes.gLetter')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => handleSave(t('logeSettings.tabs.appearance').toLowerCase())}
                    disabled={saving}
                  >
                    {saving ? t('logeSettings.saving') : t('logeSettings.saveChanges')}
                  </AnimatedButton>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0 space-y-6">
                <CardContent className="px-0 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('logeSettings.security.emailVerification')}</h3>
                        <p className="text-sm text-gray-500">{t('logeSettings.security.emailVerificationDesc')}</p>
                      </div>
                      <div>
                        <Button 
                          variant={settings.requireEmailVerification ? "default" : "outline"}
                          onClick={() => handleChange('requireEmailVerification', !settings.requireEmailVerification)}
                        >
                          {settings.requireEmailVerification ? t('logeSettings.security.enabled') : t('logeSettings.security.disabled')}
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('logeSettings.security.twoFactor')}</h3>
                        <p className="text-sm text-gray-500">{t('logeSettings.security.twoFactorDesc')}</p>
                      </div>
                      <div>
                        <Button 
                          variant={settings.require2FA ? "default" : "outline"}
                          onClick={() => handleChange('require2FA', !settings.require2FA)}
                        >
                          {settings.require2FA ? t('logeSettings.security.enabled') : t('logeSettings.security.disabled')}
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('logeSettings.security.publicVisibility')}</h3>
                        <p className="text-sm text-gray-500">{t('logeSettings.security.publicVisibilityDesc')}</p>
                      </div>
                      <div>
                        <Button 
                          variant={settings.isPublic ? "default" : "outline"}
                          onClick={() => handleChange('isPublic', !settings.isPublic)}
                        >
                          {settings.isPublic ? t('logeSettings.security.visible') : t('logeSettings.security.hidden')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => handleSave(t('logeSettings.tabs.security').toLowerCase())}
                    disabled={saving}
                  >
                    {saving ? t('logeSettings.saving') : t('logeSettings.saveChanges')}
                  </AnimatedButton>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="membership" className="mt-0 space-y-6">
                <CardContent className="px-0 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('logeSettings.membership.guestAccess')}</h3>
                        <p className="text-sm text-gray-500">{t('logeSettings.membership.guestAccessDesc')}</p>
                      </div>
                      <div>
                        <Button 
                          variant={settings.allowGuestAccess ? "default" : "outline"}
                          onClick={() => handleChange('allowGuestAccess', !settings.allowGuestAccess)}
                        >
                          {settings.allowGuestAccess ? t('logeSettings.membership.allowed') : t('logeSettings.membership.notAllowed')}
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">{t('logeSettings.membership.roleManagement')}</h3>
                      <p className="text-sm text-gray-500 mb-4">{t('logeSettings.membership.roleManagementDesc')}</p>
                      
                      <Link to="/freres" className="block">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          {t('logeSettings.membership.manageRoles')}
                        </Button>
                      </Link>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">{t('invitations.title')}</h3>
                      <p className="text-sm text-gray-500 mb-4">{t('logeSettings.membership.invitationsDesc')}</p>
                      
                      <Link to="/invitations" className="block">
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          {t('logeSettings.membership.manageInvitations')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-0">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => handleSave(t('logeSettings.tabs.membership').toLowerCase())}
                    disabled={saving}
                  >
                    {saving ? t('logeSettings.saving') : t('logeSettings.saveChanges')}
                  </AnimatedButton>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LogeSettings;
