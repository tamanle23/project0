# Locale Resource Synchronization Rule

Whenever any new screen, route, sidebar item, component, or UI element is introduced that contains user-facing text (labels, titles, descriptions, placeholders, toasts, error messages, etc.), **all locale resource files must be updated simultaneously** across every supported language.

---

## 1. Scope

This rule applies to all UI-containing workspaces:
- `apps/console` — locale files in `src/locales/{en,vi}/console.json`
- `apps/tekgo-ui` — locale files as applicable
- `apps/mobile-ui` — locale files as applicable
- `packages/i18n` — shared locale files in `src/locales/{en,vi}/common.json`

## 2. Requirements

1. **Identify all new translation keys**: When adding or modifying any component that uses `useTranslation()`, `t()`, or hardcoded user-facing strings that should be localized, identify every new key required.

2. **Update ALL supported language files**: For each new key, add corresponding entries to **every** locale file (currently `en` and `vi`). Never add a key to one language without adding it to all others.

3. **Use the `t()` function for all user-facing strings**: New screens and components must use the i18n `t()` function (from `react-i18next`) for:
   - Page titles and subtitles
   - Sidebar navigation labels
   - Button labels
   - Placeholder text
   - Toast messages
   - Form labels and validation messages
   - Empty state messages

4. **Sidebar items always require locale keys**: Any new entry added to `sidebar-data.ts` via `t('sidebar.items.<key>', '<fallback>')` **must** have the `<key>` present in every locale JSON under `sidebar.items`.

5. **Verification**: After updating locale files, verify that:
   - All locale JSON files are valid JSON (no trailing commas except where allowed, matching braces).
   - Every key present in `en` is also present in `vi`, and vice versa.
   - The app builds without errors.

## 3. Fallback Text Convention

When using `t()`, always provide a sensible English fallback as the second argument:
```ts
t('sidebar.items.storage', 'Storage')
```
This ensures the UI remains functional even if a key is temporarily missing, but this is **not a substitute** for actually adding the key to locale files.
