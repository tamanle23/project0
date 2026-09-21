import { ReactNode } from 'react';
import { useSpringAuthStore } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallbackUnauthenticated?: ReactNode;
  fallbackForbidden?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  fallbackUnauthenticated, 
  fallbackForbidden 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSpringAuthStore();

  if (!isAuthenticated || !user) {
    return fallbackUnauthenticated || (
      <div className="flex flex-col items-center justify-center p-8 text-destructive bg-destructive/10 rounded-xl border border-destructive/20 m-4">
        <h2 className="font-semibold text-lg">401 Unauthorized</h2>
        <p className="text-sm">Please log in to view this content.</p>
      </div>
    );
  }

  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRole) {
      return fallbackForbidden || (
        <div className="flex flex-col items-center justify-center p-8 text-orange-600 dark:text-orange-400 bg-orange-500/10 rounded-xl border border-orange-500/20 m-4">
          <h2 className="font-semibold text-lg">403 Forbidden</h2>
          <p className="text-sm">You do not have the required roles to view this content.</p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
