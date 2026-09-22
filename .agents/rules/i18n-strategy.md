# Internationalization (i18n) Strategy

When adding or modifying text strings in any UI application across the monorepo, you must adhere to the centralized internationalization (i18n) strategy.

## 1. Core Rule: Separation of Dictionaries

1. **Common Resources (`packages/i18n`)**:
   - Any string that is highly reusable across multiple applications (e.g., standard action verbs like "Save", "Cancel", "Submit", "Loading", standard error messages, and basic layout/UI terminologies) **MUST** be placed in the shared `@project0/i18n` package.
   - Location: `packages/i18n/src/locales/<lang>/common.json`
   - Access: Utilize the `common` namespace (e.g., `t('common:save', 'Save')`).

2. **App-Specific Resources (`apps/<app>/locales`)**:
   - Any string that is domain-specific or tightly coupled to a single application's context (e.g., specific dashboard titles, app-specific marketing copy, proprietary feature names) **MUST** be placed in the target app's local dictionary.
   - Location: `apps/<app>/src/locales/<lang>/<app>.json` (or the app's designated locales path).
   - Access: Utilize the app's default namespace (e.g., `t('dashboard.title')`).

## 2. Implementation Guidelines

- **Always use hooks**: Always wrap React components with `useTranslation` instead of referencing static data directly. If static data files contain text (like sidebar configurations), refactor them into a custom hook (e.g., `useSidebarData`).
- **Provide Fallbacks**: Always provide the default English text as a fallback in the translation call: `t('namespace:key', 'Fallback English Text')` to prevent the UI from showing raw keys if the dictionary is out of sync.
- **Update the JSON Dictionaries**: Do not leave keys "floating" as just fallbacks in the code. Whenever you add a new `t()` key to the UI, you must immediately add that key and its translation to the corresponding `.json` dictionary file.
