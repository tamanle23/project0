---
name: Automatic Git Commit Upon Implementation Completion
description: Enforces that whenever an implementation plan execution is finished and verified, the agent must commit all changes with a meaningful, conventional commit message.
trigger: always_on
---

# Automatic Git Commit Upon Implementation Completion

Whenever any implementation plan, code modification, feature addition, bug fix, or refactoring task finishes execution and verification, the agent **MUST** automatically stage and commit the changes to Git with a clear, meaningful commit message.

---

## 1. Core Rule

1. **Commit Timing**:
   - As soon as the implementation execution and validation steps (lint, tests, build) succeed and the corresponding walkthrough documentation has been generated, the agent must immediately commit the changes.
   - Do not leave verified code uncommitted or wait for the user to explicitly prompt for a commit. Committing is an integral concluding step of the execution lifecycle.

2. **Meaningful Commit Messages**:
   - Commit messages must follow the Conventional Commits format:
     - `feat(<scope>): <concise description of feature added>`
     - `fix(<scope>): <concise description of fix>`
     - `perf(<scope>): <concise description of performance optimization>`
     - `refactor(<scope>): <concise description of refactoring>`
     - `docs(<scope>): <concise description of documentation updates>`
   - The commit message must be descriptive and explain *what* was changed and *why*.
   - Include bullet points in the commit body for multi-part changes detailing the exact optimizations or additions.

3. **Scope & Clean Staging**:
   - Stage relevant files cleanly (e.g. app source files, lockfiles, tests, and documentation artifacts in `apps/<app>/doc/`).
   - Never commit sensitive secrets (e.g. `.env` containing live API keys) or temporary scratch files.
