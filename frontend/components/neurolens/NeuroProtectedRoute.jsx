import { Navigate, Outlet } from 'react-router-dom';
import { useNeuroAuth } from '@/lib/neuroAuth';

export default function NeuroProtectedRoute() {
  const { token, loading } = useNeuroAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-light">Loading NeuroLens...</p>
        </div>
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}