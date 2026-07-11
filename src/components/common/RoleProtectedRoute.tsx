import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";

/**
 * Role-guard foundation for future admin / expert routes.
 * No admin pages are mounted in Phase 2.
 */
export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
