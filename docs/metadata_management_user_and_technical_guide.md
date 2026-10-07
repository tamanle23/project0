# Metadata Management Module - Complete User & Technical Guide

**Module**: `@unipost/console` & `@unipost/backend`  
**Architecture**: Hybrid Relational + JSONB Schema Engine with Distributed Hazelcast Cache  
**Scope**: End-to-End User Workflows, Data Modeling Patterns, Dynamic UI Components, and Integration Points.

---

## 1. Executive Architecture Overview

The Metadata Management module in Unipost provides a **runtime-extensible, zero-downtime data modeling engine**. It allows system administrators and product teams to define entity types, configure custom attribute definitions, generate JSON Schema (Draft-07) specifications, validate incoming JSON payloads, and manage relationships—without requiring relational database migrations (`ALTER TABLE`) or backend redeployments.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   @unipost/console                                     │
│                                                                                        │
│  ┌───────────────────────┐   ┌────────────────────────┐   ┌─────────────────────────┐  │
│  │    Schema Builder     │   │     Data Explorer      │   │     Connected Edges     │  │
│  │ (Attribute Modeling)  │   │  (CRUD & Server Grid)  │   │   (Graph Edge Engine)   │  │
│  └──────────┬────────────┘   └───────────┬────────────┘   └────────────┬────────────┘  │
│             │                            │                             │               │
│             ▼                            ▼                             ▼               │
│      Entity Reference                 Record                      Record Edge          │
│     ComboBox (Pattern B)          Editor Dialog              Inspector (Pattern C)     │
└─────────────┼────────────────────────────┼─────────────────────────────┼───────────────┘
              │                            │                             │
              ▼                            ▼                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MetadataServiceStrategy (Mock / HTTP)                           │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ REST API (JSON Schema, JWT, GIN Indexes)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  @unipost/backend                                      │
│  ┌─────────────────────────────────┐       ┌────────────────────────────────────────┐  │
│  │ SchemaValidationService         │       │ Embedded Hazelcast Distributed Cache   │  │
│  │ (Draft-07 JSON Schema / Cache)  │ <===> │ (Cluster-wide L1/L2 Invalidation)      │  │
│  └────────────────┬────────────────┘       └────────────────────────────────────────┘  │
│                   │                                                                    │
│                   ▼                                                                    │
│        PostgreSQL Relational DB (UNIPOST_ENTITY_*, GIN Indexes, Audit Logs)            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Concepts: The 3 Relationship Patterns

To eliminate data modeling confusion, the system strictly categorizes relationships into three distinct patterns with unambiguous terminology:

| Pattern | Standard Terminology | Storage Mechanism | Use Case & Mental Model |
| :--- | :--- | :--- | :--- |
| **Pattern A** | **Hard Foreign Key** | Relational Column (`REFERENCES`) | Infrastructure-level ownership: `tenant_id`, `created_by_user_id`, `entity_type_id`. Enforces strict physical DB integrity and multi-tenancy. |
| **Pattern B** | **Entity Reference** (🔗 `Link2`) | Inline inside `record.attributes` JSONB | Form-level lookup pointer. A single attribute referencing another record (e.g. `default_policy_id = 301`). Unidirectional and lightweight. |
| **Pattern C** | **Connected Edges** (ᛦ `GitFork`) | Dedicated Edge Table (`UNIPOST_ENTITY_RELATIONSHIPS`) | Structural graph connections. Bidirectional, multi-cardinality (`1:1, 1:N, N:1, N:N`), edge context metadata (`edge_metadata`), and lifecycle cascade deletes. |

---

## 3. End-to-End User Workflows on UI

The Metadata Management console features an intuitive **two-pane workspace layout**:
- **Left Rail**: Entity Model Navigation & Model Management.
- **Main Stage**: Tabbed Workspaces (**Schema Builder**, **Data Explorer**, **Connected Edges**).

