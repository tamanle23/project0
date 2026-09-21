# Implement Spring Security JWT Authentication Flow & Sandbox Mode

This plan details the architecture and implementation strategy for the dual-token (Access + Refresh) Spring Security authentication flow, along with the dedicated Sandbox Mock Engine.

## Architectural Overview

Since the project currently contains traces of Clerk (`@clerk/clerk-react`), this custom Spring Security JWT implementation will be modularized into a dedicated feature directory (`src/features/spring-auth`) to avoid collisions. 

The architecture consists of four core pillars:
1. **State Management**: A Zustand store (`useSpringAuthStore`) handling token presence, in-memory vs. localStorage persistence configurations, and JWT payload decoding.
2. **API Client**: A customized Axios instance (`springApiClient`) handling automatic bearer token injection and an interceptor that gracefully queues requests during a silent token refresh loop.
3. **Sandbox Mock Engine**: A lightweight Axios mock interceptor that intercepts outgoing requests to `/api/auth/*` and `/api/admin/*` to return mock JWTs, simulating the Spring Security backend entirely locally.
4. **React Component Integration**: Route guards (`<ProtectedRoute>`) and a visual Developer Panel (`<SandboxPanel>`) for token manipulation.

## Proposed Changes

### `src/features/spring-auth` (New Feature Module)

#### [NEW] `src/features/spring-auth/types.ts`
- Interfaces for `JwtPayload` (containing `sub`, `roles`, `exp`, `iat`).
- Interfaces for `AuthConfig` (controlling `storageType`: `'in-memory' | 'localStorage'`).
- Types for API responses (`LoginResponse`, `RefreshResponse`).

#### [NEW] `src/features/spring-auth/utils/jwt.ts`
- Utility function to safely decode JWTs (`base64UrlDecode`) without requiring external dependencies like `jwt-decode`.
- Token expiration validation functions (calculating `exp` drift).

#### [NEW] `src/features/spring-auth/store.ts`
- Zustand store managing the tokens.
- Handles logic for `setTokens`, `clearTokens`, and syncing with `localStorage`/`sessionStorage` if the sandbox is enabled, while keeping `accessToken` strictly in-memory in production (if configured).

#### [NEW] `src/features/spring-auth/api-client.ts`
- Creates `springApiClient` using Axios.
- **Request Interceptor**: Injects `Authorization: Bearer <token>`.
- **Response Interceptor**: Catches `401 Unauthorized`. If a refresh token is available, pauses all incoming requests into a queue, calls the refresh endpoint, updates the tokens, and then flushes the queue, retrying failed requests.

#### [NEW] `src/features/spring-auth/sandbox/mock-engine.ts`
- Axios interceptor attached to `springApiClient` conditionally (`if (import.meta.env.VITE_USE_SANDBOX === 'true')`).
- Mocks endpoints:
  - `POST /api/auth/login`: Validates credentials, issues mock signed JWT and refresh tokens.
  - `POST /api/auth/refresh`: Issues a new mock JWT.
  - `GET /api/admin/dashboard`: Verifies Bearer token, throws 401 if expired, 403 if missing `ROLE_ADMIN`, 200 otherwise.

#### [NEW] `src/features/spring-auth/components/ProtectedRoute.tsx`
- A wrapper component that checks the current user's decoded JWT roles against required roles (e.g., `<ProtectedRoute roles={['ROLE_ADMIN']}>`). Redirects or shows an unauthorized UI if access is denied.

#### [NEW] `src/features/spring-auth/components/SandboxPanel.tsx`
- A floating developer widget (visible only when `VITE_USE_SANDBOX` is true).
- Contains action buttons: 
  - "Expire Access Token" (mutates token state directly).
  - "Expire Refresh Token / Force Logout".
  - "View Decoded JWT".

## User Review Required

> [!IMPORTANT]
> **Token Storage Configuration**: In a true Spring Security production setup against XSS, storing tokens in `localStorage` is vulnerable. The safest approach is HttpOnly Cookies. Our implementation will default to an `in-memory` store for the Access Token and rely on HttpOnly cookies for the Refresh Token in production. However, for Sandbox Mode to work locally without a real backend serving cookies, we will use `localStorage` fallback. 

## Open Questions

> [!WARNING]
> 1. Do you want this JWT flow to completely replace the existing Clerk authentication currently defined in `package.json` and `auth-layout.tsx`, or should they coexist (e.g., Clerk for public SaaS auth, Spring JWT for an internal admin backend)?
> 2. What route should unauthenticated users be redirected to when a protected route guard triggers? (e.g., `/login`?)

## Verification Plan

### Automated / Manual Verification
- Render the `<SandboxPanel>` inside the root layout.
- Click "Login" in the sandbox to receive tokens.
- Call the mocked `/api/admin/dashboard` endpoint and confirm success.
- Click "Expire Access Token" in the Sandbox panel.
- Call `/api/admin/dashboard` again -> verify the Axios interceptor catches the 401, calls `/api/auth/refresh` silently, updates the store, and retries the dashboard request successfully.
- Click "Expire Refresh Token", verify the app correctly logs the user out and redirects.
