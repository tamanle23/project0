import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LandingPricing } from './components/landing-pricing';
import { LandingHero } from './components/landing-hero';


describe('LandingHero Component', () => {
  it('renders main value proposition and CTA buttons', () => {
    const handleGetStarted = vi.fn();
    const handleExplore = vi.fn();

    render(
      <LandingHero
        onGetStarted={handleGetStarted}
        onExploreBlueprints={handleExplore}
      />
    );

    expect(screen.getByText(/Nền Tảng Quản Trị Dữ Liệu Động/i)).toBeDefined();
    expect(screen.getByText(/Bắt đầu miễn phí/i)).toBeDefined();
    expect(screen.getByText(/Khám phá Domain Blueprints/i)).toBeDefined();

    fireEvent.click(screen.getByText(/Bắt đầu miễn phí/i));
    expect(handleGetStarted).toHaveBeenCalled();
  });
});

describe('LandingPricing Component', () => {
  it('toggles between monthly and yearly cadence', () => {
    const handleSelectPlan = vi.fn();

    render(<LandingPricing onSelectPlan={handleSelectPlan} />);

    expect(screen.getByText('199,000 VND')).toBeDefined();

    const yearlyBtn = screen.getByText(/Hàng năm/i);
    fireEvent.click(yearlyBtn);

    expect(screen.getByText('1,990,000 VND')).toBeDefined();
  });

  it('triggers onSelectPlan when clicking plan CTAs', () => {
    const handleSelectPlan = vi.fn();

    render(<LandingPricing onSelectPlan={handleSelectPlan} />);

    const freeBtn = screen.getByText('Bắt đầu miễn phí ngay');
    fireEvent.click(freeBtn);
    expect(handleSelectPlan).toHaveBeenCalledWith('BASIC', 'monthly');

    const proBtn = screen.getByText('Nâng cấp qua VietQR');
    fireEvent.click(proBtn);
    expect(handleSelectPlan).toHaveBeenCalledWith('PRO', 'monthly');
  });
});
