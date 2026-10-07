import type { AxiosInstance } from 'axios';
import { authSandboxHandler } from '../../../core/sandbox/handlers/auth-sandbox-handler';
import { sandboxRegistry } from '../../../core/sandbox/manager/sandbox-registry';

// Ensure the auth handler is registered in the Unified Sandbox Registry
sandboxRegistry.register(authSandboxHandler);

/**
 * Backward-compatible bridge for existing consumers of enableSandboxMockEngine.
 * Adapts incoming Axios requests to the Unified Auth Sandbox handler.
 */
export function enableSandboxMockEngine(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use((config) => {
    const url = config.url || '';
    const method = config.method?.toUpperCase() || 'GET';

    const getHeader = (headers: any, key: string): string | null => {
      if (!headers) return null;
      if (typeof headers.get === 'function') {
        const val = headers.get(key);
        return val ? String(val) : null;
      }
      return (headers[key] || headers[key.toLowerCase()]) as string | null;
    };

    const isMockRequest = getHeader(config.headers, 'X-Sandbox-Mock') === 'true';
    const authHeader = getHeader(config.headers, 'Authorization');
    const isMockToken = Boolean(
      authHeader &&
        (authHeader.includes('mock_signature') || authHeader.includes('bW9ja19zaWduYXR1cmU'))
    );

    let body: Record<string, any> = {};
    try {
      body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
    } catch {
      body = config.data || {};
    }
    const isMockRefresh =
      body.refreshToken && String(body.refreshToken).startsWith('mock_refresh_token_');

    const shouldMock =
      (url === '/auth/token' && method === 'POST' && isMockRequest) ||
      (url === '/auth/refresh' && method === 'POST' && isMockRefresh) ||
      (url === '/auth/logout' && method === 'POST' && isMockToken) ||
      (url === '/admin/dashboard' && method === 'GET' && isMockToken);

    if (shouldMock) {
      config.adapter = async (mockConfig) => {
        const headers: Record<string, string> = {};
        if (config.headers) {
          Object.entries(config.headers).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
              headers[k.toLowerCase()] = String(v);
            }
          });
        }

        const res = await authSandboxHandler.handler(
          {
            url,
            method,
            data: config.data,
            headers,
          },
          {
            url,
            method,
            headers,
            pathname: url.split('?')[0],
            searchParams: new URLSearchParams(url.split('?')[1] || ''),
          }
        );

        if (res.status >= 200 && res.status < 300) {
          return {
            data: res.data,
            status: res.status,
            statusText: res.statusText || 'OK',
            headers: res.headers || {},
            config: mockConfig,
            request: {},
          };
        }

        return Promise.reject({
          response: {
            data: res.data,
            status: res.status,
            statusText: res.statusText || 'Error',
          },
          config: mockConfig,
        });
      };
    }

    return config;
  });
}
