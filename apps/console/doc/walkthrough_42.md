# Assign All Option in Workspace Assignments

## Changes Made
- **Assign All Action**: Added an "Assign All" button in `storage-assignments-dialog.tsx` next to the "Unassigned Workspaces" header.
- **Bulk Assignment Handler**: Implemented `handleAssignAll` which automatically assigns all currently unassigned workspaces to the selected storage provider in an enabled state.
- **Localization**: Added `"assignAll"` translation keys in both `en/console.json` ("Assign All") and `vi/console.json` ("Gán tất cả").

## Verification
- Verified that clicking "Assign All" moves all unassigned workspace items to the "Assigned Workspaces" section.
- Verified lint checks pass for modified files.
