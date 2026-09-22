# Walkthrough: Fix Sandbox Mock Engine and Build Errors

## Changes Made
- Fixed a bug in `apps/console/src/features/spring-auth/sandbox/mock-engine.ts` where it was attempting to `JSON.parse` the Axios request `config.data` object. Because Axios interceptors receive the raw JavaScript object before it gets transformed into a string, `JSON.parse` was throwing an exception causing the mock engine to fail sandbox logins. Handled both string and object data types gracefully.
- Fixed a TypeScript compilation error in `apps/console/src/features/spring-auth/hooks/use-auth-hydration.ts` by removing an unused `useState` import, which was causing the `tsc -b` strict build pipeline to fail.

## Verification
- Confirmed that the `pnpm run build` pipeline successfully compiles.
- Sandbox bypass login requests now correctly match against the mock interceptor.
