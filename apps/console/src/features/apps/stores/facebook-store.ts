import { create } from 'zustand'
import { type FacebookPage } from '../services/facebook-service'

const STORAGE_KEY = 'facebook_app_integration'

interface FacebookState {
  isConnected: boolean
  appId: string
  appSecret: string
  userToken: string
  connectedPage: FacebookPage | null
  availablePages: FacebookPage[]
  isDemoMode: boolean

  // Actions
  setCredentials: (appId: string, appSecret: string) => void
  setUserToken: (token: string) => void
  setAvailablePages: (pages: FacebookPage[]) => void
  setConnectedPage: (page: FacebookPage | null) => void
  setIsDemoMode: (isDemo: boolean) => void
  upgradeToLongLived: (longLivedToken: string, expiresAt: string | null) => void
  disconnect: () => void
}

function loadPersistedState(): Partial<FacebookState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as Partial<FacebookState>
    }
  } catch {
    // Ignore parse error
  }
  return {}
}

function persistState(state: Partial<FacebookState>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isConnected: state.isConnected,
        appId: state.appId,
        appSecret: state.appSecret,
        userToken: state.userToken,
        connectedPage: state.connectedPage,
        availablePages: state.availablePages,
        isDemoMode: state.isDemoMode,
      })
    )
  } catch {
    // Ignore storage quota
  }
}

const envAppId = (import.meta.env.VITE_FACEBOOK_APP_ID as string | undefined)?.trim() || ''
const envAppSecret = (import.meta.env.VITE_FACEBOOK_APP_SECRET as string | undefined)?.trim() || ''

export const FACEBOOK_ENV_CONFIG = {
  envAppId,
  envAppSecret,
  hasEnvAppId: Boolean(envAppId),
  hasEnvAppSecret: Boolean(envAppSecret),
}

const initialSaved = loadPersistedState()

export const useFacebookStore = create<FacebookState>()((set, get) => ({
  isConnected: initialSaved.isConnected ?? false,
  appId: (initialSaved.appId && initialSaved.appId.trim()) || envAppId,
  appSecret: (initialSaved.appSecret && initialSaved.appSecret.trim()) || envAppSecret,
  userToken: initialSaved.userToken ?? '',
  connectedPage: initialSaved.connectedPage ?? null,
  availablePages: initialSaved.availablePages ?? [],
  isDemoMode: initialSaved.isDemoMode ?? false,

  setCredentials: (appId, appSecret) => {
    set({ appId, appSecret })
    persistState({ ...get(), appId, appSecret })
  },

  setUserToken: (userToken) => {
    set({ userToken })
    persistState({ ...get(), userToken })
  },

  setAvailablePages: (availablePages) => {
    set({ availablePages })
    persistState({ ...get(), availablePages })
  },

  setConnectedPage: (connectedPage) => {
    const isConnected = Boolean(connectedPage)
    set({ connectedPage, isConnected })
    persistState({ ...get(), connectedPage, isConnected })
  },

  setIsDemoMode: (isDemoMode) => {
    set({ isDemoMode })
    persistState({ ...get(), isDemoMode })
  },

  upgradeToLongLived: (longLivedToken, expiresAt) => {
    const current = get().connectedPage
    if (!current) return

    const updatedPage: FacebookPage = {
      ...current,
      accessToken: longLivedToken,
      isLongLived: true,
      expiresAt,
    }

    set({ connectedPage: updatedPage })
    persistState({ ...get(), connectedPage: updatedPage })
  },

  disconnect: () => {
    const reset = {
      isConnected: false,
      userToken: '',
      connectedPage: null,
      availablePages: [],
    }
    set(reset)
    persistState({ ...get(), ...reset })
  },
}))
