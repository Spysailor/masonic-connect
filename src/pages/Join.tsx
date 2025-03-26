
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/ui-elements/Logo';
import AnimatedButton from '@/components/ui-elements/AnimatedButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  inviteCode: z.string().min(6, { message: "Le code d'invitation doit contenir au moins 6 caractères" }),
});

const Join = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteCode: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Vérifier si le code d'invitation existe et est valide
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('code', values.inviteCode)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (error || !data) {
        throw new Error("Code d'invitation invalide ou expiré");
      }
      
      // Rediriger vers la page d'inscription avec le code d'invitation
      navigate(`/register?invite=${values.inviteCode}`);
      
    } catch (error: any) {
      console.error('Invitation error:', error);
      toast({
        title: "Code d'invitation invalide",
        description: error.message || "Vérifiez votre code et réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Link to="/" className="mb-8">
        <Logo size="lg" />
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('join.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('join.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('join.inviteCode')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('join.inviteCodePlaceholder')} 
                        {...field} 
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
                {isLoading ? t('common.loading') : t('join.submitButton')}
              </AnimatedButton>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            {t('join.alreadyAccount')} <Link to="/login" className="text-masonic-blue-700 hover:underline">{t('join.loginLink')}</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Join;
