# Design: User Identity & Webhooks System

## Context

The PhotoRestorationGemini application uses Clerk for authentication and Convex as the backend database. We need to maintain a synchronized user record in Convex that tracks:
- User identity from Clerk
- Credit balance for usage tracking
- Subscription tier (free/pro)

This is Phase 3 of the PROJECT_PLAN.md and builds on the authentication foundation (implement-auth).

## Goals

- Establish user data model in Convex
- Synchronize user creation and updates from Clerk via webhooks
- Provide query interface for retrieving current user data
- Enable future credit tracking and tier-based features

## Non-Goals

- Implementing credit deduction logic (future phase)
- Building subscription management UI (future phase)
- Handling image data storage (separate concurrent change)

## Decisions

### Decision 1: Use Clerk Webhooks for Synchronization

**Choice**: Implement webhook endpoint in Convex HTTP routes to receive Clerk events.

**Rationale**:
- Real-time synchronization when users sign up or update profiles
- Clerk provides webhook infrastructure with signature verification
- Convex HTTP routes can directly call internal mutations
- Avoids polling or manual sync mechanisms

**Alternatives considered**:
- Just-in-time user creation on first API call: Less reliable, could miss user metadata updates
- Client-side sync: Security risk, users could manipulate their data

### Decision 2: Use internalMutation for User Store

**Choice**: Implement `store` as an `internalMutation` rather than a public mutation.

**Rationale**:
- Only webhooks should create/update users, not client code
- Prevents users from modifying their own credit balance or tier
- Maintains data integrity by centralizing user updates

**Alternatives considered**:
- Public mutation with auth checks: More attack surface, unnecessary exposure
- Action instead of mutation: Mutations are transactional and better for database writes

### Decision 3: Default Credits and Tier

**Choice**: New users get 5 free credits and "free" tier by default.

**Rationale**:
- Aligns with PROJECT_PLAN.md Phase 3 requirements
- Provides immediate value to new users
- Enables usage tracking from day one

**Alternatives considered**:
- Zero credits: Poor user experience, requires immediate purchase
- Different default values: 5 credits is reasonable for initial testing

### Decision 4: Index on clerkId

**Choice**: Create index on `clerkId` field in users table.

**Rationale**:
- Primary lookup key for user queries
- Performance optimization for `ctx.auth.getUserIdentity()` flows
- Ensures fast webhook processing

**Alternatives considered**:
- No index: Poor query performance as user base grows
- Compound index: Not needed yet, keep it simple

## Data Model

### Users Table Schema

```typescript
users: defineTable({
  clerkId: v.string(),      // Clerk user ID (indexed)
  email: v.string(),         // User email
  credits: v.number(),       // Available credits (default: 5)
  tier: v.string(),          // "free" or "pro"
})
.index("by_clerk_id", ["clerkId"])
```

## API Design

### Convex Functions

**`users:store`** (internalMutation)
- Input: `{ clerkId, email, credits?, tier? }`
- Behavior: Upsert user record
- Returns: User document ID

**`users:current`** (query)
- Input: None (uses auth context)
- Behavior: Get current authenticated user's profile
- Returns: User document or null

### HTTP Endpoints

**`POST /api/convex/http`** (Convex HTTP route)
- Handles: `user.created`, `user.updated` events from Clerk
- Validates: Svix webhook signature using `CLERK_WEBHOOK_SECRET`
- Calls: `users:store` internal mutation

## Webhook Flow

```
1. User signs up in Clerk
2. Clerk sends webhook to Convex HTTP endpoint
3. Endpoint verifies signature with CLERK_WEBHOOK_SECRET
4. Endpoint extracts user data (clerkId, email)
5. Endpoint calls internal mutation users:store
6. User record created/updated in Convex
7. Endpoint returns 200 OK to Clerk
```

## Security Considerations

1. **Webhook Signature Verification**: Always validate Clerk webhook signatures to prevent unauthorized writes
2. **Internal Mutations**: User store is internal-only to prevent client manipulation
3. **Auth Context**: Use `ctx.auth.getUserIdentity()` to ensure queries return only the authenticated user's data
4. **Environment Variables**: `CLERK_WEBHOOK_SECRET` must be configured in Convex dashboard

## Migration Plan

1. Deploy schema.ts (creates users table)
2. Deploy users.ts (mutations and queries)
3. Deploy http.ts (webhook handler)
4. Configure webhook endpoint in Clerk dashboard
5. Test with new user sign-up

### Rollback

- Remove webhook configuration from Clerk
- No database migrations needed (table remains)
- Can revert code changes independently

## Dependencies

- **Clerk Authentication**: Must be configured (implement-auth change)
- **Environment Variables**: 
  - `CLERK_ISSUER_URL` (for auth)
  - `CLERK_WEBHOOK_SECRET` (for webhooks)
- **Svix Library**: Already installed for billing webhooks

## Open Questions

None - requirements are clear from PROJECT_PLAN.md Phase 3.

## Future Enhancements

- Credit deduction on image restoration
- Pro tier upgrade workflow
- Usage analytics and reporting
- Credit purchase/top-up system
