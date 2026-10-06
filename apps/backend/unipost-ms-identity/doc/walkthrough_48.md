# Architecture Refactoring - Deprecation, Sagas, & Event Bus

- **Deprecation (Phase 2):** Marked the monolithic `UserService` and `UserFacade` as `@Deprecated` to signal transition to CQRS handlers.
- **Module Independence (Phase 3):** Successfully removed tight coupling of `unipost-ms-fs` and `unipost-ms-worker` from `unipost-ms-aio`'s POM, guaranteeing they compile and boot independently.
- **Modulith Event Bus (Phase 3):**
  - Defined a shared domain event: `UserRegisteredEvent`.
  - Refactored `RegisterUserCommandHandler` to publish this event upon successful creation via Spring's `ApplicationEventPublisher`.
- **Saga Orchestration (Phase 3):**
  - Created distributed Saga listeners using `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)` combined with `@Async`.
  - Implemented `UserRegistrationSaga` in `unipost-ms-worker` to handle async background provisioning.
  - Implemented `FileSystemUserProvisioningSaga` in `unipost-ms-fs` to allocate storage asynchronously upon user registration.
- **Validation:** Cleanly built the entire backend matrix utilizing Maven. Repaired a frontend bug resolving `useRegisterUserFacade` pathing errors and ensuring `pnpm-lock.yaml` wasn't incorrectly altered.
