# Sidebar Navigation Group Renaming

## Changes Made
- **Sidebar Data**: Updated `sidebar-data.ts` to rename the first navigation group from `"General"` to `"Workspace"`.
- **Architectural Scope Alignment**: This group label change emphasizes that all contained routes (Dashboard, Tasks, Apps, Chats) are scoped to the currently active workspace, whereas items under the `"Admin"` group (Users, Storage Providers) remain system-wide and workspace-independent.
- **Localization**: Added `"workspace"` translation entries to `en/console.json` ("Workspace") and `vi/console.json` ("Không gian làm việc").

## Verification
- Verified sidebar navigation renders the group title correctly.
- Verified lint checks pass.
