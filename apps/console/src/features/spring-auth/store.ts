import { create } from 'zustand';
import { decodeJwt } from './utils/jwt';
import type { AuthState } from './types';

// Sandbox fallback uses localStorage for refresh tokens; Prod relies on HttpOnly cookies via backend.
const isSandbox = import.meta.env.VITE_USE_SANDBOX === 'true';
const REFRESH_STORAGE_KEY = 'sandbox_refresh_token';

export const useSpringAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: isSandbox ? localStorage.getItem(REFRESH_STORAGE_KEY) : null,
  user: null,
  isAuthenticated: false,
  isSandbox,

  setTokens: (access: string, refresh: string) => {
    const user = decodeJwt(access);
    if (isSandbox && refresh) {
      localStorage.setItem(REFRESH_STORAGE_KEY, refresh);
    }
    set({
      accessToken: access,
      refreshToken: refresh,
      user,
      isAuthenticated: !!user,
    });
  },

  clearTokens: () => {
    if (isSandbox) {
      localStorage.removeItem(REFRESH_STORAGE_KEY);
    }
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  expireAccessToken: () => {
    // Dev helper: corrupts the access token payload exp claim visually
    const { accessToken } = get();
    if (accessToken) {
      set({ accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleHBpcmVkIiwiZXhwIjoxMDAwMDAwfQ.invalid' });
    }
  },

  expireRefreshToken: () => {
    // Dev helper: corrupts refresh token
    if (isSandbox) {
      localStorage.setItem(REFRESH_STORAGE_KEY, 'expired_mock_refresh_token');
      set({ refreshToken: 'expired_mock_refresh_token' });
    }
  },
}));
