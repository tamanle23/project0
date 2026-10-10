import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, ArrowRight, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  onSelectPlan: (tier: 'BASIC' | 'PRO' | 'PRO_MAX', cadence: 'monthly' | 'yearly') => void;
}

export const LandingPricing: React.FC<Props> = ({ onSelectPlan }) => {
  const [cadence, setCadence] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Bảng giá Minh bạch & Dự đoán được
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          Không tính phí theo số lượng bản ghi hay lượt truy vấn. Khai phóng toàn bộ tiềm năng doanh nghiệp của bạn với quyền lợi tính năng động.
        </p>

        {/* Cadence Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="p-1 rounded-2xl bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-sm flex items-center">
            <button
              type="button"
              onClick={() => setCadence('monthly')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all',
                cadence === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Hàng tháng (Monthly)
            </button>
            <button
              type="button"
              onClick={() => setCadence('yearly')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5',
                cadence === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span>Hàng năm (Yearly)</span>
              <Badge variant="secondary" className="text-[9px] font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-none px-1.5">
                -20% (2 tháng miễn phí)
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Basic */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-foreground">🆓 Basic (Cơ bản)</span>
              <Badge variant="secondary" className="text-[10px] font-mono">Dùng thử</Badge>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-black text-foreground">Miễn phí</div>
              <div className="text-xs text-muted-foreground mt-1">Không giới hạn thời gian trải nghiệm</div>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Hoàn hảo cho lập trình viên cá nhân, freelancer hoặc tổ chức nhỏ bắt đầu mô hình hóa dữ liệu.
            </p>

            <ul className="space-y-3 text-xs text-muted-foreground border-t border-white/20 pt-5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium">1 User duy nhất</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Không giới hạn bản ghi dữ liệu (Records)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Data Explorer & Biểu mẫu động</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Kho Domain Blueprints chuẩn hóa</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hỗ trợ qua cộng đồng</span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onSelectPlan('BASIC', cadence)}
            className="w-full mt-8 text-xs font-bold bg-white/60 dark:bg-white/5 border-white/20 hover:bg-white/80"
          >
            Bắt đầu miễn phí ngay
          </Button>
        </div>

        {/* Tier 2: Pro (Featured) */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-500/10 via-white/70 to-white/50 dark:from-blue-900/20 dark:via-slate-900/80 dark:to-slate-900/60 backdrop-blur-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/10 flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Phổ biến nhất</span>
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">⚡ Pro (Chuyên nghiệp)</span>
              <Badge className="text-[10px] font-mono bg-blue-500/10 text-blue-600 border border-blue-500/20">
                payOS VietQR
              </Badge>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-black text-foreground">
                {cadence === 'monthly' ? '199,000 VND' : '1,990,000 VND'}
                <span className="text-xs font-normal text-muted-foreground ms-1">
                  / {cadence === 'monthly' ? 'tháng' : 'năm'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {cadence === 'yearly' ? 'Tiết kiệm 398,000 VND mỗi năm' : 'Thanh toán linh hoạt theo tháng'}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Dành cho đội ngũ chuyên gia, doanh nghiệp SMEs cần mở rộng cộng tác và quản lý quan hệ thực thể phức tạp.
            </p>

            <ul className="space-y-3 text-xs text-muted-foreground border-t border-white/20 pt-5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium">Lên đến 5 Users thành viên</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Không giới hạn bản ghi dữ liệu (Records)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-semibold">Schema Architect Studio nâng cao</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Pattern C Multi-Dimensional Graph Edges</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Xuất dữ liệu streaming & sao lưu định kỳ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hỗ trợ ưu tiên (SLA 4h)</span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={() => onSelectPlan('PRO', cadence)}
            className="w-full mt-8 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
          >
            <span>Nâng cấp qua VietQR</span>
            <ArrowRight className="w-3.5 h-3.5 ms-1" />
          </Button>
        </div>

        {/* Tier 3: Pro Max */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">👑 Pro Max (Doanh nghiệp)</span>
              <Badge variant="secondary" className="text-[10px] font-mono">Toàn quyền</Badge>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-black text-foreground">
                {cadence === 'monthly' ? '499,000 VND' : '4,990,000 VND'}
                <span className="text-xs font-normal text-muted-foreground ms-1">
                  / {cadence === 'monthly' ? 'tháng' : 'năm'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {cadence === 'yearly' ? 'Tiết kiệm 998,000 VND mỗi năm' : 'Toàn bộ tính năng cao cấp nhất'}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Dành cho doanh nghiệp quy mô lớn yêu cầu không giới hạn người dùng, tích hợp AI Agent và bảo mật chuyên sâu.
            </p>

            <ul className="space-y-3 text-xs text-muted-foreground border-t border-white/20 pt-5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium">Không giới hạn Users thành viên</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Không giới hạn bản ghi dữ liệu (Records)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-semibold">Tích hợp AI Agent MCP Server</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>State Machine & Vòng đời thực thể</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Quản lý nhiều Workspace (Multi-Tenant Hub)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Kỹ sư hỗ trợ giải pháp 1-1 chuyên trách</span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onSelectPlan('PRO_MAX', cadence)}
            className="w-full mt-8 text-xs font-bold bg-white/60 dark:bg-white/5 border-white/20 hover:bg-white/80"
          >
            Trải nghiệm Pro Max
          </Button>
        </div>
      </div>
    </section>
  );
};
