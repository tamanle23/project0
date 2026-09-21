import type { AxiosInstance } from 'axios';
import { decodeJwt } from '../utils/jwt';

// Helper to base64 encode without padding/symbols standard for JWTs
const b64 = (str: string) => btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const createMockJwt = (payload: any) => {
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64(JSON.stringify(payload));
  const signature = b64('mock_signature');
  return `${header}.${body}.${signature}`;
};

const getHeader = (headers: any, key: string): string | null => {
  if (!headers) return null;
  if (typeof headers.get === 'function') {
    const val = headers.get(key);
    return val ? String(val) : null;
  }
  return (headers[key] || headers[key.toLowerCase()]) as string | null;
};

export function enableSandboxMockEngine(apiClient: AxiosInstance) {
  const originalAdapter = apiClient.defaults.adapter;
  
  // Intercept the Axios adapter conditionally
  // @ts-ignore
  apiClient.defaults.adapter = async (config) => {
    const url = config.url || '';
    const method = config.method?.toUpperCase();

    // Determine if this specific request should be mocked
    const isMockRequest = getHeader(config.headers, 'X-Sandbox-Mock') === 'true';
    const authHeader = getHeader(config.headers, 'Authorization');
    const isMockToken = authHeader && authHeader.includes('mock_signature');
    
    let body: any = {};
    try { body = config.data ? JSON.parse(config.data) : {}; } catch (e) {}
    const isMockRefresh = body.refreshToken && String(body.refreshToken).startsWith('mock_refresh_token_');

    // 1. Mock Login (POST /api/auth/login)
    if (url === '/api/auth/login' && method === 'POST' && isMockRequest) {
      
      const sandboxUsers: Record<string, string[]> = {
        'admin_bypass': ['ROLE_USER', 'ROLE_ADMIN'],
        'creator_bypass': ['ROLE_USER', 'ROLE_CREATOR'],
        'user_bypass': ['ROLE_USER']
      };

      if (body.username in sandboxUsers && body.password === 'bypass') {
        const roles = sandboxUsers[body.username];
        const sub = body.username.split('_')[0];

        const token = createMockJwt({
          sub,
          roles,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 15
        });
        
        return {
          data: { accessToken: token, refreshToken: `mock_refresh_token_${sub}` },
          status: 200, statusText: 'OK', headers: {}, config, request: {}
        };
      }
      return Promise.reject({ response: { data: { message: 'Bad credentials' }, status: 401, statusText: 'Unauthorized' }, config });
    }

    // 2. Mock Refresh (POST /api/auth/refresh)
    if (url === '/api/auth/refresh' && method === 'POST' && isMockRefresh) {
      const refreshTokens: Record<string, string[]> = {
        'mock_refresh_token_admin': ['ROLE_USER', 'ROLE_ADMIN'],
        'mock_refresh_token_creator': ['ROLE_USER', 'ROLE_CREATOR'],
        'mock_refresh_token_user': ['ROLE_USER']
      };

      if (body.refreshToken in refreshTokens) {
        const roles = refreshTokens[body.refreshToken];
        const sub = body.refreshToken.split('_').pop();

        const token = createMockJwt({
          sub,
          roles,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 15
        });
        
        return {
          data: { accessToken: token, refreshToken: body.refreshToken },
          status: 200, statusText: 'OK', headers: {}, config, request: {}
        };
      }
      return Promise.reject({ response: { data: { message: 'Invalid refresh token' }, status: 401, statusText: 'Unauthorized' }, config });
    }

    // 3. Mock Logout (POST /api/auth/logout)
    if (url === '/api/auth/logout' && method === 'POST' && isMockToken) {
      return {
        data: { message: 'Successfully logged out' },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      };
    }

    // 4. Mock Protected Endpoint (GET /api/admin/dashboard)
    if (url === '/api/admin/dashboard' && method === 'GET' && isMockToken) {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Promise.reject({ response: { data: { message: 'Missing token' }, status: 401, statusText: 'Unauthorized' }, config });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = decodeJwt(token);
      
      if (!decoded || (decoded.exp * 1000) < Date.now()) {
        return Promise.reject({ response: { data: { message: 'Token expired' }, status: 401, statusText: 'Unauthorized' }, config });
      }
      
      if (!decoded.roles.includes('ROLE_ADMIN')) {
        return Promise.reject({ response: { data: { message: 'Forbidden' }, status: 403, statusText: 'Forbidden' }, config });
      }

      return {
        data: { message: 'Welcome to the Secure Admin Dashboard', stats: { users: 124, revenue: 8430 } },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      };
    }

    // Fallback to real network request if NO mock conditions were met
    if (originalAdapter) {
      // @ts-ignore
      return originalAdapter(config);
    }
    
    throw new Error('No mock match and no default adapter available');
  };
}
