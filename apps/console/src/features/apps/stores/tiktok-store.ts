import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type TikTokProfile } from '../services/tiktok-service'

export interface TikTokConfig {
  clientKey: string
  clientSecret: string
  redirectUri: string
}

export const TIKTOK_ENV_CONFIG: TikTokConfig = {
  clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
  clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/apps` : '',
}

interface TikTokState {
  isConnected: boolean
  authCode: string | null
  accessToken: string | null
  refreshToken: string | null
  expiresAt: string | null
  connectedProfile: TikTokProfile | null
  clientKey: string
  clientSecret: string
  isDemoMode: boolean
}

interface TikTokActions {
  setCredentials: (clientKey: string, clientSecret: string) => void
  setAuthCode: (code: string) => void
  setTokens: (accessToken: string, refreshToken: string, expiresAt: string) => void
  setConnectedProfile: (profile: TikTokProfile) => void
  setDemoMode: (isDemo: boolean) => void
  disconnect: () => void
}

export const useTikTokStore = create<TikTokState & TikTokActions>()(
  persist(
    (set) => ({
      isConnected: false,
      authCode: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      connectedProfile: null,
      clientKey: TIKTOK_ENV_CONFIG.clientKey,
      clientSecret: TIKTOK_ENV_CONFIG.clientSecret,
      isDemoMode: false,

      setCredentials: (clientKey, clientSecret) =>
        set({ clientKey, clientSecret }),

      setAuthCode: (code) => set({ authCode: code }),

      setTokens: (accessToken, refreshToken, expiresAt) =>
        set({ accessToken, refreshToken, expiresAt }),

      setConnectedProfile: (profile) =>
        set({ connectedProfile: profile, isConnected: true }),

      setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),

      disconnect: () =>
        set({
          isConnected: false,
          authCode: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          connectedProfile: null,
          isDemoMode: false,
        }),
    }),
    {
      name: 'tiktok_app_integration',
    }
  )
)
