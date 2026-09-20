# Walkthrough 06: Resolve Dynamic Island & Safe Area Overlap

## Problem Addressed
On modern iPhones equipped with the Dynamic Island (iPhone 14 Pro, 15, 15 Pro, 16 series), the status bar and Dynamic Island occupy the top ~59px.
Because `headerTransparent: true` was enabled in React Navigation, the screen contents started at physical `{ top: 0 }`, causing cards, text inputs, and profile headers to collide with and hide behind the Dynamic Island.

## Key Changes
1. **Dynamic Safe Area Insets in Screens**:
   - Integrated `useSafeAreaInsets()` across:
     - `DashboardScreen.tsx`: `paddingTop: insets.top + 54`, `paddingBottom: insets.bottom + 90`
     - `CreatePostScreen.tsx`: `paddingTop: insets.top + 54`, `paddingBottom: insets.bottom + 90`
     - `ProfileScreen.tsx`: `paddingTop: insets.top + 54`, `paddingBottom: insets.bottom + 90`
   - Content now starts comfortably below the Dynamic Island and navigation title.
2. **Frosted Liquid Glass Header (`src/navigation/RootNavigator.tsx`)**:
   - Added `headerBackground` using `LiquidGlassView`. As the user scrolls up, feed items and cards fluidly blur beneath the frosted header.
3. **Adaptive Floating Bottom Pill (`src/navigation/RootNavigator.tsx`)**:
   - Replaced fixed `bottom: 30` with `bottom: Math.max(insets.bottom, 20)`, perfectly adapting to iPhone home indicator bars and various screen sizes.

## Verification
- `pnpm tsc --noEmit`: Exited with code 0 (Zero TypeScript errors).
- `pnpm expo config --type public`: Exited with code 0.
