
import { BaseService, ApiResponse } from './base.service';
import type { AuthError, AuthResponse, Provider, Session, User } from '@supabase/supabase-js';

export interface AuthSignUpData {
  email: string;
  password: string;
  displayName?: string;
  metadata?: Record<string, any>;
}

export interface AuthSignInData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
}

export class AuthService extends BaseService {
  /**
   * Récupère la session actuelle
   */
  async getSession(): Promise<ApiResponse<Session | null>> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      
      if (error) throw error;
      
      return {
        data: data.session,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error getting auth session:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération de la session'),
        status: 'error'
      };
    }
  }
  
  /**
   * Récupère l'utilisateur actuellement connecté
   */
  async getUser(): Promise<ApiResponse<User | null>> {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      
      if (error) throw error;
      
      return {
        data: data.user,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération de l\'utilisateur'),
        status: 'error'
      };
    }
  }
  
  /**
   * Récupère l'état complet de l'authentification (user + session)
   */
  async getAuthState(): Promise<ApiResponse<AuthState>> {
    try {
      const { data: sessionData, error: sessionError } = await this.supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      return {
        data: {
          user: sessionData.session?.user || null,
          session: sessionData.session
        },
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error getting auth state:', error);
      return {
        data: {
          user: null,
          session: null
        },
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération de l\'état d\'authentification'),
        status: 'error'
      };
    }
  }
  
  /**
   * Inscription d'un nouvel utilisateur
   */
  async signUp(data: AuthSignUpData): Promise<ApiResponse<AuthResponse>> {
    try {
      // Extrait les propriétés pour l'inscription
      const { email, password, displayName, metadata = {} } = data;
      
      // Assure que le display_name est toujours présent dans les métadonnées
      const userMetadata = {
        ...metadata,
        display_name: displayName || metadata.display_name || email.split('@')[0]
      };
      
      // Inscription avec Supabase Auth
      const { data: authData, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      return {
        data: authData,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error during sign up:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de l\'inscription'),
        status: 'error'
      };
    }
  }
  
  /**
   * Connexion par email/mot de passe
   */
  async signIn(data: AuthSignInData): Promise<ApiResponse<AuthResponse>> {
    try {
      const { email, password } = data;
      
      const { data: authData, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return {
        data: authData,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error during sign in:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la connexion'),
        status: 'error'
      };
    }
  }
  
  /**
   * Connexion avec un fournisseur OAuth
   */
  async signInWithOAuth(provider: Provider): Promise<ApiResponse<AuthResponse>> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      return {
        data,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error(`Error during OAuth sign in with ${provider}:`, error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error(`Erreur lors de la connexion avec ${provider}`),
        status: 'error'
      };
    }
  }
  
  /**
   * Déconnexion
   */
  async signOut(): Promise<ApiResponse<null>> {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) throw error;
      
      return {
        data: null,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error during sign out:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la déconnexion'),
        status: 'error'
      };
    }
  }
  
  /**
   * Envoi d'un email de réinitialisation de mot de passe
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return {
        data: null,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de l\'envoi de l\'email de réinitialisation'),
        status: 'error'
      };
    }
  }
  
  /**
   * Modification du mot de passe
   */
  async updatePassword(newPassword: string): Promise<ApiResponse<User | null>> {
    try {
      const { data, error } = await this.supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return {
        data: data.user,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error updating password:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la mise à jour du mot de passe'),
        status: 'error'
      };
    }
  }
  
  /**
   * Mise à jour des données utilisateur
   */
  async updateUserData(userData: Record<string, any>): Promise<ApiResponse<User | null>> {
    try {
      const { data, error } = await this.supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      return {
        data: data.user,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error updating user data:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la mise à jour des données utilisateur'),
        status: 'error'
      };
    }
  }
  
  /**
   * Configuration d'un écouteur pour les changements d'état d'authentification
   */
  onAuthStateChange(callback: (event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'TOKEN_REFRESHED' | 'PASSWORD_RECOVERY', session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
}

// Export d'une instance singleton du service
export const authService = new AuthService();
