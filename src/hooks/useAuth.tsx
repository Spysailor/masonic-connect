
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
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

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
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
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace maçonnique.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Échec de la connexion",
        description: error.message || "Vérifiez vos identifiants et réessayez.",
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
        title: "Inscription réussie",
        description: "Un email de confirmation vous a été envoyé.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Échec de l'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
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
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
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
      
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Récupérer le profil mis à jour
      await fetchProfile(user.id);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
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
