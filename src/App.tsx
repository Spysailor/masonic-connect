
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from '@/hooks/useAuth';
import { AppRoutes } from './routes';
import './App.css';

// Configure React Query with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // Données considérées comme fraîches pendant 30 secondes
      retry: (failureCount, error: any) => {
        // Ne pas ré-essayer en cas d'erreur d'authentification
        if (error?.status === 401 || error?.code === 'PGRST301') {
          return false;
        }
        // Sinon, 3 tentatives maximum
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // Éviter trop de requêtes lors de changements de focus
    },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
