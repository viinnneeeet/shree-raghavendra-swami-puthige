import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
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

const queryClient = new QueryClient();
import { useIsFetching } from '@tanstack/react-query';
import Loader from './components/ui/Loader';

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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GlobalLoader />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register-event" element={<RegisterEvent />} />
              <Route path="/visit-us" element={<VisitUs />} />
              <Route path="/plan-visit" element={<PlanVisit />} />
              <Route path="/sevas-offerings" element={<SevasOfferings />} />
              <Route path="/events-calendar" element={<EventsCalendar />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/join-community" element={<JoinCommunity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
