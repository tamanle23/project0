---
name: Story & Project-Specific Rules
description: Compact monorepo registry, packaging boundaries, i18n sync, and Liquid Glass design standards.
trigger: always_on
---

# WORKSPACE REGISTRY & ROUTING
- Specs: `pnpm` workspace + Turborepo pipelines (`build`, `dev`, `lint`, `test`, `check-types`).
- Registry:
  - `@project0/backend`: `apps/backend` (Java 21 / Spring Modulith) | Deps: None
  - `@project0/console`: `apps/console` (React 19 / Vite 8) | Deps: `@project0/ui`, `@project0/i18n`, `@project0/typescript-config`
  - `@project0/desktop`: `apps/desktop-console` (Electrobun) | Deps: `@project0/console`, `@project0/typescript-config`
  - `mobile-ui`: `apps/mobile-ui` (Expo SDK 57 / React Native 0.86) | Deps: None
  - `tekgo-ui`: `apps/tekgo-ui` (Next.js 15 / React 19) | Deps: `@project0/ui`
  - Packages: `@project0/i18n` (`packages/i18n`), `@project0/typescript-config` (`packages/typescript-config`), `@project0/ui` (`packages/ui`)
- Directive: Treat registry as authoritative. NEVER perform full-repo tree scans to locate apps. Scope all operations directly inside registered paths.

# MONOREPO & PACKAGING BOUNDARIES
- Package Manager: STRICTLY `pnpm`. NEVER run `npm` or `yarn`. Run `pnpm install` at root on dependency changes.
- Workspace Linking: MUST use `"workspace:*"` for all internal package references.
- Execution: ALWAYS run commands from root with filters: `pnpm --filter <app> <cmd>` or `turbo run <task> --filter=<app>`. NEVER use `cd`.
- Isolation: Apps in `apps/` MUST NEVER import from sibling apps via relative paths. Use `packages/`.
- Build Outputs: NEVER edit files in `dist/`, `.next/`, `out/`, `.vite/`, `target/`.

# I18N & LOCALE SYNCHRONIZATION
- Common Resources: Shared strings MUST be in `packages/i18n/src/locales/<lang>/common.json` (ns `common:`).
- App Resources: App-specific strings MUST be in `apps/<app>/src/locales/<lang>/<app>.json`.
- UI Usage: MUST use `useTranslation()` with English fallback: `t('key', 'Fallback')`. NEVER hardcode raw text.
- Locale Sync: Whenever keys are modified, MUST sync all supported locales (`en`, `vi`) simultaneously.
- Nav Items: All items in `sidebar-data.ts` MUST have matching keys in all locale JSON files.

# LIQUID GLASS UI DESIGN STANDARDS
- Priority: Liquid Glass is the mandatory visual aesthetic across all UI clients.
- Core Glass Tokens:
  - Translucency: Multi-layer backdrop blur (`backdrop-blur-md` to `backdrop-blur-2xl`) over tinted frosted scrims (`bg-white/65`, `dark:bg-slate-900/65`). NEVER use flat opaque backgrounds.
  - Borders: Specular borders `border-white/30 dark:border-white/10` with inset highlights `shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]`.
  - Shadows: Diffuse floating elevation `shadow-xl shadow-black/5 dark:shadow-black/30`.
  - Contrast: WCAG AA compliance is mandatory. Adjust scrim opacity behind text.
- Platform Specifics:
  - Web: Tailwind v4 glass cards (`backdrop-blur-xl bg-white/65 border border-white/30`), frosted sticky headers.
  - Mobile: Expo `BlurView` (`tint="systemMaterial"`, intensity 50-85) + `LinearGradient` specular sheens.
  - Desktop: Electrobun window vibrancy + CSS `backdrop-filter: blur(...)`.
