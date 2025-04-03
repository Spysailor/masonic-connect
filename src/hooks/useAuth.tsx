
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { authService, memberService } from '@/services/api';
import type { Tables } from '@/integrations/supabase/types';

type ProfileWithMemberships = Tables<'profiles'> & {
  lodge_memberships: Array<
    Tables<'lodge_memberships'> & {
      lodges: Tables<'lodges'> | null;
    }
  >;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileWithMemberships | null;
  isLoading: boolean;
  isInitialized: boolean;
  activeLodgeId: string | null;
  setActiveLodgeId: (lodgeId: string | null) => void;
  signIn: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signUp: (email: string, password: string, displayName: string) => Promise<{success: boolean; error?: string}>;
  signOut: () => Promise<{success: boolean; error?: string}>;
  updateProfile: (data: Partial<Tables<'profiles'>>) => Promise<{success: boolean; error?: string}>;
  forgotPassword: (email: string) => Promise<{success: boolean; error?: string}>;
  updatePassword: (newPassword: string) => Promise<{success: boolean; error?: string}>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clé localStorage pour le lodge actif
const ACTIVE_LODGE_STORAGE_KEY = 'masonic_connect_active_lodge';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileWithMemberships | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [activeLodgeId, setActiveLodgeId] = useState<string | null>(
    localStorage.getItem(ACTIVE_LODGE_STORAGE_KEY)
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  // Persistance de la loge active dans localStorage
  useEffect(() => {
    if (activeLodgeId) {
      localStorage.setItem(ACTIVE_LODGE_STORAGE_KEY, activeLodgeId);
    } else {
      localStorage.removeItem(ACTIVE_LODGE_STORAGE_KEY);
    }
  }, [activeLodgeId]);

  useEffect(() => {
    // Mise en place de l'écouteur d'événements d'authentification
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          // Réinitialiser la loge active lors de la déconnexion
          setActiveLodgeId(null);
        }
      }
    );

    // Initialisation de l'état d'authentification
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data, error, status } = await authService.getAuthState();
        
        if (error || status === 'error') {
          console.error('Error initializing auth:', error);
          return;
        }
        
        setSession(data.session);
        setUser(data.user);
        
        if (data.user) {
          await fetchProfile(data.user.id);
          
          // Si aucune loge active n'est définie mais que l'utilisateur a des loges, définir la première comme active
          if (!activeLodgeId && profile?.lodge_memberships?.length > 0) {
            const firstActiveLodge = profile.lodge_memberships.find(
              membership => membership.is_active && membership.lodges
            );
            if (firstActiveLodge?.lodge_id) {
              setActiveLodgeId(firstActiveLodge.lodge_id);
            }
          }
        }
      } catch (error) {
        console.error('Exception initializing auth:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Récupération du profil utilisateur avec ses adhésions
  const fetchProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Récupérer le profil
      const { data: profileData, error: profileError } = await memberService.getMemberById(userId);
      
      if (profileError) throw profileError;
      
      // Récupérer les adhésions aux loges avec informations sur les loges
      const { data: memberships, error: membershipsError } = await memberService.getLodgeMemberships(userId);
      
      if (membershipsError) throw membershipsError;
      
      // Combiner les données
      const fullProfile: ProfileWithMemberships = {
        ...(profileData as Tables<'profiles'>),
        lodge_memberships: memberships || []
      };
      
      setProfile(fullProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: i18nWithFallback('auth.errors.profileFetchFailed', 'Erreur de profil'),
        description: i18nWithFallback('auth.errors.profileFetchFailedDesc', 'Impossible de récupérer votre profil.'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion améliorée
  const signIn = async (email: string, password: string): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      const { data, error, status } = await authService.signIn({
        email, 
        password
      });
      
      if (error || status === 'error') {
        // Traduction des erreurs
        let errorKey = 'auth.errors.default';
        let errorMessage = error?.message;
        
        if (errorMessage?.includes('Invalid login credentials')) {
          errorKey = 'auth.errors.invalidCredentials';
        } else if (errorMessage?.includes('Email not confirmed')) {
          errorKey = 'auth.errors.emailNotConfirmed';
        } else if (errorMessage?.includes('network')) {
          errorKey = 'auth.errors.network';
        }
        
        toast({
          title: i18nWithFallback('auth.errors.loginFailed', 'Échec de la connexion'),
          description: i18nWithFallback(errorKey, errorMessage || "Vérifiez vos identifiants et réessayez."),
          variant: "destructive",
        });
        
        return { 
          success: false, 
          error: errorMessage 
        };
      }
      
      toast({
        title: i18nWithFallback('auth.success.loginTitle', 'Connexion réussie'),
        description: i18nWithFallback('auth.success.loginDesc', 'Bienvenue dans votre espace maçonnique.'),
      });
      
      navigate('/dashboard');
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.loginFailed', 'Échec de la connexion'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de la connexion.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription améliorée
  const signUp = async (email: string, password: string, displayName: string): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      const { error, status } = await authService.signUp({
        email,
        password,
        displayName
      });
      
      if (error || status === 'error') {
        // Traduction des erreurs
        let errorKey = 'auth.errors.default';
        let errorMessage = error?.message;
        
        if (errorMessage?.includes('already registered')) {
          errorKey = 'auth.errors.emailAlreadyRegistered';
        } else if (errorMessage?.includes('weak password')) {
          errorKey = 'auth.errors.weakPassword';
        } else if (errorMessage?.includes('network')) {
          errorKey = 'auth.errors.network';
        }
        
        toast({
          title: i18nWithFallback('auth.errors.signupFailed', 'Échec de l\'inscription'),
          description: i18nWithFallback(errorKey, errorMessage || "Une erreur est survenue lors de l'inscription."),
          variant: "destructive",
        });
        
        return { 
          success: false, 
          error: errorMessage 
        };
      }
      
      toast({
        title: i18nWithFallback('auth.success.signupTitle', 'Inscription réussie'),
        description: i18nWithFallback('auth.success.signupDesc', 'Un email de confirmation vous a été envoyé.'),
      });
      
      navigate('/login');
      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.signupFailed', 'Échec de l\'inscription'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de l\'inscription.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion améliorée
  const signOut = async (): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      const { error, status } = await authService.signOut();
      
      if (error || status === 'error') {
        throw error || new Error("Erreur lors de la déconnexion");
      }
      
      // Réinitialiser l'état local
      setSession(null);
      setUser(null);
      setProfile(null);
      setActiveLodgeId(null);
      
      toast({
        title: i18nWithFallback('auth.success.logoutTitle', 'Déconnexion réussie'),
        description: i18nWithFallback('auth.success.logoutDesc', 'À bientôt !'),
      });
      
      navigate('/');
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.logoutFailed', 'Erreur de déconnexion'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de la déconnexion.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour du profil
  const updateProfile = async (data: Partial<Tables<'profiles'>>): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error(i18nWithFallback('auth.errors.noUserLoggedIn', 'Aucun utilisateur connecté'));
      }
      
      const { error, status } = await memberService.updateProfile(user.id, data);
      
      if (error || status === 'error') {
        throw error || new Error("Erreur lors de la mise à jour du profil");
      }
      
      // Récupérer le profil mis à jour
      await fetchProfile(user.id);
      
      toast({
        title: i18nWithFallback('auth.success.profileUpdateTitle', 'Profil mis à jour'),
        description: i18nWithFallback('auth.success.profileUpdateDesc', 'Vos informations ont été enregistrées.'),
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Profile update error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.profileUpdateFailed', 'Erreur de mise à jour'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de la mise à jour du profil.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Réinitialisation de mot de passe
  const forgotPassword = async (email: string): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      const { error, status } = await authService.forgotPassword(email);
      
      if (error || status === 'error') {
        throw error || new Error("Erreur lors de la demande de réinitialisation du mot de passe");
      }
      
      toast({
        title: i18nWithFallback('auth.success.forgotPasswordTitle', 'Email envoyé'),
        description: i18nWithFallback('auth.success.forgotPasswordDesc', 'Consultez votre boîte mail pour réinitialiser votre mot de passe.'),
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.forgotPasswordFailed', 'Erreur'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de la demande de réinitialisation.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour du mot de passe
  const updatePassword = async (newPassword: string): Promise<{success: boolean; error?: string}> => {
    try {
      setIsLoading(true);
      
      const { error, status } = await authService.updatePassword(newPassword);
      
      if (error || status === 'error') {
        throw error || new Error("Erreur lors de la mise à jour du mot de passe");
      }
      
      toast({
        title: i18nWithFallback('auth.success.passwordUpdateTitle', 'Mot de passe mis à jour'),
        description: i18nWithFallback('auth.success.passwordUpdateDesc', 'Votre mot de passe a été modifié avec succès.'),
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Password update error:', error);
      
      toast({
        title: i18nWithFallback('auth.errors.passwordUpdateFailed', 'Erreur'),
        description: error.message || i18nWithFallback('auth.errors.default', 'Une erreur est survenue lors de la mise à jour du mot de passe.'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Valeur du contexte d'authentification
  const value = {
    session,
    user,
    profile,
    isLoading,
    isInitialized,
    activeLodgeId,
    setActiveLodgeId,
    signIn,
    signUp,
    signOut,
    updateProfile,
    forgotPassword,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
