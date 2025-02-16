// components/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/user/authSlice';


const ProtectedRoute = () => {
 const token = useAppSelector(useCurrentToken);

  // If user is logged in, render the requested page
  // Otherwise, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;