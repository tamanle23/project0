# Walkthrough 04: Upgrade to Expo SDK 57.0.0 & React 19

## Upgrade Summary
Upgraded the project stack to **Expo SDK 57.0.0** to match the latest Expo Go runtime version.

## Key Package Versions
- **`expo`**: `~57.0.24` (SDK 57.0.0 runtime)
- **`react`**: `19.2.3`
- **`react-native`**: `0.86.3`
- **`expo-blur`**: `~57.0.3`
- **`expo-status-bar`**: `~57.0.1`
- **`@expo/vector-icons`**: `^15.0.2`
- **`@react-native-async-storage/async-storage`**: `2.2.0`
- **`react-native-safe-area-context`**: `~5.7.0`
- **`react-native-screens`**: `~4.26.0`
- **`@react-navigation/native`**: `^7.0.14`
- **`@react-navigation/bottom-tabs`**: `^7.2.0`
- **`zustand`**: `^5.0.3`

## Adjustments Made
1. **`package.json`**: Upgraded all dependencies and devDependencies to Expo SDK 57 bundled native versions and React 19 equivalents using `pnpm`.
2. **`tsconfig.json`**: Cleaned up deprecation settings now natively compatible with SDK 57's `expo/tsconfig.base`.
3. **`metro.config.js`**: Maintained dynamic physical IP resolution to ensure seamless connectivity with Expo Go.

## Verification Results
- `pnpm install`: Successfully installed in monorepo.
- `pnpm tsc --noEmit`: Exited with code 0 (Zero TypeScript errors).
- `pnpm expo config --type public`: Confirmed `sdkVersion: '57.0.0'` across iOS, Android, and Web platforms.
