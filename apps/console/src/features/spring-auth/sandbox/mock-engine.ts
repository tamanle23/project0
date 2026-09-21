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

export function enableSandboxMockEngine(apiClient: AxiosInstance) {
  const originalAdapter = apiClient.defaults.adapter;
  
  // Intercept the Axios adapter entirely to mock out our target endpoints locally
  // @ts-ignore - Adapters have complex internal types in axios 1.x
  apiClient.defaults.adapter = async (config) => {
    const url = config.url || '';
    const method = config.method?.toUpperCase();

    // 1. Mock Login (POST /api/auth/login)
    if (url === '/api/auth/login' && method === 'POST') {
      const body = JSON.parse(config.data || '{}');
      
      // Admin bypass for local testing
      if (body.username === 'admin' && body.password === 'admin') {
        const token = createMockJwt({
          sub: 'admin',
          roles: ['ROLE_USER', 'ROLE_ADMIN'],
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 15 // 15 mins
        });
        
        return {
          data: { accessToken: token, refreshToken: 'mock_refresh_token_admin' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        };
      }
      return { data: { message: 'Bad credentials' }, status: 401, statusText: 'Unauthorized', headers: {}, config, request: {} };
    }

    // 2. Mock Refresh (POST /api/auth/refresh)
    if (url === '/api/auth/refresh' && method === 'POST') {
      const body = JSON.parse(config.data || '{}');
      
      if (body.refreshToken === 'mock_refresh_token_admin') {
        const token = createMockJwt({
          sub: 'admin',
          roles: ['ROLE_USER', 'ROLE_ADMIN'],
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 15
        });
        
        return {
          data: { accessToken: token, refreshToken: 'mock_refresh_token_admin' },
          status: 200, statusText: 'OK', headers: {}, config, request: {}
        };
      }
      // If refresh token is expired/invalid (simulated)
      return { data: { message: 'Invalid refresh token' }, status: 401, statusText: 'Unauthorized', headers: {}, config, request: {} };
    }

    // 3. Mock Logout (POST /api/auth/logout)
    if (url === '/api/auth/logout' && method === 'POST') {
      return {
        data: { message: 'Successfully logged out' },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      };
    }

    // 4. Mock Protected Endpoint (GET /api/admin/dashboard)
    if (url === '/api/admin/dashboard' && method === 'GET') {
      const authHeader = config.headers?.['Authorization'] as string;
      
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

    // Fallback to real network request if not intercepted
    if (originalAdapter) {
      // @ts-ignore
      return originalAdapter(config);
    }
    
    throw new Error('No mock match and no default adapter available');
  };
}
