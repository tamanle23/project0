# Transforming Functioning Applications into an Enterprise-Grade Quality System
**Architectural Blueprint & Transformation Strategy for `@unipost` Monorepo**

---

## 1. Design Strategy

Moving from a **working prototype or functioning software** to an **enterprise-grade quality system** requires shifting focus from feature delivery to operational excellence, zero-downtime resilience, deterministic security, high observability, and strict architectural governance.

In the context of the **`@unipost` monorepo**—comprising Java 21 / Spring Modulith backends (`@unipost/backend`), React 19 / Vite web apps (`@unipost/console`), Next.js portals (`tekgo-ui`), Expo mobile apps (`mobile-ui`), Electrobun desktop apps (`@unipost/desktop`), and shared Liquid Glass UI packages (`@unipost/ui`)—the design strategy rests on five core pillars:

### Pillar I: Zero-Trust & Defensive System Boundaries
* **Strict Decoupling via Facades & Mediators**: Frontends must never directly tie UI components to network APIs or raw stores. All data access must pass through typed Facades (custom TanStack Query hooks) and Zustand Mediators.
* **Unified Sandbox & Offline First Simulation**: Synthetic data and sandbox mocks (`apps/console/src/core/sandbox/`) must mirror real backend behavior with zero network leakage in DEV/TEST environments.
* **Contract-First API Architecture**: OpenAPI schemas and JSON Schema (Draft-07) define immutable contracts between client and server, backed by strict client-side (`ajv`) and server-side (`json-schema-validator`) validation.

### Pillar II: Resilient Modulith & Domain Isolation
* **Spring Modulith Boundaries**: Enforce strict package boundaries in `@unipost/backend` to prevent cyclic cross-module dependencies.
* **Asynchronous Saga & Event-Driven Decoupling**: Inter-module side effects must use `@TransactionalEventListener(phase = AFTER_COMMIT)` combined with `@Async` and Spring `ApplicationEventPublisher`.
* **Hybrid Dynamic Metadata Invariants**: Maintain C4/C5 schema caching (`schema:{id}:v{version}` in L1 `ConcurrentHashMap` + L2 Redis) with partial indexes conditioned on `deleted_date IS NULL` to ensure sub-millisecond dynamic attribute lookups without locking issues.

### Pillar III: Unified Visual & Micro-UX Standards
* **Liquid Glass Design System Governance**: Centralize UI design tokens in `packages/ui` (`GlassCard`, `GlassButton`, frosted blurs, specular sheen) and maintain strict synchronization with `DESIGN.md` and `ROUTE.md` across all clients.
* **Universal Accessibility & i18n Synchronization**: Enforce WCAG 2.2 AA contrast rules and mandatory locale key synchronization across `en` and `vi` in `packages/i18n`.

### Pillar IV: Test-Driven Quality Gates & Shift-Left Telemetry
* **Pyramid Testing Strategy**:
  - Unit tests for domain logic and Zustand state stores.
  - Component tests with React Testing Library and Spring Boot `@DataJpaTest`.
  - Spring Modulith integration tests (`ApplicationModules.verify()`).
  - End-to-end sandbox verification.
* **Automated CI/CD Quality Gates**: Enforce zero lint errors, type checks (`tsc --noEmit`), and code coverage thresholds (>85%) before code merge.

### Pillar V: Continuous Compliance & Governance
* **RFC 6902 Delta Patch Auditing**: Point-in-time auditing for dynamic JSONB records with zero payload bloat in relational hard columns.
* **Rule Standard Operating Procedure (SOP)**: Multi-tiered rule management with `docs/master_rules_reference.md` as the single source of truth, enforced via automated pre-commit instructions.

---

## 2. Architecture

