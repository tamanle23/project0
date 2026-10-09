# History Index

| ID | Date | Task Title | Summary |
| :--- | :--- | :--- | :--- |
| [001](001_mobile_overflow_scroll_bento_box.md) | 2026-10-08 | Mobile Viewport Overflow Scroll & Bento Box Responsive Preservation | Resolved mobile screen scrolling freeze in console while preserving Bento Box layout on medium/large screens. |
| [002](002_wcag_2_2_compliance_milestone_1.md) | 2026-10-08 | WCAG 2.2 AA Compliance - Milestone 1 | Hardened design token contrast ratios, global scroll-padding for focus obscuration, and SC 2.5.8 target sizing across @unipost/console. |
| [003](003_multi_tenant_database_isolation_and_rls.md) | 2026-10-09 | Multi-Tenant Database Isolation & RLS (Phase 2) | Added tenant-scoped uniqueness, denormalized tenant_id, PostgreSQL RLS policies, JPA entity mappings, and Spring transaction session aspect. |
| [004](004_jwt_claims_and_tenant_context_lifecycle.md) | 2026-10-09 | JWT Claims, TenantContext Lifecycle & Header Sanitization (Phase 3) | Implemented HeaderSanitizerFilter, JWT tid/permissions extraction, TenantContextHolder lifecycle, MDC logging, and AsyncContextTaskDecorator. |
| [005](005_composite_cache_fabric_and_dual_layer_versioning.md) | 2026-10-09 | Composite Cache Fabric & Dual-Layer Versioning (Phase 4) | Implemented composite cache keys schema:{tid}:{type}:v{tVer}_s{sVer}, effective schema composition, SYSTEM immutability guards, and tenant-scoped cache eviction. |
| [006](006_console_ui_dual_mode_context_switching.md) | 2026-10-09 | Console UI Dual-Mode Context Switching (Phase 5) | Implemented Architect Studio vs. Operator View toggle, permission-based tab/model guards, SYSTEM immutability badges, and form schema inspection. |
| [007](007_tenant_onboarding_and_blueprint_catalog_seeding.md) | 2026-10-09 | Tenant Onboarding & Blueprint Catalog Seeding (Phase 6) | Implemented domain blueprint manifests, BlueprintCatalogService, atomic TenantProvisioningService with schema pre-warming, and controller endpoints. |
| [008](008_domain_blueprint_seeding_headless_cms.md) | 2026-10-09 | Domain Blueprint Seeding: Headless CMS & Digital Publishing | Developed CMS blueprint manifest (articles, categories, media assets, SEO metadata, graph edges), catalog integration, and provisioning tests. |
| [009](009_noisy_neighbor_defense_and_resource_quotas.md) | 2026-10-09 | Noisy Neighbor Defense & Resource Protection (Phase 7) | Implemented tenant token-bucket rate limiting (Tier 1), schema complexity & 50ms ReDoS timeout defense (Tier 2), and 3000ms database statement timeout (Tier 3). |
