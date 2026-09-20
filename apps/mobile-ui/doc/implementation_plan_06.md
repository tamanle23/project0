# Implementation Plan 06 - Fix Dynamic Island & Safe Area Overlap

## Problem Analysis
On modern iPhones with Dynamic Island (iPhone 14 Pro, iPhone 15/15 Pro, iPhone 16 series), the status bar and Dynamic Island occupy the top ~59px of the screen.
Currently:
1. `RootNavigator.tsx` enables `headerTransparent: true`. With transparent headers in React Navigation, the screen components render starting from `{ top: 0 }`.
2. `DashboardScreen`, `CreatePostScreen`, and `ProfileScreen` do not apply dynamic safe-area insets (`useSafeAreaInsets()`). As a result, the feed cards, text input, and profile avatar collide directly with the Dynamic Island and header bar.
3. The floating bottom navigation bar uses a hardcoded `bottom: 30`, which does not dynamically adjust to different device home indicators or landscape orientations.

## Proposed Changes
1. **[MODIFY] `src/screens/DashboardScreen.tsx`**:
   - Import `useSafeAreaInsets` from `react-native-safe-area-context`.
   - Apply dynamic `paddingTop: insets.top + 54` and `paddingBottom: insets.bottom + 90` to the `FlatList` content container.
2. **[MODIFY] `src/screens/CreatePostScreen.tsx`**:
   - Import `useSafeAreaInsets` from `react-native-safe-area-context`.
   - Apply dynamic `paddingTop: insets.top + 54` and `paddingBottom: insets.bottom + 90` to the `ScrollView` content container.
3. **[MODIFY] `src/screens/ProfileScreen.tsx`**:
   - Import `useSafeAreaInsets` from `react-native-safe-area-context`.
   - Apply dynamic `paddingTop: insets.top + 54` and `paddingBottom: insets.bottom + 90` to the `ScrollView` content container.
4. **[MODIFY] `src/navigation/RootNavigator.tsx`**:
   - Use `useSafeAreaInsets()` in `GlassTabBar` to dynamically position the floating bottom bar (`bottom: Math.max(insets.bottom, 20)`).
   - Add a frosted `headerBackground` using `LiquidGlassView` so content smoothly blurs as it scrolls beneath the header.

## Verification Plan
1. Apply changes to screens and navigator.
2. Run `pnpm tsc --noEmit` to verify type safety.
3. Verify public configuration with `pnpm expo config --type public`.
