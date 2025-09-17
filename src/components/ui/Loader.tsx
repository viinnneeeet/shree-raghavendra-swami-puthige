// components/Loader.tsx
import { Loader2 } from 'lucide-react';

const Loader = ({ isLoading = false }) => {
  if (!isLoading) return;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-temple-gold" />
        <span className="mt-2 text-temple-gold font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
