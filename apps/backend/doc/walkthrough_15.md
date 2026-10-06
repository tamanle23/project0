# Walkthrough 15 - Phase 0, 1, 2 & 3: Metadata Schema Compiler, Resilient Caching & Complete Lifecycle

Scope: `@project0/backend` (`project0-fw`, `project0-core`, `project0-db`)

## 1. Overview & Objectives

In Phase 0, 1, 2, and 3, we investigated and resolved core security, data contract, lifecycle management, schema compilation, and performance caching in the backend metadata module:

1. **Phase 0 Verification & PostgreSQL JSONB Bug Fix (C7)**:
   - Executed a real PostgreSQL smoke test via Testcontainers against `postgres:16-alpine`.
   - **Confirmed C7**: PostgreSQL rejected `@Column(columnDefinition="jsonb")` + `AttributeConverter<Map, String>` with `PSQLException: ERROR: column "options" is of type jsonb but expression is of type character varying`.
   - **Resolution**: Updated `AttributeDefinition` and `EntityRecord` to use `@JdbcTypeCode(SqlTypes.JSON)` for direct JSONB binding, and added the default no-arg constructor required by JPA converter specification.
2. **Mass Assignment & Entity Leaks (C1, H2)**: Introduced strict Java records / DTOs for request payloads and response envelopes. Banned binding JPA entities directly in `@RequestBody`.
3. **Authorization (C2, D4)**: Secured all metadata management endpoints with `@PreAuthorize` using fine-grained authorities (`METADATA_SCHEMA_WRITE`, `METADATA_SCHEMA_READ`, `METADATA_RECORD_WRITE`, `METADATA_RECORD_READ`) and `ROLE_ADMIN`.
4. **Soft-Delete Filtering (C6)**: Replaced unconstrained repository calls with soft-delete-aware queries (`findByIdAndDeletedDateIsNull`, `findByEntityTypeIdAndDeletedDateIsNull`, `findAllByDeletedDateIsNull`).
5. **Error Handling & Envelope Standardization (H3, D2)**: Standardized response contracts on `ResponseEntity<ResponseWrapper<ContextHeader, T>>` via `ResponseEntityBuilder`. Introduced domain business exceptions (`MetadataNotFoundException`, `MetadataConflictException`, `SchemaValidationException`) with proper 4xx status mapping. Added Jakarta Bean validation error mapping in `GlobalExceptionHandler`.
6. **Pagination Fix (H1)**: Fixed `PageBuilder` pagination calculations so `totalElements` is computed consistently across all pages, and `totalPages` calculation `(total + size - 1) / size` correctly handles exact multiples.
7. **Phase 2 Complete Lifecycle & Schema Versioning**:
   - Added `schemaVersion` to `EntityType` and `EntityRecord` to track schema evolution.
   - Added `displayOrder` to `AttributeDefinition` for UI rendering sequence.
   - Created Liquibase migration `changelog-000.000.00002.xml` adding new columns and replacing plain unique constraints with partial unique indexes (`WHERE "deletedDate" IS NULL`) on PostgreSQL.
   - Implemented full CRUD endpoints for `EntityType`, `AttributeDefinition`, and `EntityRecord`.
   - Implemented archive/unarchive endpoints (`POST .../attributes/{attrId}/archive` and `unarchive`).
   - Implemented attribute reordering (`PUT .../attributes/order`).
   - Implemented delete guards: reject attribute deletion if active records contain values (unless `force=true`); cascading soft-delete on entity type deletion.
   - Enforced immutability rules (`dataType` and `systemName` cannot change; `uiComponent` can only change to compatible types).
   - Optimistic locking checks on all update/patch operations returning HTTP 409 `MetadataConflictException` on version mismatch.
