# Walkthrough 11 - Adjust Default Glass Intensity to 20%

## Summary
The default glass intensity for the Liquid Glass effect was lowered to 20% for a cleaner, subtler aesthetic while still allowing users to adjust it higher or lower via the slider in the Settings tab.

## Changes
- **`src/store/useSettingsStore.ts`**:
  - Changed default `glassIntensity` value from `60` to `20`.
  - Bumped the storage key to `settings-storage-v3` so that the new default takes immediate effect on devices with cached state.
- **`src/components/LiquidGlassView.tsx`**:
  - Updated fallback default value to `20` when calculating effective blur and gradient intensity factors.
