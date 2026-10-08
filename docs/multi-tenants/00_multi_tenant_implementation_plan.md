# Multi-Tenant Dynamic Metadata Architecture: Phased Implementation Plan

**Series:** Multi-Tenant Architecture Blueprint Series (Document 00 / Master Implementation Plan)  
**Target Systems:** `@unipost/backend` (Spring Modulith / Java 21 / PostgreSQL 16+), `@unipost/console` (React 19 / Vite 8)  
**Based On:** Technical Specifications Parts 1 through 7 (`docs/multi-tenants/01-07`)  
**Status:** Canonical Implementation Roadmap & Execution Plan  

---

## 1. Executive Phasing Strategy & Critical Order Rationale

Building a robust multi-tenant platform requires a strict **defense-in-depth sequence**: security and storage boundaries must be locked down *before* building UI workflows, provisioning pipelines, or rate limiters. Furthermore, the architecture explicitly distinguishes between **Common System Schemas (`SYSTEM`)** and **Tenant-Based Custom Schemas** to allow global platform evolution without breaking tenant customizations.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        IMPLEMENTATION PHASING (CRITICAL PRIORITY)                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1 [CRITICAL CORE]: Database Isolation, System vs. Tenant Schemas & RLS (Pts 2, 7)│
│ ↳ Tenant + SYSTEM RLS read-inheritance, scoped unique indexes, FORCE RLS, session hook │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2 [CRITICAL SECURITY]: Cryptographic JWT Claims & TenantContext Pipeline (Part 4)│
│ ↳ Zero client trust, JWT `tid`, TenantContextHolder, Async TaskDecorator               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3 [HIGH INTEGRITY]: Composite Cache Fabric & Dual-Layer Versioning (Pts 1, 3, 7) │
│ ↳ Effective Schema composition, composite keys `schema:{tid}:{type}:v{tVer}_s{sVer}`   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 4 [USER EXPERIENCE]: Console Dual-Mode Context Switching (Parts 3 & 7)           │
│ ↳ Architect Mode vs. Operator Mode, System-Locked (🔒) vs Custom (✏️) UI badges        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 5 [OPERATIONAL SCALE]: Tenant Onboarding & Blueprint Catalog Seeding (Part 5)    │
│ ↳ System blueprint manifests, deep-clone provisioning, decoupled schema evolution      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 6 [RELIABILITY & STABILITY]: Noisy Neighbor Defense & Resource Quotas (Part 6)   │
│ ↳ Redis Token Bucket rate limiting, JSON Schema ReDoS timeouts, storage quotas         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 1: Database Isolation & Row-Level Security (RLS)
> **Priority:** 🔴 P0 (Highest Criticality)  
> **Reference Documents:** [`docs/multi-tenants/02_multi_tenant_database_and_rls_specification.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/02_multi_tenant_database_and_rls_specification.md) & [`docs/multi-tenants/07_common_system_schemas_vs_tenant_custom_schemas.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/07_common_system_schemas_vs_tenant_custom_schemas.md)  
> **Goal:** Guarantee that data records and metadata schemas are physically and logically quarantined at the PostgreSQL engine level, while allowing global read inheritance of Common System Schemas (`SYSTEM`).

### Tasks & Deliverables:
- [ ] **Task 1.1: Liquibase Migration (`changelog-000.000.00005.xml`)**:
  - Add `tenant_id VARCHAR(255) NOT NULL` to:
    - `UNIPOST_ENTITY_TYPES`
    - `UNIPOST_ATTRIBUTE_DEFINITIONS`
    - `UNIPOST_RELATIONSHIP_TYPES`
    - `UNIPOST_ENTITY_RELATIONSHIPS`
  - Backfill existing data with default tenant identifier (`default-tenant`).
