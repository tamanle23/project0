import { create } from 'zustand'
import { type YouTubeChannel, type YouTubeTokens } from '../services/youtube-service'

const STORAGE_KEY = 'youtube_app_integration'

interface YouTubeState {
  isConnected: boolean
  clientId: string
  clientSecret: string
  authCode: string
  accessToken: string
  refreshToken: string
  expiresAt: string | null
  connectedChannel: YouTubeChannel | null
  isDemoMode: boolean

  // Actions
  setCredentials: (clientId: string, clientSecret: string) => void
  setAuthCode: (authCode: string) => void
  setTokens: (tokens: YouTubeTokens) => void
  updateAccessToken: (accessToken: string, expiresAt: string) => void
  setConnectedChannel: (channel: YouTubeChannel | null) => void
  setIsDemoMode: (isDemo: boolean) => void
  disconnect: () => void
}

function loadPersistedState(): Partial<YouTubeState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as Partial<YouTubeState>
    }
  } catch {
    // Ignore parse error
  }
  return {}
}

function persistState(state: Partial<YouTubeState>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isConnected: state.isConnected,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        authCode: state.authCode,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        connectedChannel: state.connectedChannel,
        isDemoMode: state.isDemoMode,
      })
    )
  } catch {
    // Ignore quota error
  }
}

const envClientId = (import.meta.env.VITE_YOUTUBE_CLIENT_ID as string | undefined)?.trim() || ''
const envClientSecret =
  (import.meta.env.VITE_YOUTUBE_CLIENT_SECRET as string | undefined)?.trim() || ''

export const YOUTUBE_ENV_CONFIG = {
  envClientId,
  envClientSecret,
  hasEnvClientId: Boolean(envClientId),
  hasEnvClientSecret: Boolean(envClientSecret),
}

const initialSaved = loadPersistedState()

export const useYouTubeStore = create<YouTubeState>()((set, get) => ({
  isConnected: initialSaved.isConnected ?? false,
  clientId: envClientId || (initialSaved.clientId && initialSaved.clientId.trim()) || '',
  clientSecret:
    envClientSecret || (initialSaved.clientSecret && initialSaved.clientSecret.trim()) || '',
  authCode: initialSaved.authCode ?? '',
  accessToken: initialSaved.accessToken ?? '',
  refreshToken: initialSaved.refreshToken ?? '',
  expiresAt: initialSaved.expiresAt ?? null,
  connectedChannel: initialSaved.connectedChannel ?? null,
  isDemoMode: initialSaved.isDemoMode ?? false,

  setCredentials: (clientId, clientSecret) => {
    set({ clientId, clientSecret })
    persistState({ ...get(), clientId, clientSecret })
  },

  setAuthCode: (authCode) => {
    set({ authCode })
    persistState({ ...get(), authCode })
  },

  setTokens: (tokens) => {
    const isConnected = Boolean(tokens.accessToken)
    set({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || get().refreshToken,
      expiresAt: tokens.expiresAt,
      isConnected,
    })
    persistState({
      ...get(),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || get().refreshToken,
      expiresAt: tokens.expiresAt,
      isConnected,
    })
  },

  updateAccessToken: (accessToken, expiresAt) => {
    set({ accessToken, expiresAt })
    persistState({ ...get(), accessToken, expiresAt })
  },

  setConnectedChannel: (connectedChannel) => {
    const isConnected = Boolean(connectedChannel)
    set({ connectedChannel, isConnected })
    persistState({ ...get(), connectedChannel, isConnected })
  },

  setIsDemoMode: (isDemoMode) => {
    set({ isDemoMode })
    persistState({ ...get(), isDemoMode })
  },

  disconnect: () => {
    const reset = {
      isConnected: false,
      authCode: '',
      accessToken: '',
      refreshToken: '',
      expiresAt: null,
      connectedChannel: null,
    }
    set(reset)
    persistState({ ...get(), ...reset })
  },
}))
