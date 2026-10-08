# Palette's Journal - Critical Learnings

## 2025-05-18 - PasswordInput Accessibility & ARIA Attributes
**Learning:** Icon-only toggle buttons inside password input fields must dynamic `aria-label` or `aria-pressed` attributes so screen readers clearly announce state changes (e.g., "Show password" vs "Hide password").
**Action:** Always check toggle buttons embedded within form inputs for proper dynamic `aria-label` and `aria-pressed` accessibility attributes.
