# Implementation Plan: Rename Repository from `prjz` to `unipost`

This plan details renaming every occurrence of **`prjz`** to **`unipost`** across the entire codebase, including Maven coordinates, directory names, Java package structures, configuration files, and documentation.

## User Review Required

> [!IMPORTANT]
> **Complete Package & Directory Refactoring:**
> - Java package root changes from `com.prjz.*` to `com.unipost.*`.
> - All Maven module folders change from `prjz-*` to `unipost-*`.
> - Maven `groupId` changes from `com.prjz` to `com.unipost`.
> - Root Maven `artifactId` changes from `prjz` to `unipost`.

---

## Proposed Changes

### Step 1: Clean Build Artifacts
Run Maven clean or delete all `target/` directories across all modules so only source files are modified:
- Remove all `target/` folders.

### Step 2: Source Code Package Refactoring
Move Java directories from `com/prjz` to `com/unipost` in:
- `prjz-core/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-fw/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-ms-fs/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-ms-identity/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-report-engine/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-ms-worker/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-ms-aio/src/main/java/com/prjz` &rarr; `com/unipost`
- `prjz-ms-aio/src/test/java/com/prjz` &rarr; `com/unipost`

Update package declarations and imports across all Java files:
- Replace `package com.prjz` &rarr; `package com.unipost`
- Replace `import com.prjz` &rarr; `import com.unipost`
- Replace string references (e.g. `@ComponentScan(basePackages = { "com.unipost" })`, `@Modulithic(systemName = "unipost")`).

### Step 3: Module & Directory Renaming
Rename module folders:
- `prjz-core` &rarr; `unipost-core`
- `prjz-resources` &rarr; `unipost-resources`
- `prjz-fw` &rarr; `unipost-fw`
- `prjz-db` &rarr; `unipost-db`
- `prjz-ms-fs` &rarr; `unipost-ms-fs`
- `prjz-ms-identity` &rarr; `unipost-ms-identity`
- `prjz-report-engine` &rarr; `unipost-report-engine`
- `prjz-ms-worker` &rarr; `unipost-ms-worker`
- `prjz-ms-aio` &rarr; `unipost-ms-aio`

### Step 4: Maven POMs & Coordinates
- **Root POM (`pom.xml`)**:
  - `<groupId>com.unipost</groupId>`
  - `<artifactId>unipost</artifactId>`
  - `<modules>`: Update all module paths to `./unipost-*`
- **Module POMs (`unipost-*/pom.xml`)**:
  - Update `<parent>` coordinates to `com.unipost:unipost`.
  - Update `<artifactId>unipost-*</artifactId>`.
  - Update internal dependencies to `<groupId>${project.groupId}</groupId>` / `unipost-*`.

### Step 5: Configuration Files & Resources
Update occurrences of `prjz` to `unipost` in:
- `application.yml`, `application.properties` (e.g. `unipost-export`, context paths, datasource credentials/names)
- `logback-spring.xml` / logback configs
- MyBatis mapper XMLs (`com.unipost.*`)
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
   .\mvnw.cmd test -pl unipost-ms-aio -Dtest=ModularityTests
   ```
3. **Verify Zero Leftover `com.prjz` references in Source Trees:**
   ```powershell
   Get-ChildItem -Recurse -Include *.java,*.xml,*.yml | Select-String "com.prjz"
   ```
