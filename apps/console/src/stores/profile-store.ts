import { create } from 'zustand'
import { getCookie, setCookie } from '@/lib/cookies'
import { sidebarTeams } from '@/components/layout/data/sidebar-data'

export type Profile = {
  id?: string
  name: string
  logo?: React.ElementType
  plan?: string
  [key: string]: unknown
}

const PROFILE_COOKIE_NAME = 'console_active_profile'
const PROFILE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

interface ProfileState {
  currentProfile: Profile
  profiles: Profile[]
  setCurrentProfile: (profile: Profile) => void
  setProfiles: (profiles: Profile[]) => void
}

export const useProfileStore = create<ProfileState>()((set, get) => {
  const defaultProfiles = sidebarTeams as Profile[]
  let initialProfile = defaultProfiles[0]

  const savedProfileName = getCookie(PROFILE_COOKIE_NAME)
  if (savedProfileName) {
    const matched = defaultProfiles.find((p) => p.name === savedProfileName || p.id === savedProfileName)
    if (matched) {
      initialProfile = matched
    }
  }

  return {
    currentProfile: initialProfile,
    profiles: defaultProfiles,
    setCurrentProfile: (profile: Profile) => {
      setCookie(PROFILE_COOKIE_NAME, profile.id ?? profile.name, PROFILE_COOKIE_MAX_AGE)
      set({ currentProfile: profile })
    },
    setProfiles: (profiles: Profile[]) => {
      const current = get().currentProfile
      const stillExists = profiles.find((p) => (p.id && p.id === current.id) || p.name === current.name)
      set({
        profiles,
        currentProfile: stillExists ?? profiles[0] ?? current,
      })
    },
  }
})
