import React, { useState } from 'react';
import { Lock, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PayOsQrModal } from './payos-qr-modal';

export interface FeatureGateProps {
  featureKey: string;
  featureTitle: string;
  featureDescription?: string;
  isEntitled?: boolean;
  children: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  featureKey: _featureKey,
  featureTitle,
  featureDescription = 'Upgrade your tenant plan to Pro or Pro Max to unlock this enterprise capability.',
  isEntitled = true,
  children,
}) => {
  const [isPayOsModalOpen, setIsPayOsModalOpen] = useState(false);

  if (isEntitled) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
      <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 mb-3 shadow-md">
        <Lock className="w-6 h-6" />
      </div>

      <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
        <span>{featureTitle}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold uppercase">
          Pro Feature
        </span>
      </h4>

      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
        {featureDescription}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <Button
          onClick={() => setIsPayOsModalOpen(true)}
          className="gap-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-amber-500/20"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Upgrade Tier via payOS VietQR</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <PayOsQrModal
        open={isPayOsModalOpen}
        onOpenChange={setIsPayOsModalOpen}
        planName="Pro Upgrade"
        amountVnd={199000}
      />
    </div>
  );
};
