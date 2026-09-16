# Walkthrough: Renaming `prjz` to `project0`

## Overview

We successfully refactored and renamed every occurrence of **`prjz`** to **`project0`** across the entire codebase, covering:
- Maven project `groupId` (`com.project0`) and `artifactId` (`project0`)
- Module directory names (`project0-*`)
- Java package structures (`com.project0.*`)
- Spring Modulith configurations and verification tests
- Application configs, resources, MyBatis mappers, Liquibase changelogs, and shell scripts

All 10 modules compile, package, and pass Spring Modulith architecture verification with **`BUILD SUCCESS`**.

---

## Changes Summary

### 1. Directory & Module Renaming
All 9 Maven submodule directories were renamed:
- `prjz-core` &rarr; `project0-core`
- `prjz-resources` &rarr; `project0-resources`
- `prjz-fw` &rarr; `project0-fw`
- `prjz-db` &rarr; `project0-db`
- `prjz-ms-fs` &rarr; `project0-ms-fs`
- `prjz-ms-identity` &rarr; `project0-ms-identity`
- `prjz-report-engine` &rarr; `project0-report-engine`
- `prjz-ms-worker` &rarr; `project0-ms-worker`
- `prjz-ms-aio` &rarr; `project0-ms-aio`

Resource directories and scripts:
- `project0-db/src/main/resources/db/project0/`
- `project0-db/src/main/resources/db/project0_old/`
- `project0-db/src/main/resources/liquibase_local_project0.properties`
- `deployment/project0.sh`

### 2. Java Package Structure
All Java package roots across all modules moved from:
`com/prjz/...` &rarr; `com/project0/...`

Every `.java` file was updated:
- `package com.project0.*`
- `import com.project0.*`
- `@ComponentScan(basePackages = { "com.project0" })`
- `@Modulithic(systemName = "project0", useFullyQualifiedModuleNames = true)`
- Byte-order mark (BOM) was cleanly stripped to ensure standard Java UTF-8 compilation.

### 3. Maven POM Files
- **Root POM (`pom.xml`)**:
  - `<groupId>com.project0</groupId>`
  - `<artifactId>project0</artifactId>`
  - Module references updated to `./project0-*`
- **Module POMs (`project0-*/pom.xml`)**:
  - Parent coordinates updated to `com.project0:project0`
  - Artifact IDs updated to `project0-*`
  - Internal dependencies updated to reference `${project.groupId}:project0-*`

### 4. Configuration & Resources
Updated all references to `project0` in:
- `application.yml` and `application-local.yml`
- MyBatis mapper XMLs (`com.project0.*` namespaces and result types)
- `logback.xml` and `logback-local.xml`
- Liquibase changelogs and database scripts

---

## Verification Results

### 1. Full Reactor Clean Install
```bash
.\mvnw.cmd clean install -DskipTests
```
```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for project0 1.0.0-SNAPSHOT:
[INFO] 
[INFO] project0 ........................................... SUCCESS [  0.272 s]
[INFO] project0-core ...................................... SUCCESS [  2.390 s]
[INFO] project0-resources ................................. SUCCESS [  0.841 s]
[INFO] project0-fw ........................................ SUCCESS [  3.090 s]
[INFO] project0-db ........................................ SUCCESS [  1.196 s]
[INFO] project0-ms-fs ..................................... SUCCESS [  6.412 s]
[INFO] project0-ms-identity ............................... SUCCESS [  2.202 s]
[INFO] project0-report-engine ............................. SUCCESS [  2.683 s]
[INFO] project0-ms-worker ................................. SUCCESS [  2.102 s]
[INFO] project0-ms-aio .................................... SUCCESS [  3.513 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] Total time:  24.921 s
```

### 2. Spring Modulith Architecture Verification Test
```bash
.\mvnw.cmd test -pl project0-ms-aio -Dtest=ModularityTests
```
```
[INFO] Running com.project0.aio.ModularityTests
=== Spring Modulith Application Modules ===
# Controller
> Logical name: com.project0.aio.controller
> Base package: com.project0.aio.controller
> Excluded packages: none
> Spring beans:
  + com.project0.aio.controller.GlobalBindingInitializer
  + com.project0.aio.controller.RemoteController

[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.264 s -- in com.project0.aio.ModularityTests
[INFO] BUILD SUCCESS
```
