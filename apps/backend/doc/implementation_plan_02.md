# Implement Refresh Token Support in JWT Authentication

Modify the backend's JWT authentication framework (`project0-fw` and `project0-ms-identity`) to generate, validate, and process refresh tokens when issuing and refreshing authentication tokens.

## User Review Required

> [!IMPORTANT]
> - `AuthenticationToken` returned upon login/token creation will now include a valid `refreshToken` string in addition to the access `token`.
> - The `/api/auth/refresh` endpoint will validate the provided `refreshToken` (handling expired access tokens gracefully) and issue a fresh access token and refresh token pair.

## Proposed Changes

### Core Framework Layer (`apps/backend/project0-fw`)

#### [MODIFY] [JwtTokenHelper.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-fw/src/main/java/com/project0/fw/core/jwt/JwtTokenHelper.java)
- Enhance `getClaims(String token)` to catch `ExpiredJwtException` and extract claims safely for expired access token inspection.
- Update `generateRefreshToken` to encode user subject (`sub`), audience (`audience`), and token type (`type: refresh`).
- Update `generateToken(UserDetailsImpl userDetails, String userAgent)` to automatically populate the `refreshToken` property in `AuthenticationToken`.
- Update `refreshToken(...)` to validate the refresh token and issue a new `AuthenticationToken` containing fresh access and refresh tokens.

---

### Identity Microservice Layer (`apps/backend/project0-ms-identity`)

#### [NEW] [TokenRefreshValidator.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/controller/validator/TokenRefreshValidator.java)
- Implement `TokenRefreshValidator` extending `AbstractValidator<AuthenticationToken>` to validate that the request body contains a non-empty refresh token.

#### [MODIFY] [ValidatorConfiguration.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/ValidatorConfiguration.java)
- Register the `@Bean(name = TOKEN_REFRESH)` for `TokenRefreshValidator`.

#### [MODIFY] [TokenServiceImpl.java](file:///c:/Users/Admin/workspace/git/project0/apps/backend/project0-ms-identity/src/main/java/com/project0/user/service/TokenServiceImpl.java)
- Update `refreshToken` method to validate the refresh token from `request.getBody()`, re-load user details if necessary, and return the new `AuthenticationToken`.

---

### Documentation & History

#### [NEW] [implementation_plan_02.md](file:///c:/Users/Admin/workspace/git/project0/apps/backend/doc/implementation_plan_02.md)
- Persist this implementation plan to the target app's `doc/` directory as `implementation_plan_02.md`.

## Verification Plan

### Automated Build & Test Verification
- Run Maven build and tests on `project0-fw` and `project0-ms-identity` using `./mvnw clean test` from `apps/backend`.
