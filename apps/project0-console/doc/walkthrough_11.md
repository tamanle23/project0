# Walkthrough: Add Flag to Disable TanStack Devtools in Dev Mode

Added support for disabling TanStack Router and React Query devtools during development using CLI flags, Vite modes, and environment variables.

## 1. Summary of Changes

| File | Change |
| :--- | :--- |
| [`apps/project0-console/vite.config.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/project0-console/vite.config.ts) | Inspects CLI arguments (`--no-devtools`, `--disable-devtools`), Vite mode (`--mode no-devtools`), and environment variable (`VITE_DISABLE_DEVTOOLS=true`). Injects compile-time define for `import.meta.env.VITE_DISABLE_DEVTOOLS`. |
| [`apps/project0-console/src/routes/__root.tsx`](file:///c:/Users/Admin/workspace/git/project0/apps/project0-console/src/routes/__root.tsx) | Checks `isDevtoolsDisabled = import.meta.env.MODE === 'production' || import.meta.env.VITE_DISABLE_DEVTOOLS === 'true'`. Devtools are always disabled in production, and disabled in dev when `VITE_DISABLE_DEVTOOLS=true` is present. Avoids dynamic imports for `@tanstack/react-query-devtools` and `@tanstack/react-router-devtools` entirely. |
| [`apps/project0-console/package.json`](file:///c:/Users/Admin/workspace/git/project0/apps/project0-console/package.json) | Added `"dev:no-devtools": "vite --mode no-devtools"` script. |

---

## 2. How to Use

You can disable TanStack devtools when starting the dev server in any of the following ways:

### Option A: Dedicated npm script (Recommended)
```bash
pnpm --filter @project0/console dev:no-devtools
```

### Option B: Vite `--mode` flag
```bash
pnpm --filter @project0/console dev --mode no-devtools
```

### Option C: Passthrough CLI flag
```bash
pnpm --filter @project0/console dev -- --no-devtools
```

### Option D: Environment variable
In `.env.development` or shell:
```bash
VITE_DISABLE_DEVTOOLS=true
```

---

## 3. Verification

- **Dev server**: Tested `pnpm --filter @project0/console dev:no-devtools`, server booted in 538 ms with `no-devtools` mode.
- **Build**: `pnpm --filter @project0/console build:web` succeeded in 568 ms with exit code 0.
- **Lint**: `pnpm --filter @project0/console lint` passed with 0 errors and 0 warnings.
