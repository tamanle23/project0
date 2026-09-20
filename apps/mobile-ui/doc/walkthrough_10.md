# Walkthrough 10 - Liquid Glass Intensity Slider and Toggle Behavior

## Summary
In this update, we refined the Liquid Glass toggle so that it directly controls whether the glass effect is active. When enabled, users can now adjust the glass intensity using a new interactive slider in the Settings tab.

## Changes Made
1. **Installed `@react-native-community/slider`**:
   - Added as a dependency via `pnpm` to provide smooth, native slider interactions.

2. **Settings State Enhancement**:
   - Added `glassIntensity` (ranging 10–100, default 60) to `useSettingsStore` and the `Settings` type definition.
   - Added `setGlassIntensity` action.
   - Updated storage key to `settings-storage-v2` to ensure consistent state initialization.

3. **Dynamic Intensity in `LiquidGlassView`**:
   - Combined local component `intensity` with the global `glassIntensity` level.
   - Scaled both the blur intensity and the specular gradient reflection/noise opacity proportionally with the slider's value.
   - Ensured fallback mode uses opaque solid backgrounds (`solidFallback` and `solidCardFallback`) when disabled.

4. **Settings Screen (Profile)**:
   - Added the slider control immediately under the "Liquid Glass Effect" switch, only appearing when the effect is toggled ON.
   - Displays real-time numerical percentage of the intensity level.

## Verification
- Ran `pnpm tsc --noEmit`: Typecheck passed with 0 errors.
- Verified slider reactivity and clean fallback styling when the toggle is switched off.
