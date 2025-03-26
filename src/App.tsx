
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationProvider } from "@/hooks/use-notifications";
import MobileFooterMenu from "@/components/layout/MobileFooterMenu";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";
// Import du composant Mobile Features
import MobileFeatures from "@/components/mobile/MobileFeatures";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberDetail from "./pages/MemberDetail";
import Agenda from "./pages/Agenda";
import TenueDetail from "./pages/TenueDetail";
import TenueForm from "./pages/TenueForm";
import PlancheDetail from "./pages/PlancheDetail";
import Actualites from "./pages/Actualites";
import NewsCreate from "./pages/NewsCreate";
import NewsEdit from "./pages/NewsEdit";
import Messages from "./pages/Messages";
import Bibliotheque from "./pages/Bibliotheque";
import BibliothequeDetail from "./pages/BibliothequeDetail";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Planches from "./pages/Planches";

// Nouvelles pages pour la plateforme multi-tenant
import Invitations from "./pages/Invitations";
import LogeSettings from "./pages/LogeSettings";
import Join from "./pages/Join";

const queryClient = new QueryClient();

const App = () => {
  const PageWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <TooltipProvider>
              <MobileFeatures>
                <Toaster />
                <Sonner />
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Routes publiques */}
                    <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                    <Route path="/login" element={
                      <PageWrapper>
                        <PublicOnlyRoute>
                          <Login />
                        </PublicOnlyRoute>
                      </PageWrapper>
                    } />
                    <Route path="/register" element={
                      <PageWrapper>
                        <PublicOnlyRoute>
                          <Register />
                        </PublicOnlyRoute>
                      </PageWrapper>
                    } />
                    <Route path="/join" element={
                      <PageWrapper>
                        <PublicOnlyRoute>
                          <Join />
                        </PublicOnlyRoute>
                      </PageWrapper>
                    } />

                    {/* Routes protégées (nécessitant une authentification) */}
                    <Route path="/dashboard" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/freres" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Members />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/freres/:id" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <MemberDetail />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/agenda" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Agenda />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/agenda/create" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <TenueForm />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/agenda/:id/edit" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <TenueForm />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/agenda/:id" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <TenueDetail />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/planches" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Planches />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/planches/:id" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <PlancheDetail />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/actualites" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Actualites />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/actualites/create" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <NewsCreate />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/actualites/:id/edit" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <NewsEdit />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/actualites/:id" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <BibliothequeDetail />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/messages" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/bibliotheque" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Bibliotheque />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/bibliotheque/:id" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <BibliothequeDetail />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/profile" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/notifications" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Notifications />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/invitations" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <Invitations />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    <Route path="/loge-settings" element={
                      <PageWrapper>
                        <ProtectedRoute>
                          <LogeSettings />
                        </ProtectedRoute>
                      </PageWrapper>
                    } />
                    
                    {/* Si aucune route ne correspond, rediriger vers la page NotFound */}
                    <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                  </Routes>
                </AnimatePresence>
                <MobileFooterMenu />
              </MobileFeatures>
            </TooltipProvider>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
