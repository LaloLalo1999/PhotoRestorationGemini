# Implement Authentication with Convex and Clerk

## Summary

This change implements the authentication layer for the PhotoRestorationGemini application. It involves configuring Convex to verify Clerk JWTs and wrapping the Next.js application with `ConvexProviderWithClerk` to manage authentication state.

## Why

To secure the application and enable user-specific data (like photo history and credits), we need a robust authentication system. We have chosen Clerk for identity management and need to integrate it with our Convex backend.

## What

- **Convex Configuration**: Add `auth.config.ts` to define Clerk as the identity provider.
- **Frontend Integration**: Create a `ConvexClientProvider` component that wraps the app with Clerk and Convex providers.
- **Layout Update**: Apply the provider to the root layout.

## Risks

- Misconfiguration of environment variables (`CLERK_ISSUER_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) could lead to authentication failures.
- Incorrect provider nesting might break the app or auth flow.
