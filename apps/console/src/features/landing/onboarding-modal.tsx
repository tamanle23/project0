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
import { Sparkles, Loader2, CheckCircle2, Building2, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useBlueprintCatalog, useProvisionTenant, BlueprintCard, type BlueprintSummary } from '@/features/metadata';

export interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlanName?: string;
  onCompleted?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  open,
  onOpenChange,
  selectedPlanName = 'Basic (Free)',
  onCompleted,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [tenantName, setTenantName] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedBlueprintId, setSelectedBlueprintId] = useState('bp_cms_publishing_v1');

  const { data: blueprints = [], isLoading: isLoadingBlueprints } = useBlueprintCatalog();
  const provisionMutation = useProvisionTenant();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName.trim()) {
      toast.error('Please enter your Organization / Workspace Name.');
      return;
    }
    const computedTenantId = tenantId.trim() || tenantName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 16);
    setTenantId(computedTenantId);
    setStep(2);
  };

  const handleFinishOnboarding = async () => {
    if (!selectedBlueprintId) {
      toast.error('Please select a domain blueprint template.');
      return;
    }

    try {
      const result = await provisionMutation.mutateAsync({
        tenantId,
        tenantName,
        blueprintId: selectedBlueprintId,
      });

      toast.success(
        `Workspace '${tenantName}' initialized with '${result.blueprintName}' blueprint!`
      );
      onOpenChange(false);
      if (onCompleted) onCompleted();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Workspace setup failed';
      toast.error(`Setup failed: ${msg}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl p-6">
        <DialogHeader className="text-left border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <DialogTitle className="text-xl font-bold">
              {step === 1 ? 'Step 1: Create Organization Workspace' : 'Step 2: Choose Domain Blueprint'}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Selected Tier: <strong className="text-sky-600">{selectedPlanName}</strong>
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="org-name" className="text-xs font-semibold">
                  Workspace / Organization Name *
                </Label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <Input
                    id="org-name"
                    required
                    value={tenantName}
                    onChange={(e) => {
                      setTenantName(e.target.value);
                      if (!tenantId) {
                        setTenantId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 16));
                      }
                    }}
                    placeholder="e.g. Unipost Global"
                    className="pl-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tenant-id" className="text-xs font-semibold">
                  Tenant Identifier (URL slug) *
                </Label>
                <Input
                  id="tenant-id"
                  required
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  placeholder="e.g. unipost-global"
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-semibold">
                  Admin Work Email *
                </Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <Input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@organization.com"
                    className="pl-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-password" className="text-xs font-semibold">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="pl-9 text-xs"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-200/50 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2 bg-sky-600 hover:bg-sky-700 text-white">
                <span>Continue to Blueprints</span>
                <Sparkles className="w-4 h-4" />
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <p className="text-xs text-slate-500">
              Select a domain template to seed into <code className="font-mono text-sky-600 font-bold">{tenantId}</code> in under 250ms:
            </p>

            {isLoadingBlueprints ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {blueprints.map((bp: BlueprintSummary) => (
                  <BlueprintCard
                    key={bp.id}
                    blueprint={bp}
                    isSelected={selectedBlueprintId === bp.id}
                    onSelect={setSelectedBlueprintId}
                  />
                ))}
              </div>
            )}

            <DialogFooter className="pt-4 border-t border-slate-200/50 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={provisionMutation.isPending}>
                Back
              </Button>
              <Button
                type="button"
                onClick={handleFinishOnboarding}
                disabled={provisionMutation.isPending || !selectedBlueprintId}
                className="gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white"
              >
                {provisionMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Initializing Workspace...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Initialize Workspace</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
