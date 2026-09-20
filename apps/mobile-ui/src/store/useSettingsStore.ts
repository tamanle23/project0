import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../types';

interface SettingsState extends Settings {
  setTheme: (theme: Settings['theme']) => void;
  toggleLiquidGlass: () => void;
  setGlassIntensity: (intensity: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      liquidGlass: true,
      glassIntensity: 20,
      setTheme: (theme) => set({ theme }),
      toggleLiquidGlass: () => set((state) => ({ liquidGlass: !state.liquidGlass })),
      setGlassIntensity: (intensity: number) => set({ glassIntensity: intensity }),
    }),
    {
      name: 'settings-storage-v3',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
