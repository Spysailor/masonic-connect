
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/freres" element={<Members />} />
              <Route path="/freres/:id" element={<MemberDetail />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/agenda/create" element={<TenueForm />} />
              <Route path="/agenda/:id/edit" element={<TenueForm />} />
              <Route path="/agenda/:id" element={<TenueDetail />} />
              <Route path="/planches" element={<Planches />} />
              <Route path="/planches/:id" element={<PlancheDetail />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/actualites/create" element={<NewsCreate />} />
              <Route path="/actualites/:id/edit" element={<NewsEdit />} />
              <Route path="/actualites/:id" element={<BibliothequeDetail />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bibliotheque" element={<Bibliotheque />} />
              <Route path="/bibliotheque/:id" element={<BibliothequeDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              
              {/* Nouvelles routes pour la plateforme multi-tenant */}
              <Route path="/invitations" element={<Invitations />} />
              <Route path="/loge-settings" element={<LogeSettings />} />
              <Route path="/join" element={<Join />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <MobileFooterMenu />
        </BrowserRouter>
      </TooltipProvider>
    </NotificationProvider>
  </QueryClientProvider>
);

export default App;
