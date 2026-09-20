import * as React from 'react'
import { useProfileStore, type Profile } from '@/stores/profile-store'

export type { Profile }

type ProfileContextType = {
  currentProfile: Profile
  profiles: Profile[]
  setCurrentProfile: (profile: Profile) => void
  setProfiles: (profiles: Profile[]) => void
}

const ProfileContext = React.createContext<ProfileContextType | null>(null)

type ProfileProviderProps = {
  children: React.ReactNode
  defaultProfiles?: Profile[]
}

export function ProfileProvider({ children, defaultProfiles }: ProfileProviderProps) {
  const store = useProfileStore()
  const setProfiles = store.setProfiles

  React.useEffect(() => {
    if (defaultProfiles && defaultProfiles.length > 0) {
      setProfiles(defaultProfiles)
    }
  }, [defaultProfiles, setProfiles])

  const value = React.useMemo<ProfileContextType>(
    () => ({
      currentProfile: store.currentProfile,
      profiles: store.profiles,
      setCurrentProfile: store.setCurrentProfile,
      setProfiles: store.setProfiles,
    }),
    [store.currentProfile, store.profiles, store.setCurrentProfile, store.setProfiles]
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
  const context = React.useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
