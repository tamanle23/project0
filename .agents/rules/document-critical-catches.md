# Document Critical Catches & Architectural Gotchas

Whenever you (the agent) or the user identifies a "critical catch"—such as a non-obvious edge case, an architectural flaw, a race condition, or a framework-specific gotcha that requires a specific workaround—you **MUST** permanently document it.

---

## 1. When to Document
You must document a critical catch immediately if:
- The user points out a logical gap in your implementation (e.g., "the auth state is lost on page refresh").
- You solve a complex bug or edge-case that isn't obvious from standard framework documentation.
- An architectural decision is made that enforces a specific pattern to prevent future errors.

## 2. How to Document
- **Agent Rules**: If the catch dictates how future code *must* be written to avoid repeating the mistake, you must create a new rule file in `.agents/rules/<topic>.md` describing the required pattern.
- **Context & Failure Mode**: Clearly explain the context of the catch and the specific failure mode it prevents (e.g., "Without this hydration step, in-memory tokens will be lost on hard refresh").
- **Project Documentation**: If the catch is specific to the project's domain logic rather than a general coding standard, document it in the target app's `doc/` directory as part of the implementation history.

## 3. Core Philosophy
Never let a hard-learned lesson be forgotten. If a mistake is caught once, it should be documented immediately so that no future agent or developer makes the same mistake twice.
