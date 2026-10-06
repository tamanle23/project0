# Implementation Plan - Turborepo Compatibility for Java Modulith Backend

Integrate the Java Maven backend (`apps/backend`) into the Turborepo and `pnpm` monorepo workspace.
The backend is structured as a **Spring Modulith** project consisting of domain modules (`unipost-core`, `unipost-fw`, `unipost-resources`, `unipost-db`, `unipost-ms-fs`, `unipost-ms-identity`, `unipost-report-engine`, `unipost-ms-worker`) and a unified **All-In-One (AIO) wrapper application** (`unipost-ms-aio`).

## Architectural Context

- **Spring Modulith Core**: The backend domain logic is partitioned into clean modular boundaries. Spring Modulith verifies these boundaries via `ModularityTests` in `unipost-ms-aio`.
- **AIO Wrapper (`unipost-ms-aio`)**: The executable Spring Boot application that aggregates all modules into a runnable service and produces the final Fat JAR artifact (`builds/unipost-ms-aio/unipost-ms-aio-1.0.0-SNAPSHOT.jar`).
- **Turborepo Integration**: By placing `package.json` in `apps/backend`, Turborepo can orchestrate building all modulith modules, running the AIO wrapper in development mode, executing modulith verification tests, and linting/type-checking via the Java compiler and annotation processors.

## Proposed Changes

### Java Backend Workspace (`apps/backend`)

#### [NEW] [package.json](file:///c:/Users/Admin/workspace/git/unipost/apps/backend/package.json)
- Define `@unipost/backend` as a private workspace package.
- Map Turborepo pipeline tasks to Maven and the AIO wrapper:
  - `build`: `node mvnw.cjs clean package -DskipTests` (compiles all modulith modules and packages the AIO wrapper Fat JAR)
  - `dev`: `node mvnw.cjs -pl unipost-ms-aio spring-boot:run -Dspring-boot.run.profiles=dev` (runs the Spring Modulith via the AIO wrapper application in dev profile)
  - `test`: `node mvnw.cjs test` (runs unit tests across modules and Modulith architecture verification)
  - `test:modulith`: `node mvnw.cjs -pl unipost-ms-aio test -Dtest=ModularityTests` (targeted Modulith structural verification)
  - `lint`: `node mvnw.cjs test-compile -DskipTests` (validates syntax, type safety, MapStruct, and Lombok annotation processors)
  - `clean`: `node mvnw.cjs clean`

#### [NEW] [mvnw.cjs](file:///c:/Users/Admin/workspace/git/unipost/apps/backend/mvnw.cjs)
- Cross-platform Maven runner script ensuring seamless execution on Windows (`mvnw.cmd`) and POSIX (`mvnw`) without PATH or shell compatibility issues.

#### [NEW] [turbo.json](file:///c:/Users/Admin/workspace/git/unipost/apps/backend/turbo.json)
- Workspace-level Turborepo configuration extending root (`"extends": ["//"]`).
- Specifies cacheable build outputs: `builds/**` and `**/target/**`.

---

### Monorepo Root & Lockfile

#### [MODIFY] [pnpm-lock.yaml](file:///c:/Users/Admin/workspace/git/unipost/pnpm-lock.yaml)
- Run `pnpm install` from root to register `@unipost/backend` in the pnpm workspace.

---

### App Documentation & Artifact History

#### [MODIFY] [apps/backend/doc/implementation_plan_01.md](file:///c:/Users/Admin/workspace/git/unipost/apps/backend/doc/implementation_plan_01.md)
- Mirror of this implementation plan per monorepo rules.

## Verification Plan

### Automated Tests
1. `pnpm install` from root — verify `@unipost/backend` is recognized as a workspace.
2. `pnpm --filter @unipost/backend lint` — verify type-check and compilation pass.
3. `pnpm --filter @unipost/backend test:modulith` — verify Spring Modulith module verification test executes and passes.
4. `turbo run lint --filter=@unipost/backend` — verify Turborepo task pipeline execution.
