import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  Boxes,
  Network,
} from 'lucide-react';
import { toast } from 'sonner';
import { useBlueprintCatalog, useProvisionTenant } from '../api/use-blueprint-catalog';
import { BlueprintCard } from './blueprint-card';
import type { BlueprintSummary } from '../api/types';

export interface BlueprintGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTenantId?: string;
}

export const BlueprintGalleryDialog: React.FC<BlueprintGalleryDialogProps> = ({
  open,
  onOpenChange,
  activeTenantId = 'demo-tenant',
}) => {
  const { data: blueprints = [], isLoading, isError } = useBlueprintCatalog();
  const provisionMutation = useProvisionTenant();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('bp_cms_publishing_v1');
  const [previewBlueprint, setPreviewBlueprint] = useState<BlueprintSummary | null>(null);

  const [tenantNameInput, setTenantNameInput] = useState<string>('');
  const [tenantIdInput, setTenantIdInput] = useState<string>(activeTenantId);

  const categories = ['All', 'Publishing', 'Operations', 'Commerce', 'General'];

  const filteredBlueprints = selectedCategory === 'All'
    ? blueprints
    : blueprints.filter((bp) => bp.category.toLowerCase() === selectedCategory.toLowerCase());

  const activeBlueprint = blueprints.find((bp) => bp.id === selectedBlueprintId) || blueprints[0];

  const handleProvision = async () => {
    if (!selectedBlueprintId) {
      toast.error('Please select a domain blueprint template.');
      return;
    }

    const targetTenantId = (tenantIdInput.trim() || activeTenantId).toLowerCase();
    const targetTenantName = tenantNameInput.trim() || `${targetTenantId.toUpperCase()} Workspace`;

    try {
      const result = await provisionMutation.mutateAsync({
        tenantId: targetTenantId,
        tenantName: targetTenantName,
        blueprintId: selectedBlueprintId,
      });

      toast.success(
        `Blueprint '${result.blueprintName}' provisioned successfully! (${result.createdEntityTypesCount} models created in ${result.executionTimeMs}ms)`
      );
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Provisioning failed';
      toast.error(`Blueprint provisioning failed: ${msg}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <DialogTitle className="text-xl font-bold tracking-tight">
              Domain Blueprint Gallery
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Seed pre-modeled, production-ready schema templates into workspace{' '}
            <code className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{tenantIdInput || activeTenantId}</code> in under 250ms with zero runtime coupling.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between gap-4">
            <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="text-xs rounded-lg px-3 py-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <span className="text-xs text-slate-400 font-mono">
              {filteredBlueprints.length} Templates
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
              <p className="text-xs font-mono">Scanning blueprint catalog manifests...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-xs text-destructive">
              Failed to load blueprint templates from catalog.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBlueprints.map((bp) => (
                <BlueprintCard
                  key={bp.id}
                  blueprint={bp}
                  isSelected={selectedBlueprintId === bp.id}
                  onSelect={setSelectedBlueprintId}
                  onPreview={setPreviewBlueprint}
                />
              ))}
            </div>
          )}

          {previewBlueprint && (
            <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-700 dark:text-sky-300">
                  Preview: {previewBlueprint.name}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewBlueprint(null)}
                  className="text-slate-400 hover:text-slate-600 text-[11px]"
                >
                  Close Preview
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300">{previewBlueprint.description}</p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                <span>{previewBlueprint.entityTypesCount} Models</span>
                <span>{previewBlueprint.relationshipsCount} Graph Edges</span>
                <span>Category: {previewBlueprint.category}</span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Boxes className="w-4 h-4 text-sky-500" />
              <span>Target Workspace Configuration</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="target-tenant-id" className="text-xs text-slate-500">
                  Target Tenant Identifier
                </Label>
                <Input
                  id="target-tenant-id"
                  value={tenantIdInput}
                  onChange={(e) => setTenantIdInput(e.target.value)}
                  placeholder="e.g. org-alpha"
                  className="font-mono text-xs bg-white dark:bg-slate-900"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="target-tenant-name" className="text-xs text-slate-500">
                  Workspace Display Name (Optional)
                </Label>
                <Input
                  id="target-tenant-name"
                  value={tenantNameInput}
                  onChange={(e) => setTenantNameInput(e.target.value)}
                  placeholder="e.g. Org Alpha Headquarters"
                  className="text-xs bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 px-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between sm:justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-500" />
            <span>
              Active: <strong className="text-slate-900 dark:text-white">{activeBlueprint?.name || 'Selected Blueprint'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={provisionMutation.isPending}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProvision}
              disabled={provisionMutation.isPending || !selectedBlueprintId}
              className="gap-2 text-xs bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/20"
            >
              {provisionMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Provisioning Schema & Cache...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Initialize Blueprint Workspace</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
