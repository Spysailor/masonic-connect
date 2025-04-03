
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicOnlyRoute from '@/components/PublicOnlyRoute';

// Lazy loaded components
const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Actualites = lazy(() => import('@/pages/Actualites'));
const NewsCreate = lazy(() => import('@/pages/NewsCreate'));
const NewsEdit = lazy(() => import('@/pages/NewsEdit'));
const Agenda = lazy(() => import('@/pages/Agenda'));
const TenueDetail = lazy(() => import('@/pages/TenueDetail'));
const TenueForm = lazy(() => import('@/pages/TenueForm'));
const Members = lazy(() => import('@/pages/Members'));
const MemberDetail = lazy(() => import('@/pages/MemberDetail'));
const Planches = lazy(() => import('@/pages/Planches'));
const PlancheDetail = lazy(() => import('@/pages/PlancheDetail'));
const Bibliotheque = lazy(() => import('@/pages/Bibliotheque'));
const BibliothequeDetail = lazy(() => import('@/pages/BibliothequeDetail'));
const Messages = lazy(() => import('@/pages/Messages'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Profile = lazy(() => import('@/pages/Profile'));
const LogeSettings = lazy(() => import('@/pages/LogeSettings'));
const Invitations = lazy(() => import('@/pages/Invitations'));
const Join = lazy(() => import('@/pages/Join'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-masonic-blue-700"></div>
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/join/:inviteCode" element={<Join />} />
        
        {/* Public only routes (redirect to dashboard if logged in) */}
        <Route path="/login" element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } />
        <Route path="/register" element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/actualites" element={
          <ProtectedRoute>
            <Actualites />
          </ProtectedRoute>
        } />
        <Route path="/actualites/create" element={
          <ProtectedRoute>
            <NewsCreate />
          </ProtectedRoute>
        } />
        <Route path="/actualites/:id" element={
          <ProtectedRoute>
            <NewsEdit />
          </ProtectedRoute>
        } />
        <Route path="/agenda" element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        } />
        <Route path="/agenda/:id" element={
          <ProtectedRoute>
            <TenueDetail />
          </ProtectedRoute>
        } />
        <Route path="/agenda/create" element={
          <ProtectedRoute>
            <TenueForm />
          </ProtectedRoute>
        } />
        <Route path="/agenda/edit/:id" element={
          <ProtectedRoute>
            <TenueForm />
          </ProtectedRoute>
        } />
        <Route path="/membres" element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        } />
        <Route path="/membres/:id" element={
          <ProtectedRoute>
            <MemberDetail />
          </ProtectedRoute>
        } />
        <Route path="/planches" element={
          <ProtectedRoute>
            <Planches />
          </ProtectedRoute>
        } />
        <Route path="/planches/:id" element={
          <ProtectedRoute>
            <PlancheDetail />
          </ProtectedRoute>
        } />
        <Route path="/bibliotheque" element={
          <ProtectedRoute>
            <Bibliotheque />
          </ProtectedRoute>
        } />
        <Route path="/bibliotheque/:id" element={
          <ProtectedRoute>
            <BibliothequeDetail />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/loge/settings" element={
          <ProtectedRoute>
            <LogeSettings />
          </ProtectedRoute>
        } />
        <Route path="/invitations" element={
          <ProtectedRoute>
            <Invitations />
          </ProtectedRoute>
        } />
        
        {/* Fallback routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};
