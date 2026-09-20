# Implementation Plan - Fix expo-blur Module Resolution in pnpm Monorepo

## Root Cause Analysis
When executing `pnpm ios` (which invokes `expo start --ios`), Expo CLI parses `app.json` and attempts to load all entries listed in the `"plugins"` array via `@expo/config-plugins`.
In `app.json`, `"plugins": ["expo-blur"]` was specified. However:
1. `expo-blur` is an Expo Native Module with native iOS/Android code that is automatically linked via `expo-module.config.json` and CocoaPods / Gradle during prebuild/run.
2. `expo-blur` does NOT provide an Expo config plugin (`app.plugin.js`).
3. Consequently, Expo's plugin loader attempts to dynamically import `expo-blur`'s entry point (`build/index.js`).
4. In Node's ESM resolution context, `build/index.js` contains `export { default as BlurView } from './BlurView'`, which fails with `ERR_MODULE_NOT_FOUND` because Node's native ESM requires explicit file extensions (`./BlurView.js`).

Additionally, in a pnpm monorepo structure, Expo Metro needs a `metro.config.js` to watch the workspace root and resolve hoisted/symlinked `node_modules`.

## Proposed Changes
1. **[MODIFY] `app.json`**:
   - Remove `"plugins": ["expo-blur"]` as `expo-blur` is an auto-linked native module and not a config plugin.
2. **[NEW] `metro.config.js`**:
   - Create standard Expo monorepo Metro configuration supporting pnpm workspace resolution and root `node_modules`.

## Verification Plan
1. Validate `app.json` schema and verify `plugins` array is cleaned up.
2. Verify `metro.config.js` is properly configured.
3. Test running `npx expo config --type public` or equivalent Expo CLI config resolution to ensure zero plugin resolution errors.
