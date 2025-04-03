
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Lecture des variables d'environnement sans valeurs par défaut
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérification stricte des variables d'environnement
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // En développement, afficher un message clair
  if (import.meta.env.DEV) {
    console.error('⚠️ Variables d\'environnement Supabase manquantes!');
    console.error('Créez un fichier .env.local et ajoutez les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY');
    console.error('Pour le développement, vous pouvez utiliser les valeurs disponibles dans la console Supabase.');
  }
  
  // En production, lancer une erreur pour éviter les déploiements incorrects
  if (import.meta.env.PROD) {
    throw new Error('Configuration Supabase incomplète: variables d\'environnement manquantes');
  }
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  // Utilisez un fallback uniquement en développement
  import.meta.env.DEV && !SUPABASE_URL 
    ? 'https://example.supabase.co' 
    : SUPABASE_URL as string,
  
  import.meta.env.DEV && !SUPABASE_ANON_KEY 
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.devtoken' 
    : SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
