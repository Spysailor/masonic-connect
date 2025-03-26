
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useLodgeData = () => {
  const { user, profile } = useAuth();
  
  // Récupérer les informations de la loge
  const { data: lodge, isLoading: isLoadingLodge } = useQuery({
    queryKey: ['lodge'],
    queryFn: async () => {
      if (!user || !profile?.lodge_memberships?.[0]?.lodge_id) return null;
      
      const { data, error } = await supabase
        .from('lodges')
        .select('*')
        .eq('id', profile.lodge_memberships[0].lodge_id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!profile?.lodge_memberships?.[0]?.lodge_id
  });
  
  // Récupérer les membres de la loge
  const { data: members = [], isLoading: isLoadingMembers } = useQuery({
    queryKey: ['lodge-members'],
    queryFn: async () => {
      if (!user || !profile?.lodge_memberships?.[0]?.lodge_id) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          lodge_memberships!inner(
            id,
            lodge_id,
            role,
            office,
            degree,
            is_active
          )
        `)
        .eq('lodge_memberships.lodge_id', profile.lodge_memberships[0].lodge_id)
        .eq('lodge_memberships.is_active', true);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!profile?.lodge_memberships?.[0]?.lodge_id
  });

  // Vérifier si l'utilisateur est administrateur
  const isAdmin = profile?.lodge_memberships?.[0]?.role === 'admin' || 
                  profile?.lodge_memberships?.[0]?.office === 'Vénérable Maître';
  
  return {
    lodge,
    members,
    isAdmin,
    isLoading: isLoadingLodge || isLoadingMembers
  };
};
