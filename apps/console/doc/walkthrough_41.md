# Conditional Visibility of Assignments Button

## Changes Made
- **Assignments Button Visibility**: Updated `index.tsx` so that the "Assignments" button is conditionally hidden whenever a Storage Provider is in `'Draft'` status.
- **Activation Flow**: The "Assignments" button only becomes visible once the provider's configuration is completed and tested via the "Manage" dialog, elevating its status to `'Live'`.

## Verification
- Verified that newly created Draft providers only show the "Manage" button.
- Verified that testing connection and transitioning a Draft provider to Live immediately renders the "Assignments" button.
