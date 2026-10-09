import type { AxiosInstance } from 'axios';
import { attachSandboxAxiosInterceptor } from '../../../core/sandbox/adapters/axios-sandbox-adapter';

/**
 * Backward-compatible bridge for existing consumers of enableSandboxMockEngine.
 * Delegates to attachSandboxAxiosInterceptor for unified routing.
 */
export function enableSandboxMockEngine(apiClient: AxiosInstance) {
  if (!import.meta.env.DEV) {
    return;
  }
  attachSandboxAxiosInterceptor(apiClient);
}
