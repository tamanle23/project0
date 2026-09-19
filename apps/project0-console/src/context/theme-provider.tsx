import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

const DEFAULT_THEME = 'system'
const THEME_COOKIE_NAME = 'vite-ui-theme'
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export const DEFAULT_GLASS_INTENSITY = 20
const GLASS_INTENSITY_COOKIE_NAME = 'vite-ui-glass-intensity'

export type WallpaperStyle = 'liquid' | 'mesh' | 'none'
export const DEFAULT_WALLPAPER: WallpaperStyle = 'liquid'
const WALLPAPER_COOKIE_NAME = 'vite-ui-wallpaper'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultGlassIntensity?: number
  defaultWallpaper?: WallpaperStyle
  storageKey?: string
}

type ThemeProviderState = {
  defaultTheme: Theme
  resolvedTheme: ResolvedTheme
  theme: Theme
  glassIntensity: number
  wallpaper: WallpaperStyle
  setTheme: (theme: Theme) => void
  setGlassIntensity: (intensity: number) => void
  previewGlassIntensity: (intensity: number) => void
  setWallpaper: (wallpaper: WallpaperStyle) => void
  resetTheme: () => void
}

const initialState: ThemeProviderState = {
  defaultTheme: DEFAULT_THEME,
  resolvedTheme: 'light',
  theme: DEFAULT_THEME,
  glassIntensity: DEFAULT_GLASS_INTENSITY,
  wallpaper: DEFAULT_WALLPAPER,
  setTheme: () => null,
  setGlassIntensity: () => null,
  previewGlassIntensity: () => null,
  setWallpaper: () => null,
  resetTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  defaultGlassIntensity = DEFAULT_GLASS_INTENSITY,
  defaultWallpaper = DEFAULT_WALLPAPER,
  storageKey = THEME_COOKIE_NAME,
  ...props
}: ThemeProviderProps) {
  const [theme, _setTheme] = useState<Theme>(
    () => (getCookie(storageKey) as Theme) || defaultTheme
  )
  const [glassIntensity, _setGlassIntensity] = useState<number>(() => {
    const saved = getCookie(GLASS_INTENSITY_COOKIE_NAME)
    return saved !== undefined && saved !== ''
      ? Math.max(0, Math.min(100, Number(saved)))
      : defaultGlassIntensity
  })
  const [wallpaper, _setWallpaper] = useState<WallpaperStyle>(() => {
    const saved = getCookie(WALLPAPER_COOKIE_NAME)
    return (saved as WallpaperStyle) || defaultWallpaper
  })

  // Optimized: Memoize the resolved theme calculation to prevent unnecessary re-computations
  const resolvedTheme = useMemo((): ResolvedTheme => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme as ResolvedTheme
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (currentResolvedTheme: ResolvedTheme) => {
      root.classList.remove('light', 'dark') // Remove existing theme classes
      root.classList.add(currentResolvedTheme) // Add the new theme class
    }

    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        applyTheme(systemTheme)
      }
    }

    applyTheme(resolvedTheme)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, resolvedTheme])

  useEffect(() => {
    const root = window.document.documentElement
    // Dynamic blur: 0px to 32px based on intensity
    const blurPx = Math.round((glassIntensity / 100) * 30)
    // Dynamic opacity multiplier (0.0 to 1.0)
    const intensityRatio = Number((glassIntensity / 100).toFixed(2))
    // Dynamic specular reflection alpha (0.15 to 0.95)
    const specularAlpha = Math.max(0.15, Number((0.2 + (glassIntensity / 100) * 0.75).toFixed(2)))

    root.style.setProperty('--glass-blur', `${blurPx}px`)
    root.style.setProperty('--glass-intensity', `${intensityRatio}`)
    root.style.setProperty('--glass-specular-alpha', `${specularAlpha}`)
  }, [glassIntensity])

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('data-wallpaper', wallpaper)
  }, [wallpaper])

  const setTheme = (theme: Theme) => {
    setCookie(storageKey, theme, THEME_COOKIE_MAX_AGE)
    _setTheme(theme)
  }

  const previewGlassIntensity = (intensity: number) => {
    const clamped = Math.max(0, Math.min(100, intensity))
    const blurPx = Math.round((clamped / 100) * 30)
    const intensityRatio = Number((clamped / 100).toFixed(2))
    const specularAlpha = Math.max(0.15, Number((0.2 + (clamped / 100) * 0.75).toFixed(2)))

    const root = window.document.documentElement
    root.style.setProperty('--glass-blur', `${blurPx}px`)
    root.style.setProperty('--glass-intensity', `${intensityRatio}`)
    root.style.setProperty('--glass-specular-alpha', `${specularAlpha}`)
  }

  const setGlassIntensity = (intensity: number) => {
    const clamped = Math.max(0, Math.min(100, intensity))
    previewGlassIntensity(clamped)
    setCookie(GLASS_INTENSITY_COOKIE_NAME, clamped.toString(), THEME_COOKIE_MAX_AGE)
    _setGlassIntensity(clamped)
  }

  const setWallpaper = (newWallpaper: WallpaperStyle) => {
    setCookie(WALLPAPER_COOKIE_NAME, newWallpaper, THEME_COOKIE_MAX_AGE)
    _setWallpaper(newWallpaper)
  }

  const resetTheme = () => {
    removeCookie(storageKey)
    removeCookie(GLASS_INTENSITY_COOKIE_NAME)
    removeCookie(WALLPAPER_COOKIE_NAME)
    _setTheme(DEFAULT_THEME)
    _setGlassIntensity(DEFAULT_GLASS_INTENSITY)
    _setWallpaper(DEFAULT_WALLPAPER)
  }

  const contextValue = {
    defaultTheme,
    resolvedTheme,
    resetTheme,
    theme,
    setTheme,
    glassIntensity,
    setGlassIntensity,
    previewGlassIntensity,
    wallpaper,
    setWallpaper,
  }

  return (
    <ThemeContext value={contextValue} {...props}>
      {children}
    </ThemeContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
