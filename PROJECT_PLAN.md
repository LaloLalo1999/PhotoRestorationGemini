# Project Implementation Plan

This document outlines the detailed plan to integrate Convex, Clerk, and Vercel into the PhotoRestorationGemini project.

## 1. Dashboard Configuration

### Clerk Dashboard

1. **Create Application:** If not already created, create a new application in Clerk.
2. **JWT Template:**
    * Go to **Configure** > **JWT Templates**.
    * Click **New Template** and select **Convex**.
    * Name it `convex` (default).
    * Copy the **Issuer URL** (e.g., `https://your-app.clerk.accounts.dev`). You will need this for `convex/auth.config.ts`.
    * Save the template.
3. **API Keys:**
    * Go to **Configure** > **API Keys**.
    * Copy the **Publishable Key** and **Secret Key**.

### Convex Dashboard

1. **Create Project:** Run `bunx convex dev` locally in `apps/web` to initialize the project. This will automatically create a project in the Convex dashboard.
2. **Environment Variables:**
    * Go to **Settings** > **Environment Variables**.
    * Add `CLERK_ISSUER_URL` with the value from the Clerk JWT Template.
    * (Optional) Add `CLERK_WEBHOOK_SECRET` if you are using webhooks.

### Vercel Dashboard

1. **Import Project:** Import the repository from GitHub.
2. **Project Settings:**
    * **Framework Preset:** `Next.js`.
    * **Root Directory:** Click **Edit** and select `apps/web`.
3. **Build Settings:**
    * **Build Command:** `bunx convex deploy --cmd 'bun run build'` (This ensures Convex functions are deployed during the build).
    * **Install Command:** `bun install`.
    * **Output Directory:** `.next` (Default).
4. **Environment Variables:**
    * `NEXT_PUBLIC_CONVEX_URL`: (Get this from your local `.env.local` after running `bunx convex dev` or from Convex Dashboard).
    * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Clerk.
    * `CLERK_SECRET_KEY`: From Clerk.
    * `CONVEX_DEPLOYMENT`: (Automatically set if you link Vercel to Convex, otherwise get it from Convex Dashboard).

### Cloudflare Dashboard

1. **DNS Records:**
    * Add a **CNAME** record for `www` pointing to `cname.vercel-dns.com`.
    * Add an **A** record for `@` (root) pointing to `76.76.21.21` (Vercel's IP).
2. **SSL/TLS:** Ensure SSL is set to **Full** or **Full (Strict)**.

## 2. Implementation Steps

### Phase 1: Setup & Initialization

* [ ] **Install Dependencies:**

    ```bash
    bun install
    ```

* [ ] **Initialize Convex:**

    ```bash
    cd apps/web && bunx convex dev
    ```

    (This creates the `apps/web/convex/` folder and `.env.local`).

### Phase 2: Authentication (Convex + Clerk)

* [ ] **Configure Convex Auth:**
  * Create `apps/web/convex/auth.config.ts`:

    ```typescript
    export default {
      providers: [
        {
          domain: process.env.CLERK_ISSUER_URL,
          applicationID: "convex",
        },
      ],
    };
    ```

* [ ] **Update Next.js Providers:**
  * Create `apps/web/app/ConvexClientProvider.tsx`.
  * Wrap the app in `ConvexClientProvider` in `apps/web/app/layout.tsx`.

### Phase 3: Database & Storage

* [ ] **Define Schema (`apps/web/convex/schema.ts`):**
  * `users` table (clerkId, email, credits, etc.).
  * `images` table (storageId, userId, prompt, status, etc.).
* [ ] **Create Functions:**
  * `apps/web/convex/users.ts`: `store` mutation to sync user from Clerk webhook.
  * `apps/web/convex/images.ts`: `generateUploadUrl`, `save`, `list` mutations.
  * `apps/web/convex/http.ts`: Webhook handler for Clerk events (user.created, etc.).

### Phase 4: Frontend Integration

* [ ] **Upload Component:** Implement file upload using `useMutation(api.images.generateUploadUrl)`.
* [ ] **Gallery Component:** Display images using `useQuery(api.images.list)`.
* [ ] **Authentication UI:** Ensure `<SignInButton />`, `<UserButton />` are working.

### Phase 5: Deployment

* [ ] **Push to GitHub:** Trigger Vercel build.
* [ ] **Verify:** Check logs in Vercel and Convex.

## 3. Environment Variables (`.env`) reference

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex
CONVEX_DEPLOYMENT=...
NEXT_PUBLIC_CONVEX_URL=...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```
