# Sorting and Layout Adjustments

## Changes Made
- **Sorting Logic**: Implemented a multi-level sort to the `index.tsx` storage list. The order enforced is:
  1. System Internal
  2. User Provided (Live)
  3. User Provided (Draft)
  4. Alphabetical by Provider Name (ascending/descending based on the UI sort control).
- **Badge Repositioning**: Moved the `Draft` / `Live` status badge out of the provider name tags area. Positioned it to the left of the "Manage" and "Assignments" buttons in the top section of the card, using an uppercase style with specular highlights.

## Verification
- Verified that adding a new Draft card pins it at the end of the list.
- Verified that Draft cards transition upward into the "Live" section when they undergo a successful connection test.
- Verified that the badge renders nicely and does not collide with the action buttons on small screens.
