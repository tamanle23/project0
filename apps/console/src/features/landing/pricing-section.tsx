import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import { PayOsQrModal } from './payos-qr-modal';
import { OnboardingModal } from './onboarding-modal';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [payOsModal, setPayOsModal] = useState<{ open: boolean; planName: string; amountVnd: number }>({
    open: false,
    planName: 'Pro',
    amountVnd: 199000,
  });

  const [onboardingModal, setOnboardingModal] = useState<{ open: boolean; planName: string }>({
    open: false,
    planName: 'Basic (Free)',
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic (Cơ bản)',
      description: 'Dành cho cá nhân & nhóm nhỏ khởi chạy metadata workspace.',
      priceMonthly: 0,
      priceAnnual: 0,
      badge: 'Free Forever',
      icon: Shield,
      features: [
        '1 User quản trị workspace',
        'Không giới hạn Entity Records',
        'Domain Blueprints Seeding (<250ms)',
        'Bento Data Grid & Dynamic Forms',
        'Xuất dữ liệu JSON / NDJSON',
      ],
      ctaText: 'Bắt đầu Miễn phí',
      ctaVariant: 'outline' as const,
      highlight: false,
    },
    {
      id: 'pro',
      name: 'Pro (Pro)',
      description: 'Dành cho doanh nghiệp vừa cần Schema Studio & Pattern C Graph.',
      priceMonthly: 199000,
      priceAnnual: 169000,
      badge: 'Most Popular',
      icon: Zap,
      features: [
        'Lên đến 5 Users thành viên',
        'Tất cả tính năng từ Basic',
        'Architect Studio & Live Schema Builder',
        'Pattern C Graph Edges & Cross-Model Linking',
        'payOS VietQR Tự động xác thực 1-Click',
      ],
      ctaText: 'Nâng cấp Pro qua payOS',
      ctaVariant: 'default' as const,
      highlight: true,
    },
    {
      id: 'pro_max',
      name: 'Pro Max (Pro Max)',
      description: 'Dành cho tổ chức lớn với AI Agent MCP & Hazelcast L2 Cache.',
      priceMonthly: 499000,
      priceAnnual: 399000,
      badge: 'Enterprise Tier',
      icon: Crown,
      features: [
        'Không giới hạn số lượng Users',
        'Tất cả tính năng từ Pro',
        'AI Agent MCP Integration & Schema Backfill',
        'Hazelcast L2 Distributed Cache Fabric',
        'SLA 99.9% & Hỗ trợ ưu tiên 24/7',
      ],
      ctaText: 'Đăng ký Pro Max',
      ctaVariant: 'default' as const,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 relative px-4 max-w-7xl mx-auto">
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
          Transparent Pricing Tiers
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Bảng giá Linh hoạt & Rõ ràng
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Khởi tạo workspace miễn phí tức thì. Nâng cấp tính năng Pro qua cổng thanh toán payOS VietQR tự động.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs ${!isAnnual ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Thanh toán Hàng tháng
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-1 transition-colors"
          >
            <div
              className={`w-4 h-4 rounded-full bg-sky-500 transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs ${isAnnual ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Thanh toán Hàng năm
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            Tặng 2 Tháng
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const currentPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative p-6 rounded-3xl backdrop-blur-2xl border flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent border-sky-500/50 shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/30'
                  : 'bg-white/60 dark:bg-slate-900/60 border-white/30 dark:border-white/10 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px]">
                  {plan.description}
                </p>

                <div className="my-6">
                  {currentPrice === 0 ? (
                    <span className="text-3xl font-black text-slate-900 dark:text-white">Miễn phí</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                        {currentPrice.toLocaleString('vi-VN')}
                      </span>
                      <span className="text-xs text-slate-500">VND / tháng</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/50 dark:border-slate-800">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant={plan.ctaVariant}
                  onClick={() => {
                    if (plan.id === 'basic') {
                      setOnboardingModal({ open: true, planName: plan.name });
                    } else {
                      setPayOsModal({ open: true, planName: plan.name, amountVnd: currentPrice });
                    }
                  }}
                  className={`w-full font-semibold py-2.5 rounded-xl ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/20'
                      : ''
                  }`}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <PayOsQrModal
        open={payOsModal.open}
        onOpenChange={(open: boolean) => setPayOsModal((prev) => ({ ...prev, open }))}
        planName={payOsModal.planName}
        amountVnd={payOsModal.amountVnd}
        onPaymentSuccess={() => setOnboardingModal({ open: true, planName: payOsModal.planName })}
      />

      <OnboardingModal
        open={onboardingModal.open}
        onOpenChange={(open: boolean) => setOnboardingModal((prev) => ({ ...prev, open }))}
        selectedPlanName={onboardingModal.planName}
      />
    </section>
  );
};