```
┌──────────────────┬─────────────────────────────────────────────────────────────────────┐
│ Entity Models    │ [Model Title]  (ent_customer_account)                               │
│ [+] New Model    │ [ Layers Schema Builder ]  [ ⛁ Data Explorer ]  [ ᛦ Connected Edges ] │
│ ──────────────── ┼─────────────────────────────────────────────────────────────────────┤
│ 🏢 Customer Acc  │                                                                     │
│ ☁️ Cloud Spec    │                     Active Tab View Canvas                          │
│ 🛡️ Deployment Pl │                                                                     │
│                  │                                                                     │
└──────────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

### Workflow 1: Creating & Managing Entity Models (Left Rail)

#### 1. Create a New Entity Model
1. In the left sidebar, click the **`+` (New Model)** button next to the search input.
2. In the **Create Entity Model** dialog:
   - **Model Name**: Enter a human-readable title (e.g., `Deployment Policy`).
   - **System Identifier**: Auto-slugs into snake_case (e.g., `ent_deployment_policy`). You can customize it if needed.
   - **Description**: Add contextual notes describing the business domain of this entity.
3. Click **Create Entity Model**.
4. The model appears in the list and is immediately selected as active.

#### 2. Edit or Delete Entity Models
- Hover over any entity in the list and click the **three dots menu (`...`)**:
  - **Edit Model**: Update the display name or description. If another user modified the model concurrently, an optimistic locking conflict banner will appear with a 1-click **Refresh** button.
  - **Delete Model**: Opens a confirmation dialog. If the model contains active records, the backend guards against accidental deletion unless explicitly confirmed.

---

### Workflow 2: Designing Attributes & Validation Rules (Schema Builder)

The **Schema Builder** tab displays an interactive canvas of all defined attribute cards with drag/reorder controls, real-time JSON Schema preview, and direct archival management.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Schema Version: v4]   [ 👁️ View JSON Schema ]   [ + Add Attribute ]                    │
│ ────────────────────────────────────────────────────────────────────────────────────── │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ⠿  Legal Name (legal_name)                 [STRING]  [Required]  [Archive Toggle] │ │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ⠿  Entity Reference (default_policy_id)     [RELATION] [Optional] [Archive Toggle] │ │
│ │    ↳ References: Deployment Policy                                                 │ │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1. Adding a New Attribute Definition
1. Select the entity model in the left rail.
2. Ensure you are on the **Schema Builder** tab.
3. Click the **`+ Add Attribute`** button.
4. The **Attribute Definition Dialog** opens with two organized tabs:

##### Tab A: General & Types
- **Display Name**: e.g., `Account Tier` or `Default Security Policy`.
- **System Identifier (Key)**: Auto-slugged attribute key (e.g., `account_tier`, `default_policy_id`).
- **UI Component**: Choose from supported visual field types:
  - `Text`: Single-line text input.
  - `Textarea`: Multi-line text block.
  - `Number`: Integer or decimal input.
  - `Boolean Switch`: Binary true/false switch.
  - `Single Select`: Dropdown with single option choice.
  - `Multi Select`: Interactive pill/tag multi-selection.
  - `Date & Time Picker`: ISO-8601 calendar date selector.
  - `JSON / Raw Object`: Syntax-highlighted JSON editor.
  - **`Entity Reference` (🔗 Pattern B)**: Foreign reference field pointing to another model's record.
- **Storage Data Type**: Automatically filtered to compatible backend database storage formats (`STRING`, `INTEGER`, `DECIMAL`, `BOOLEAN`, `DATE`, `DATETIME`, `JSON`, `RELATIONSHIP`).
- **Target Entity Model** *(Rendered only when UI Component is `Entity Reference`)*:
  - Select which entity model this reference field points to (e.g., `ent_deployment_policy`).
  - Validation ensures this cannot be left empty when creating an Entity Reference field.
- **Required Field**: Toggle whether this attribute is mandatory for all records.

##### Tab B: Validation & Options
- **Default Value**: Fallback value when creating a new record without this attribute.
- **Choices (Options)**: If `Single Select` or `Multi Select` is chosen, add selectable options with the `+ Add` button.
- **Min / Max Constraints**: If `Number` is selected, specify minimum and maximum boundaries.

5. Click **Save Attribute**. The schema updates, Hazelcast cache is invalidated across the cluster, and the compiled Draft-07 schema increments its version.

#### 2. Reordering & Archiving Attributes
- **Drag & Drop Reordering**: Grab the handle (`⠿`) on any attribute card and drag it up or down. Reordering automatically syncs to the backend via `PUT /v1/metadata/entity-types/{id}/attributes/order`.
- **1-Click Archive / Unarchive**: Click the direct **Archive** toggle button on the card.
  - **Archiving**: Soft-deprecates the field. It remains in historical JSON payloads but is hidden from the record creation form and active data grid.
  - **Unarchiving**: Restores the field to active status.
- **View JSON Schema**: Click **`View JSON Schema`** at the top right to inspect the backend-compiled Draft-07 JSON Schema specification.

---

### Workflow 3: Data Records Exploration & Server-Side Filtering (Data Explorer)

The **Data Explorer** tab provides an enterprise-grade datatable for record CRUD, real-time filtering, column sorting, pagination, and JSON export.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔍 [Search records...] [All Attributes ▾]                [ Export JSON ] [ + New Record ]│
├────────┬───────────────────┬─────────────────────┬──────────────────────┬──────────────┤
│ Record │ Legal Name        │ Tier                │ Default Policy (Ref) │ Actions      │
├────────┼───────────────────┼─────────────────────┼──────────────────────┼──────────────┤
│ #101   │ Acme Corporation  │ Enterprise          │ [🔗 #301]            │ [...]        │
│ #102   │ Globex Corp       │ Growth              │ [🔗 #302]            │ [...]        │
│ #103   │ Wayne Enterprises │ Enterprise          │ [🔗 #301]            │ [...]        │
└────────┴───────────────────┴─────────────────────┴──────────────────────┴──────────────┘
```

