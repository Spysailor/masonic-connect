
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationProvider } from "@/hooks/use-notifications";
import MobileFooterMenu from "@/components/layout/MobileFooterMenu";

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
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/freres" element={<PageWrapper><Members /></PageWrapper>} />
                <Route path="/freres/:id" element={<PageWrapper><MemberDetail /></PageWrapper>} />
                <Route path="/agenda" element={<PageWrapper><Agenda /></PageWrapper>} />
                <Route path="/agenda/create" element={<PageWrapper><TenueForm /></PageWrapper>} />
                <Route path="/agenda/:id/edit" element={<PageWrapper><TenueForm /></PageWrapper>} />
                <Route path="/agenda/:id" element={<PageWrapper><TenueDetail /></PageWrapper>} />
                <Route path="/planches" element={<PageWrapper><Planches /></PageWrapper>} />
                <Route path="/planches/:id" element={<PageWrapper><PlancheDetail /></PageWrapper>} />
                <Route path="/actualites" element={<PageWrapper><Actualites /></PageWrapper>} />
                <Route path="/actualites/create" element={<PageWrapper><NewsCreate /></PageWrapper>} />
                <Route path="/actualites/:id/edit" element={<PageWrapper><NewsEdit /></PageWrapper>} />
                <Route path="/actualites/:id" element={<PageWrapper><BibliothequeDetail /></PageWrapper>} />
                <Route path="/messages" element={<PageWrapper><Messages /></PageWrapper>} />
                <Route path="/bibliotheque" element={<PageWrapper><Bibliotheque /></PageWrapper>} />
                <Route path="/bibliotheque/:id" element={<PageWrapper><BibliothequeDetail /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
                
                {/* Nouvelles routes pour la plateforme multi-tenant */}
                <Route path="/invitations" element={<PageWrapper><Invitations /></PageWrapper>} />
                <Route path="/loge-settings" element={<PageWrapper><LogeSettings /></PageWrapper>} />
                <Route path="/join" element={<PageWrapper><Join /></PageWrapper>} />
                
                {/* Si aucune route ne correspond, rediriger vers la page NotFound */}
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
            <MobileFooterMenu />
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default App;
