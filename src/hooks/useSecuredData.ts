
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { i18nWithFallback } from '@/utils/i18n-fallback';
import { useNavigate } from 'react-router-dom';

/**
 * Hook générique pour gérer la récupération sécurisée des données et les erreurs
 * @param fetchFunction Fonction pour récupérer les données
 * @param dependencies Dépendances pour déclencher le rechargement des données
 * @param redirectOnError Rediriger vers une autre page en cas d'erreur d'autorisation
 */
export function useSecuredData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = [],
  redirectOnError: string | null = null
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      setError(new Error("Not authenticated"));
      
      if (redirectOnError) {
        navigate(redirectOnError);
      }
      
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (e: any) {
      console.error("Error fetching data:", e);
      setError(e);
      
      toast({
        title: i18nWithFallback('errors.dataFetch', 'Error loading data'),
        description: e.message,
        variant: "destructive",
      });
      
      if (e.code === 'PGRST301' && redirectOnError) {
        // Handle permission denied error
        toast({
          title: i18nWithFallback('errors.permissionDenied', 'Permission denied'),
          description: i18nWithFallback('errors.notAuthorized', 'You are not authorized to access this data'),
          variant: "destructive",
        });
        
        navigate(redirectOnError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchFunction, toast, navigate, redirectOnError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refresh };
}
