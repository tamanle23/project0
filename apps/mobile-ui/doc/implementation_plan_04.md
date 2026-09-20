# Implementation Plan 04 - Upgrade to Expo SDK 57.0.0

## User Request
Upgrade Expo to SDK `57.0.0` (matching user's Expo Go version).

## Dependency Matrix for Expo SDK 57
From Expo SDK 57's official `bundledNativeModules.json`:
- `expo`: `~57.0.24`
- `expo-blur`: `~57.0.3`
- `expo-status-bar`: `~57.0.1`
- `react`: `19.2.3`
- `react-native`: `0.86.3`
- `react-native-safe-area-context`: `~5.7.0`
- `react-native-screens`: `~4.26.0`
- `@expo/vector-icons`: `^15.0.2`
- `@react-native-async-storage/async-storage`: `2.2.0`
- `@react-navigation/native`: `^7.4.1`
- `@react-navigation/bottom-tabs`: `^7.19.2`
- `zustand`: `^5.0.3` (with React 19 support)
- `@types/react`: `~19.2.0`

## Proposed Changes
1. **[MODIFY] `package.json`**:
   - Update `dependencies` and `devDependencies` to match Expo SDK 57 and React 19.
2. **[MODIFY] `app.json`**:
   - Verify SDK / configuration compatibility.
3. **[EXECUTE]**:
   - Run `pnpm install` in `apps/mobile-ui`.
4. **[VERIFY]**:
   - Run `pnpm tsc --noEmit` to verify type compatibility with React 19 and React Navigation 7.
   - Run `pnpm expo config --type public` to confirm valid SDK 57 configuration.

## Verification Plan
- Successful `pnpm install` without package conflicts.
- `pnpm tsc --noEmit` passes with 0 errors.
- `pnpm expo config --type public` verifies SDK 57.0.0 environment.
