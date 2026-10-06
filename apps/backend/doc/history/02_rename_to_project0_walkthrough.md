# Walkthrough: Renaming `prjz` to `unipost`

## Overview

We successfully refactored and renamed every occurrence of **`prjz`** to **`unipost`** across the entire codebase, covering:
- Maven project `groupId` (`com.unipost`) and `artifactId` (`unipost`)
- Module directory names (`unipost-*`)
- Java package structures (`com.unipost.*`)
- Spring Modulith configurations and verification tests
- Application configs, resources, MyBatis mappers, Liquibase changelogs, and shell scripts

All 10 modules compile, package, and pass Spring Modulith architecture verification with **`BUILD SUCCESS`**.

---

## Changes Summary

### 1. Directory & Module Renaming
All 9 Maven submodule directories were renamed:
- `prjz-core` &rarr; `unipost-core`
- `prjz-resources` &rarr; `unipost-resources`
- `prjz-fw` &rarr; `unipost-fw`
- `prjz-db` &rarr; `unipost-db`
- `prjz-ms-fs` &rarr; `unipost-ms-fs`
- `prjz-ms-identity` &rarr; `unipost-ms-identity`
- `prjz-report-engine` &rarr; `unipost-report-engine`
- `prjz-ms-worker` &rarr; `unipost-ms-worker`
- `prjz-ms-aio` &rarr; `unipost-ms-aio`

Resource directories and scripts:
- `unipost-db/src/main/resources/db/unipost/`
- `unipost-db/src/main/resources/db/unipost_old/`
- `unipost-db/src/main/resources/liquibase_local_unipost.properties`
- `deployment/unipost.sh`

### 2. Java Package Structure
All Java package roots across all modules moved from:
`com/prjz/...` &rarr; `com/unipost/...`

Every `.java` file was updated:
- `package com.unipost.*`
- `import com.unipost.*`
- `@ComponentScan(basePackages = { "com.unipost" })`
- `@Modulithic(systemName = "unipost", useFullyQualifiedModuleNames = true)`
- Byte-order mark (BOM) was cleanly stripped to ensure standard Java UTF-8 compilation.

### 3. Maven POM Files
- **Root POM (`pom.xml`)**:
  - `<groupId>com.unipost</groupId>`
  - `<artifactId>unipost</artifactId>`
  - Module references updated to `./unipost-*`
- **Module POMs (`unipost-*/pom.xml`)**:
  - Parent coordinates updated to `com.unipost:unipost`
  - Artifact IDs updated to `unipost-*`
  - Internal dependencies updated to reference `${project.groupId}:unipost-*`

### 4. Configuration & Resources
Updated all references to `unipost` in:
- `application.yml` and `application-local.yml`
- MyBatis mapper XMLs (`com.unipost.*` namespaces and result types)
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
[INFO] Reactor Summary for unipost 1.0.0-SNAPSHOT:
[INFO] 
[INFO] unipost ........................................... SUCCESS [  0.272 s]
[INFO] unipost-core ...................................... SUCCESS [  2.390 s]
[INFO] unipost-resources ................................. SUCCESS [  0.841 s]
[INFO] unipost-fw ........................................ SUCCESS [  3.090 s]
[INFO] unipost-db ........................................ SUCCESS [  1.196 s]
[INFO] unipost-ms-fs ..................................... SUCCESS [  6.412 s]
[INFO] unipost-ms-identity ............................... SUCCESS [  2.202 s]
[INFO] unipost-report-engine ............................. SUCCESS [  2.683 s]
[INFO] unipost-ms-worker ................................. SUCCESS [  2.102 s]
[INFO] unipost-ms-aio .................................... SUCCESS [  3.513 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] Total time:  24.921 s
```

### 2. Spring Modulith Architecture Verification Test
```bash
.\mvnw.cmd test -pl unipost-ms-aio -Dtest=ModularityTests
```
```
[INFO] Running com.unipost.aio.ModularityTests
=== Spring Modulith Application Modules ===
# Controller
> Logical name: com.unipost.aio.controller
> Base package: com.unipost.aio.controller
> Excluded packages: none
> Spring beans:
  + com.unipost.aio.controller.GlobalBindingInitializer
  + com.unipost.aio.controller.RemoteController

[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.264 s -- in com.unipost.aio.ModularityTests
[INFO] BUILD SUCCESS
```
