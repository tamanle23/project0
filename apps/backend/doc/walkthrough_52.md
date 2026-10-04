# Hybrid Metadata Architecture Walkthrough

## 1. What was done
Implemented the Hybrid Metadata Architecture spanning the backend and frontend to support dynamic data schemas and rendering.

### Database Layer
- Created Liquibase migration `changelog-001-hybrid-metadata.xml` to introduce 5 tables:
  - `PROJECT0_ENTITY_TYPES`: Defines schema structure.
  - `PROJECT0_ATTRIBUTE_DEFINITIONS`: Stores individual attribute configurations, UI types, and validation rules in a `JSONB` payload.
  - `PROJECT0_ENTITIES`: Stores the actual dynamic data instances, utilizing a `JSONB` column for flexible attributes.
  - `PROJECT0_RELATIONSHIP_TYPES` and `PROJECT0_ENTITY_RELATIONSHIPS`: Edge tables for defining complex graph relationships dynamically.

### Backend Domain & Services (`@project0/backend`)
- Created JPA Entities representing the new tables in `com.project0.domain.metadata`.
- All entities extend `BaseModel` ensuring consistent audit columns.
- Implemented `MapJsonConverter` (extending `JsonConverter<Map<String, Object>>`) to automatically marshal/unmarshal PostgreSQL `JSONB` columns directly into Java `Map` objects via Jackson.
- Built a foundational `SchemaValidationService` configured to fetch and validate schemas cached via `RedisTemplate`.
- Implemented CQRS cache invalidation:
  - A new `AttributeDefinitionUpdatedEvent` was created.
  - `MetadataCacheListener` consumes this event. It leverages `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)` and `@Async` to safely flush the Redis cache for a specific schema ID after a modifying transaction commits.

### Frontend UI & State (`@project0/console`, `@project0/ui`)
- Created `useDynamicSchema` and `useDynamicEntity` hooks as TanStack Query wrappers to handle fetching and caching dynamic configuration and data.
- Built `useDynamicFormStore` using Zustand to manage complex multi-step state of dynamic entity generation locally.
- Designed modular Liquid Glass components in `@project0/ui`:
  - `DynamicFieldRenderer.tsx`: Parses `ui_component` string to dispatch native input elements styled with Liquid Glass utilities (translucency, backdrop-blur).
  - `DynamicForm.tsx`: Iterates over schema definitions to compose a complete form and handles submission logic.
  - `DynamicEntityEditor.tsx`: A wrapper `GlassCard` container for the form system.

## 2. Why it was done
To allow the system to rapidly model, store, and present new data structures without requiring hard database schema alterations, backend compilation, or frontend hard-coding. This fulfills the requirement for dynamic "Rules" and "Records" separation while remaining performant and maintaining referential integrity for complex objects via edge-table relationships.

## 3. How to verify
1. Run backend build/tests: `cd apps/backend && ./mvnw clean test -pl project0-fw -am` (Verify successful execution).
2. Run frontend build: `pnpm --filter @project0/console run build` (Verify successful compilation).
