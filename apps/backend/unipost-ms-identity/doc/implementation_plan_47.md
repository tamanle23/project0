# Architecture Blueprint: Complete Identity Bounded Context Migration

## 1. Design Strategy
**Goal:** Completely decouple the `user` subsystem from the legacy, monolithic Spring MVC controller structure by migrating it to a CQRS-based Clean Architecture, continuing Phase 2 of the migration plan.

**Chosen Patterns & Rationale:**
- **CQRS Transition:** We are isolating write operations (e.g., `ChangeUserStatusCommand`) from read operations (e.g., `GetUserByUserNameQuery`). This prepares the system for eventual consistency and simplifies the model by not overloading a single `UserService` with disparate responsibilities.
- **Repository Pattern Expansion:** Expanding the domain-driven `UserRepository` to support both command-side mutations (`updateStatus`) and query-side reads (`findByUserName`) while maintaining a strict abstraction over the legacy JPA implementation (`UserRepositoryImpl`).

## 2. Architecture Structure
**Domain Layer (Core)**
- `com.unipost.identity.domain.user.repository.UserRepository`: Added `updateStatus` and `findByUserName` domain contracts.

**Application Layer (Use Cases)**
- `com.unipost.identity.app.user.command.ChangeUserStatusCommand`: Command to activate/deactivate a user.
- `com.unipost.identity.app.user.command.ChangeUserStatusCommandHandler`: Handles the business logic of state transitions.
- `com.unipost.identity.app.user.query.GetUserByUserNameQuery`: Query to fetch user details.
- `com.unipost.identity.app.user.query.GetUserByUserNameQueryHandler`: Maps the domain `User` to a presentation `UserResponseModel`.

**Infrastructure Layer (Adapters)**
- `com.unipost.identity.infra.user.repository.UserRepositoryImpl`: Routes domain operations (`updateStatus`, `findByUserName`) to existing JPA methods (`enableUser`, `disableUser`, `findByUserName`).

**Presentation Layer (Web)**
- `com.unipost.identity.web.user.controller.UserCQRSController`: Added endpoints for `PUT /{userName}/status` (dispatching commands) and `GET /{userName}` (dispatching queries).

## 3. Extensibility (OCP)
By fully migrating read and write operations into isolated Handlers, the `UserCQRSController` becomes incredibly thin. Adding a new feature, such as assigning a role to a user, will now strictly involve creating an `AssignRoleCommand` and its respective handler without modifying `UserService` or existing controllers.
