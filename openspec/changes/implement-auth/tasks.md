# Implementation Tasks

- [ ] Create `apps/web/convex/auth.config.ts` with Clerk provider configuration <!-- validation: file-exists apps/web/convex/auth.config.ts -->
- [ ] Create `apps/web/app/ConvexClientProvider.tsx` implementing `ConvexProviderWithClerk` <!-- validation: file-exists apps/web/app/ConvexClientProvider.tsx -->
- [ ] Update `apps/web/app/layout.tsx` to wrap children with `ConvexClientProvider` <!-- validation: grep "ConvexClientProvider" apps/web/app/layout.tsx -->
