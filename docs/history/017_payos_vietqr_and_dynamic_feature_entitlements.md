# History Log 017: Phase 4 payOS VietQR Integration & Dynamic Feature Entitlements Engine

## 1. Problem
In the Domain Blueprints Full-Stack Ecosystem, commercialization and feature access control require:
1. Dynamic, decoupled capabilities rather than static plan code checks (`if (plan == 'PRO')`).
2. Seamless Vietnamese domestic checkout using payOS (VietQR / Napas247 / banking apps) with HMAC-SHA256 verified webhooks.
3. Database and cache-backed entitlement enforcement with Row-Level Security (RLS) on PostgreSQL.
4. Elegant in-app feature gating in `@unipost/console` via frosted Liquid Glass scrims and dynamic QR checkout modals.

## 2. Plan
1. Create Liquibase migration `changelog-000.000.00006.xml` for `UNIPOST_TENANT_BILLING` and `UNIPOST_TENANT_FEATURES` with RLS.
2. Implement JPA entities (`TenantBilling`, `TenantFeature`) and repositories in `unipost-fw`.
3. Build `TenantEntitlementService` with in-memory L1 cache and standard tier token mappings (`BASIC`, `PRO`, `PRO_MAX`).
4. Implement `@RequireFeature` annotation and `FeatureEntitlementAspect` throwing `FeatureNotEntitledException` (HTTP 403).
5. Implement `PayOsBillingService` and `TenantBillingController` with HMAC signature verification and checkout generator.
6. Build frontend hooks (`use-billing.ts`), `<FeatureGate />` component, and `PayOsQrModal`.
7. Register `billingSandboxHandler` in the Unified Sandbox Platform.
8. Wire `<FeatureGate />` into Schema and Graph tabs in `MetadataFeature`, and connect `PayOsQrModal` into `LandingPage`.
9. Write unit tests for backend (`PayOsBillingAndEntitlementsTest`) and frontend (`feature-gate.test.tsx`).

## 3. Changes
- **Backend Migrations & Entities**:
  - `apps/backend/unipost-db/src/main/resources/db/unipost/changelog-000.000.00006.xml`
  - `apps/backend/unipost-db/src/main/resources/db/unipost/changelog-master.xml`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/domain/billing/TenantBilling.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/domain/billing/TenantFeature.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/repository/jpa/TenantBillingRepository.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/repository/jpa/TenantFeatureRepository.java`
- **Backend Services & Controllers**:
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/RequireFeature.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/FeatureNotEntitledException.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/TenantEntitlementService.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/DefaultTenantEntitlementService.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/FeatureEntitlementAspect.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/tenant/billing/PayOsBillingService.java`
  - `apps/backend/unipost-fw/src/main/java/com/unipost/presentation/TenantBillingController.java`
  - `apps/backend/unipost-ms-aio/src/main/resources/application-local.yml`
- **Backend Tests**:
  - `apps/backend/unipost-fw/src/test/java/com/unipost/tenant/billing/PayOsBillingAndEntitlementsTest.java`
- **Frontend Components & Sandbox**:
  - `apps/console/src/features/metadata/api/use-billing.ts`
  - `apps/console/src/features/metadata/components/billing/payos-qr-modal.tsx`
  - `apps/console/src/features/metadata/components/billing/feature-gate.tsx`
  - `apps/console/src/features/metadata/components/billing/feature-gate.test.tsx`
  - `apps/console/src/features/metadata/components/metadata-feature.tsx`
  - `apps/console/src/features/landing/index.tsx`
  - `apps/console/src/core/sandbox/handlers/billing-sandbox-handler.ts`
  - `apps/console/src/core/sandbox/index.ts`
- **Documentation**:
  - `apps/console/doc/walkthrough_66.md`

## 4. Verification
- `mvnw.cmd test -pl unipost-fw -Dtest=PayOsBillingAndEntitlementsTest`: 5 tests passed (100%).
- `mvnw.cmd test-compile -DskipTests`: All 10 reactor modules compiled successfully.
- `pnpm --filter @unipost/console exec tsc --noEmit`: 0 TypeScript errors.
- `pnpm --filter @unipost/console test`: 16 test files passed, 83 tests passed.
