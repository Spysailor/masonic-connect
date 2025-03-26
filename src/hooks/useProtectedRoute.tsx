
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const useProtectedRoute = (redirectTo: string = '/login') => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(redirectTo);
    }
  }, [user, isLoading, navigate, redirectTo]);

  return { isLoading, isAuthenticated: !!user };
};
