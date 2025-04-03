
import { BaseService, ApiResponse } from './base.service';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export class MemberService extends BaseService {
  /**
   * Récupère tous les membres d'une loge avec pagination et recherche
   */
  async getLodgeMembers(
    lodgeId: string, 
    options: { 
      page?: number; 
      pageSize?: number; 
      search?: string;
      role?: string;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
    } = {}
  ): Promise<ApiResponse<{ 
    data: Array<Tables<'lodge_memberships'> & { profiles: Tables<'profiles'> }>;
    count: number;
  }>> {
    try {
      const { 
        page = 1, 
        pageSize = 10, 
        search = '',
        role,
        orderBy = 'profiles.display_name',
        orderDirection = 'asc'
      } = options;
      
      // Construire la requête de base
      let query = this.supabase
        .from('lodge_memberships')
        .select(`
          *,
          profiles (*)
        `, { count: 'exact' })
        .eq('lodge_id', lodgeId)
        .eq('is_active', true);
      
      // Filtrer par rôle si spécifié
      if (role) {
        query = query.eq('role', role);
      }
      
      // Ajouter recherche si fournie
      if (search) {
        query = query.or(
          `or(profiles.display_name.ilike.%${search}%,profiles.profession.ilike.%${search}%)`
        );
      }
      
      // Récupérer le compte total
      const countQuery = query;
      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      
      // Ajouter pagination et tri
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      query = query
        .order(orderBy, { ascending: orderDirection === 'asc' })
        .range(from, to);
      
      // Exécuter la requête
      const { data, error } = await query;
      
      if (error) throw error;
      
      return {
        data: {
          data: data || [],
          count: count || 0
        },
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Error fetching lodge members:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération des membres'),
        status: 'error'
      };
    }
  }
  
  /**
   * Récupère un membre spécifique avec détails
   */
  async getMemberById(userId: string): Promise<ApiResponse<Tables<'profiles'>>> {
    return this.handleResponse(
      this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    );
  }
  
  /**
   * Récupère l'adhésion d'un membre à une loge
   */
  async getMembershipDetails(userId: string, lodgeId: string): Promise<ApiResponse<Tables<'lodge_memberships'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .select('*')
        .eq('user_id', userId)
        .eq('lodge_id', lodgeId)
        .single()
    );
  }
  
  /**
   * Met à jour le profil d'un membre
   */
  async updateProfile(userId: string, profileData: TablesUpdate<'profiles'>): Promise<ApiResponse<Tables<'profiles'>>> {
    return this.handleResponse(
      this.supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single()
    );
  }
  
  /**
   * Met à jour le statut d'un membre dans une loge
   */
  async updateMembershipStatus(
    userId: string, 
    lodgeId: string, 
    isActive: boolean
  ): Promise<ApiResponse<Tables<'lodge_memberships'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .update({ is_active: isActive })
        .eq('user_id', userId)
        .eq('lodge_id', lodgeId)
        .select()
        .single()
    );
  }
  
  /**
   * Augmente le degré d'un membre
   */
  async updateMemberDegree(
    userId: string,
    lodgeId: string,
    newDegree: number
  ): Promise<ApiResponse<Tables<'lodge_memberships'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .update({ degree: newDegree })
        .eq('user_id', userId)
        .eq('lodge_id', lodgeId)
        .select()
        .single()
    );
  }
}

// Export d'une instance singleton du service
export const memberService = new MemberService();
