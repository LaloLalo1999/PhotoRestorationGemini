# Implementation Tasks

## 1. Database Schema
- [ ] 1.1 Create `apps/web/convex/schema.ts` with users table definition <!-- validation: file-exists apps/web/convex/schema.ts -->
- [ ] 1.2 Add index on clerkId field <!-- validation: grep "by_clerk_id" apps/web/convex/schema.ts -->
- [ ] 1.3 Define fields: clerkId, email, credits, tier <!-- validation: grep -E "clerkId.*email.*credits.*tier" apps/web/convex/schema.ts -->

## 2. User Mutations and Queries
- [ ] 2.1 Create `apps/web/convex/users.ts` <!-- validation: file-exists apps/web/convex/users.ts -->
- [ ] 2.2 Implement `store` as internalMutation with upsert logic <!-- validation: grep "internalMutation" apps/web/convex/users.ts -->
- [ ] 2.3 Implement `current` query to get authenticated user <!-- validation: grep "export const current = query" apps/web/convex/users.ts -->
- [ ] 2.4 Add authentication checks using ctx.auth.getUserIdentity() <!-- validation: grep "getUserIdentity" apps/web/convex/users.ts -->

## 3. Clerk Webhook Handler
- [ ] 3.1 Create `apps/web/convex/http.ts` for HTTP routes <!-- validation: file-exists apps/web/convex/http.ts -->
- [ ] 3.2 Import Svix for webhook verification <!-- validation: grep "from \"svix\"" apps/web/convex/http.ts -->
- [ ] 3.3 Implement POST handler for Clerk webhooks <!-- validation: grep "httpRouter" apps/web/convex/http.ts -->
- [ ] 3.4 Add signature verification using CLERK_WEBHOOK_SECRET <!-- validation: grep "CLERK_WEBHOOK_SECRET" apps/web/convex/http.ts -->
- [ ] 3.5 Handle user.created and user.updated events <!-- validation: grep -E "user\\.created|user\\.updated" apps/web/convex/http.ts -->
- [ ] 3.6 Call users:store internal mutation from webhook <!-- validation: grep "internal.users.store" apps/web/convex/http.ts -->

## 4. Review and Documentation
- [ ] 4.1 Review existing billing webhook at apps/web/app/api/webhooks/billing/route.ts <!-- validation: manual-review -->
- [ ] 4.2 Verify billing webhook follows same security patterns <!-- validation: manual-review -->
- [ ] 4.3 Document environment variable requirements <!-- validation: manual-review -->

## 5. Validation
- [ ] 5.1 Verify schema compiles without errors <!-- validation: cd apps/web && bun run build:skip-convex -->
- [ ] 5.2 Check TypeScript types are correct <!-- validation: cd apps/web && bun run lint -->
- [ ] 5.3 Ensure no breaking changes to existing code <!-- validation: manual-review -->
