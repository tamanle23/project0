---
name: App-Specific Artifact History & Incremental Tracking
description: Enforces persistent, incremental tracking of all implementation plans, walkthroughs, and architecture artifacts inside each app's local doc/ directory.
trigger: always_on
---

# App-Specific Artifact History & Incremental Tracking

To maintain complete development traceability across all applications and packages in this monorepo, **all planning and walkthrough artifacts must be persisted directly within the target application's local `doc/` directory as sequential, incremental history**.

---

## 1. Core Rule & Storage Location

1. **Target App Directory**:
   - Whenever an implementation plan, design document, or walkthrough is produced for a specific workspace (e.g., `apps/project0-console`, `apps/mobile-ui`, `apps/tekgo-ui`, `apps/desktop-console`, `apps/project0-backend`, or packages in `packages/`), the artifact files **MUST** be written directly to that project's local `doc/` directory:
     - Target path: `apps/<target-app>/doc/`
   - If the `doc/` directory does not exist in the target app, create it automatically.

2. **Sequential Incremental Numbering**:
   - Every new artifact must follow an incremental numerical sequence based on the highest existing index in that app's `doc/` directory:
     - Plans: `doc/implementation_plan_<NN>.md` (e.g., `implementation_plan_01.md`, `implementation_plan_02.md`)
     - Walkthroughs: `doc/walkthrough_<NN>.md` (e.g., `walkthrough_01.md`, `walkthrough_02.md`)
     - Alternatively, for apps already utilizing descriptive slug prefixes (e.g. `tekgo-ui`): `doc/<NNN>-<topic>-plan.md` and `doc/<NNN>-<topic>-walkthrough.md`.
   - Never overwrite previous iterations in `doc/`. Always calculate `MAX(existing_index) + 1` to preserve complete chronological history.

3. **Dual-Persistence Requirement**:
   - Internal conversation artifacts (such as `<appDataDir>\brain\<conversation-id>/implementation_plan.md` and `walkthrough.md`) serve interactive UI review and feedback mechanisms.
   - Concurrently, the exact content **must also be copied or written to the app's version-controlled `doc/` directory** (`apps/<target-app>/doc/implementation_plan_<NN>.md` and `doc/walkthrough_<NN>.md`).

---

## 2. Step-by-Step Workflow for Agents

1. **Before Starting a Task**:
   - Scan `apps/<target-app>/doc/` to find the current highest iteration index.
   - If no files exist, initialize with index `01` (or `001`).

2. **When Creating an Implementation Plan**:
   - Generate the session implementation plan artifact (`implementation_plan.md`).
   - Simultaneously create `apps/<target-app>/doc/implementation_plan_<NN>.md` with the full technical specification.

3. **When Concluding & Verifying a Task**:
   - Generate the session walkthrough artifact (`walkthrough.md`).
   - Simultaneously create `apps/<target-app>/doc/walkthrough_<NN>.md` detailing completed changes, validation results, and testing evidence.
