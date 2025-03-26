
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook to access the Supabase client
 * @returns The Supabase client instance
 */
export const useSupabase = () => {
  return supabase;
};