8. **Phase 3 Schema Compiler & Resilient Multi-Level Caching**:
   - **Pure `SchemaCompiler` (C3)**: Built pure function compiling Draft-07 JSON Schema documents mapping all 9 UI components (`text`, `textarea`, `number`, `switch`, `select`, `multiselect`, `datepicker`, `json_editor`, `relation_picker`), enforcing `additionalProperties: false`, handling field options (`pattern`, `minLength`, `maxLength`, `minimum`, `maximum`, `choices`, `format`), and applying `default` values.
   - **Compiled Schema Endpoint**: Exposed `GET /api/v1/metadata/entity-types/{id}/schema` returning `CompiledSchemaResponse` (with `entityTypeId`, `schemaVersion`, and `schema` JsonNode).
   - **Versioned Two-Level Cache (C4, C5)**:
     - L1 in-memory `ConcurrentHashMap` caching parsed `JsonSchema` instances for zero-reparsing runtime performance.
     - L2 Redis cache using versioned keys `schema:{entityTypeId}:v{version}` with 1-hour TTL and defensive try/catch fallbacks so Redis outages never fail writes or validations.
   - **Reliable Eviction**: `MetadataCacheListener` evicts L1 memory and L2 Redis versioned keys on `AttributeDefinitionUpdatedEvent`.

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
  - [`CompiledSchemaResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/CompiledSchemaResponse.java): Schema response record.
  - [`UpdateEntityTypeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateEntityTypeRequest.java): Includes `version` for optimistic locking.
  - [`EntityTypeResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityTypeResponse.java): Includes `schemaVersion` and `version`.
  - [`UpdateAttributeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateAttributeRequest.java): Includes `displayOrder`, `isArchived`, `options`, `defaultValue`, `version`.
  - [`AttributeDefinitionResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/AttributeDefinitionResponse.java): Includes `displayOrder` and `version`.
  - [`ReorderAttributesRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/ReorderAttributesRequest.java): List of ordered attribute IDs.
  - [`UpdateRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateRecordRequest.java) & [`PatchRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/PatchRecordRequest.java): Include `version` for optimistic locking.
  - [`EntityRecordResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityRecordResponse.java): Includes `schemaVersion` and `version`.
  - [`MetadataDtoMapper.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/MetadataDtoMapper.java): Updated bidirectional mapping for schemaVersion and displayOrder.

### Schema Compilation, Caching & Services (`project0-fw`)
- [`SchemaCompiler.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/SchemaCompiler.java): Pure component compiling Draft-07 schemas from `List<AttributeDefinition>`.
- [`SchemaValidationService.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/SchemaValidationService.java): L1 in-memory cache + L2 Redis versioned key caching (`schema:{id}:v{version}`) + structured validation error conversion.
- [`MetadataCacheListener.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/MetadataCacheListener.java): Evicts L1 cache and Redis keys on schema change events.
- [`MetadataService.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/MetadataService.java): Added `getCompiledSchema(id)` method.
- [`MetadataController.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/MetadataController.java): Exposed `GET /api/v1/metadata/entity-types/{id}/schema`.

---

## 3. Verification & Tests

- **PostgreSQL JSONB Integration Smoke Test**:
  - [`MetadataPostgresJpaSmokeIT.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/test/java/com/project0/domain/metadata/MetadataPostgresJpaSmokeIT.java): Verified against real PostgreSQL database.
- **Unit & Slice Tests**:
  - `SchemaCompilerTest`: Verified all 9 UI components, constraints, format, enum choices, defaults, and archived exclusion.
  - `SchemaValidationServiceTest`: Verified L1 memory cache, L2 Redis versioned caching, validation failure extraction, boolean switch, and `additionalProperties: false`.
  - `MetadataCacheListenerTest`: Verified L1 and L2 cache eviction.
  - `MetadataServiceTest`: 20 unit tests verifying EntityType CRUD, `getCompiledSchema`, AttributeDefinition lifecycle, EntityRecord CRUD, delete guards, and versioning.
  - `MetadataControllerTest`: 17 controller slice tests verifying routing and envelope wrapping.
- **Maven Reactor Execution**:
  - `node mvnw.cjs test -pl :project0-fw`: 57 tests passed (0 failures, 0 errors).
  - `node mvnw.cjs test`: 100% passed across all 10 monorepo reactor modules.

