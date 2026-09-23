# Walkthrough: Migrate QueryDSL Repositories to MyBatis in `@project0/backend`

All QueryDSL repositories and configurations in `@project0/backend` have been successfully migrated to MyBatis interfaces and XML mappers, and QueryDSL dependencies have been removed.

## Changes Completed

### 1. MyBatis Mapper Interfaces (`project0-ms-identity`)
- **[UserRepository.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/repository/mybatis/UserRepository.java)**:
  - Added `findAllUserPermissions(String uid)`
  - Added `findAllUserRoles(String uid)`
  - Added `findAllRoleGroupByPermission(Set<Long> roleIds)`
  - Added `findUsersName(List<String> userUids)`
- **[RoleRepository.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/repository/mybatis/RoleRepository.java)**:
  - Added `findAllRolePermissions(String uid)`
  - Added `findAllRoleUsers(String uid)`
  - Added `findAllRolesWithUserCount(long offset, long size)`

---

### 2. MyBatis Mapper XMLs (`project0-ms-identity`)
- **[UserRepository.xml](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/resources/mappers/UserRepository.xml)**:
  - Added `UserPermissionVmMap` and `UserRoleVmMap` `<resultMap>` definitions.
  - Implemented `<select>` queries for `findAllUserPermissions`, `findAllUserRoles`, `findAllRoleGroupByPermission`, and `findUsersName`.
- **[RoleRepository.xml](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/resources/mappers/RoleRepository.xml)**:
  - Added `RolePermissionVmMap`, `RoleUserVmMap`, and `RoleVmMap` `<resultMap>` definitions.
  - Implemented `<select>` queries for `findAllRolePermissions`, `findAllRoleUsers`, and `findAllRolesWithUserCount`.

---

### 3. Service Layer Refactoring (`project0-ms-identity`)
- **[UserServiceImpl.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/service/impl/UserServiceImpl.java)**: Replaced `QUserRepository` with `@Autowired com.project0.user.repository.mybatis.UserRepository mUserRepository`.
- **[RoleServiceImpl.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/service/impl/RoleServiceImpl.java)**: Replaced `QRoleRepository` with existing `@Autowired com.project0.user.repository.mybatis.RoleRepository mRoleRepository`.

---

### 4. Code Cleanup & Dependency Removal
- **Deleted QueryDSL repository and model files**:
  - `QUserRepository.java`
  - `QRoleRepository.java`
  - `CompositeUser.java`, `CompositeRole.java`, `CompositePermission.java`
  - `BaseQRepository.java`
  - `QueryDslConfiguration.java`
- **Updated POM files**:
  - Removed `querydsl-apt` and `querydsl-jpa` dependencies from `apps/backend/project0-fw/pom.xml`.
  - Removed `querydsl.version` property and `querydsl-apt` annotation processor from `apps/backend/pom.xml`.

---

## Verification Results

### Automated Build & Compilation
Executed `./mvnw.cmd clean test-compile -DskipTests` in `apps/backend`:
- All 10 reactor modules (`project0`, `project0-core`, `project0-fw`, `project0-resources`, `project0-db`, `project0-ms-fs`, `project0-ms-identity`, `project0-report-engine`, `project0-ms-worker`, `project0-ms-aio`) built **SUCCESSFULLY** in `54.74s`.
