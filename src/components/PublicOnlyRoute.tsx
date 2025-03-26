
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { user, isLoading } = useAuth();

  // Montrer un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
      </div>
    );
  }

  // Rediriger vers le tableau de bord si l'utilisateur est déjà authentifié
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Afficher le contenu public si l'utilisateur n'est pas authentifié
  return <>{children}</>;
};

export default PublicOnlyRoute;
