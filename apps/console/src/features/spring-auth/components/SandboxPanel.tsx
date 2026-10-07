import { SandboxDock } from '@/core/sandbox/ui/sandbox-dock';

/**
 * Backward-compatible wrapper for SandboxPanel.
 * Renders the Unified SandboxDock which contains both Auth Sandbox controls
 * and application-wide Persona / Tenant / Mock data orchestration.
 */
export function SandboxPanel() {
  return <SandboxDock />;
}
