# Walkthrough 53: Console Metadata Service Strategy & Mock Engine Enhancement (Phase 2)

## Overview
Implemented the **Strategy Pattern** for the Metadata Management module in `@unipost/console`. This decouples the UI from the underlying transport mechanism, enabling smooth switching between direct backend communication (`HttpMetadataService`) and the local-first sandbox engine (`MockMetadataService`), while upgrading models to support versioning, schema version tracking, Draft-07 schema generation, and entity relationships.

## Changes Made

### 1. DTO & Model Synchronization
- **File**: [`apps/console/src/features/metadata/api/types.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/api/types.ts)
- Added `version?: number` and `schemaVersion?: number` to `EntityType`, `AttributeDefinition`, and `EntityRecord`.
- Defined `RelationshipType`, `EntityRelationship`, and `CompiledSchema` models.
- Defined DTOs for relationship CRUD operations (`CreateRelationshipTypeDto`, `UpdateRelationshipTypeDto`, `CreateEntityRelationshipDto`) and extended `PageRequestParams` with filtering, sorting, and relationship traversal directions (`incoming` | `outgoing` | `both`).

### 2. Strategy Pattern Contract
- **File**: [`apps/console/src/features/metadata/api/metadata-data-source.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/api/metadata-data-source.ts)
- Established `MetadataDataSource` interface covering all metadata features:
  - Entity types, attributes, records, relationship types, and entity relationships CRUD.
  - Attribute archival, unarchival, and reordering.
  - Server-side compiled schema fetching.

### 3. Concrete Implementations & Strategy Dispatcher
- **HttpMetadataService**: [`apps/console/src/features/metadata/api/http-metadata-service.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/api/http-metadata-service.ts)
  - Connects directly to backend endpoints (`/v1/metadata/...`) without silencing HTTP errors, allowing standard 400/404/409 error propagation.
- **MockMetadataService**: [`apps/console/src/features/metadata/data/mock-metadata.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/data/mock-metadata.ts)
  - Upgraded sandbox store with optimistic locking conflict detection (throwing 409 status on mismatched versions), schema compilation to Draft-07 format, attribute display ordering, and in-memory relationship stores.
- **MetadataServiceStrategy**: [`apps/console/src/features/metadata/api/metadata-service.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/api/metadata-service.ts)
  - Seamlessly routes all calls to either `HttpMetadataService` or `MockMetadataService` dynamically based on configuration.

### 4. React Query Hook Integration
- **File**: [`apps/console/src/features/metadata/api/metadata-api.ts`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/api/metadata-api.ts)
- Refactored all query and mutation hooks (`useEntityTypes`, `useCompiledSchema`, `useCreateAttributeDefinition`, `useRelationshipTypes`, `useRecordRelationships`, etc.) to delegate to `metadataService`.
- Fixed mutation signatures across consumer dialogs like [`AttributeDeleteDialog`](file:///c:/Users/Admin/workspace/git/unipost/apps/console/src/features/metadata/components/schema-builder/attribute-delete-dialog.tsx).

## Verification Results
- `pnpm --filter @unipost/console build`: **SUCCESS** (TypeScript compilation and Vite production bundles created cleanly without errors).
