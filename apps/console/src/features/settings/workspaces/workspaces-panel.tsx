import React, { useState } from 'react';
import { ContentSection } from '../components/content-section';
import { useProfileStore } from '@/stores/profile-store';
import { useMetadataUiStore } from '@/features/metadata/store/use-metadata-ui-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateWorkspaceModal } from './create-workspace-modal';
import {
  Building2,
  Plus,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export const WorkspacesPanel: React.FC = () => {
  const { profiles, currentProfile, setCurrentProfile } = useProfileStore();
  const { setActiveTenant } = useMetadataUiStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleSwitchWorkspace = (p: (typeof profiles)[0]) => {
    setCurrentProfile(p);
    const tenantId = (p.id as string) || p.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setActiveTenant(tenantId, p.name);
    toast.success(`Đã chuyển sang workspace "${p.name}"`);
  };

  return (
    <ContentSection
      title="Workspaces & Organizations"
      desc="Quản lý danh sách các workspace tổ chức độc lập. Mỗi workspace sở hữu lược đồ và dữ liệu phân lập hoàn toàn qua PostgreSQL Row-Level Security."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Đang quản trị <span className="font-bold text-foreground">{profiles.length}</span> workspaces
          </div>
          <Button
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            className="text-xs gap-1.5 font-semibold bg-primary text-primary-foreground shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tạo Workspace Mới</span>
          </Button>
        </div>

        {/* Workspaces List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((p) => {
            const isCurrent =
              (p.id && p.id === currentProfile?.id) || p.name === currentProfile?.name;
            const Logo = p.logo || Building2;

            return (
              <div
                key={(p.id as string) ?? p.name}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-500/10 border-blue-500/50 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-white/40 dark:bg-white/5 border-white/20 hover:border-white/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                        <Logo className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{p.name}</h4>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          ID: {(p.id as string) ?? p.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                        </span>
                      </div>
                    </div>
                    {isCurrent ? (
                      <Badge className="text-[10px] font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Đang chọn
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {p.plan || 'Standard'}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Môi trường dữ liệu Multi-Tenant độc lập được bảo vệ bởi PostgreSQL Row-Level Security.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>RLS Enforced</span>
                  </div>

                  {isCurrent ? (
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Không gian hiện tại</span>
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSwitchWorkspace(p)}
                      className="h-8 text-xs font-semibold text-primary hover:bg-primary/10"
                    >
                      <span>Chuyển sang workspace này →</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Workspace Modal */}
        <CreateWorkspaceModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </div>
    </ContentSection>
  );
};
