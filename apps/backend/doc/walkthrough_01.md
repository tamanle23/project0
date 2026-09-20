# Walkthrough: Turborepo Integration for Java Modulith Backend

The Java Spring Modulith backend (`apps/backend`) has been integrated into the Turborepo and `pnpm` monorepo workspace. Turborepo pipeline tasks (`build`, `dev`, `test`, `lint`, `check-types`) are now fully functional from the root workspace and via targeted `--filter` commands.

## Architecture Overview

- **Spring Modulith Core**: The backend domain modules (`project0-core`, `project0-fw`, `project0-resources`, `project0-db`, `project0-ms-fs`, `project0-ms-identity`, `project0-report-engine`, `project0-ms-worker`) define domain boundaries.
- **AIO Wrapper (`project0-ms-aio`)**: The All-In-One wrapper application bundles and executes all modulith modules, houses the Spring Modulith verification test (`ModularityTests.java`), and packages the final runnable Fat JAR.
- **Turborepo & Cross-Platform Orchestration**:
  - `apps/backend/package.json`: Exposes standard Turborepo task scripts.
  - `apps/backend/mvnw.cjs`: Cross-platform Node.js runner that dynamically detects OS shell requirements (`mvnw.cmd` on Windows vs `mvnw` on POSIX) and auto-detects `JAVA_HOME` if isolated by Turborepo.
  - `apps/backend/turbo.json`: Defines caching for `builds/**` and `**/target/**`.
  - `turbo.json`: Added `JAVA_HOME` to `globalPassThroughEnv`.

## Changes Made

### Java Backend (`apps/backend`)

#### [package.json](file:///c:/Users/Admin/workspace/git/project0/apps/backend/package.json)
Created private workspace package `@project0/backend` with scripts:
- `build`: `node mvnw.cjs clean package -DskipTests`
- `dev`: `node mvnw.cjs -pl project0-ms-aio spring-boot:run -Dspring-boot.run.profiles=dev`
- `test`: `node mvnw.cjs test`
- `test:modulith`: `node mvnw.cjs -pl project0-ms-aio test -Dtest=ModularityTests`
- `lint`: `node mvnw.cjs test-compile -DskipTests`
- `check-types`: `node mvnw.cjs test-compile -DskipTests`
- `clean`: `node mvnw.cjs clean`

#### [mvnw.cjs](file:///c:/Users/Admin/workspace/git/project0/apps/backend/mvnw.cjs)
Implemented a zero-dependency cross-platform runner:
- Invokes `mvnw.cmd` on Windows and `mvnw` on Linux/macOS.
- Automatically detects `JAVA_HOME` via `where.exe java` / `which java` if not present in the environment.

#### [turbo.json](file:///c:/Users/Admin/workspace/git/project0/apps/backend/turbo.json)
Configured package-level caching:
```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["builds/**", "**/target/**"]
    }
  }
}
```

### Monorepo Root

#### [turbo.json](file:///c:/Users/Admin/workspace/git/project0/turbo.json)
- Added `"JAVA_HOME"` to `globalPassThroughEnv` so Turborepo passes the Java environment variable to spawned task runners.

#### [pnpm-lock.yaml](file:///c:/Users/Admin/workspace/git/project0/pnpm-lock.yaml)
- Updated via `pnpm install` to register `@project0/backend` in the 7 workspace packages.

## Verification Results

### 1. Spring Modulith Architecture Verification
Command:
```bash
pnpm --filter @project0/backend test:modulith
```
Result: **Passed**
- Executed `ModularityTests` in `project0-ms-aio`.
- Verified domain boundaries and controllers:
  ```
  === Spring Modulith Application Modules ===
  # Controller
  > Logical name: com.project0.aio.controller
  > Base package: com.project0.aio.controller
  > Excluded packages: none
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
  ```

### 2. Turborepo Lint & Type-Check Task
Command:
```bash
pnpm turbo run lint --filter=@project0/backend
```
Result: **Passed** (exit code 0)
- Compiled all 10 modules including annotation processors (MapStruct, Lombok, QueryDSL).

### 3. Turborepo Test Pipeline
Command:
```bash
pnpm turbo run test --filter=@project0/backend
```
Result: **Passed** (exit code 0)
- Ran full test suite across the reactor in 8.0s.

### 4. Turborepo Build & Fat JAR Packaging
Command:
```bash
pnpm turbo run build --filter=@project0/backend
```
Result: **Passed** (exit code 0)
- Packaged Fat JAR artifact in `apps/backend/project0-ms-aio/target/project0-ms-aio-1.0.0-SNAPSHOT.jar` and `apps/backend/builds/project0-ms-aio/`.
