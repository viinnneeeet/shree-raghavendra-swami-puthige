import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from '@/components/ui/Loader';

export default function GlobalLoader() {
  const isFetching = useIsFetching(); // always call hooks first
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;
  if (typeof window === 'undefined') return null; // SSR safe
  if (!isLoading) return;
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
      <Loader isLoading={true} />
    </div>
  );
}