#### 1. Creating a New Record
1. Click **`+ New Record`** at the top right.
2. The dynamic **Record Editor** modal loads all active attribute definitions for this model.
3. Fill out the fields:
   - For **Entity Reference** attributes, a searchable **ComboBox** opens:
     - Type to search by `#ID`, record title, or code.
     - Select a record to attach it. A live preview card will display its title and tenant ID.
     - To remove the reference, click the `X` (Clear) button.
4. Click **Create Record**.
5. If any validation constraints are violated, structured errors appear directly beneath each invalid field, highlighted in red with descriptive explanations from the backend JSON schema validator.

#### 2. Editing an Existing Record & Concurrency Protection
1. Click the **three dots menu (`...`)** on a row and select **Edit Record**.
2. Modify attributes as desired.
3. **Concurrency Conflict Detection (HTTP 409)**:
   - If another user modified or saved this record in the interim, saving will not overwrite their work.
   - An amber **Conflict Banner** appears: *"This record has been modified by another user. Please reload the latest changes."*
   - Click **Refresh** to load the newest version while retaining non-conflicting edits, then re-submit.

#### 3. Filtering & Sorting
- **Debounced Search**: Type any string in the search bar. The grid applies a 300ms debounce and sends `filter[<attr>][contains]=<query>` to the backend.
- **Column Header Sorting**: Click any column header to toggle ascending (`▲`) or descending (`▼`) sorting. The server re-queries with `sort=<field>,<dir>`.
- **Pagination**: Use the bottom pagination rail (`< Previous`, `Next >`, and items-per-page selector) for server-side page navigation.

#### 4. Exporting Records
- Click **Export JSON** to export the currently loaded records into a formatted JSON file for offline analysis or auditing.

---

### Workflow 4: Managing Graph Connections (Connected Edges)

The **Connected Edges** workspace manages first-class graph relationships (Pattern C) between entity models and between concrete records.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ℹ️ Architecture Note: Connected Edges manage multi-cardinality (1:N, N:N) lifecycle     │
│    graph connections with bidirectional indexing and edge metadata.                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ Model Graph Relationships ]                               [ + New Relationship Edge ]│
│                                                                                        │
│ ┌───────────────────────────────────────┐  ┌─────────────────────────────────────────┐ │
│ │ Account Policies                      │  │ Cluster Deployments                     │ │
│ │ <code>account_policies</code>         │  │ <code>cluster_deployments</code>        │ │
│ │ [ 1 : N ]  [ Outgoing Edge ]          │  │ [ N : N ]  [ Outgoing Edge ]            │ │
│ │ Customer Account ──► Deployment Policy│  │ Customer Account ──► Cloud Spec         │ │
│ └───────────────────────────────────────┘  └─────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1. Defining a Model-Level Edge Type
1. Switch to the **Connected Edges** tab.
2. Click **`+ New Relationship Edge`**.
3. In the modal:
   - **Name**: e.g., `Customer Deployments`.
   - **System Identifier**: Auto-slugged snake_case (e.g., `rel_customer_deployments`).
   - **Source Model**: Defaults to the active model.
   - **Target Model**: The model being linked to (e.g., `Cloud Specification`).
   - **Cardinality**: Choose the business constraint:
     - `1 : 1` (One-to-One)
     - `1 : N` (One-to-Many)
     - `N : 1` (Many-to-One)
     - `N : N` (Many-to-Many)
   - **Description**: Domain notes.
