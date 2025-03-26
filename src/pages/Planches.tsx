
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ce composant est maintenant juste un redirecteur vers Bibliotheque
const Planches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Rediriger vers /bibliotheque avec le paramètre type=planche
    // en préservant la langue actuelle
    const query = new URLSearchParams(location.search);
    query.append('type', 'planche');
    
    navigate(`/bibliotheque?${query.toString()}`, { replace: true });
  }, [navigate, location.search, i18n.language]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500">Redirection...</p>
    </div>
  );
};

export default Planches;
