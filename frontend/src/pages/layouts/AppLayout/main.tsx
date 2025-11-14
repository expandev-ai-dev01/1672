import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

export const AppLayout = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong in the layout.</div>}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">NoteBox</div>
              <div>{/* Navigation links can go here */}</div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};
