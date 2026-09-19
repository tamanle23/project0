---
name: Monorepo Guidelines (Turborepo + pnpm)
description: Enforces monorepo boundaries, package manager usage, and Turborepo guidelines.
trigger: always_on
---

# Monorepo Guidelines

You are operating in a `pnpm` workspaces monorepo orchestrated by Turborepo. Please adhere to the following rules at all times:

## 1. Package Manager
* **Strictly Use pnpm:** Never use `npm` or `yarn` for managing dependencies. 
* Always run `pnpm install` from the root of the project to sync the `pnpm-lock.yaml` file after making changes to any `package.json`.

## 2. Dependency Management
* **Workspace Links:** When an app depends on a local package within this repository, always use the `workspace:*` protocol (e.g., `"@project0/typescript-config": "workspace:*"`).
* Avoid creating circular dependencies between `apps/` and `packages/`.

## 3. Command Execution
* **Use Filters:** Prefer running scripts via pnpm filters from the root workspace instead of changing directories (e.g., use `pnpm --filter tekgo-ui dev`).
* **Turborepo:** Use `turbo` for running pipeline commands like `build`, `lint`, and `test` to leverage caching.

## 4. Build Artifacts and Caching
* **Read-only Outputs:** Do not manually edit files inside `dist/`, `.next/`, `out/`, or `.vite/`. These are build artifacts managed and cached by Turborepo.
* **Consistent Outputs:** Ensure all apps and packages configure their build tools (Vite, Next.js, tsc) to output strictly to the local directories declared in `turbo.json`'s `outputs` array.

## 5. Architectural Boundaries
* **Apps vs Packages:** Respect the boundary between `apps/` (deployable applications) and `packages/` (shared internal libraries). 
* Do not tightly couple apps to each other. Extract shared logic, types, and UI components into the `packages/` directory so they can be securely linked.
