# Authentication Specification

## ADDED Requirements

### Requirement: The system MUST authenticate users using Clerk and validate tokens in Convex

The application MUST integrate Clerk for user authentication and ensure that Convex functions can securely identify the calling user. This involves configuring the Convex backend to trust Clerk's JWTs and setting up the frontend to pass these tokens.

#### Scenario: User logs in via Clerk

- Given a user is on the sign-in page
- When they authenticate successfully with Clerk
- Then the application receives a JWT
- And the `ConvexProviderWithClerk` passes this token to Convex
- And Convex validates the token against the configured issuer

#### Scenario: Convex functions access user identity

- Given an authenticated user invokes a Convex mutation
- When the mutation calls `ctx.auth.getUserIdentity()`
- Then it returns the user's Clerk profile information
