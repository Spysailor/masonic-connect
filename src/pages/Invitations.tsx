
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Copy, Plus, RefreshCw, Trash } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { format, addDays } from 'date-fns';

const Invitations = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, profile } = useAuth();
  const { isLoading: authLoading } = useProtectedRoute();
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fonction pour générer un code d'invitation aléatoire
  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // Récupérer les invitations
  const { data: invitations = [], isLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      if (!user || !profile?.lodge_memberships?.[0]?.lodge_id) return [];
      
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('lodge_id', profile.lodge_memberships[0].lodge_id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!profile?.lodge_memberships?.[0]?.lodge_id
  });

  // Mutation pour créer une invitation
  const createInvitation = useMutation({
    mutationFn: async (email: string) => {
      if (!user || !profile?.lodge_memberships?.[0]?.lodge_id) {
        throw new Error("Aucune loge sélectionnée");
      }
      
      const inviteCode = generateInviteCode();
      const expiresAt = addDays(new Date(), 7); // Expiration dans 7 jours
      
      const { data, error } = await supabase
        .from('invitations')
        .insert({
          email,
          code: inviteCode,
          lodge_id: profile.lodge_memberships[0].lodge_id,
          invited_by: user.id,
          expires_at: expiresAt.toISOString(),
          is_used: false
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      setEmail('');
      setIsDialogOpen(false);
      toast({
        title: "Invitation créée",
        description: "L'invitation a été créée avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'invitation.",
        variant: "destructive",
      });
    }
  });

  // Mutation pour supprimer une invitation
  const deleteInvitation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      toast({
        title: "Invitation supprimée",
        description: "L'invitation a été supprimée avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la suppression de l'invitation.",
        variant: "destructive",
      });
    }
  });

  const handleCreateInvitation = () => {
    if (!email) {
      toast({
        title: "Erreur",
        description: "L'email est requis.",
        variant: "destructive",
      });
      return;
    }
    
    createInvitation.mutate(email);
  };

  const handleCopyInviteLink = (code: string) => {
    const inviteLink = `${window.location.origin}/join?code=${code}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Lien copié",
      description: "Le lien d'invitation a été copié dans le presse-papier.",
    });
  };

  if (authLoading) {
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-masonic-blue-900">{t('invitations.title')}</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('invitations.createButton')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('invitations.createTitle')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('invitations.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button 
                    onClick={handleCreateInvitation}
                    disabled={createInvitation.isPending}
                  >
                    {createInvitation.isPending ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {t('invitations.create')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
            </div>
          ) : invitations.length > 0 ? (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center">
                      <div className="md:col-span-2">
                        <p className="font-medium">{invitation.email || "Pas d'email"}</p>
                        <p className="text-sm text-gray-500">
                          Code: <span className="font-mono">{invitation.code}</span>
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <p className="text-sm">
                          <span className="text-gray-500">{t('invitations.createdAt')}:</span> {format(new Date(invitation.created_at), 'dd/MM/yyyy')}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">{t('invitations.expiresAt')}:</span> {format(new Date(invitation.expires_at), 'dd/MM/yyyy')}
                        </p>
                        <p className="text-sm">
                          <span className={invitation.is_used ? 'text-green-500' : 'text-amber-500'}>
                            {invitation.is_used ? t('invitations.used') : t('invitations.pending')}
                          </span>
                        </p>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyInviteLink(invitation.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={invitation.is_used}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t('invitations.deleteTitle')}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('invitations.deleteDescription')}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteInvitation.mutate(invitation.id)}
                              >
                                {t('common.delete')}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-gray-500">{t('invitations.noInvitations')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className="text-gray-500 mb-4">{t('invitations.createDescription')}</p>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="mx-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('invitations.createFirstButton')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Invitations;
