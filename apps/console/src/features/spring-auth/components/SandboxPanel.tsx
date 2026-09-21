import { useState } from 'react';
import { useSpringAuthStore } from '../store';
import { springApiClient } from '../api-client';
import { ShieldAlert, Zap, LogOut, Database, TestTube2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SandboxPanel() {
  const { isAuthenticated, user, expireAccessToken, expireRefreshToken, clearTokens } = useSpringAuthStore();
  const [dashboardData, setDashboardData] = useState<any>(null);

  const handleTestDashboard = async () => {
    try {
      const { data } = await springApiClient.get('/api/admin/dashboard');
      setDashboardData(data);
      toast.success('Protected route access granted!');
    } catch (e: any) {
      toast.error(`Dashboard Access Failed: ${e?.response?.status}`);
      setDashboardData(null);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-2xl border border-white/20 bg-background/80 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
      <div className="flex items-center gap-2 mb-3 border-b border-border/50 pb-2">
        <TestTube2 className="size-5 text-emerald-500" />
        <h3 className="font-semibold text-sm">Auth Sandbox Engine</h3>
      </div>

      {!isAuthenticated ? (
        <div className="text-xs text-muted-foreground text-center p-2">
          Sandbox enabled. Use the bypass button in the Login Modal to authenticate.
        </div>
      ) : (
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
            <Button variant="outline" size="sm" onClick={clearTokens} className="text-[10px] h-8 hover:bg-destructive hover:text-destructive-foreground">
              <LogOut className="me-1.5 size-3" /> Hard Logout
            </Button>
          </div>

          {dashboardData && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-[10px] font-mono text-blue-700 dark:text-blue-300">
              {JSON.stringify(dashboardData)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
