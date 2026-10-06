import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Returns true when the error is an HTTP 409 (axios error or mock-engine error). */
export const isConflictError = (err: unknown): boolean => {
  if (!err || typeof err !== 'object') return false;
  const e = err as { status?: number; response?: { status?: number } };
  return e.response?.status === 409 || e.status === 409;
};

interface ConflictBannerProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ConflictBanner: React.FC<ConflictBannerProps> = ({ onRefresh, isRefreshing }) => (
  <div
    role="alert"
    className="flex items-center gap-3 p-3 mb-4 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs border border-amber-500/30"
  >
    <AlertTriangle className="h-4 w-4 shrink-0" />
    <span className="flex-1">
      This record has been modified by another user. Please reload the latest changes.
    </span>
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={onRefresh}
      disabled={isRefreshing}
      className="gap-1.5 text-xs h-7"
    >
      <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
  </div>
);
