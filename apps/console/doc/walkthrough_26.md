# Walkthrough: Code Hygiene and Dead Code Pruning

## Changes Made
- Removed the unused `team-switcher.tsx` component from `apps/console/src/components/layout/` as it was orphaned and flagged by static analysis (`knip`).
- Uninstalled the `@faker-js/faker` development dependency from `apps/console/package.json` since it is no longer used by any test or mock in the workspace.
- Un-exported internal module functions and constants (`FACEBOOK_PAGE_SCOPES`, `loadFacebookSdk`, `TIKTOK_SCOPES`, `YOUTUBE_SCOPES`) in `facebook-service.ts`, `tiktok-service.ts`, and `youtube-service.ts` to properly encapsulate them within their respective modules instead of exposing them globally, thereby resolving static analysis warnings about unconsumed exports without removing active code.

## Verification
- Confirmed with the user that the scopes and SDK loader functions are indeed active internally, updating the refactor logic from deletion to proper encapsulation.
- Ran `pnpm remove` to cleanly sync `package.json` and the lockfile.
