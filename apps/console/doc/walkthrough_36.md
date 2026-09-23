# Storage Providers UI Improvements

## Changes Made
- **Storage Provider Models**: Updated the `StorageProvider` model in `apps/console/src/features/storage/data/storages.tsx` to include `providerType` ('System Internal' | 'User Provided'), `assignedWorkspaces`, and `status`. Removed the legacy `connected` boolean flag.
- **UI Logic Update**: Modified the `apps/console/src/features/storage/index.tsx` Storage card component.
  - Removed the "Connect" button entirely.
  - The "Manage" button is now strictly conditionally rendered only for "User Provided" storages, preventing users from attempting to modify "System Internal" storages.
  - Added new visual badges indicating whether the storage is a "System Internal" or "User Provided" resource.
- **Localization**: Updated English (`en/console.json`) and Vietnamese (`vi/console.json`) translation dictionaries to include translation keys for the new "System Internal" and "User Provided" provider type badges.

## Verification
- Lint checks passed for the modified code in `apps/console`.
- Manual verification of the code confirms the correct buttons and badges are rendered conditionally based on the provider types.