4. Click **Create Relationship Edge**. The edge appears on the canvas with directional arrows and cardinality badges.

#### 2. Linking Individual Records (Record Connected Edges Inspector)
1. Switch to the **Data Explorer** tab.
2. Find the record you wish to connect (e.g., `Record #101 - Acme Corp`).
3. Click the **three dots menu (`...`)** on that row and select **`Connected Edges`** (ᛦ).
4. The **Connected Edges Inspector** modal opens:
   - Displays all active **Inbound** and **Outbound** edges for this record.
   - Click **`+ Link New Record`**:
     - Choose the **Relationship Edge Type** (e.g., `Account Policies (1:N)`).
     - Select the **Target Record** from the dropdown (e.g., `Record #301 - Zero-Trust Canary Policy`).
     - Click **Confirm Edge Link**.
   - The connection is persisted to `UNIPOST_ENTITY_RELATIONSHIPS` with cascade integrity.
   - To remove a connection, click the red trash icon next to any edge link.

---

## 4. UI Component Architecture & State Management

### Front-End Code Organization (`apps/console/src/features/metadata`)

```
metadata/
├── api/
│   ├── types.ts                    # TypeScript models (EntityType, AttributeDefinition, Record, Edge)
│   ├── metadata-data-source.ts     # MetadataDataSource interface (Strategy Pattern)
│   ├── http-metadata-service.ts    # Real backend REST API client
│   ├── metadata-service.ts         # Strategy dispatcher (Mock vs. HTTP)
│   └── metadata-api.ts             # TanStack Query hooks (queries & mutations)
├── components/
│   ├── metadata-feature.tsx        # Main container with 3 tabs
│   ├── conflict-banner.tsx         # Optimistic locking (409) banner & auto-refresh
│   ├── entity-type/                # Entity sidebar, create/edit/delete modals
│   ├── schema-builder/             # Schema Builder canvas, AttributeCard, AttributeDialog
│   ├── data-explorer/              # EntityDataGrid, RecordEditorDialog, RecordDeleteDialog
│   ├── dynamic-fields/             # DynamicFieldRenderer, ComboBox RelationPickerControl
│   └── relationships/              # RelationshipTypesManager, RecordRelationshipsInspector
├── data/
│   ├── field-types.ts              # Field type definitions (icons, supported data types)
│   └── mock-metadata.ts            # Local-first sandbox store with ~380 mock records
└── store/
    └── use-metadata-ui-store.ts    # Zustand UI state (active selections, modal visibility)
```

### Key UI Capabilities & Design Patterns
1. **Strategy Pattern Transport**: Decouples all UI components from whether data is sourced from real Spring Boot backend endpoints or the in-memory mock sandbox.
2. **TanStack Query Cache Invalidation**: Every mutation (attribute added, reordered, or record edited) selectively invalidates specific query keys (`['metadata', 'attributes', entityTypeId]`), preventing full page refreshes.
3. **Zustand State Isolation**: Dialogs, active modals, and selected entity types are stored in `useMetadataUiStore`, preventing prop-drilling across deeply nested components.
4. **Liquid Glass Design System**: Glassmorphism styling (`backdrop-blur-xl`, subtle frosted glass borders, smooth transition curves) applied across cards, inputs, and modals.

---

## 5. Backend Architecture & Integration Points

### 1. Database Schema (`unipost-db`)
- **`UNIPOST_ENTITY_TYPES`**: Table defining entity models (`id`, `name`, `system_name`, `version`, `audit columns`).
- **`UNIPOST_ATTRIBUTE_DEFINITIONS`**: Relational column rules (`dataType`, `uiComponent`, `isRequired`, `isArchived`, `displayOrder`, `options` JSONB).
- **`UNIPOST_ENTITIES`**: Hybrid data table storing core relational audit columns plus dynamic values in an `attributes` `JSONB` column indexed via PostgreSQL `GIN` (`idx_entities_attributes_gin`).
- **`UNIPOST_RELATIONSHIP_TYPES`**: Edge definitions (`source_entity_type_id`, `target_entity_type_id`, `cardinality`).
- **`UNIPOST_ENTITY_RELATIONSHIPS`**: Edge junction table linking source and target records with `ON DELETE CASCADE` and `edge_metadata` JSONB.

