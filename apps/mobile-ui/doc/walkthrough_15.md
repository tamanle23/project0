# Walkthrough 15 - Streamline Ultimate Light & Duotone Navigation Icons

## Summary
Refined the bottom tab bar icons to strictly implement the **Streamline Ultimate Light** variant for unfocused states and the **Streamline Ultimate Duotone** variant for focused states.

## Changes Made
1. **`src/components/icons/StreamlineColorIcon.tsx`**:
   - **Streamline Ultimate Light (Unfocused)**:
     - Rendered with an ultra-clean, delicate 1.25px stroke weight, rounded line joins, and adaptive neutral color (`themeColors.textSecondary`).
     - Provides an unobtrusive, minimalist aesthetic.
   - **Streamline Ultimate Duotone (Focused)**:
     - Implemented the official Streamline Duotone visual hierarchy:
       - **Secondary Wash**: A soft 20% opacity fill under the volume of each icon (house walls/door, circular disc, user torso/head), creating depth and grounding.
       - **Primary Contour**: Bold 1.8px accent line (`themeColors.tint`) defining the focal contours and silhouettes.
     - Automatically adapts between iOS light and dark mode accent tints.

2. **`src/navigation/RootNavigator.tsx`**:
   - Passed `activeColor={themeColors.tint}` and `inactiveColor={themeColors.textSecondary}`.
   - Set icon size to `32px` to balance stroke clarity and touch targets.

## Verification
- Ran `pnpm tsc --noEmit`: 0 errors.
- Verified visual fidelity of both the 1.25px light outline and the multi-layered duotone active state.
