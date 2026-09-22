---
name: Turborepo Registry & Routing Rules
description: Authoritative workspace registry and routing directives for the Turborepo monorepo.
trigger: always_on
---

# Turborepo Registry & Routing Rules (Auto-Generated)

## Monorepo Specs
- Package Manager: pnpm
- Turbo Pipelines: build, dev, lint, test, check-types, validate:infra

## Workspace Registry
### Apps
- `@project0/backend`:
  - Path: `apps/backend`
  - Framework: Spring Boot / Spring Modulith (Java 21)
  - Internal Dependencies: None
- `@project0/console`:
  - Path: `apps/console`
  - Framework: React 19 (Vite)
  - Internal Dependencies: `@project0/ui`, `@project0/i18n`, `@project0/typescript-config`
- `@project0/desktop`:
  - Path: `apps/desktop-console`
  - Framework: Electrobun (Bun)
  - Internal Dependencies: `@project0/console`, `@project0/typescript-config`
- `mobile-ui`:
  - Path: `apps/mobile-ui`
  - Framework: React Native (Expo)
  - Internal Dependencies: None
- `tekgo-ui`:
  - Path: `apps/tekgo-ui`
  - Framework: Next.js 15 (React 19)
  - Internal Dependencies: `@project0/ui`

### Packages
- `@project0/i18n`:
  - Path: `packages/i18n`
  - Role: Shared internationalization library
- `@project0/typescript-config`:
  - Path: `packages/typescript-config`
  - Role: Shared TypeScript configurations
- `@project0/ui`:
  - Path: `packages/ui`
  - Role: Shared UI component library and styling utilities

## Operational Directives
1. Persistent Mapping: Treat the registry above as the authoritative workspace index. Never perform full-repo file/tree scans to locate these apps or packages again.
2. Direct Scoping: When an app or package name is referenced, scope context, file reads, and searches directly inside its registered path.
3. Monorepo Execution: Execute all filtered workspace commands from the root using `--filter <app-name>` (e.g., `pnpm --filter <app-name> <command>` or `turbo run <task> --filter=<app-name>`).