- [ ] **Task 1.2: Tenant-Scoped Uniqueness Indexes**:
  - Drop global `uk_entity_type_sysname_active` and create `(tenant_id, system_name)` partial unique index `WHERE "deletedDate" IS NULL`.
  - Drop global `uk_attr_def_type_sysname_active` and create `(tenant_id, entity_type_id, system_name)` partial unique index `WHERE "deletedDate" IS NULL`.
  - Add composite index on `UNIPOST_ENTITIES (tenant_id, entity_type_id) WHERE "deletedDate" IS NULL`.
- [ ] **Task 1.3: PostgreSQL FORCE Row-Level Security Policies with System Read Inheritance**:
  - Execute `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY` across all 5 metadata/record tables.
  - On Metadata Tables (`ENTITY_TYPES`, `ATTRIBUTE_DEFINITIONS`, `RELATIONSHIP_TYPES`):
    - `USING (tenant_id = current_setting('app.current_tenant_id') OR tenant_id = 'SYSTEM')`
    - `WITH CHECK (tenant_id = current_setting('app.current_tenant_id') AND tenant_id != 'SYSTEM')`
  - On Data Table (`UNIPOST_ENTITIES`):
    - `USING (tenant_id = current_setting('app.current_tenant_id'))`
    - `WITH CHECK (tenant_id = current_setting('app.current_tenant_id'))`
- [ ] **Task 1.4: Spring Modulith Transaction Interceptor**:
  - Implement `TenantSessionAspect` / HikariCP connection wrapper executing `SET LOCAL app.current_tenant_id = :tenantId` at the beginning of each transaction.
  - Implement `TenantSessionAspect` / HikariCP connection wrapper executing `SET LOCAL app.current_tenant_id = :tenantId` at the beginning of each transaction.

### Verification Gate:
- Write an autogenerated test attempting cross-tenant access with a raw repository query without a `WHERE tenant_id` clause. PostgreSQL RLS must return 0 rows or throw an isolation violation.

---

## 3. Phase 2: Cryptographic JWT Claims & TenantContext Lifecycle
> **Priority:** 🔴 P0 (Critical Security)  
> **Reference Document:** [`docs/multi-tenants/04_tenant_identity_jwt_and_context_lifecycle.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/04_tenant_identity_jwt_and_context_lifecycle.md)  
> **Goal:** Eliminate client parameter trust (IDOR prevention) and bind authenticated tenant identity to execution threads.

### Tasks & Deliverables:
- [ ] **Task 2.1: Header Sanitization**:
  - Implement `HeaderSanitizerFilter` in Spring Security filter chain to strip external `X-Tenant-Id` headers.
- [ ] **Task 2.2: JWT Verification & Custom Claims**:
  - Update `JwtAuthenticationTokenFilter` to parse custom claim `tid` (tenant ID) and `permissions`.
  - Instantiate `TenantAuthenticationToken` carrying the verified tenant principal.
- [ ] **Task 2.3: `TenantContextHolder` ThreadLocal Pipeline**:
  - Create `TenantContextHolder` with `setTenantId()`, `getRequiredTenantId()`, and `clear()`.
  - Enforce cleanups in `TenantContextBindingFilter.doFilterInternal()` inside a strict `try/finally` block.
- [ ] **Task 2.4: Asynchronous & Modulith Task Decorators**:
  - Implement `TenantAwareTaskDecorator` to propagate `tenantId`, `SecurityContext`, and SLF4J MDC to `@Async` thread pools and Spring Modulith asynchronous event handlers.
- [ ] **Task 2.5: Method Security Annotations**:
  - Annotate metadata controllers with `@PreAuthorize("hasAuthority('metadata:schema:write')")` and record controllers with `@PreAuthorize("hasAuthority('entity:record:write')")`.

### Verification Gate:
- Verify that sending an HTTP request with a mismatched `tenant_id` payload is ignored, and the record is stamped strictly with the JWT's `tid`. Verify context does not leak between concurrent threads.

---

## 4. Phase 3: Multi-Tenant Cache Fabric & Schema Evolution
> **Priority:** 🟠 P1 (High Integrity)  
> **Reference Document:** [`docs/multi-tenants/01_multi_tenant_architecture_specification.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/01_multi_tenant_architecture_specification.md) & [`docs/multi_tenant_database_and_rls_specification.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/02_multi_tenant_database_and_rls_specification.md)  
> **Goal:** Isolate compiled Draft-07 JSON Schema caches so that tenant schema mutations never cause cross-tenant cache stampedes or thrashing.

### Tasks & Deliverables:
- [ ] **Task 3.1: Cache Key Namespace Partitioning**:
  - Update `SchemaValidationService` and Hazelcast/Redis cache configurations to use the key pattern:
    `schema:{tenant_id}:{system_name}:v{schema_version}`
- [ ] **Task 3.2: Atomic Schema Version Increments**:
  - Ensure every attribute definition mutation (`create`, `update`, `reorder`, `archive`) increments `UNIPOST_ENTITY_TYPES.schema_version` in the same database transaction.
- [ ] **Task 3.3: L1/L2 Invalidation & Pre-warming**:
  - Compile the new JSON Schema asynchronously upon commit and populate Hazelcast L2 cache under the new version key.

### Verification Gate:
- Benchmark concurrent reads of Tenant B's schema while Tenant A continuously adds and reorders attributes. Tenant B's cache hit rate must remain 100% with zero cache invalidations.

---

## 5. Phase 4: Console UI Dual-Mode Context Switching
> **Priority:** 🟠 P1 (Front-End & Ergonomics)  
> **Reference Document:** [`docs/multi-tenants/03_multi_tenant_console_context_switching.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/03_multi_tenant_console_context_switching.md)  
> **Goal:** Provide seamless context switching between "Architect Studio" (schema modeling) and "Operator View" (business data entry) in `@unipost/console`.

