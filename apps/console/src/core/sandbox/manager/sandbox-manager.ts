import { useSandboxStore, DEFAULT_SANDBOX_PERSONAS } from '../store/sandbox-store';
import { sandboxRegistry } from './sandbox-registry';
import { withSimulationDecorator } from './simulation-decorator';
import type {
  SandboxPersona,
  SandboxPersonaId,
  SandboxRequest,
  SandboxResponse,
} from '../types';

export class UnifiedSandboxManager {
  private static instance: UnifiedSandboxManager;

  private constructor() {}

  public static getInstance(): UnifiedSandboxManager {
    if (!UnifiedSandboxManager.instance) {
      UnifiedSandboxManager.instance = new UnifiedSandboxManager();
    }
    return UnifiedSandboxManager.instance;
  }

  /**
   * Check if sandbox mode is currently enabled in store (strictly false in production)
   */
  public isEnabled(): boolean {
    if (!import.meta.env.DEV) {
      return false;
    }
    return useSandboxStore.getState().enabled;
  }

  /**
   * Get active persona details
   */
  public getActivePersona(): SandboxPersona {
    const { activePersonaId } = useSandboxStore.getState();
    return DEFAULT_SANDBOX_PERSONAS[activePersonaId] || DEFAULT_SANDBOX_PERSONAS.admin;
  }

  /**
   * Switch the active persona and sync the active tenant
   */
  public switchPersona(personaId: SandboxPersonaId): void {
    useSandboxStore.getState().setActivePersona(personaId);
  }

  /**
   * Switch the active tenant
   */
  public switchTenant(tenantId: string): void {
    useSandboxStore.getState().setActiveTenant(tenantId);
  }

  /**
   * Configure simulated latency
   */
  public setLatency(minMs: number, maxMs?: number): void {
    useSandboxStore.getState().setNetworkLatency(minMs, maxMs);
  }

  /**
   * Configure fault injection
   */
  public setFaultInjection(faultRate: number, statusCode: number = 500): void {
    useSandboxStore.getState().setFaultInjection(faultRate, statusCode);
  }

  /**
   * Master toggle for sandbox mode
   */
  public setEnabled(enabled: boolean): void {
    useSandboxStore.getState().setEnabled(enabled);
  }

  /**
   * Reset sandbox configuration to initial default values
   */
  public resetConfig(): void {
    useSandboxStore.getState().resetToDefaults();
  }

  /**
   * Dispatch an incoming request against registered sandbox handlers.
   * If sandbox is disabled or no handler matches, returns null to signal fall-through.
   */
  public async handleRequest(
    req: SandboxRequest
  ): Promise<SandboxResponse | null> {
    if (!this.isEnabled()) {
      return null;
    }

    const state = useSandboxStore.getState();
    const headers: Record<string, string> = {};
    if (req.headers) {
      for (const [key, val] of Object.entries(req.headers)) {
        if (val !== undefined && val !== null) {
          headers[key.toLowerCase()] = String(val);
        }
      }
    }

    const match = sandboxRegistry.findHandler(req.url, req.method, headers);
    if (!match) {
      return null;
    }

    const { handler, context } = match;

    // Apply simulation decorator (latency + fault injection)
    return await withSimulationDecorator(
      () => handler.handler(req, context),
      state.networkSimulation
    );
  }
}

export const sandboxManager = UnifiedSandboxManager.getInstance();
