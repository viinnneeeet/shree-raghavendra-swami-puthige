import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Index from './pages/Index';
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalLoader />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