### Tasks & Deliverables:
- [ ] **Task 4.1: Store State Expansion (`use-metadata-ui-store.ts`)**:
  - Add `activeTenantId`, `currentUserRole`, `workspaceMode` (`architect` | `operator`), and selectors `canManageSchema()`.
  - Add `toggleWorkspaceMode()` with safe tab fallbacks (redirecting away from `schema` if mode changes to `operator`).
- [ ] **Task 4.2: Adaptive Navigation & Header Controls**:
  - In `MetadataFeature` header, render the Liquid Glass mode toggle pill for `TENANT_ADMIN` users (`🛠️ Architect Studio` vs. `👤 Operator View`).
  - Conditionally mount the `<TabsTrigger value="schema">` only when `canManageSchema()` is true.
- [ ] **Task 4.3: Sidebar & Grid Action Gating**:
  - In `EntityTypeSidebar`, hide `+ New Model` and the three-dot mutation menu when in Operator mode or when the user is a non-admin.
  - In `RecordEditorDialog`, hide schema inspection badges and configuration wrenches for standard operators.

### Verification Gate:
- Manual & automated UI test: An admin logs in, builds a custom attribute, flips the toggle to "Operator View", and fills out the newly generated Liquid Glass form without a page reload or auth reset.

---

## 6. Phase 5: Tenant Onboarding & Blueprint Catalog Seeding
> **Priority:** 🟡 P2 (Operational Readiness)  
> **Reference Document:** [`docs/multi-tenants/05_tenant_onboarding_and_template_provisioning.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/05_tenant_onboarding_and_template_provisioning.md)  
> **Goal:** Eliminate the "blank canvas" problem by providing pre-packaged domain blueprints that seed into new tenant workspaces in $< 250\text{ ms}$.

### Tasks & Deliverables:
- [ ] **Task 5.1: Blueprint Manifest Definitions**:
  - Create declarative JSON templates in `apps/backend/unipost-fw/src/main/resources/metadata/blueprints/`:
    - `logistics-fleet-blueprint.json` (Fleet Vehicle, Dispatch Order, Assigned Vehicle edge).
    - `b2b-crm-billing-blueprint.json` (Customer Account, Invoice, Line Items).
    - `blank-workspace-blueprint.json` (Empty canvas).
- [ ] **Task 5.2: Atomic Provisioning Service (`TenantProvisioningService`)**:
  - Create onboarding transaction creating tenant record, cloning blueprint entity types, cloning attribute definitions, and pre-warming initial JSON Schema cache entries.
- [ ] **Task 5.3: Decoupled Schema Evolution Invariant**:
  - Ensure cloned records are stamped with the new `tenant_id` and have zero runtime dependency on the original blueprint manifest.
- [ ] **Task 5.4: Console Onboarding Wizard**:
  - Implement onboarding modal in `@unipost/console` allowing new users to select a starter blueprint upon initial signup.

### Verification Gate:
- Execute integration test: Provisioning a new tenant with the Logistics blueprint completes within 250ms, and immediate queries to `/api/v1/metadata/types` return the cloned schemas ready for record creation.

---

## 7. Phase 6: Noisy Neighbor Defense & Resource Protection
> **Priority:** 🟡 P2 (Platform Reliability)  
> **Reference Document:** [`docs/multi-tenants/06_multi_tenant_rate_limiting_and_noisy_neighbor.md`](file:///c:/Users/Admin/workspace/git/unipost/docs/multi-tenants/06_multi_tenant_rate_limiting_and_noisy_neighbor.md)  
> **Goal:** Safeguard shared database connections, CPU cycles, and memory buffers against runaway scripts, ReDoS attacks, or abusive queries.

### Tasks & Deliverables:
- [ ] **Task 6.1: Distributed Token-Bucket Rate Limiting**:
  - Implement Redis-backed `TenantRateLimitService` using Bucket4j, enforcing tier quotas (Starter: 120 rpm, Pro: 1,000 rpm, Enterprise: 5,000 rpm).
  - Return HTTP 429 with `Retry-After` on quota exhaustion.
- [ ] **Task 6.2: ReDoS Protection & Schema Guardrails**:
  - Cap entity types per tenant (max 50) and attributes per entity (max 100).
  - Implement `SafeSchemaValidationService` wrapping JSON Schema validation in a timeout budget of 50ms to kill catastrophic regex backtracking.
- [ ] **Task 6.3: Database Circuit Breakers**:
  - Configure `SET LOCAL statement_timeout = '3000ms'` in the transaction aspect.
  - Enforce `depth < 10` and `LIMIT 250` on all recursive Pattern C graph queries.
- [ ] **Task 6.4: Storage Quotas & Accounting**:
  - Implement daily usage tracking aggregating `pg_column_size(attributes)` per tenant, with soft warnings at 80% and graceful read-only transition at 100%.

### Verification Gate:
- Inject a ReDoS regex into an attribute definition and validate an input payload. Verify the validation engine aborts within 50ms without pegging the CPU. Flood the endpoint with requests and verify HTTP 429 triggers cleanly.

---

## 8. Summary of Milestones & Verification Checklist

| Phase | Core Objective | Primary Tech Stack | Success Metric |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Physical DB Isolation & RLS | PostgreSQL, Liquibase | Zero cross-tenant data leakage even with raw unconstrained SQL queries. |
| **Phase 2** | JWT Claims & Security Context | Spring Security, JJWT | `tenant_id` verified cryptographically; zero trust in client body/params. |
| **Phase 3** | Isolated Cache Fabric | Hazelcast, Draft-07 JSON Schema | Tenant schema mutations produce zero cache thrashing for other tenants. |
| **Phase 4** | Console Dual-Mode Studio | React 19, Zustand, Tailwind v4 | Admin can toggle between Architect and Operator view in 1 click. |
| **Phase 5** | Blueprint Seeding & Onboarding | Spring Modulith, JSON Blueprints | New tenant onboarded with working schemas in $< 250\text{ ms}$. |
| **Phase 6** | Noisy Neighbor & Quota Defense | Redis, Bucket4j, Virtual Threads | Rogue requests fail fast (HTTP 429 / 50ms regex kill) without affecting other tenants. |
