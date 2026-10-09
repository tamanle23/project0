import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { OnboardingModal } from './onboarding-modal';
import { useBlueprintCatalog, BlueprintCard, TemplatePreviewModal, type BlueprintSummary } from '@/features/metadata';

export const HeroSection: React.FC = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState('bp_cms_publishing_v1');
  const [previewBlueprint, setPreviewBlueprint] = useState<BlueprintSummary | null>(null);

  const { data: blueprints = [] } = useBlueprintCatalog();

  return (
    <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 backdrop-blur-xl shadow-sm text-xs font-semibold">
        <Sparkles className="w-4 h-4" />
        <span>Nền tảng Quản trị Dữ liệu Động & Metadata Đa Khách Hàng (Multi-Tenant)</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
        Khởi tạo Nền tảng Metadata Doanh nghiệp trong{' '}
        <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          dưới 250ms
        </span>
      </h1>

      <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Tự động hóa toàn bộ quy trình thiết kế Schema Builder, Pattern C Graph Edges, Dynamic Bento Grids và Pre-warmed Hazelcast Cache với Domain Blueprints chuẩn hóa.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button
          size="lg"
          onClick={() => setIsOnboardingOpen(true)}
          className="gap-2 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-xl shadow-sky-500/25 px-6 py-3 rounded-2xl"
        >
          <span>Khởi tạo Workspace Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
        <a href="#pricing">
          <Button size="lg" variant="outline" className="text-sm font-semibold px-6 py-3 rounded-2xl">
            Xem Bảng Giá & payOS
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto text-left">
        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-white/10 backdrop-blur-xl flex items-center gap-3">
          <Zap className="w-5 h-5 text-sky-500 shrink-0" />
          <div>
            <p className="font-bold text-xs text-slate-900 dark:text-white">&lt; 250ms Provisioning</p>
            <p className="text-[11px] text-slate-500">Atomic deep-cloning</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-white/10 backdrop-blur-xl flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-500 shrink-0" />
          <div>
            <p className="font-bold text-xs text-slate-900 dark:text-white">Hazelcast L2 Cache</p>
            <p className="text-[11px] text-slate-500">Zero cold-start validation</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-white/10 backdrop-blur-xl flex items-center gap-3">
          <Layers className="w-5 h-5 text-violet-500 shrink-0" />
          <div>
            <p className="font-bold text-xs text-slate-900 dark:text-white">Pattern C Graph</p>
            <p className="text-[11px] text-slate-500">Dynamic relationship edges</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-white/10 backdrop-blur-xl flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <p className="font-bold text-xs text-slate-900 dark:text-white">PostgreSQL RLS</p>
            <p className="text-[11px] text-slate-500">Isolated multi-tenancy</p>
          </div>
        </div>
      </div>

      <div className="pt-12 space-y-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-500" />
            <span>Thư viện Domain Blueprints Trực quan</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Select a blueprint to preview graph diagram</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
          {blueprints.map((bp: BlueprintSummary) => (
            <BlueprintCard
              key={bp.id}
              blueprint={bp}
              isSelected={selectedBlueprintId === bp.id}
              onSelect={setSelectedBlueprintId}
              onPreview={setPreviewBlueprint}
            />
          ))}
        </div>
      </div>

      <OnboardingModal
        open={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
      />

      <TemplatePreviewModal
        blueprint={previewBlueprint}
        open={Boolean(previewBlueprint)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewBlueprint(null);
        }}
        onSelectAndProvision={() => {
          setIsOnboardingOpen(true);
        }}
      />
    </section>
  );
};
