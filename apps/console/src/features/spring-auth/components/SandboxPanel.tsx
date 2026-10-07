import { useState } from 'react';
import axios from 'axios';
import { useSpringAuthStore } from '../store';
import { springApiClient } from '../api-client';
import { ShieldAlert, Zap, LogOut, Database, TestTube2, Minus, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SandboxPanel() {
  const { isAuthenticated, isSandbox, user, expireAccessToken, expireRefreshToken, clearTokens } = useSpringAuthStore();
  const [dashboardData, setDashboardData] = useState<Record<string, unknown> | null>(null);
  const [isMinimized, setIsMinimized] = useState(() => {
    return localStorage.getItem('unipost_auth_sandbox_minimized') === 'true';
  });

  if (!isAuthenticated || !isSandbox) {
    return null;
  }

  const toggleMinimized = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      localStorage.setItem('unipost_auth_sandbox_minimized', String(next));
      return next;
    });
  };

  const handleTestDashboard = async () => {
    try {
      const { data } = await springApiClient.get('/admin/dashboard');
      setDashboardData(data);
      toast.success('Protected route access granted!');
    } catch (e: unknown) {
      const status = axios.isAxiosError(e) ? e.response?.status : 'Unknown';
      toast.error(`Dashboard Access Failed: ${status}`);
      setDashboardData(null);
    }
  };

  const handleHardLogout = async () => {
    try {
      await springApiClient.post('/auth/logout');
    } catch (_e) {
      // Ignore
    } finally {
      clearTokens();
      toast.success('Hard Logout Complete');
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMinimized}
          className="flex items-center gap-2 h-9 px-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 shadow-lg shadow-black/10 dark:shadow-black/40 hover:bg-emerald-500/10 transition-all text-xs font-medium"
          title="Open Auth Sandbox Engine"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <TestTube2 className="size-3.5 text-emerald-500" />
          <span>Sandbox Engine</span>
          <Maximize2 className="size-3 text-muted-foreground ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-2xl bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 p-4 transition-all">
      <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
        <div className="flex items-center gap-2">
          <TestTube2 className="size-5 text-emerald-500" />
          <h3 className="font-semibold text-sm">Auth Sandbox Engine</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMinimized}
          className="h-6 w-6 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
          title="Minimize panel"
        >
          <Minus className="size-3.5" />
          <span className="sr-only">Minimize</span>
        </Button>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg bg-black/5 dark:bg-white/5 p-2 text-xs font-mono break-all text-muted-foreground max-h-24 overflow-y-auto">
          <span className="font-semibold text-foreground">JWT Payload:</span><br/>
          {JSON.stringify(user, null, 2)}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={expireAccessToken} className="text-[10px] h-8" title="Force Access Token Expiration (Silent Refresh Test)">
            <Zap className="me-1.5 size-3 text-orange-500" /> Expire Access
          </Button>
          <Button variant="outline" size="sm" onClick={expireRefreshToken} className="text-[10px] h-8" title="Force Refresh Token Expiration (Hard Logout Test)">
            <ShieldAlert className="me-1.5 size-3 text-destructive" /> Expire Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleTestDashboard} className="text-[10px] h-8">
            <Database className="me-1.5 size-3 text-blue-500" /> Test Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={handleHardLogout} className="text-[10px] h-8 hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="me-1.5 size-3" /> Hard Logout
          </Button>
        </div>

        {dashboardData && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-[10px] font-mono text-blue-700 dark:text-blue-300">
            {JSON.stringify(dashboardData)}
          </div>
        )}
      </div>
    </div>
  );
}
