import { Button } from './ui/button';

// components/GlobalErrorFallback.tsx
export default function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-red-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center lg:max-w-md md:max-w-full">
        <h1 className="lg:text-2xl md:text-9xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-700 md:text-5xl lg:text-lg">
          {error.message}
        </p>
        <Button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Try again
        </Button>
      </div>
    </div>
  );
}
