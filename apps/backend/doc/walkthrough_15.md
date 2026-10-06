# Walkthrough 15 - Phase 1: Backend Metadata Safety & Contract Hotfixes

Scope: `@project0/backend` (`project0-fw`, `project0-core`, `project0-db`)

## 1. Overview & Objectives

In Phase 1 of the Metadata hardening roadmap, we addressed critical security vulnerabilities and contract defects:
1. **Mass Assignment & Entity Leaks (C1, H2)**: Introduced strict Java records / DTOs for request payloads and response envelopes. Banned binding JPA entities directly in `@RequestBody`.
2. **Authorization (C2, D4)**: Secured all metadata management endpoints with `@PreAuthorize` using fine-grained authorities (`METADATA_SCHEMA_WRITE`, `METADATA_SCHEMA_READ`, `METADATA_RECORD_WRITE`, `METADATA_RECORD_READ`) and `ROLE_ADMIN`.
3. **Soft-Delete Filtering (C6)**: Replaced unconstrained repository calls with soft-delete-aware queries (`findByIdAndDeletedDateIsNull`, `findByEntityTypeIdAndDeletedDateIsNull`, `findAllByDeletedDateIsNull`).
4. **Error Handling & Envelope Standardization (H3, D2)**: Standardized response contracts on `ResponseEntity<ResponseWrapper<ContextHeader, T>>` via `ResponseEntityBuilder`. Introduced domain business exceptions (`MetadataNotFoundException`, `MetadataConflictException`, `SchemaValidationException`) with proper 4xx status mapping. Added Jakarta Bean validation error mapping in `GlobalExceptionHandler`.
5. **Pagination Fix (H1)**: Fixed `PageBuilder` pagination calculations so `totalElements` is computed consistently across all pages, and `totalPages` calculation `(total + size - 1) / size` correctly handles exact multiples.
6. **Schema Validation Hardening (C3, C5)**: Enhanced `SchemaValidationService` with component-to-type mapping (boolean switch, numbers, multiselect arrays, json objects), excluded archived fields, and added graceful fallback on Redis cache failure.

---

## 2. Changes Implemented

### Domain & DTO Layer (`project0-fw`)
- [`DataType.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/DataType.java): Typed enum for metadata data types (`STRING`, `NUMBER`, `INTEGER`, `BOOLEAN`, `DATE`, `JSON`, `ARRAY`, `RELATION`).
- [`UiComponent.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/domain/metadata/UiComponent.java): Typed enum for UI components (`TEXT`, `TEXTAREA`, `NUMBER`, `SWITCH`, `SELECT`, `MULTISELECT`, `DATEPICKER`, `JSON_EDITOR`, `RELATION_PICKER`).
- [`CreateEntityTypeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/CreateEntityTypeRequest.java) & [`UpdateEntityTypeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateEntityTypeRequest.java): Request DTO records with Jakarta bean validation constraints.
- [`EntityTypeResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityTypeResponse.java): Response DTO.
- [`CreateAttributeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/CreateAttributeRequest.java) & [`UpdateAttributeRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateAttributeRequest.java): Request DTO records with formatting patterns.
- [`AttributeDefinitionResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/AttributeDefinitionResponse.java): Response DTO with flat `entityTypeId`.
- [`CreateRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/CreateRecordRequest.java) & [`UpdateRecordRequest.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/UpdateRecordRequest.java): Record requests.
- [`EntityRecordResponse.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/EntityRecordResponse.java): Response DTO.
- [`MetadataDtoMapper.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/dto/metadata/MetadataDtoMapper.java): Type-safe entity-to-DTO conversion.

### Exceptions & Error Handling
- [`MetadataNotFoundException.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/exception/MetadataNotFoundException.java): Maps to 404 Not Found.
- [`MetadataConflictException.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/exception/MetadataConflictException.java): Maps to 409 Conflict.
- [`SchemaValidationException.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/exception/SchemaValidationException.java): Maps to 400 Bad Request.
- [`GlobalExceptionHandler.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/fw/exceptionhandling/GlobalExceptionHandler.java): Added `@ExceptionHandler(MethodArgumentNotValidException.class)` to map validation failures into standard 400 `ResponseWrapper` envelopes.

### Repositories & Services
- [`EntityTypeRepository.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/repository/jpa/EntityTypeRepository.java), [`AttributeDefinitionRepository.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/repository/jpa/AttributeDefinitionRepository.java), [`EntityRecordRepository.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/repository/jpa/EntityRecordRepository.java): Added `...AndDeletedDateIsNull` query methods and duplicate pre-check helpers.
- [`PageBuilder.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/PageBuilder.java): Corrected `totalPages` ceiling calculation and total element suppliers across all pages.
- [`SchemaValidationService.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/SchemaValidationService.java): Added support for `switch` booleans, numbers, arrays, and in-memory schema fallback when Redis is unavailable.
- [`MetadataService.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/service/MetadataService.java): Refactored to accept and return DTOs, enforce duplicate checks, and filter soft-deleted rows.
- [`MetadataController.java`](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/presentation/MetadataController.java): Secured endpoints with `@PreAuthorize`, `@Valid`, and standardized envelopes using `ResponseEntityBuilder`.

---

## 3. Verification & Tests

- **Unit & Slice Tests**:
  - `MetadataDtoValidationTest`: Verified Bean Validation constraints and regular expressions.
  - `PageBuilderTest`: Verified pagination math and `totalElements` propagation across page 1 and page 2+.
  - `SchemaValidationServiceTest`: Verified JSON Schema compilation, validation errors, and `switch` boolean support.
  - `MetadataServiceTest`: Verified DTO mapping, conflict checks (409), not found checks (404), and event publishing.
  - `MetadataControllerTest`: Verified `ResponseWrapper` response wrapping and page request parameter defaults.
- **Maven Suite Execution**:
  - `node mvnw.cjs test -pl :project0-fw`: 27 tests passed (0 failures, 0 errors).
  - `node mvnw.cjs test`: 100% passed across all 10 monorepo reactor modules.
