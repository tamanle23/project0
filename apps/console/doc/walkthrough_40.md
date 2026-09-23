# Animated Blinking Status Dot Implementation

## Changes Made
- **Status Indicator**: Added a round point (dot) icon before the "Live" / "Draft" status label inside the status badge in `index.tsx`.
- **Performance Optimal Animation**: Used CSS-native `animate-pulse` animation on the round dot element (`size-1.5 rounded-full`). This leverages browser compositor thread keyframe rendering without triggering JS re-renders or DOM repaints.
- **Theme & Color Matching**:
  - Live status dot: `bg-emerald-500 dark:bg-emerald-400`
  - Draft status dot: `bg-orange-500 dark:bg-orange-400`

## Verification
- Verified clean JSX layout alignment using `inline-flex items-center gap-1.5`.
- Verified lint checks pass for modified files.
