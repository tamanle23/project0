# Implementation Plan 05 - Enhanced Liquid Glass Visibility on White Backgrounds

## Problem Analysis
On a white background, the floating bottom navigation bar's border and frosted glass effect are washed out and difficult to see due to two issues:
1. **Low Contrast Light Theme Border**:
   In `src/theme/colors.ts`, `colors.light.glassBorder` is set to `'rgba(255, 255, 255, 0.4)'` (semi-transparent white). Over a white background, a white border provides 0:1 contrast and is completely invisible.
2. **Shadow Clipping due to `overflow: 'hidden'`**:
   In `src/components/LiquidGlassView.tsx`, the `BlurView` applies `overflow: 'hidden'` directly to the same view receiving the shadow styles (`shadowColor`, `shadowRadius`, etc.). In React Native / iOS (`masksToBounds`), `overflow: 'hidden'` completely clips outer box shadows, removing ambient floating depth.

## Proposed Changes
1. **[MODIFY] `src/theme/colors.ts`**:
   - Update `colors.light.glassBorder` to a crisp, subtle Apple-style dark rim (`'rgba(0, 0, 0, 0.08)'` or `'rgba(180, 180, 190, 0.45)'`) so the perimeter is distinct on white/light backgrounds.
   - Set `colors.light.glassBackground` to `'rgba(255, 255, 255, 0.72)'` with high frosted vibrancy.
   - Adjust `colors.dark.glassBorder` to `'rgba(255, 255, 255, 0.18)'` for clean dark-mode specular edges.
2. **[MODIFY] `src/components/LiquidGlassView.tsx`**:
   - Separate shadow/outer layout styling from the inner clipping `BlurView`.
   - Wrap `BlurView` in an unclipped outer container so drop shadows render with full depth on iOS and Android.
3. **[MODIFY] `src/navigation/RootNavigator.tsx`**:
   - Enhance the floating glass pill container with tuned multi-layer drop shadows and frosted translucency so it clearly floats above white feeds.
4. **[MODIFY] `src/components/GlassCard.tsx`**:
   - Ensure cards inherit enhanced border contrast and non-clipped shadows.

## Verification Plan
1. Apply changes to `colors.ts`, `LiquidGlassView.tsx`, and `RootNavigator.tsx`.
2. Run `pnpm tsc --noEmit` to verify type safety.
3. Verify public config with `pnpm expo config --type public`.
