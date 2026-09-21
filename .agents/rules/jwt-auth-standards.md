# JWT Authentication & State Hydration Standards

When implementing Authentication flows—particularly Dual-Token (Access + Refresh) JWT architectures—in any frontend application within this monorepo, you **MUST** adhere to the following security and lifecycle standards.

---

## 1. Secure Token Storage
- **Access Tokens**: Must **always** be stored purely **in-memory** (e.g., inside a Zustand store or React Context). Never persist access tokens to `localStorage` or `sessionStorage` to mitigate XSS (Cross-Site Scripting) vulnerability risks.
- **Refresh Tokens**: In production, these should be handled securely by the backend via `HttpOnly` cookies. For sandbox or specialized local environments, storing the refresh token in `localStorage` is permissible *only* as a fallback.

## 2. Mandatory App-Load Hydration (The "Hard Refresh" Catch)
- Because the Access Token is stored in memory, a hard browser refresh will wipe the token, temporarily rendering the user unauthenticated.
- **Rule**: Every auth implementation **must include a root-level Hydration mechanism** (e.g., a `useAuthHydration()` hook attached to the root layout). 
- On initial application bootstrap, this mechanism must proactively check for the presence of a refresh token (or rely on the backend cookie) and execute a silent `/api/auth/refresh` request to seamlessly restore the access token and user state *before* rendering authentication gates.

## 3. Silent Refresh & Queueing
- You must use an HTTP interceptor (e.g., Axios response interceptor) to catch `401 Unauthorized` responses.
- When a 401 occurs, the interceptor must **pause and queue** all subsequent outgoing requests, silently request a new access token using the refresh token, and then replay the queued requests with the new token.
- If the refresh request itself fails, clear all local state and execute a hard logout redirect.
