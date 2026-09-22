import { create } from 'zustand';
import { decodeJwt } from './utils/jwt';
import type { AuthState } from './types';

const REFRESH_STORAGE_KEY = 'sandbox_refresh_token';

export const useSpringAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: localStorage.getItem(REFRESH_STORAGE_KEY),
  user: null,
  isAuthenticated: false,
  isHydrating: true, // Start in hydrating mode
  isSandbox: false,

  setHydrating: (val: boolean) => set({ isHydrating: val }),

  setTokens: (access: string, refresh: string) => {
    const user = decodeJwt(access);
    if (refresh) {
      localStorage.setItem(REFRESH_STORAGE_KEY, refresh);
    }
    const isSandbox = Boolean(
      user?.isSandbox ||
      access?.endsWith('.mock_signature') ||
      refresh?.startsWith('mock_refresh_token_')
    );
    set({
      accessToken: access,
      refreshToken: refresh,
      user,
      isAuthenticated: !!user,
      isSandbox,
    });
  },

  clearTokens: () => {
    localStorage.removeItem(REFRESH_STORAGE_KEY);
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isSandbox: false,
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
    localStorage.setItem(REFRESH_STORAGE_KEY, 'expired_mock_refresh_token');
    set({ refreshToken: 'expired_mock_refresh_token' });
  },
}));
