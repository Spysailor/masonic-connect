
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/ui-elements/Logo';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  displayName: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

const Register = () => {
  const { t } = useTranslation();
  const { signUp, isLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signUp(values.email, values.password, values.displayName);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link to="/" className="mb-8">
        <Logo size="lg" />
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('register.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('register.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('register.displayName')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('register.displayNamePlaceholder')} 
                        {...field} 
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('register.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('register.emailPlaceholder')} 
                        {...field} 
                        type="email" 
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('register.password')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('register.passwordPlaceholder')} 
                        {...field} 
                        type="password" 
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('register.confirmPassword')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('register.confirmPasswordPlaceholder')} 
                        {...field} 
                        type="password" 
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AnimatedButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('register.submitButton')}
              </AnimatedButton>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            {t('register.termsText')} <Link to="/terms" className="text-masonic-blue-700 hover:underline">{t('register.termsLink')}</Link>
          </div>
          
          <div className="text-sm text-center">
            {t('register.alreadyAccount')} <Link to="/login" className="text-masonic-blue-700 hover:underline">{t('register.loginLink')}</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
