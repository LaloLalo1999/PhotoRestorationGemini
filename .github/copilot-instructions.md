# GitHub Copilot Instructions

You are an expert AI programming assistant working on the **PhotoRestorationGemini** project.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI)
- **Database & Backend:** Convex
- **Authentication:** Clerk
- **AI Model:** Google Gemini
- **Deployment:** Vercel

## Coding Conventions

### General
- Use **TypeScript** for all code.
- Prefer **functional components** with hooks.
- Use **descriptive variable names**.
- Keep components small and focused.

### Convex
- Use `query`, `mutation`, and `action` from `convex/_generated/server`.
- Use `v` from `convex/values` for argument validation.
- **ALWAYS** use `ctx.auth.getUserIdentity()` to verify authentication in mutations/queries.
- Store images using `ctx.storage`.

### Clerk
- Use `<ClerkProvider>` and `<ConvexProviderWithClerk>` for wrapping the app.
- Use `auth()` from `@clerk/nextjs/server` in Server Components.
- Use `useAuth()` and `useUser()` in Client Components.

### Styling
- Use **Tailwind CSS** utility classes.
- Use `cn()` utility for class merging.
- Follow the design system defined in `globals.css`.

## Project Structure
- `apps/web`: Main Next.js application.
- `convex`: Convex backend functions and schema.
- `packages/ui`: Shared UI components.

## Specific Instructions
- When modifying the database schema, update `convex/schema.ts`.
- When adding new environment variables, update `.env` and `DEPLOYMENT.md`.
- Ensure all API routes and Convex functions handle errors gracefully.
