import { createFileRoute } from '@tanstack/react-router';
import { HeroSection, PricingSection } from '@/features/landing';
import { Header } from '@/components/layout/header';
import { LanguageSwitch } from '@/components/language-switch';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Unipost Platform</span>
        </div>

        <div className="ms-auto flex items-center space-x-3">
          <LanguageSwitch />
          <ThemeSwitch />
          <a href="/_authenticated/metadata/">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs font-semibold rounded-xl">
              <span>Sign In / Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </Header>

      <main className="flex-1">
        <HeroSection />
        <PricingSection />
      </main>

      <footer className="py-8 border-t border-slate-200/50 dark:border-slate-800 text-center text-xs text-slate-400">
        <p>© 2026 Unipost Data Platform. Powered by Spring Modulith, Domain Blueprints & payOS VietQR Engine.</p>
      </footer>
    </div>
  );
}

export const Route = createFileRoute('/' as any)({
  component: PublicLandingPage,
});
