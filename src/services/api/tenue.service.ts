
import { BaseService, ApiResponse } from './base.service';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export class TenueService extends BaseService {
  /**
   * Récupère les tenues d'une loge avec options de filtrage et pagination
   */
  async getLodgeTenues(
    lodgeId: string, 
    options: { 
      startDate?: string; 
      endDate?: string; 
      page?: number; 
      pageSize?: number;
      type?: string;
      includeAttendance?: boolean;
      userId?: string;
    } = {}
  ): Promise<ApiResponse<{ data: Tables<'tenues'>[]; count: number }>> {
    try {
      const { 
        startDate, 
        endDate, 
        page = 1, 
        pageSize = 20,
        type,
        includeAttendance = false,
        userId
      } = options;
      
      // Construction de la requête de base
      let selectQuery = '*';
      
      // Ajouter l'assistance si demandé et si un userId est fourni
      if (includeAttendance && userId) {
        selectQuery = `
          *,
          attendance!inner(
            id,
            status,
            excuse,
            user_id
          )
        `;
      }
      
      let query = this.supabase
        .from('tenues')
        .select(selectQuery, { count: 'exact' })
        .eq('lodge_id', lodgeId);
      
      // Filtre par date de début
      if (startDate) {
        query = query.gte('tenue_date', startDate);
      }
      
      // Filtre par date de fin
      if (endDate) {
        query = query.lte('tenue_date', endDate);
      }
      
      // Filtre par type
      if (type) {
        query = query.eq('type', type);
      }
      
      // Filtre par utilisateur pour l'assistance
      if (includeAttendance && userId) {
        query = query.eq('attendance.user_id', userId);
      }
      
      // Tri par date
      query = query.order('tenue_date', { ascending: true });
      
      // Récupération du nombre total avant pagination
      const countQuery = query;
      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      
      // Appliquer la pagination
      if (page && pageSize) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
      }
      
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
      console.error('Error fetching tenues:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Erreur lors de la récupération des tenues'),
        status: 'error'
      };
    }
  }
  
  /**
   * Récupère une tenue spécifique avec détails d'assistance
   */
  async getTenueById(tenueId: string): Promise<ApiResponse<Tables<'tenues'> & { attendance: Tables<'attendance'>[] }>> {
    return this.handleResponse(
      this.supabase
        .from('tenues')
        .select(`
          *,
          attendance (
            id,
            user_id,
            status,
            excuse,
            updated_at,
            profiles:user_id (
              id,
              display_name,
              photo_url
            )
          )
        `)
        .eq('id', tenueId)
        .single()
    );
  }
  
  /**
   * Crée une nouvelle tenue
   */
  async createTenue(tenue: TablesInsert<'tenues'>): Promise<ApiResponse<Tables<'tenues'>>> {
    return this.handleResponse(
      this.supabase
        .from('tenues')
        .insert(tenue)
        .select()
        .single()
    );
  }
  
  /**
   * Met à jour une tenue existante
   */
  async updateTenue(tenueId: string, updates: TablesUpdate<'tenues'>): Promise<ApiResponse<Tables<'tenues'>>> {
    return this.handleResponse(
      this.supabase
        .from('tenues')
        .update(updates)
        .eq('id', tenueId)
        .select()
        .single()
    );
  }
  
  /**
   * Supprime une tenue
   */
  async deleteTenue(tenueId: string): Promise<ApiResponse<null>> {
    return this.handleResponse(
      this.supabase
        .from('tenues')
        .delete()
        .eq('id', tenueId)
        .then(res => ({ ...res, data: null }))
    );
  }
  
  /**
   * Gère la présence d'un membre à une tenue
   */
  async setAttendance(
    tenueId: string, 
    userId: string, 
    status: 'present' | 'absent' | 'excused',
    excuse?: string
  ): Promise<ApiResponse<Tables<'attendance'>>> {
    return this.handleResponse(
      this.supabase
        .from('attendance')
        .upsert({
          tenue_id: tenueId,
          user_id: userId,
          status,
          excuse: status === 'excused' ? excuse : null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'tenue_id,user_id' })
        .select()
        .single()
    );
  }
  
  /**
   * Récupère les prochaines tenues pour un utilisateur
   */
  async getUpcomingTenues(userId: string, limit: number = 5): Promise<ApiResponse<Tables<'tenues'>[]>> {
    const now = new Date().toISOString().split('T')[0];
    
    return this.handleResponse(
      this.supabase
        .from('tenues')
        .select(`
          *,
          lodges (
            id,
            name,
            logo_url
          )
        `)
        .gte('tenue_date', now)
        .in('lodge_id', this.supabase
          .from('lodge_memberships')
          .select('lodge_id')
          .eq('user_id', userId)
          .eq('is_active', true)
        )
        .order('tenue_date', { ascending: true })
        .limit(limit)
    );
  }
}

// Export d'une instance singleton du service
export const tenueService = new TenueService();
