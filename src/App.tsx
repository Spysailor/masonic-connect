
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberDetail from "./pages/MemberDetail";
import Agenda from "./pages/Agenda";
import TenueDetail from "./pages/TenueDetail";
import PlancheDetail from "./pages/PlancheDetail";
import Actualites from "./pages/Actualites";
import Messages from "./pages/Messages";
import Bibliotheque from "./pages/Bibliotheque";
import BibliothequeDetail from "./pages/BibliothequeDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/agenda/:id" element={<TenueDetail />} />
            <Route path="/planches" element={<Navigate to="/bibliotheque?type=planche" replace />} />
            <Route path="/planches/:id" element={<PlancheDetail />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:id" element={<BibliothequeDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bibliotheque" element={<Bibliotheque />} />
            <Route path="/bibliotheque/:id" element={<BibliothequeDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
