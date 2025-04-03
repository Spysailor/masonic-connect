
import { supabase } from '@/integrations/supabase/client';
import type { PostgrestError } from '@supabase/supabase-js';

export interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
  status: 'success' | 'error';
}

export class BaseService {
  protected supabase = supabase;
  
  protected async handleResponse<T>(promise: Promise<{data: T | null; error: PostgrestError | null}>): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await promise;
      
      if (error) {
        console.error('API error:', error);
        return {
          data: null,
          error,
          status: 'error'
        };
      }
      
      return {
        data,
        error: null,
        status: 'success'
      };
    } catch (error) {
      console.error('Unexpected API error:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Une erreur inconnue est survenue'),
        status: 'error'
      };
    }
  }
}
