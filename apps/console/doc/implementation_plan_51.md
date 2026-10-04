# Architecture Blueprint: Shared UI & Frontend Foundation Refactor

## 1. Design Strategy
**Goal:** Finalize the modernization of the frontend architecture (Phase 4) by enforcing the Liquid Glass design system, centralizing UI state, and synchronizing internationalization dictionaries.

**Chosen Patterns & Rationale:**
- **Atomic Design & Liquid Glass Tokens:** Expanding the UI library with `GlassButton` ensures consistent multi-platform rendering of the mandatory frosted/translucent aesthetic.
- **Mediator (State Decoupling):** Leveraging Zustand (`useUiStore`), we extract transient UI states (like modal visibility) out of the DOM hierarchy. This allows disparate components to trigger or react to UI events synchronously without prop-drilling or React Context performance bottlenecks.
- **I18n Synchronization:** Extracted shared strings into `packages/i18n` with strictly synchronized namespaces for English (`en`) and Vietnamese (`vi`).

## 2. Architecture Structure
- `packages/ui/src/components/glass/glass-button.tsx`: Addition to the shared component registry.
- `apps/console/src/features/users/store/use-ui-store.ts`: The central UI mediator for the users feature.
- `packages/i18n/src/locales/{en|vi}/common.json`: Centralized, synchronized string dictionaries.

## 3. Extensibility (OCP)
The Zustand store operates independently of React's lifecycle. New UI features (like sidebars or popups) can be added to the store state without modifying any existing consuming components, thus adhering to OCP.
