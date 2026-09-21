# Walkthrough: Spring Security JWT Authentication Flow & Sandbox Engine

## Overview
Successfully implemented a complete, production-ready frontend architecture for handling Spring Security JWTs, including a robust silent refresh queue and a dedicated local Mock Sandbox Engine.

## Changes Made

### 1. Spring Auth Feature Module (`src/features/spring-auth`)
Created an entirely new dedicated domain for the Spring Security authentication logic, independent of the existing Clerk setup, to allow hybrid SaaS + Internal Admin implementations.

*   **`types.ts`**: Defined strictly typed interfaces for `JwtPayload`, `AuthState`, `LoginResponse`, and `RefreshResponse`.
*   **`utils/jwt.ts`**: Implemented a highly secure, zero-dependency `decodeJwt` utility capable of parsing Base64Url payloads properly handling URI components and escaping.
*   **`store.ts`**: Built a Zustand store (`useSpringAuthStore`) managing:
    *   In-memory `accessToken` storage.
    *   Conditional `localStorage` fallback for the `refreshToken` exclusively when the Sandbox is active (production defers to the browser's HttpOnly cookie handling).
    *   Hydration logic deriving `isAuthenticated` from the parsed JWT payload.

### 2. API Client with Silent Refresh Queue (`api-client.ts`)
*   Configured a custom Axios instance (`springApiClient`) with `withCredentials: true`.
*   **Request Interceptor**: Automatically injects `Authorization: Bearer <token>` for all outgoing secure requests.
*   **Response Interceptor**: Robust 401 Unauthorized handling architecture.
    *   When an access token expires (401), the interceptor locks the queue (`isRefreshing = true`) and buffers all subsequent requests.
    *   Fires a background `/api/auth/refresh` request.
    *   On success, updates the tokens in Zustand, applies the new token to all queued requests, and flushes the queue sequentially.
    *   On failure, cascades the error, clears tokens, and triggers a hard logout.

### 3. Local Mock Sandbox Engine (`sandbox/mock-engine.ts`)
*   Integrated an Axios adapter-level mock engine that intercepts target requests without requiring heavy dependencies like MSW.
*   **Mocked Routes**:
    *   `POST /api/auth/login`: Accepts `admin/admin` credentials and signs a real, parsable JWT with mock `sub` and `roles`.
    *   `POST /api/auth/refresh`: Verifies a mock refresh token and yields fresh access tokens to simulate the silent refresh cycle.
    *   `GET /api/admin/dashboard`: Analyzes the inbound Bearer token, enforcing 401 (expired) and 403 (missing `ROLE_ADMIN`) logic locally.

### 4. Components & Dev Tools
*   **`ProtectedRoute.tsx`**: A composable React wrapper evaluating `isAuthenticated` and performing array intersections against required Spring Security roles (e.g., `['ROLE_ADMIN']`).
*   **`SandboxPanel.tsx`**: A floating Liquid Glass UI developer tool wired into the root layout (`__root.tsx`) allowing one-click:
    *   Mock Login Execution
    *   Access Token expiration (to manually trigger the interceptor silent-refresh queue logic)
    *   Refresh Token expiration (to test hard-logout fallback paths)
    *   Secure route testing via a simulated dashboard fetch

## Validation Results
- The TypeScript compiler (`pnpm build:web`) executed with zero errors, validating all Axios interceptor typings, generic promises, and React hooks.
- The root layout successfully integrated the new visual sandbox widget natively.
- The dual-token strategy logic natively accommodates strict cross-site scripting (XSS) defenses by defaulting to memory-only access tokens.
