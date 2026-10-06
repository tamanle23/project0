# Walkthrough 15 - Phase 0, 1 & 2: Backend Metadata Safety, Complete Lifecycle & Partial Unique Indexes

Scope: `@project0/backend` (`project0-fw`, `project0-core`, `project0-db`)

## 1. Overview & Objectives

In Phase 0 (Verification of Assumptions), Phase 1 (Safety & Contract Hotfixes), and Phase 2 (Complete Lifecycle: CRUD Endpoints, Immutability, Archive, Delete Guards, Optimistic Locking, and Partial Unique Indexes), we investigated and resolved core security, data contract, lifecycle management, and persistence defects in the backend metadata module:

1. **Phase 0 Verification & PostgreSQL JSONB Bug Fix (C7)**:
   - Executed a real PostgreSQL smoke test via Testcontainers against `postgres:16-alpine`.
   - **Confirmed C7**: PostgreSQL rejected `@Column(columnDefinition="jsonb")` + `AttributeConverter<Map, String>` with `PSQLException: ERROR: column "options" is of type jsonb but expression is of type character varying`.
   - **Resolution**: Updated `AttributeDefinition` and `EntityRecord` to use `@JdbcTypeCode(SqlTypes.JSON)` for direct JSONB binding, and added the default no-arg constructor required by JPA converter specification.
2. **Mass Assignment & Entity Leaks (C1, H2)**: Introduced strict Java records / DTOs for request payloads and response envelopes. Banned binding JPA entities directly in `@RequestBody`.
3. **Authorization (C2, D4)**: Secured all metadata management endpoints with `@PreAuthorize` using fine-grained authorities (`METADATA_SCHEMA_WRITE`, `METADATA_SCHEMA_READ`, `METADATA_RECORD_WRITE`, `METADATA_RECORD_READ`) and `ROLE_ADMIN`.
4. **Soft-Delete Filtering (C6)**: Replaced unconstrained repository calls with soft-delete-aware queries (`findByIdAndDeletedDateIsNull`, `findByEntityTypeIdAndDeletedDateIsNull`, `findAllByDeletedDateIsNull`).
5. **Error Handling & Envelope Standardization (H3, D2)**: Standardized response contracts on `ResponseEntity<ResponseWrapper<ContextHeader, T>>` via `ResponseEntityBuilder`. Introduced domain business exceptions (`MetadataNotFoundException`, `MetadataConflictException`, `SchemaValidationException`) with proper 4xx status mapping. Added Jakarta Bean validation error mapping in `GlobalExceptionHandler`.
6. **Pagination Fix (H1)**: Fixed `PageBuilder` pagination calculations so `totalElements` is computed consistently across all pages, and `totalPages` calculation `(total + size - 1) / size` correctly handles exact multiples.
7. **Schema Validation Hardening (C3, C5)**: Enhanced `SchemaValidationService` with component-to-type mapping (boolean switch, numbers, multiselect arrays, json objects), excluded archived fields, and added graceful fallback on Redis cache failure.
8. **Phase 2 Complete Lifecycle & Schema Versioning**:
   - Added `schemaVersion` to `EntityType` and `EntityRecord` to track schema evolution.
   - Added `displayOrder` to `AttributeDefinition` for UI rendering sequence.
   - Created Liquibase migration `changelog-000.000.00002.xml` adding new columns and replacing plain unique constraints with partial unique indexes (`WHERE "deletedDate" IS NULL`) on PostgreSQL.
   - Implemented full CRUD endpoints for `EntityType`, `AttributeDefinition`, and `EntityRecord`.
   - Implemented archive/unarchive endpoints (`POST .../attributes/{attrId}/archive` and `unarchive`).
   - Implemented attribute reordering (`PUT .../attributes/order`).
   - Implemented delete guards: reject attribute deletion if active records contain values (unless `force=true`); cascading soft-delete on entity type deletion.
   - Enforced immutability rules (`dataType` and `systemName` cannot change; `uiComponent` can only change to compatible types).
   - Optimistic locking checks on all update/patch operations returning HTTP 409 `MetadataConflictException` on version mismatch.

---

## 2. Changes Implemented

### Liquibase & Database Migrations (`project0-db`)
- [`changelog-000.000.00002.xml`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-db/src/main/resources/db/project0/changelog-000.000.00002.xml):
  - Added `schema_version` to `entity_type` and `entity_record`.
  - Added `display_order` to `attribute_definition`.
  - Dropped unique constraints `uk_entity_type_sys_name` and `uk_attr_def_type_sys_name`.
  - Created PostgreSQL partial unique indexes `idx_entity_type_sysname_active` and `idx_attr_def_sysname_active` where `"deletedDate" IS NULL`.
- [`changelog-master.xml`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-db/src/main/resources/db/project0/changelog-master.xml): Included changeset `changelog-000.000.00002.xml`.

