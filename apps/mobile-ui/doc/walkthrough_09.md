# Walkthrough 09 - Inverting & Refining the "Liquid Glass Effect" Setting

## Summary
Previously, the settings toggle was labelled **"Reduce Transparency"** (the traditional iOS accessibility option). When enabled, it turned *off* the frosted glass blur and used solid colors, which caused confusion because switching it **ON** disabled the glass effect. Furthermore, the fallback style was still inheriting a semi-transparent background color.

## Changes Made
1. **Model & State**:
   - Renamed `reduceTransparency` to `liquidGlass` (default: `true`) in `types/index.ts` and `useSettingsStore.ts`.
   - Renamed `toggleReduceTransparency` to `toggleLiquidGlass()`.
2. **Behavioral Inversion**:
   - The toggle is now intuitive:
     - **ON**: Liquid Glass effect active (blur + grain + specular sheen).
     - **OFF**: Liquid Glass effect disabled (clean, flat, solid fallback).
3. **Fallback Rendering**:
   - Fixed `LiquidGlassView` so that when Liquid Glass is turned off, the solid `fallbackColor` takes full precedence and properly hides whatever is behind it without any residual transparency.
4. **Settings Screen Improvements**:
   - Added descriptive subtext under "Liquid Glass Effect" to explain what it does.
   - Added a "Restore Demo Posts" button in the Data Management section to quickly restore the mock posts.

## Verification
- Run `pnpm tsc --noEmit` which completed with 0 errors.
