
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase auth
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Récupérer le profil utilisateur depuis Supabase
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          lodge_memberships(
            id,
            lodge_id,
            role,
            office,
            degree,
            is_active,
            lodges(
              id,
              name,
              logo_url,
              obedience,
              rite
            )
          )
        `)
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: i18nWithFallback('auth.errors.profileFetchFailed', 'Erreur de profil'),
          description: i18nWithFallback('auth.errors.profileFetchFailedDesc', 'Impossible de récupérer votre profil.'),
          variant: "destructive",
        });
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Exception fetching profile:', error);
      setProfile(null);
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: i18nWithFallback('auth.success.loginTitle', 'Connexion réussie'),
        description: i18nWithFallback('auth.success.loginDesc', 'Bienvenue dans votre espace maçonnique.'),
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Map Supabase error codes to translation keys
      let errorKey = 'auth.errors.default';
      
      if (error.message.includes('Invalid login credentials')) {
        errorKey = 'auth.errors.invalidCredentials';
      } else if (error.message.includes('Email not confirmed')) {
        errorKey = 'auth.errors.emailNotConfirmed';
      } else if (error.message.includes('network')) {
        errorKey = 'auth.errors.network';
      }
      
      toast({
        title: i18nWithFallback('auth.errors.loginFailed', 'Échec de la connexion'),
        description: i18nWithFallback(errorKey, error.message || "Vérifiez vos identifiants et réessayez."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: i18nWithFallback('auth.success.signupTitle', 'Inscription réussie'),
        description: i18nWithFallback('auth.success.signupDesc', 'Un email de confirmation vous a été envoyé.'),
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Map error messages to translation keys
      let errorKey = 'auth.errors.default';
      
      if (error.message.includes('already registered')) {
        errorKey = 'auth.errors.emailAlreadyRegistered';
      } else if (error.message.includes('weak password')) {
        errorKey = 'auth.errors.weakPassword';
      } else if (error.message.includes('network')) {
        errorKey = 'auth.errors.network';
      }
      
      toast({
        title: i18nWithFallback('auth.errors.signupFailed', 'Échec de l\'inscription'),
        description: i18nWithFallback(errorKey, error.message || "Une erreur est survenue lors de l'inscription."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      setProfile(null);
      
      toast({
        title: i18nWithFallback('auth.success.logoutTitle', 'Déconnexion réussie'),
        description: i18nWithFallback('auth.success.logoutDesc', 'À bientôt !'),
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: i18nWithFallback('auth.errors.logoutFailed', 'Erreur de déconnexion'),
        description: i18nWithFallback('auth.errors.default', error.message),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour du profil
  const updateProfile = async (data: any) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error(i18nWithFallback('auth.errors.noUserLoggedIn', 'Aucun utilisateur connecté'));
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Récupérer le profil mis à jour
      await fetchProfile(user.id);
      
      toast({
        title: i18nWithFallback('auth.success.profileUpdateTitle', 'Profil mis à jour'),
        description: i18nWithFallback('auth.success.profileUpdateDesc', 'Vos informations ont été enregistrées.'),
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: i18nWithFallback('auth.errors.profileUpdateFailed', 'Erreur de mise à jour'),
        description: i18nWithFallback('auth.errors.default', error.message),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
