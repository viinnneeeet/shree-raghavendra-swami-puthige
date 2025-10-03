import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ErrorBoundary } from 'react-error-boundary';

import Loader from '@/components/ui/Loader';
import GlobalErrorFallback from '@/components/GlobalErrorFallback';
import { queryClient } from './lib/react-query-client';
import './lib/react-query-persister';
import GlobalLoader from './components/GlobalLoader';

// Layouts
import Layout from './components/layout/Layout';
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));

// Public Pages
import Index from './pages/Index';
const RegisterEvent = lazy(() => import('./pages/RegisterEvent'));
const VisitUs = lazy(() => import('./pages/VisitUs'));
const PlanVisit = lazy(() => import('./pages/PlanVisit'));
const SevasOfferings = lazy(() => import('./pages/SevasOfferings'));
const EventsCalendar = lazy(() => import('./pages/EventsCalendar'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const JoinCommunity = lazy(() => import('./pages/JoinCommunity'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Members = lazy(() => import('./pages/admin/Members'));
const Events = lazy(() => import('./pages/admin/Events'));
const Contacts = lazy(() => import('./pages/admin/Contacts'));
const Sevas = lazy(() => import('./pages/admin/Sevas'));
const Gallery = lazy(() => import('./pages/admin/Gallery'));

const App = () => (
  <ErrorBoundary
    FallbackComponent={GlobalErrorFallback}
    onReset={() => {
      // Reset react-query cache or navigate to home
      queryClient.clear();
    }}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GlobalLoader />
            <Suspense fallback={<Loader isLoading={true} />}>
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/register-event" element={<RegisterEvent />} />
                    <Route path="/visit-us" element={<VisitUs />} />
                    <Route path="/plan-visit" element={<PlanVisit />} />
                    <Route
                      path="/sevas-offerings"
                      element={<SevasOfferings />}
                    />
                    <Route
                      path="/events-calendar"
                      element={<EventsCalendar />}
                    />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/join-community" element={<JoinCommunity />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="members" element={<Members />} />
                    <Route path="events" element={<Events />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="sevas" element={<Sevas />} />
                    <Route path="gallery" element={<Gallery />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </Suspense>
          </TooltipProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
