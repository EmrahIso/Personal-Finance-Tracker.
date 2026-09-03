import { LoaderCircle } from 'lucide-react';

const PageLoader = () => {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-stone-50 px-5 font-noto text-neutral-900"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center bg-neutral-100 border-1 border-neutral-200 rounded-xl shadow-sm">
          <LoaderCircle
            className="animate-spin text-neutral-900"
            size={26}
            strokeWidth={2.5}
          />
        </div>
        <p className="font-google-sans-flex text-xl font-bold tracking-tight">
          Monetra
        </p>
        <p className="mt-2 text-sm text-neutral-500">Loading ...</p>
      </div>
    </main>
  );
};

export default PageLoader;
