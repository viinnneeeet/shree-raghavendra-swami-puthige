import { useIsFetching } from '@tanstack/react-query';
import Loader from '@/components/ui/Loader';

export default function GlobalLoader() {
  const isFetching = useIsFetching(); // always call hooks first

  if (typeof window === 'undefined') return null; // SSR safe

  return isFetching ? <Loader isLoading={true} /> : null;
}
