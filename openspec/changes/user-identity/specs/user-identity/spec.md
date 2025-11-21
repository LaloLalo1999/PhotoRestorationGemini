# User Identity Specification

## ADDED Requirements

### Requirement: The system SHALL maintain a user database synchronized with Clerk

The application SHALL store user identity information in Convex, synchronized from Clerk via webhooks. This enables tracking user-specific data including credits and subscription tier.

#### Scenario: New user signs up via Clerk

- **WHEN** a user completes sign-up in Clerk
- **THEN** Clerk sends a `user.created` webhook event
- **AND** the Convex webhook handler verifies the signature
- **AND** a new user record is created with clerkId, email, 5 default credits, and "free" tier

#### Scenario: User updates their profile in Clerk

- **WHEN** a user updates their email or profile in Clerk
- **THEN** Clerk sends a `user.updated` webhook event
- **AND** the Convex webhook handler verifies the signature
- **AND** the user record is updated with the new information

#### Scenario: Invalid webhook signature

- **WHEN** a webhook request is received with an invalid signature
- **THEN** the webhook handler rejects the request with a 400 error
- **AND** no database changes are made

### Requirement: The system SHALL provide a query to retrieve the current user's profile

Authenticated users SHALL be able to query their own user profile data including credits and tier information.

#### Scenario: Authenticated user queries their profile

- **WHEN** an authenticated user calls the `users:current` query
- **THEN** the system returns their user document with clerkId, email, credits, and tier
- **AND** the query uses `ctx.auth.getUserIdentity()` to verify authentication

#### Scenario: Unauthenticated user attempts to query profile

- **WHEN** an unauthenticated user calls the `users:current` query
- **THEN** the query returns null or throws an authentication error

### Requirement: The system SHALL use internal mutations for user data modifications

User data modifications SHALL only be performed through internal mutations to prevent unauthorized changes from client code.

#### Scenario: Webhook creates or updates user

- **WHEN** the webhook handler receives a valid Clerk event
- **THEN** it calls the `users:store` internal mutation
- **AND** the mutation performs an upsert operation (creates or updates)
- **AND** default values are applied for new users (5 credits, "free" tier)

#### Scenario: Client attempts to call store mutation directly

- **WHEN** client code attempts to call the `users:store` mutation
- **THEN** the request fails because it is an internal mutation
- **AND** no database changes are made

### Requirement: The system SHALL index users by Clerk ID for efficient lookups

The users table SHALL have an index on the clerkId field to enable fast user lookups based on authentication context.

#### Scenario: Query user by Clerk ID

- **WHEN** a query needs to find a user by their Clerk ID
- **THEN** the system uses the "by_clerk_id" index
- **AND** the lookup completes efficiently even with many users

### Requirement: The system SHALL verify webhook signatures using CLERK_WEBHOOK_SECRET

All webhook requests from Clerk SHALL be verified using the Svix library and the CLERK_WEBHOOK_SECRET environment variable.

#### Scenario: Webhook with valid signature

- **WHEN** a webhook request includes valid Svix headers (svix-id, svix-timestamp, svix-signature)
- **THEN** the handler verifies the signature using the CLERK_WEBHOOK_SECRET
- **AND** the verification succeeds
- **AND** the webhook event is processed

#### Scenario: Missing webhook secret configuration

- **WHEN** the CLERK_WEBHOOK_SECRET environment variable is not configured
- **THEN** the webhook handler returns a 500 error
- **AND** logs an error message indicating missing configuration
