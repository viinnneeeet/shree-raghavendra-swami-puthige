import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from '@/components/ui/Loader';

export default function GlobalLoader() {
  const isFetching = useIsFetching(); // always call hooks first
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;
  if (typeof window === 'undefined') return null; // SSR safe

  return isLoading ? <Loader isLoading={true} /> : null;
}
