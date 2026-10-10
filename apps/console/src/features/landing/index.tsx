import React, { useState } from 'react';
import { LandingNavbar } from './components/landing-navbar';
import { LandingHero } from './components/landing-hero';
import { LandingShowcase } from './components/landing-showcase';
import { LandingBentoGrid } from './components/landing-bento-grid';
import { LandingPricing } from './components/landing-pricing';
import { LandingBlueprintsSection } from './components/landing-blueprints-section';
import { LandingFooter } from './components/landing-footer';
import { OnboardingFunnelModal } from './components/onboarding-funnel-modal';
import { useNavigate } from '@tanstack/react-router';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PRO' | 'PRO_MAX'>('BASIC');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('bp_cms_publishing_v1');

  const handleOpenSignUp = (plan: 'BASIC' | 'PRO' | 'PRO_MAX' = 'BASIC', blueprintId?: string) => {
    setSelectedPlan(plan);
    if (blueprintId) setSelectedBlueprintId(blueprintId);
    setIsOnboardingOpen(true);
  };

  const handleOpenSignIn = () => {
    navigate({ to: '/(auth)/sign-in' as any });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground selection:bg-blue-500 selection:text-white flex flex-col">
      <LandingNavbar
        onOpenSignUp={() => handleOpenSignUp('BASIC')}
        onOpenSignIn={handleOpenSignIn}
      />

      <main className="flex-1">
        <LandingHero
          onGetStarted={() => handleOpenSignUp('BASIC')}
          onExploreBlueprints={() => {
            const el = document.getElementById('blueprints');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <LandingShowcase />

        <LandingBentoGrid />

        <LandingPricing
          onSelectPlan={(tier) => handleOpenSignUp(tier)}
        />

        <LandingBlueprintsSection
          onSelectBlueprint={(bpId) => handleOpenSignUp('BASIC', bpId)}
        />
      </main>

      <LandingFooter />

      <OnboardingFunnelModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        defaultPlan={selectedPlan}
        defaultBlueprintId={selectedBlueprintId}
      />
    </div>
  );
};