The target enterprise architecture organizes the system into multi-layered, highly decoupled tiers:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     ENTERPRISE CLIENT LAYER                                      │
├──────────────────────────┬─────────────────────────┬───────────────────┬─────────────────────────┤
│    @unipost/console      │        tekgo-ui         │     mobile-ui     │    @unipost/desktop     │
│ (React 19 / Vite 8 Web)  │  (Next.js 15 App Router)│  (Expo SDK 57)    │  (Electrobun Desktop)   │
├──────────────────────────┴─────────────────────────┴───────────────────┴─────────────────────────┤
│                                  SHARED DESIGN & I18N FABRIC                                    │
│   ┌──────────────────────────────────────────────┐ ┌─────────────────────────────────────────┐   │
│   │  @unipost/ui (Liquid Glass Component Tokens) │ │  @unipost/i18n (Sync Locales: EN / VI)  │   │
│   └──────────────────────────────────────────────┘ └─────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                UNIFIED CLIENT MEDIATOR & SANDBOX                                 │
│   ┌──────────────────────────────────────────────┐ ┌─────────────────────────────────────────┐   │
│   │  Zustand UI Stores & Facade Hooks            │ │  Unified Sandbox (Axios/Fetch Inceptor) │   │
│   └──────────────────────────────────────────────┘ └─────────────────────────────────────────┘   │
└──────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                               │ HTTPS / REST / gRPC / SSE / MCP
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    ENTERPRISE BACKEND GATEWAY                                    │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                 SPRING MODULITH BACKEND ENGINE                                   │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌──────────────────────────────────┐  │
│  │   Auth & Multi-Tenant   │  │ Dynamic Metadata Engine │  │ Order / Logistics Domain Module │  │
│  │   Isolation (TenantContext)│  │ (Hybrid JSONB + Draft-07)│  │ (Spring Modulith Module)        │  │
│  └─────────────────────────┘  └─────────────────────────┘  └──────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Event Bus & Async Sagas (@TransactionalEventListener + ApplicationEventPublisher)          │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                   PERSISTENCE & CACHING LAYER                                    │
│  ┌──────────────────────────────────────────────┐ ┌──────────────────────────────────────────┐  │
│  │ PostgreSQL 16 + Liquibase (JSONB + GIN)      │ │ L1 ConcurrentHashMap + L2 Redis Caching  │  │
│  └──────────────────────────────────────────────┘ └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Architectural Key Patterns & Invariants
1. **Facade & Mediator Pattern (Frontend)**:
   - React components interact with `useEntityQuery` / `useEntityMutation` hooks rather than making raw HTTP calls.
   - Cross-component state uses Zustand stores (`useSpringAuthStore`, etc.) avoiding context re-render thrashing.
2. **Spring Modulith & CQRS Pattern (Backend)**:
   - High-throughput read pathways query read-optimized views / dynamic JSONB indexes.
   - Command pathways publish domain events to maintain eventual consistency across modules.
3. **ResolvableType Dynamic Dispatch**:
   - Generic command handles (e.g. Mediator / CQRS handlers) resolve generic types using `org.springframework.core.ResolvableType` to preserve proxy compatibility over CGLIB transactional beans.
4. **Tenant-Isolated Persistence Context**:
   - Dynamic dynamic entities are segmented by `tenant_id` and partial unique constraints (`WHERE deleted_date IS NULL`).
   - JPA entity parallelization uses `jpaHelpers.detach()` to ensure Persistence Context thread-safety.

---

## 3. Implementation

The enterprise transformation strategy is structured into four tactical execution phases:

### Phase 1: Core Quality Infrastructure & Governance (Weeks 1–3)
* **Goal**: Establish automated linting, type-checking, building, testing pipelines, and static analysis.
* **Deliverables**:
  1. Turborepo pipeline optimization (`turbo.json`) with caching for `build`, `test`, `lint`, and `check-types`.
  2. Master Rules Reference enforcement (`docs/master_rules_reference.md` & `.agents/rules/`).
  3. Pre-commit check standardization (`pre_commit_instructions`).
  4. i18n key synchronization validation tool across English (`en`) and Vietnamese (`vi`).

