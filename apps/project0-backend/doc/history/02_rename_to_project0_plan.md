# Implementation Plan: Rename Repository from `prjz` to `project0`

This plan details renaming every occurrence of **`prjz`** to **`project0`** across the entire codebase, including Maven coordinates, directory names, Java package structures, configuration files, and documentation.

## User Review Required

> [!IMPORTANT]
> **Complete Package & Directory Refactoring:**
> - Java package root changes from `com.prjz.*` to `com.project0.*`.
> - All Maven module folders change from `prjz-*` to `project0-*`.
> - Maven `groupId` changes from `com.prjz` to `com.project0`.
> - Root Maven `artifactId` changes from `prjz` to `project0`.

---

## Proposed Changes

### Step 1: Clean Build Artifacts
Run Maven clean or delete all `target/` directories across all modules so only source files are modified:
- Remove all `target/` folders.

### Step 2: Source Code Package Refactoring
Move Java directories from `com/prjz` to `com/project0` in:
- `prjz-core/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-fw/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-ms-fs/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-ms-identity/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-report-engine/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-ms-worker/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-ms-aio/src/main/java/com/prjz` &rarr; `com/project0`
- `prjz-ms-aio/src/test/java/com/prjz` &rarr; `com/project0`

Update package declarations and imports across all Java files:
- Replace `package com.prjz` &rarr; `package com.project0`
- Replace `import com.prjz` &rarr; `import com.project0`
- Replace string references (e.g. `@ComponentScan(basePackages = { "com.project0" })`, `@Modulithic(systemName = "project0")`).

### Step 3: Module & Directory Renaming
Rename module folders:
- `prjz-core` &rarr; `project0-core`
- `prjz-resources` &rarr; `project0-resources`
- `prjz-fw` &rarr; `project0-fw`
- `prjz-db` &rarr; `project0-db`
- `prjz-ms-fs` &rarr; `project0-ms-fs`
- `prjz-ms-identity` &rarr; `project0-ms-identity`
- `prjz-report-engine` &rarr; `project0-report-engine`
- `prjz-ms-worker` &rarr; `project0-ms-worker`
- `prjz-ms-aio` &rarr; `project0-ms-aio`

### Step 4: Maven POMs & Coordinates
- **Root POM (`pom.xml`)**:
  - `<groupId>com.project0</groupId>`
  - `<artifactId>project0</artifactId>`
  - `<modules>`: Update all module paths to `./project0-*`
- **Module POMs (`project0-*/pom.xml`)**:
  - Update `<parent>` coordinates to `com.project0:project0`.
  - Update `<artifactId>project0-*</artifactId>`.
  - Update internal dependencies to `<groupId>${project.groupId}</groupId>` / `project0-*`.

### Step 5: Configuration Files & Resources
Update occurrences of `prjz` to `project0` in:
- `application.yml`, `application.properties` (e.g. `project0-export`, context paths, datasource credentials/names)
- `logback-spring.xml` / logback configs
- MyBatis mapper XMLs (`com.project0.*`)
- Shell scripts (`deployment/`, `start-hsql.sh`)
- Jenkinsfile & build files

---

## Verification Plan

### Automated Tests
1. **Full Reactor Build & Install:**
   ```powershell
   .\mvnw.cmd clean install -DskipTests
   ```
2. **Spring Modulith Verification:**
   ```powershell
   .\mvnw.cmd test -pl project0-ms-aio -Dtest=ModularityTests
   ```
3. **Verify Zero Leftover `com.prjz` references in Source Trees:**
   ```powershell
   Get-ChildItem -Recurse -Include *.java,*.xml,*.yml | Select-String "com.prjz"
   ```
