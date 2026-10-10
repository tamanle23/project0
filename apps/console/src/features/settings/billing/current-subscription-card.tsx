import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Building2, Sparkles, ShieldCheck, Check, Layers, Database, HardDrive, Calendar } from 'lucide-react';
import type { TenantBillingSummary } from '@/features/metadata/api/use-billing';

interface Props {
  billing?: TenantBillingSummary;
  tenantName: string;
}

export const CurrentSubscriptionCard: React.FC<Props> = ({ billing, tenantName }) => {
  const planTier = billing?.planTier || 'BASIC';
  const cadence = billing?.billingCadence || 'MONTHLY';
  const status = billing?.status || 'ACTIVE';
  const expiresAt = billing?.expiresAt ? new Date(billing.expiresAt).toLocaleDateString('vi-VN') : 'Vĩnh viễn';

  const quotas = billing?.quotas || {
    workspacesUsed: 1,
    maxWorkspaces: 1,
    schemasUsed: 2,
    maxSchemas: 5,
    recordsUsed: 420,
    maxRecords: -1,
  };

  const getPlanBadge = () => {
    switch (planTier) {
      case 'ENTERPRISE':
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold">
            Enterprise (organization)
          </Badge>
        );
      case 'PRO_MAX':
        return (
          <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-semibold">
            Pro Max (individual)
          </Badge>
        );
      case 'PRO':
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-semibold">
            Pro (individual)
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs font-semibold">
            Basic (individual)
          </Badge>
        );
    }
  };

  const wsPercent = quotas.maxWorkspaces > 0 ? Math.min(100, Math.round((quotas.workspacesUsed / quotas.maxWorkspaces) * 100)) : 10;
  const scPercent = quotas.maxSchemas > 0 ? Math.min(100, Math.round((quotas.schemasUsed / quotas.maxSchemas) * 100)) : 25;

  return (
    <div className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 space-y-6">
      {/* Top Tenant & Subscription Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0 shadow-sm">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tổ chức (Tenant)
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                ID: {billing?.tenantId || 'tenant'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {tenantName}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {getPlanBadge()}
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse me-1.5" />
            {status}
          </Badge>
        </div>
      </div>

      {/* Subscription Metrics & Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20">
          <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Kỳ hạn thanh toán
          </span>
          <span className="text-sm font-bold text-foreground">
            {cadence === 'YEARLY' ? 'Hàng năm (Yearly)' : 'Hàng tháng (Monthly)'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20">
          <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Hạn gia hạn tiếp theo
          </span>
          <span className="text-sm font-bold text-foreground">
            {expiresAt}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20">
          <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Bảo vệ dữ liệu RLS
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            Active Multi-Tenant Isolation
          </span>
        </div>
      </div>

      {/* Resource Quota Consumption Gauges */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Định ngạch tài nguyên tiêu thụ (Resource Quotas)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Workspaces */}
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-500" />
                Workspaces
              </span>
              <span className="font-mono text-muted-foreground">
                {quotas.workspacesUsed} / {quotas.maxWorkspaces > 0 ? quotas.maxWorkspaces : '∞'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${wsPercent}%` }} />
            </div>
          </div>

          {/* Schemas */}
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-purple-500" />
                Entity Schemas
              </span>
              <span className="font-mono text-muted-foreground">
                {quotas.schemasUsed} / {quotas.maxSchemas > 0 ? quotas.maxSchemas : '∞'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${scPercent}%` }} />
            </div>
          </div>

          {/* Records */}
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-emerald-500" />
                Bản ghi dữ liệu (Records)
              </span>
              <span className="font-mono text-muted-foreground">
                {quotas.recordsUsed.toLocaleString()} / {quotas.maxRecords > 0 ? quotas.maxRecords.toLocaleString() : '∞'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: '15%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Active Entitlement Feature Chips */}
      <div className="space-y-2 pt-2 border-t border-white/20 dark:border-white/10">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Feature Entitlement Tokens đang cấp quyền:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {billing?.entitledFeatures?.map((f) => (
            <Badge
              key={f}
              variant="outline"
              className="text-[10px] font-mono bg-white/30 dark:bg-white/5 border-white/20 flex items-center gap-1"
            >
              <Check className="h-3 w-3 text-emerald-500" />
              {f}
            </Badge>
          )) || (
            <span className="text-xs text-muted-foreground italic">Không có token kích hoạt</span>
          )}
        </div>
      </div>
    </div>
  );
};
