import axios from 'axios';
import { useSpringAuthStore } from './store';
import { enableSandboxMockEngine } from './sandbox/mock-engine';

export const springApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  // Essential for sending HttpOnly cookies (refresh tokens) in production
  withCredentials: true,
});

// Initialize Sandbox mock intercepts if enabled
if (import.meta.env.VITE_USE_SANDBOX === 'true') {
  enableSandboxMockEngine(springApiClient);
}

// Queue for pending requests while silent refresh is occurring
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: string) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || undefined);
    }
  });
  failedQueue = [];
};

// 1. Request Interceptor: Attach Access Token
springApiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useSpringAuthStore.getState();
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Catch 401 & Silent Refresh Loop
springApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh') {
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise<string | undefined>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return springApiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = useSpringAuthStore.getState();

      try {
        // In Prod, 'withCredentials' automatically sends the HttpOnly refresh token cookie.
        // In Sandbox, we inject it manually from localStorage fallback.
        const payload = state.isSandbox ? { refreshToken: state.refreshToken } : {};
        
        const { data } = await springApiClient.post('/api/auth/refresh', payload);
        
        const newAccess = data.accessToken;
        // Optionally rotate refresh token if the backend provides a new one
        const newRefresh = data.refreshToken || state.refreshToken;
        
        state.setTokens(newAccess, newRefresh);
        processQueue(null, newAccess);

        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return springApiClient(originalRequest);
        
      } catch (refreshError) {
        // Silent refresh failed -> hard logout
        processQueue(refreshError as Error, null);
        state.clearTokens();
        // Option to redirect to a hardcoded login route:
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
