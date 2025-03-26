
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
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
          <h1 className="text-2xl font-bold text-masonic-blue-900 mb-6">{t('profile.title')}</h1>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="personal">{t('profile.personalTab')}</TabsTrigger>
              <TabsTrigger value="masonic">{t('profile.masonicTab')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.personalInfo')}</CardTitle>
                  <CardDescription>{t('profile.personalInfoDesc')}</CardDescription>
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
                                  <FormLabel>{t('profile.displayName')}</FormLabel>
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
                                  <FormLabel>{t('profile.profession')}</FormLabel>
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
                                  <FormLabel>{t('profile.phoneNumber')}</FormLabel>
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
                                  <FormLabel>{t('profile.birthDate')}</FormLabel>
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
                              <FormLabel>{t('profile.address')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  placeholder={t('profile.addressPlaceholder')}
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
                              <FormLabel>{t('profile.interests')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  placeholder={t('profile.interestsPlaceholder')}
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormDescription>
                                {t('profile.interestsDescription')}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-masonic-blue-700">
                          {t('profile.saveButton')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.accountInfo')}</CardTitle>
                  <CardDescription>{t('profile.accountInfoDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">{t('profile.email')}</Label>
                    <div className="mt-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-50">
                      {user?.email}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" onClick={() => window.alert('Fonctionnalité à venir')}>
                      {t('profile.changePassword')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="masonic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.masonicInfo')}</CardTitle>
                  <CardDescription>{t('profile.masonicInfoDesc')}</CardDescription>
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
                                <FormLabel>{t('profile.initiationDate')}</FormLabel>
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
                                <FormLabel>{t('profile.raisingDate')}</FormLabel>
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
                        <h3 className="text-lg font-medium">{t('profile.membership')}</h3>
                        
                        {profile?.lodge_memberships?.map((membership, index) => (
                          <div key={membership.id} className="border rounded-md p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">{t('profile.lodge')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.lodges?.name || t('profile.noLodge')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{t('profile.role')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.office || membership.role || t('profile.member')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{t('profile.degree')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.degree === 1 
                                    ? t('profile.apprentice')
                                    : membership.degree === 2
                                    ? t('profile.fellowcraft')
                                    : t('profile.master')}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">{t('profile.joinedAt')}</Label>
                                <div className="mt-1 text-gray-700">
                                  {membership.joined_at 
                                    ? format(new Date(membership.joined_at), 'dd/MM/yyyy')
                                    : t('profile.unknown')}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {(!profile?.lodge_memberships || profile.lodge_memberships.length === 0) && (
                          <div className="text-center py-4 text-gray-500">
                            {t('profile.noMemberships')}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-masonic-blue-700">
                          {t('profile.saveButton')}
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