### 2. Embedded Hazelcast Caching Engine & Lock-Free Atomic L1 (`unipost-fw`)
- **Two-Tier Cache Hierarchy (L1 In-Memory + L2 Hazelcast IMap)**:
  - **L1 In-Memory Cache**: Stores parsed, immutable `JsonSchema` instances (`ConcurrentHashMap<String, JsonSchema>`) for sub-millisecond payload validations.
  - **L2 Hazelcast Distributed Map**: `metadata_schemas` distributes compiled JSON Schema strings across the cluster with a 1-hour TTL.
- **Cache Stampede & Thundering Herd Mitigation**:
  - `SchemaValidationService.getOrCompileJsonSchema` uses atomic `computeIfAbsent(cacheKey, ...)` on the L1 cache.
  - When a cold start or cache invalidation occurs, 20+ concurrent requests for the same schema wait on a single thread's compilation. Redundant DB schema compilation runs exactly **once**.
  - Distributed writes use Hazelcast `putIfAbsent` to ensure cluster-wide double-check safety without race conditions.
- **Cluster Invalidation**:
  - Listens to Spring Application Events (`AttributeDefinitionUpdatedEvent`) using `@TransactionalEventListener(phase = AFTER_COMMIT)` and `@Async` to invalidate cached schemas across all cluster nodes.

### 3. Native PostgreSQL JSONB Containment Optimization (`@>`)
- Exact-match equality (`eq`) queries on attributes compile directly into a composite JSONB document and execute via the PostgreSQL containment operator:
  ```sql
  SELECT * FROM UNIPOST_ENTITIES
  WHERE entity_type_id = ?
    AND deleted_date IS NULL
    AND attributes @> '{"tier": "Strategic"}'::jsonb;
  ```
- Directly leverages the PostgreSQL Generalized Inverted Index `idx_entities_attributes_gin` (`attributes jsonb_path_ops`), yielding sub-millisecond lookups on multi-million row tables.
- Range (`gt`, `lt`), negation (`ne`), and substring (`contains`) filters cleanly fallback to `jsonb_extract_path_text`.

### 4. REST API Contract Reference
- `GET /v1/metadata/entity-types`: List all entity types.
- `GET /v1/metadata/entity-types/{id}/schema`: Fetch authoritative compiled Draft-07 JSON Schema with `schemaVersion`.
- `GET /v1/metadata/entity-types/{id}/attributes`: List attributes (sorted by `displayOrder`).
- `PUT /v1/metadata/entity-types/{id}/attributes/order`: Reorder attribute display positions.
- `POST /v1/metadata/entity-types/{id}/attributes/{attrId}/archive`: Archive attribute.
- `POST /v1/metadata/entity-types/{id}/attributes/{attrId}/unarchive`: Restore archived attribute.
- `POST /v1/metadata/entity-types/{id}/records/validate`: **Dry-Run Pre-Validation Endpoint**. Performs server-authoritative JSON Schema validation and relational foreign-key reference verification without writing to the database or altering audit sequences.
- `GET /v1/metadata/entity-types/{id}/records?page=1&size=20&sort=field,asc`: Filter and sort records.
- `POST /v1/metadata/entity-types/{id}/records`: Create new record (enforcing compiled JSON Schema).
- `PUT /v1/metadata/entity-types/{id}/records/{recordId}`: Update record with optimistic locking.
- `PATCH /v1/metadata/entity-types/{id}/records/{recordId}`: Partial update record attributes.
- `DELETE /v1/metadata/entity-types/{id}/records/{recordId}`: Soft-delete record.
- `GET /v1/metadata/relationship-types`: List graph relationship edge types.
- `GET /v1/metadata/records/{recordId}/relationships`: List inbound/outbound edge connections.
- `POST /v1/metadata/records/{recordId}/relationships`: Create record-to-record edge link.

---

## 6. Summary Checklist for Quality & Verification

- [x] **Zero Database Migrations for Dynamic Attributes**: New attributes are instantly queryable in JSONB.
- [x] **Draft-07 Validation**: Server validates JSON payloads before JPA persistence.
- [x] **Optimistic Locking**: Every mutation passes `version`, preventing silent overwrites with `409 ConflictBanner`.
- [x] **Dual Relationship Ergonomics**: Unambiguous split between **Entity Reference** (Pattern B field lookup) and **Connected Edges** (Pattern C graph junction).
- [x] **Searchable ComboBox UX**: Fuzzy search across `#ID`, name, and code with 1-click clear and dangling reference detection.
- [x] **Full i18n Localization**: All tabs, buttons, and alerts available in English and Vietnamese.
