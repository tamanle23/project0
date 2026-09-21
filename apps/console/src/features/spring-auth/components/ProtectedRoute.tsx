import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpringAuthStore } from '../store';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackUnauthenticated?: React.ReactNode;
  requiredRoles?: string[];
  fallbackUnauthorized?: React.ReactNode;
  fallbackForbidden?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  fallbackUnauthenticated,
  requiredRoles = [],
  fallbackUnauthorized,
  fallbackForbidden,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isHydrating } = useSpringAuthStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isHydrating && (!isAuthenticated || !user) && !fallbackUnauthenticated) {
      navigate({ to: '/sign-in', replace: true });
    }
  }, [isHydrating, isAuthenticated, user, fallbackUnauthenticated, navigate]);

  if (isHydrating) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return fallbackUnauthenticated || null;
  }

  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRole) {
      return fallbackForbidden || fallbackUnauthorized || (
        <div className="flex flex-col items-center justify-center p-8 text-orange-600 dark:text-orange-400 bg-orange-500/10 rounded-xl border border-orange-500/20 m-4">
          <h2 className="font-semibold text-lg">403 Forbidden</h2>
          <p className="text-sm">You do not have the required roles to view this content.</p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