### Phase 2: Resilience, Observability & Security Hardening (Weeks 4–6)
* **Goal**: Eliminate single points of failure, secure tenant boundaries, and provide complete system trace logging.
* **Deliverables**:
  1. Spring Security multi-tenant JWT filter chain with tenant context propagation.
  2. Circuit breaking & rate limiting on external integrations.
  3. OpenTelemetry tracing and Prometheus/Grafana metrics exported from `@unipost/backend`.
  4. Liquibase database migration audit & validation across all changeset scripts.

### Phase 3: Frontend Modernization & Unified Sandbox (Weeks 7–9)
* **Goal**: Deliver zero-lag, highly accessible, offline-capable UI components across all clients.
* **Deliverables**:
  1. Liquid Glass visual polish across `@unipost/console`, `tekgo-ui`, `mobile-ui`, and `@unipost/desktop`.
  2. Dynamic metadata headless form engine (`<DynamicEntityForm />` with Ajv Draft-07 validation).
  3. Debounced state update synchronization (`useTableUrlState` with debounced search parameters).
  4. Full Unified Sandbox simulation mode with persona switching (`useSpringAuthStore`).

### Phase 4: Scalability, Performance & Async Sagas (Weeks 10–12)
* **Goal**: Scale dynamic metadata queries, asynchronous workflows, and AI tool integration.
* **Deliverables**:
  1. L1/L2 schema caching (`schema:{id}:v{version}`) with Spring Modulith event invalidation.
  2. Async Sagas for cross-module business operations using `@TransactionalEventListener`.
  3. AI Agent Model Context Protocol (MCP) bridge dynamically generating tool manifests from Draft-07 schemas.

---

## 4. Extensibility (OCP - Open/Closed Principle)

To ensure the system is **open for extension but closed for modification**, the architecture incorporates explicit open-extension points across both backend and frontend layers:

### 1. Dynamic Attribute & Widget Extension Engine
* **Extension Mechanism**: The dynamic metadata engine allows business users and engineers to define new entity attributes, UI widgets (`ui_schema`), and validation rules in database metadata without touching backend Java code or redeploying microservices.
* **OCP Compliance**:
  ```tsx
  // packages/ui/src/dynamic-form/widget-registry.ts
  export interface WidgetProps {
    value: unknown;
    onChange: (val: unknown) => void;
    schema: AttributeSchema;
  }

  // Adding a new custom widget registers into a map without altering core form engine code
  export const WidgetRegistry = new Map<string, React.ComponentType<WidgetProps>>();
  export function registerWidget(type: string, component: React.ComponentType<WidgetProps>) {
    WidgetRegistry.set(type, component);
  }
  ```

### 2. Plug-and-Play AI Agent MCP Tools
* **Extension Mechanism**: The AI Agent bridge inspects active `UNIPOST_ENTITY_TYPES` at runtime and converts their compiled Draft-07 schemas into MCP tool specs.
* **OCP Compliance**: Introducing a new domain entity automatically exposes corresponding query, create, update, and graph tools to autonomous AI agents without modifying the agent tool runner code.

### 3. Multi-Channel Syndication & Pattern C Edge Metadata
* **Extension Mechanism**: The hybrid relational-JSONB schema stores channel-specific syndication payloads and edge metadata (`product_relationships.edge_metadata`) dynamically.
* **OCP Compliance**: Connecting a new marketplace (e.g., TikTok Shop, MercadoLibre) or new relationship type requires zero DDL migrations or backend entity modifications.

---

## 5. Summary & Next Steps

Transforming the `@unipost` monorepo into an enterprise-grade quality platform equips the system to handle enterprise scale, strict multi-tenancy, dynamic schema evolutions, and AI integrations effortlessly. By following this blueprint, the team maintains high developer velocity while safeguarding system reliability, security, and performance.
