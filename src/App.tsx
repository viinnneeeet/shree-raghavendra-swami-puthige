import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import Index from './pages/Index';
import RegisterEvent from './pages/RegisterEvent';
import VisitUs from './pages/VisitUs';
import PlanVisit from './pages/PlanVisit';
import SevasOfferings from './pages/SevasOfferings';
import EventsCalendar from './pages/EventsCalendar';
import GalleryPage from './pages/GalleryPage';
import JoinCommunity from './pages/JoinCommunity';
import NotFound from './pages/NotFound';
import GlobalErrorFallback from '@/components/GlobalErrorFallback';
import { useIsFetching } from '@tanstack/react-query';
import Loader from '@/components/ui/Loader';
import Layout from '@/components/layout/Layout';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import Dashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import Events from '@/pages/admin/Events';
import Contacts from '@/pages/admin/Contacts';
import Sevas from '@/pages/admin/Sevas';
import Gallery from '@/pages/admin/Gallery';
import AdminLayout from '@/components/admin/AdminLayout';

const queryClient = new QueryClient();

function GlobalLoader() {
  const isFetching = useIsFetching(); // counts active queries

  if (!isFetching) return null;

  return <Loader isLoading={true} />; // your overlay loader
}
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
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/register-event" element={<RegisterEvent />} />
                  <Route path="/visit-us" element={<VisitUs />} />
                  <Route path="/plan-visit" element={<PlanVisit />} />
                  <Route path="/sevas-offerings" element={<SevasOfferings />} />
                  <Route path="/events-calendar" element={<EventsCalendar />} />
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
          </TooltipProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
