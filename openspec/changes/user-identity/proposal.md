# Change: User Identity & Webhooks System

## Summary

This change implements the user management system with Clerk synchronization as outlined in Phase 3 of the PROJECT_PLAN.md. It establishes the user database schema, synchronization mechanisms via Clerk webhooks, and credit tracking functionality.

## Why

To track user identities, manage credits, and implement tier-based access control, we need to synchronize Clerk user data with our Convex database. This is a prerequisite for:
- Photo restoration usage tracking
- Credit-based rate limiting
- Tier management (free/pro)
- User-specific photo history

## What Changes

- **Database Schema**: Add `users` table to Convex schema with fields for user identity, credits, and tier management
- **User Mutations**: Create mutations and queries to manage user data in Convex
- **Clerk Webhooks**: Implement HTTP endpoint to receive and process Clerk user events (user.created, user.updated)
- **Billing Webhook**: Verify existing billing webhook is properly structured (already exists, only review needed)

## Impact

- **Affected specs**: `user-identity` (new capability)
- **Affected code**: 
  - `apps/web/convex/schema.ts` (new file)
  - `apps/web/convex/users.ts` (new file)
  - `apps/web/convex/http.ts` (new file)
  - `apps/web/app/api/webhooks/billing/route.ts` (review only)
- **Dependencies**: Requires Clerk authentication to be configured (implement-auth change)
- **Breaking changes**: None (additive only)

## Risks

- Schema changes must be coordinated with future image storage implementation
- Webhook signature verification is critical for security
- Environment variable `CLERK_WEBHOOK_SECRET` must be configured before deployment
