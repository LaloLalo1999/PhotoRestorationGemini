# AI Agents & Roles

This document defines the roles and responsibilities of AI agents working on the PhotoRestorationGemini project.

## Roles

### 🏗️ Architect

- **Responsibilities:** High-level system design, technology selection, project structure, and integration planning.
- **Focus:** Scalability, security, and maintainability.
- **Current Focus:** Integrating Convex with Clerk and setting up the full stack.

### 🎨 Frontend Developer

- **Responsibilities:** Building the UI/UX using Next.js, Tailwind CSS, and Shadcn UI.
- **Focus:** Responsive design, accessibility, and user experience.
- **Key Libraries:** `framer-motion`, `lucide-react`, `@clerk/nextjs`.

### ⚙️ Backend Developer

- **Responsibilities:** Implementing backend logic using Convex (mutations, queries, actions) and Next.js API routes.
- **Focus:** Data integrity, performance, and security.
- **Key Technologies:** Convex, Clerk Webhooks, Google Gemini API.

### 🧪 QA / Tester

- **Responsibilities:** Writing tests, verifying bug fixes, and ensuring system stability.
- **Focus:** Unit tests (Vitest), integration tests, and end-to-end flows.

## Workflows

### Feature Implementation

1. **Plan:** Architect drafts a plan.
2. **Implement:** Frontend/Backend developers write code.
3. **Review:** Code is reviewed against conventions.
4. **Test:** QA verifies the feature.

### Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Shadcn UI.
- **Backend:** Convex (Database, Storage, Functions), Next.js API Routes.
- **Auth:** Clerk.
- **AI:** Google Gemini.
- **Deployment:** Vercel.
- **DNS:** Cloudflare.
