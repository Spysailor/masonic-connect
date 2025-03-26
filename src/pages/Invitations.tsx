
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { Copy, Mail, RefreshCw, Settings, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';

const Invitations = () => {
  const { t } = useTranslation();
  const [invitationCode, setInvitationCode] = useState('UNIV-2023-45XZ-7890');
  const [invitationLink, setInvitationLink] = useState(`https://masonconnect.app/join?code=${invitationCode}`);
  const [expiryDays, setExpiryDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [pendingInvitations, setPendingInvitations] = useState([
    { id: '1', email: 'pierre.dupont@example.com', date: '2023-10-15', status: 'pending' },
    { id: '2', email: 'marie.leblanc@example.com', date: '2023-10-14', status: 'pending' },
  ]);
  const [acceptedInvitations, setAcceptedInvitations] = useState([
    { id: '3', email: 'jean.martin@example.com', date: '2023-10-10', status: 'accepted' },
    { id: '4', email: 'sophie.durand@example.com', date: '2023-10-08', status: 'accepted' },
  ]);

  const generateNewCode = () => {
    // This would be replaced with a real code generation function
    const newCode = `UNIV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvitationCode(newCode);
    setInvitationLink(`https://masonconnect.app/join?code=${newCode}`);
    toast.success(t('invitations.newCodeGenerated'));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('invitations.copiedToClipboard'));
  };

  const sendInvitation = () => {
    setLoading(true);
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value;
    
    if (!email || !email.includes('@')) {
      toast.error(t('invitations.validEmailRequired'));
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setPendingInvitations([
        { id: `new-${Date.now()}`, email, date: new Date().toISOString().split('T')[0], status: 'pending' },
        ...pendingInvitations
      ]);
      toast.success(t('invitations.invitationSent', { email }));
      emailInput.value = '';
      setLoading(false);
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
                <h1 className="text-3xl font-bold text-masonic-blue-900">{t('invitations.title')}</h1>
                <p className="text-gray-600 mt-1">{t('invitations.subtitle')}</p>
              </div>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/loge-settings">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('invitations.lodgeSettings')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/freres">
                    <Users className="h-4 w-4 mr-2" />
                    {t('invitations.memberManagement')}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>{t('invitations.invitationCode')}</CardTitle>
                  <CardDescription>{t('invitations.generateShareCodes')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('invitations.currentCode')}</label>
                    <div className="flex">
                      <Input readOnly value={invitationCode} className="bg-gray-50 font-mono text-sm" />
                      <Button variant="ghost" size="icon" className="ml-2" onClick={() => copyToClipboard(invitationCode)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('invitations.invitationLink')}</label>
                    <div className="flex">
                      <Input readOnly value={invitationLink} className="bg-gray-50 text-sm" />
                      <Button variant="ghost" size="icon" className="ml-2" onClick={() => copyToClipboard(invitationLink)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('invitations.validity')}</label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={expiryDays}
                      onChange={(e) => setExpiryDays(parseInt(e.target.value))}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={generateNewCode} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t('invitations.generateNewCode')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>{t('invitations.sendInvitations')}</CardTitle>
                  <CardDescription>{t('invitations.inviteBrothers')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input id="email" type="email" placeholder={t('invitations.brotherEmailPlaceholder')} className="flex-1" />
                    <AnimatedButton
                      variant="primary"
                      onClick={sendInvitation}
                      disabled={loading}
                    >
                      {loading ? t('invitations.sending') : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          {t('invitations.send')}
                        </>
                      )}
                    </AnimatedButton>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <Tabs defaultValue="pending" className="w-full">
                    <TabsList className="mb-6 w-full">
                      <TabsTrigger value="pending" className="flex-1">{t('invitations.pending', { count: pendingInvitations.length })}</TabsTrigger>
                      <TabsTrigger value="accepted" className="flex-1">{t('invitations.accepted', { count: acceptedInvitations.length })}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="pending" className="mt-0">
                      <div className="space-y-2">
                        {pendingInvitations.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">{t('invitations.noPendingInvitations')}</p>
                        ) : (
                          pendingInvitations.map(invitation => (
                            <div key={invitation.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <div>
                                <p className="font-medium">{invitation.email}</p>
                                <p className="text-sm text-gray-500">{t('invitations.sentOn')} {invitation.date}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">{t('invitations.resend')}</Button>
                                <Button variant="ghost" size="sm" className="text-red-500">{t('invitations.cancel')}</Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="accepted" className="mt-0">
                      <div className="space-y-2">
                        {acceptedInvitations.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">{t('invitations.noAcceptedInvitations')}</p>
                        ) : (
                          acceptedInvitations.map(invitation => (
                            <div key={invitation.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div>
                                <p className="font-medium">{invitation.email}</p>
                                <p className="text-sm text-gray-500">{t('invitations.acceptedOn')} {invitation.date}</p>
                              </div>
                              <Link to={`/freres`} className="text-sm text-blue-600 hover:underline">
                                {t('invitations.viewProfile')}
                              </Link>
                            </div>
                          ))
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Invitations;
