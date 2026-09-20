# Walkthrough 14 - Migrate @expo/vector-icons to @react-native-vector-icons

## Summary
Successfully migrated the application from `@expo/vector-icons` to the modular `@react-native-vector-icons` package family (`@react-native-vector-icons/feather`), and removed `@expo/vector-icons` from the project dependencies.

## Changes Made
1. **Installed Dependency**:
   - Installed `@react-native-vector-icons/feather` (`^13.1.4`) via `pnpm`.
2. **Removed Deprecated Dependency**:
   - Removed `@expo/vector-icons` from `apps/mobile-ui/package.json`.
3. **Screen Updates (`DashboardScreen.tsx`)**:
   - Updated import:
     ```tsx
     // Before
     import { Feather } from '@expo/vector-icons';

     // After
     import { Feather } from '@react-native-vector-icons/feather';
     ```
   - Maintained all post action icons (`more-horizontal`, `heart`, `message-circle`, `share-2`, `bookmark`).
4. **Bottom Tab Bar**:
   - Continues using the custom SVG vector `StreamlineColorIcon` powered by `react-native-svg`.

## Verification
- Ran `pnpm tsc --noEmit`: Completed with 0 errors.
- Verified that all icon references resolve cleanly through `@react-native-vector-icons/feather`.
