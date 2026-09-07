import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useMe from '../features/auth/hooks/useMe';

import PageLoader from './ui/PageLoader';

const GuestRoute = () => {
  const { user, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
