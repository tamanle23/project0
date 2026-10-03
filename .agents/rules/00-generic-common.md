---
name: Generic Common Rules
description: Universal operational constraints, SOP, commit conventions, and artifact tracking.
trigger: always_on
---

# RULE MANAGEMENT SOP (CRITICAL CONSTRAINT)
Constraint: YOU MUST NEVER write long, detailed rules directly into the `.agents/rules/` directory.
Workflow:
  Step_1: Whenever the user asks to add or update a rule, FIRST write the full, verbose explanation and logic into `docs/master_rules_reference.md`.
  Step_2: SECOND, strictly distill the rule into a highly compact, imperative constraint (using YAML or bullet points).
  Step_3: THIRD, append ONLY the compacted version to either `00-generic-common.md` (if broad) or `01-workspace-specific.md` (if domain-specific).

# AUTOMATIC GIT COMMIT
- MUST auto-stage and commit immediately after implementation passes verification (build/lint/test).
- NEVER leave verified code uncommitted or wait for user prompt to commit.
- MUST use Conventional Commits: `<type>(<scope>): <summary>` (types: `feat|fix|perf|refactor|docs|test|chore`).
- NEVER commit `.env`, secrets, or temporary scratch files.

# APP-SPECIFIC ARTIFACT TRACKING
- Plan and walkthrough artifacts MUST be written to target app directory: `apps/<app>/doc/`.
- Shared counter: `NEXT = MAX(all existing NN in doc/) + 1` (start at `01`).
- Paired feature: `implementation_plan_<NN>.md` and `walkthrough_<NN>.md` MUST share identical `NN`.
- Reactive fix (no plan): Generate `walkthrough_<NEXT>.md` (increments counter by 1).
- NEVER overwrite existing artifact files in `doc/`.

# CRITICAL CATCHES & ARCHITECTURAL GOTCHAS
- MUST permanently document any non-obvious bug fix, race condition, or edge case in `doc/` or `docs/master_rules_reference.md`.
- NEVER allow a hard-learned failure mode to go undocumented.
