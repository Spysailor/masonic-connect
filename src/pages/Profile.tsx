
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { format, parse } from 'date-fns';
import LegalSection from '@/components/profile/LegalSection';

const profileFormSchema = z.object({
  display_name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  profession: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  interests: z.string().optional(),
  birth_date: z.string().optional(),
  initiation_date: z.string().optional(),
  raising_date: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { t } = useTranslation();
  const { user, profile, updateProfile, isLoading: authIsLoading } = useAuth();
  const { isLoading: routeIsLoading } = useProtectedRoute();
  const [isUploading, setIsUploading] = useState(false);
  
  // Helper pour éviter d'afficher les clés de traduction brutes
  const getLabel = (key: string, fallback: string): string => {
    return i18nWithFallback(`profile.${key}`, fallback);
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: profile?.display_name || '',
      profession: profile?.profession || '',
      phone_number: profile?.phone_number || '',
      address: profile?.address || '',
      interests: profile?.interests || '',
      birth_date: profile?.birth_date ? format(new Date(profile.birth_date), 'yyyy-MM-dd') : '',
      initiation_date: profile?.initiation_date ? format(new Date(profile.initiation_date), 'yyyy-MM-dd') : '',
      raising_date: profile?.raising_date ? format(new Date(profile.raising_date), 'yyyy-MM-dd') : '',
    },
  });
  
  React.useEffect(() => {
    if (profile) {
      form.reset({
        display_name: profile.display_name || '',
        profession: profile.profession || '',
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        interests: profile.interests || '',
        birth_date: profile.birth_date ? format(new Date(profile.birth_date), 'yyyy-MM-dd') : '',
        initiation_date: profile.initiation_date ? format(new Date(profile.initiation_date), 'yyyy-MM-dd') : '',
        raising_date: profile.raising_date ? format(new Date(profile.raising_date), 'yyyy-MM-dd') : '',
      });
    }
  }, [profile, form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const updateData = {
        ...data,
        birth_date: data.birth_date ? data.birth_date : null,
        initiation_date: data.initiation_date ? data.initiation_date : null,
        raising_date: data.raising_date ? data.raising_date : null,
      };
      
      await updateProfile(updateData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const isLoading = routeIsLoading || authIsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl font-bold text-masonic-blue-900 mb-6">{getLabel('title', 'Profil')}</h1>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="personal">{getLabel('personalTab', 'Informations personnelles')}</TabsTrigger>
              <TabsTrigger value="masonic">{getLabel('masonicTab', 'Informations maçonniques')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{getLabel('personalInfo', 'Informations personnelles')}</CardTitle>
                  <CardDescription>{getLabel('personalInfoDesc', 'Modifiez vos informations personnelles')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="display_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{getLabel('displayName', 'Nom d\'affichage')}</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="profession"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{getLabel('profession', 'Profession')}</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="phone_number"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{getLabel('phoneNumber', 'Téléphone')}</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="birth_date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{getLabel('birthDate', 'Date de naissance')}</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{getLabel('address', 'Adresse')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  placeholder={getLabel('addressPlaceholder', 'Votre adresse complète')}
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{getLabel('interests', 'Centres d\'intérêt')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  placeholder={getLabel('interestsPlaceholder', 'Vos centres d\'intérêt, séparés par des virgules')}
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormDescription>
                                {getLabel('interestsDescription', 'Ces informations aideront à trouver des frères partageant vos intérêts')}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-masonic-blue-700">
                          {getLabel('saveButton', 'Enregistrer les modifications')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{getLabel('accountInfo', 'Informations du compte')}</CardTitle>
                  <CardDescription>{getLabel('accountInfoDesc', 'Gérez les paramètres de votre compte')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">{getLabel('email', 'Email')}</Label>
                    <div className="mt-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-50">
                      {user?.email}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" onClick={() => window.alert('Fonctionnalité à venir')}>
                      {getLabel('changePassword', 'Changer de mot de passe')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="masonic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{getLabel('masonicInfo', 'Informations maçonniques')}</CardTitle>
                  <CardDescription>{getLabel('masonicInfoDesc', 'Informations relatives à votre parcours maçonnique')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="initiation_date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{getLabel('initiationDate', 'Date d\'initiation')}</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="raising_date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{getLabel('raisingDate', 'Date d\'élévation')}</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{getLabel('membership', 'Appartenances')}</h3>
                        
                        {profile?.lodge_memberships?.map((membership, index) => (
                          <div key={membership.id} className="border rounded-md p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">{getLabel('lodge', 'Loge')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.lodges?.name || getLabel('noLodge', 'Aucune loge')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{getLabel('role', 'Fonction')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.office || membership.role || getLabel('member', 'Membre')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{getLabel('degree', 'Degré')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.degree === 1 
                                    ? getLabel('apprentice', 'Apprenti')
                                    : membership.degree === 2
                                    ? getLabel('fellowcraft', 'Compagnon')
                                    : getLabel('master', 'Maître')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{getLabel('joinedAt', 'Date d\'affiliation')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.joined_at 
                                    ? format(new Date(membership.joined_at), 'dd/MM/yyyy')
                                    : getLabel('unknown', 'Inconnue')}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {(!profile?.lodge_memberships || profile.lodge_memberships.length === 0) && (
                          <div className="text-center py-4 text-gray-500">
                            {getLabel('noMemberships', 'Aucune affiliation à une loge')}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-masonic-blue-700">
                          {getLabel('saveButton', 'Enregistrer les modifications')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <LegalSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
