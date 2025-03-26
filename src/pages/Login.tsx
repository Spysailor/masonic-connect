
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

const Login = () => {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuth();

  const formSchema = z.object({
    email: z.string().email({ message: t('login.emailValidation') }),
    password: z.string().min(1, { message: t('login.passwordValidation') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn(values.email, values.password);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link to="/" className="mb-8">
        <Logo size="lg" />
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('login.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('login.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('login.emailPlaceholder')} 
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
                    <FormLabel>{t('login.password')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('login.passwordPlaceholder')} 
                        {...field} 
                        type="password" 
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-right">
                <Link to="/forgot-password" className="text-masonic-blue-700 hover:underline">
                  {t('login.forgotPassword')}
                </Link>
              </div>
              
              <AnimatedButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('login.submitButton')}
              </AnimatedButton>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            {t('login.noAccount')} <Link to="/register" className="text-masonic-blue-700 hover:underline">{t('login.registerLink')}</Link>
          </div>
          
          <div className="text-sm text-center text-gray-500">
            {t('login.or')}
          </div>
          
          <div className="text-sm text-center">
            <Link to="/join" className="text-masonic-blue-700 hover:underline">{t('login.joinWithInvitation')}</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
