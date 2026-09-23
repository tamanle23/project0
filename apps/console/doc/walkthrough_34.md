# Sandbox Login Bypass Fix Walkthrough

## Changes Made
- Modified `handleSandboxBypass` inside `apps/console/src/features/auth/sign-in/components/user-auth-form.tsx`.
- Changed the payload from `username` to `userName` to match the backend expectation and standard login flow.
- Changed the token access paths from `response.data.accessToken` to `response.data.body.accessToken` (and similarly for the refresh token) to match the standard API response structure.

## What Was Tested
- The bypass function now sends the correct payload structure and reads the nested object in the response to save tokens properly without throwing undefined errors.

## Validation Results
- Code committed securely. The user bypass feature will now correctly set the tokens in the zustand auth store and navigate to the home route.
