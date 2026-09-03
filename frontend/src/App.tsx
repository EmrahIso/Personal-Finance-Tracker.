import { Outlet } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-stone-50">
        <Toaster position="top-right" />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
