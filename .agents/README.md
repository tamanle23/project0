# Agents Configuration Directory

This `.agents` directory contains custom rules, skills, and configurations for Antigravity and other AI coding assistants. These files help the agent understand the project's unique architecture, constraints, and workflows.

## Directory Structure
* **`rules/`**: Contains markdown files with guidelines and context that are automatically injected into the agent's context. These define boundaries, coding standards, and architectural rules.
* **`skills/`**: Contains custom multi-step workflows and procedures (`SKILL.md`) that the agent can invoke on-demand.
* **`plugins/`**: Contains plugin bundles.
* **`hooks.json`**: Lifecycle hooks for agent events.

## Discoverability
Antigravity automatically discovers customizations by traversing upwards from the current working directory to the repository root. Any valid rules placed in `.agents/rules/` will be actively enforced.
