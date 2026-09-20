# Walkthrough 02: Fix expo-blur Resolution and TypeScript Validation

## Problem Resolved
When running `pnpm ios`, the following error occurred:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../expo-blur/build/BlurView' imported from '.../expo-blur/build/index.js'
```

## Root Cause
1. **Config Plugin Mismatch**: In `app.json`, `"expo-blur"` was added to the `"plugins"` array. `expo-blur` is an Expo native module with autolinking (not a config plugin). When Expo CLI tried to dynamically import it as a config plugin during startup, Node.js failed under ESM resolution because `expo-blur/build/index.js` uses extensionless relative imports (`from './BlurView'`).
2. **Missing Monorepo Metro Configuration**: In a pnpm monorepo, Expo Metro needs explicit `watchFolders` and `resolver.nodeModulesPaths` pointing to the workspace root and project `node_modules`.

## Key Changes
- **`app.json`**: Removed `"plugins": ["expo-blur"]`.
- **`metro.config.js`**: Added monorepo-compatible Metro configuration pointing to the monorepo root and node modules.
- **`tsconfig.json`**: Added `"ignoreDeprecations": "6.0"` to ensure smooth compilation with monorepo TypeScript 6.
- **`src/components/LiquidGlassView.tsx`**: Safely normalized `Platform.Version` to avoid TS type mismatches on Android older version checks.
- **`src/navigation/RootNavigator.tsx`**: Cleaned up unsupported options in `BottomTabNavigationOptions`.

## Verification Results
1. `npx expo config --type public`: Exited with code 0; app config generated successfully without plugin resolution errors.
2. `npx tsc --noEmit`: Exited with code 0; pure TypeScript strict mode passed with zero errors.
