import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SandboxDock } from '../ui/sandbox-dock';
import { useSandboxStore } from '../store/sandbox-store';
import { useSpringAuthStore } from '@/features/spring-auth/store';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('SandboxDock UI Component', () => {
  beforeEach(() => {
    useSandboxStore.getState().resetToDefaults();
    useSandboxStore.getState().setEnabled(true);
    useSpringAuthStore.getState().clearTokens();

    // Mock URL search params with ?sandbox=true
    delete (window as any).location;
    (window as any).location = new URL('http://localhost/?sandbox=true');
  });

  it('should render the expanded SandboxDock when ?sandbox=true is present', () => {
    render(<SandboxDock />);

    expect(screen.getByText('Unified Sandbox Dock')).toBeTruthy();
    expect(screen.getByText('Persona & Scope')).toBeTruthy();
    expect(screen.getByText('Network / Chaos')).toBeTruthy();
  });

  it('should switch active persona when clicking persona buttons', () => {
    render(<SandboxDock />);

    const creatorBtn = screen.getByText('Content');
    fireEvent.click(creatorBtn);

    expect(useSandboxStore.getState().activePersonaId).toBe('creator');
    expect(useSandboxStore.getState().activeTenantId).toBe('tenant-eu-central-1');
    expect(useSpringAuthStore.getState().user?.sub).toBe('creator');
  });

  it('should allow switching tabs and adjusting latency settings', () => {
    render(<SandboxDock />);

    const networkTab = screen.getByText('Network / Chaos');
    fireEvent.click(networkTab);

    expect(screen.getByText('Latency Jitter')).toBeTruthy();

    const highLatencyBtn = screen.getByText('1.5s');
    fireEvent.click(highLatencyBtn);

    expect(useSandboxStore.getState().networkSimulation.latencyMaxMs).toBe(2000);
  });
});
