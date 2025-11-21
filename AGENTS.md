<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

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