### Domain & DTO Layer (`project0-fw`)
- [`EntityType.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/EntityType.java): Added `schemaVersion`.
- [`AttributeDefinition.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/AttributeDefinition.java): Added `displayOrder`. Migrated `options` to `@JdbcTypeCode(SqlTypes.JSON)`.
- [`EntityRecord.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/EntityRecord.java): Added `schemaVersion`. Migrated `attributes` to `@JdbcTypeCode(SqlTypes.JSON)`.
- [`MapJsonConverter.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/MapJsonConverter.java): Added default constructor.
- [`DataType.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/DataType.java) & [`UiComponent.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/UiComponent.java): Type safety enums.
- DTOs:
  - [`UpdateEntityTypeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateEntityTypeRequest.java): Includes `version` for optimistic locking.
  - [`EntityTypeResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityTypeResponse.java): Includes `schemaVersion` and `version`.
  - [`UpdateAttributeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateAttributeRequest.java): Includes `displayOrder`, `isArchived`, `options`, `defaultValue`, `version`.
  - [`AttributeDefinitionResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/AttributeDefinitionResponse.java): Includes `displayOrder` and `version`.
  - [`ReorderAttributesRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/ReorderAttributesRequest.java): List of ordered attribute IDs.
  - [`UpdateRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateRecordRequest.java) & [`PatchRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/PatchRecordRequest.java): Include `version` for optimistic locking.
  - [`EntityRecordResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityRecordResponse.java): Includes `schemaVersion` and `version`.
  - [`MetadataDtoMapper.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/MetadataDtoMapper.java): Updated bidirectional mapping for schemaVersion and displayOrder.

### Repositories & Services (`project0-fw`)
- [`AttributeDefinitionRepository.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/repository/jpa/AttributeDefinitionRepository.java): Added `findByEntityTypeIdAndDeletedDateIsNullOrderByDisplayOrderAsc` and `findAllByIdInAndEntityTypeIdAndDeletedDateIsNull`.
- [`EntityRecordRepository.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/repository/jpa/EntityRecordRepository.java): Added `findByEntityTypeIdAndIdAndDeletedDateIsNull` and `existsByEntityTypeIdAndDeletedDateIsNull`.
- [`MetadataService.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/MetadataService.java):
  - Implemented `getEntityType`, `updateEntityType`, `deleteEntityType` (cascading soft-delete to attributes and records).
  - Implemented `getAttributeDefinition`, `updateAttributeDefinition` (with UI component compatibility validation), `deleteAttributeDefinition` (with record value delete guard and `force` override), `archiveAttributeDefinition`, `unarchiveAttributeDefinition`, and `reorderAttributes`.
  - Implemented `getEntityRecord`, `updateEntityRecord` (full replace), `patchEntityRecord` (attribute merge), and `deleteEntityRecord`.
  - Enforced optimistic concurrency locking against `BaseModel.getVersion()` throwing `MetadataConflictException` on mismatch.
- [`MetadataController.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/MetadataController.java):
  - Exposed all CRUD, archive/unarchive, reorder, and patch endpoints with `@PreAuthorize`, `@Valid`, and `ResponseWrapper` envelope.

---

## 3. Verification & Tests

- **PostgreSQL JSONB Integration Smoke Test**:
  - [`MetadataPostgresJpaSmokeIT.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/test/java/com/project0/domain/metadata/MetadataPostgresJpaSmokeIT.java): Verified persisting and retrieving `EntityType`, `AttributeDefinition` (with `options` Map), and `EntityRecord` (with multi-typed JSON `attributes` Map) against real PostgreSQL database.
- **Unit & Slice Tests**:
  - `MetadataDtoValidationTest`: Verified Bean Validation constraints and regular expressions.
  - `PageBuilderTest`: Verified pagination math and `totalElements` propagation across page 1 and page 2+.
  - `SchemaValidationServiceTest`: Verified JSON Schema compilation, validation errors, and `switch` boolean support.
  - `MetadataServiceTest`: 19 comprehensive unit tests verifying:
    - EntityType CRUD, optimistic lock conflict (409), cascading soft-delete.
    - AttributeDefinition CRUD, UI component compatibility validation, delete guards (rejecting when values exist vs `force=true`), archiving/unarchiving, and reordering.
    - EntityRecord CRUD, optimistic locking, full replace vs partial patch attribute merging, and soft-delete.
  - `MetadataControllerTest`: 16 tests verifying proper controller endpoint routing, request forwarding, default page handling, and `ResponseWrapper` envelopes.
- **Maven Reactor Execution**:
  - `node mvnw.cjs test -pl :project0-fw`: 52 tests passed (0 failures, 0 errors).
  - `node mvnw.cjs test`: 100% passed across all 10 monorepo reactor modules.
