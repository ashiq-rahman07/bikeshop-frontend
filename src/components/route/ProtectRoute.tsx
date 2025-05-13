
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/user/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "customer">;
}

const ProtectRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
//   const { user, isLoading } = useAuth();
  const user = useAppSelector(selectCurrentUser)
  
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role as "admin" | "customer")) {
    return <Navigate to="/" replace />;
  }
 
  return <>{children}</>;
};

export default ProtectRoute;
