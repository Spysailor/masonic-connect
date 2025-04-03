
import { BaseService, ApiResponse } from './base.service';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export class LodgeService extends BaseService {
  /**
   * Récupère toutes les loges auxquelles un utilisateur appartient
   */
  async getUserLodges(userId: string): Promise<ApiResponse<Tables<'lodge_memberships'>[]>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .select(`
          *,
          lodges (
            id,
            name,
            logo_url,
            obedience,
            rite,
            description,
            is_active,
            primary_color,
            secondary_color
          )
        `)
        .eq('user_id', userId)
        .eq('is_active', true)
    );
  }
  
  /**
   * Récupère une loge par son ID
   */
  async getLodgeById(lodgeId: string): Promise<ApiResponse<Tables<'lodges'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodges')
        .select('*')
        .eq('id', lodgeId)
        .single()
    );
  }
  
  /**
   * Récupère les détails complets d'une loge avec statistiques
   */
  async getLodgeDetails(lodgeId: string): Promise<ApiResponse<any>> {
    return this.handleResponse(
      this.supabase
        .from('lodges')
        .select(`
          *,
          lodge_memberships!lodge_id(count),
          tenues!lodge_id(count),
          documents!lodge_id(count),
          planches!lodge_id(count)
        `)
        .eq('id', lodgeId)
        .single()
    );
  }
  
  /**
   * Crée une nouvelle loge
   */
  async createLodge(lodge: TablesInsert<'lodges'>): Promise<ApiResponse<Tables<'lodges'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodges')
        .insert(lodge)
        .select()
        .single()
    );
  }
  
  /**
   * Met à jour une loge
   */
  async updateLodge(lodgeId: string, updates: TablesUpdate<'lodges'>): Promise<ApiResponse<Tables<'lodges'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodges')
        .update(updates)
        .eq('id', lodgeId)
        .select()
        .single()
    );
  }
  
  /**
   * Supprime une loge
   */
  async deleteLodge(lodgeId: string): Promise<ApiResponse<null>> {
    return this.handleResponse(
      this.supabase
        .from('lodges')
        .delete()
        .eq('id', lodgeId)
        .then(res => ({ ...res, data: null }))
    );
  }
  
  /**
   * Ajoute un membre à une loge
   */
  async addLodgeMember(lodgeId: string, userId: string, role: string = 'member', degree: number = 1): Promise<ApiResponse<Tables<'lodge_memberships'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .insert({
          lodge_id: lodgeId,
          user_id: userId,
          role,
          degree,
          is_active: true,
          joined_at: new Date().toISOString()
        })
        .select()
        .single()
    );
  }
  
  /**
   * Met à jour le rôle ou le statut d'un membre
   */
  async updateLodgeMember(membershipId: string, updates: Partial<{
    role: string;
    degree: number;
    office: string;
    is_active: boolean;
  }>): Promise<ApiResponse<Tables<'lodge_memberships'>>> {
    return this.handleResponse(
      this.supabase
        .from('lodge_memberships')
        .update(updates)
        .eq('id', membershipId)
        .select()
        .single()
    );
  }
}

// Export d'une instance singleton du service
export const lodgeService = new LodgeService();
