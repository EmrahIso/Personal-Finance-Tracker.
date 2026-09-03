import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useMe from '../features/auth/hooks/useMe';

import PageLoader from './ui/PageLoader';

const ProtectedRoute = () => {
  const { user, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
