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

2. **Single Shared Counter**:
   - Plans and walkthroughs share **one global counter** per `doc/` directory.
   - Before creating any artifact, scan the `doc/` directory and compute:
     ```
     NEXT = MAX(all existing NN indices across both plans and walkthroughs) + 1
     ```
   - A plan and its corresponding walkthrough **always use the same index number**, making them a matched pair:
     - `doc/implementation_plan_<NN>.md` ← planned before execution
     - `doc/walkthrough_<NN>.md` ← written after execution
   - For **reactive tasks** (bug fixes, debugging) where no planning phase occurs, only a walkthrough is written — the plan file is skipped — but the shared counter still advances by 1.
   - Never overwrite previous iterations in `doc/`. The counter only ever goes up.

   **Example — correct numbering:**
   ```
   implementation_plan_01.md  ←→  walkthrough_01.md   (planned feature)
   implementation_plan_02.md  ←→  walkthrough_02.md   (planned feature)
                                   walkthrough_03.md   (reactive fix — no plan)
   implementation_plan_04.md  ←→  walkthrough_04.md   (planned feature)
   ```

3. **Dual-Persistence Requirement**:
   - Internal conversation artifacts (such as `<appDataDir>\brain\<conversation-id>/implementation_plan.md` and `walkthrough.md`) serve interactive UI review and feedback mechanisms.
   - Concurrently, the exact content **must also be copied or written to the app's version-controlled `doc/` directory**.

---

## 2. Step-by-Step Workflow for Agents

1. **Before Starting Any Task**:
   - Scan `apps/<target-app>/doc/` and compute `NEXT = MAX(all existing NN) + 1`.
   - If no files exist, initialize with index `01`.

2. **When Creating an Implementation Plan** (planned features only):
   - Generate the session implementation plan artifact (`implementation_plan.md`).
   - Simultaneously create `apps/<target-app>/doc/implementation_plan_<NEXT>.md`.
   - Reserve this `NEXT` index — the matching walkthrough will use the same number.

3. **When Concluding & Verifying a Task**:
   - Generate the session walkthrough artifact (`walkthrough.md`).
   - Simultaneously create `apps/<target-app>/doc/walkthrough_<NN>.md`:
     - If a plan was created for this task: use the **same** `NN` as the plan.
     - If this was a reactive task (no plan): use `NEXT = MAX(all existing) + 1`.
