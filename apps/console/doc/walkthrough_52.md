# Walkthrough 52: Phase 1 - Metadata Foundation, Domain Types & Authenticated API Layer

## 1. Overview
In Phase 1 of the Metadata Management modernization plan, we established the domain models, authenticated React Query API hooks with `springApiClient`, offline dev sandbox fallback, and a centralized Zustand state machine for the metadata module in `@project0/console`.

---

## 2. Changes Made

### 2.1 Metadata Domain Types & DTOs
- Created [`apps/console/src/features/metadata/api/types.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/features/metadata/api/types.ts):
  - Defined `EntityType`, `AttributeDefinition`, `EntityRecord`, and `PageResponse<T>`.
  - Added strict enums for `DataType` (`STRING`, `INTEGER`, `DECIMAL`, `BOOLEAN`, `DATE`, `DATETIME`, `JSON`, `RELATIONSHIP`) and `UiComponentType` (`text`, `textarea`, `number`, `switch`, `select`, `multiselect`, `datepicker`, `json_editor`, `relation_picker`).
  - Added DTO definitions for CRUD operations (`CreateEntityTypeDto`, `UpdateAttributeDefinitionDto`, etc.).

### 2.2 Mock Sandbox & Seed Data
- Created [`apps/console/src/features/metadata/data/mock-metadata.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/features/metadata/data/mock-metadata.ts):
  - Added realistic enterprise seed datasets for Customer Account, Cloud Resource Spec, and Deployment Policy.
  - Implemented `mockMetadataStore` providing in-memory pagination and mutable CRUD operations to guarantee a zero-friction offline developer experience when Spring Boot is not running locally.

### 2.3 Zustand UI Store
- Created [`apps/console/src/features/metadata/store/use-metadata-ui-store.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/features/metadata/store/use-metadata-ui-store.ts):
  - Centralized state for `selectedEntityTypeId`, `activeTab` (`schema` | `data`), `searchQuery`.
  - Manages dialog states for EntityType creation/edition, Attribute Definition modal, Record Editor modal, and JSON Schema preview.

### 2.4 Authenticated API Client & React Query Hooks
- Created [`apps/console/src/features/metadata/api/metadata-api.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/features/metadata/api/metadata-api.ts):
  - Connected endpoints to `/v1/metadata/...` via `springApiClient` with JWT interceptors.
  - Added full queries and mutation hooks with TanStack Query cache invalidations:
    - Entity Types: `useEntityTypes`, `useEntityType`, `useCreateEntityType`, `useUpdateEntityType`, `useDeleteEntityType`
    - Attribute Definitions: `useAttributeDefinitions`, `useCreateAttributeDefinition`, `useUpdateAttributeDefinition`, `useDeleteAttributeDefinition`
    - Entity Records: `useEntityRecords`, `useCreateEntityRecord`, `useUpdateEntityRecord`, `useDeleteEntityRecord`
  - Integrated graceful fallback to `mockMetadataStore` when the backend is unreachable.

### 2.5 Modernized Barrel & Backward Compatibility
- Created [`apps/console/src/features/metadata/index.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/features/metadata/index.ts) exporting all domain contracts, hooks, and stores.
- Updated [`apps/console/src/hooks/useMetadataApi.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/hooks/useMetadataApi.ts) with backward-compatible adapters.
- Connected [`apps/console/src/hooks/useDynamicSchema.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/hooks/useDynamicSchema.ts) and [`apps/console/src/hooks/useDynamicEntity.ts`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/hooks/useDynamicEntity.ts) to the new API hooks.
- Refactored legacy components ([`SchemaBuilder.tsx`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/components/SchemaBuilder.tsx), [`EntityDataGrid.tsx`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/components/EntityDataGrid.tsx), [`DynamicFieldRenderer.tsx`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/components/DynamicFieldRenderer.tsx), and [`routes/_authenticated/metadata/index.tsx`](file:///c:/Users/Admin/workspace/git/project0/apps/console/src/routes/_authenticated/metadata/index.tsx)) to eliminate `any` types.

---

## 3. Verification Results
- **Typecheck & Web Build:**
  - Ran `pnpm --filter @project0/console build:web` (`tsc -b && vite build --mode web`).
  - Result: Built successfully with exit code 0 in ~640ms.
