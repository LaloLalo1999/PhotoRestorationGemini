# Implementation Tasks

## 1. Database Schema Setup

- [ ] 1.1 Create `apps/web/convex/schema.ts` with images table definition <!-- validation: file-exists apps/web/convex/schema.ts -->
- [ ] 1.2 Define images table fields: userId, storageId, originalUrl, restoredUrl, prompt, status, error, createdAt, completedAt <!-- validation: grep "images.*defineTable" apps/web/convex/schema.ts -->
- [ ] 1.3 Add by_userId index to images table <!-- validation: grep "by_userId" apps/web/convex/schema.ts -->
- [ ] 1.4 Run `bunx convex dev` to apply schema changes <!-- validation: manual -->

## 2. Image Storage Functions

- [ ] 2.1 Create `apps/web/convex/images.ts` for image management functions <!-- validation: file-exists apps/web/convex/images.ts -->
- [ ] 2.2 Implement `generateUploadUrl` mutation with authentication check <!-- validation: grep "export const generateUploadUrl.*mutation" apps/web/convex/images.ts -->
- [ ] 2.3 Implement `save` mutation to store image metadata after upload <!-- validation: grep "export const save.*mutation" apps/web/convex/images.ts -->
- [ ] 2.4 Implement `list` query to retrieve user's image history <!-- validation: grep "export const list.*query" apps/web/convex/images.ts -->
- [ ] 2.5 Implement `get` query to retrieve single image details <!-- validation: grep "export const get.*query" apps/web/convex/images.ts -->
- [ ] 2.6 Add proper error handling and validation for all functions <!-- validation: manual -->

## 3. AI Restoration Logic

- [ ] 3.1 Install @google/generative-ai in Convex if not already available <!-- validation: grep "@google/generative-ai" apps/web/convex/package.json OR apps/web/package.json -->
- [ ] 3.2 Add GEMINI_API_KEY to Convex environment variables <!-- validation: manual -->
- [ ] 3.3 Create restoration action in `apps/web/convex/images.ts` <!-- validation: grep "export const restore.*action" apps/web/convex/images.ts -->
- [ ] 3.4 Implement image fetch from storage in action <!-- validation: manual -->
- [ ] 3.5 Implement Gemini API integration with professional restoration prompt <!-- validation: grep "gemini-3.0-pro-image-preview" apps/web/convex/images.ts -->
- [ ] 3.6 Implement status updates (processing, completed, failed) <!-- validation: grep "status.*processing" apps/web/convex/images.ts -->
- [ ] 3.7 Store restored image back to Convex storage <!-- validation: manual -->
- [ ] 3.8 Add comprehensive error handling for API failures <!-- validation: manual -->

## 4. Frontend Components

- [ ] 4.1 Create `apps/web/app/components/Upload.tsx` component <!-- validation: file-exists apps/web/app/components/Upload.tsx -->
- [ ] 4.2 Install and configure react-dropzone <!-- validation: grep "react-dropzone" apps/web/package.json -->
- [ ] 4.3 Implement drag-and-drop functionality in Upload component <!-- validation: grep "useDropzone" apps/web/app/components/Upload.tsx -->
- [ ] 4.4 Implement upload flow: generateUploadUrl → upload → save <!-- validation: manual -->
- [ ] 4.5 Add file type and size validation in Upload component <!-- validation: manual -->
- [ ] 4.6 Create `apps/web/app/components/Gallery.tsx` component <!-- validation: file-exists apps/web/app/components/Gallery.tsx -->
- [ ] 4.7 Implement grid layout for image display in Gallery <!-- validation: manual -->
- [ ] 4.8 Add status indicators (pending/processing/completed/failed) to Gallery <!-- validation: manual -->
- [ ] 4.9 Implement click-to-view and download functionality in Gallery <!-- validation: manual -->
- [ ] 4.10 Add empty state handling in Gallery <!-- validation: manual -->
- [ ] 4.11 Ensure real-time updates via Convex subscriptions <!-- validation: manual -->

## 5. Dashboard Integration

- [ ] 5.1 Update `apps/web/app/dashboard/page.tsx` to import Upload and Gallery components <!-- validation: grep "import.*Upload.*from" apps/web/app/dashboard/page.tsx -->
- [ ] 5.2 Replace or enhance existing upload UI with Upload component <!-- validation: manual -->
- [ ] 5.3 Add Gallery component to dashboard layout <!-- validation: grep "Gallery" apps/web/app/dashboard/page.tsx -->
- [ ] 5.4 Wire up restoration trigger from Upload to Convex action <!-- validation: manual -->
- [ ] 5.5 Remove or deprecate old API route call if using Convex action <!-- validation: manual -->
- [ ] 5.6 Test complete flow: upload → save → restore → gallery update <!-- validation: manual -->

## 6. Testing & Validation

- [ ] 6.1 Test upload with various image formats (PNG, JPG, JPEG, WebP) <!-- validation: manual -->
- [ ] 6.2 Test authentication: verify unauthenticated requests are rejected <!-- validation: manual -->
- [ ] 6.3 Test authorization: verify users can only access their own images <!-- validation: manual -->
- [ ] 6.4 Test restoration with low-quality images <!-- validation: manual -->
- [ ] 6.5 Test restoration with damaged/faded images <!-- validation: manual -->
- [ ] 6.6 Test error handling: API failures, network errors, invalid files <!-- validation: manual -->
- [ ] 6.7 Test gallery updates in real-time during restoration <!-- validation: manual -->
- [ ] 6.8 Test download functionality for restored images <!-- validation: manual -->
- [ ] 6.9 Verify storage cleanup (no orphaned files) <!-- validation: manual -->
- [ ] 6.10 Performance test: check latency and response times <!-- validation: manual -->

## 7. Documentation & Cleanup

- [ ] 7.1 Update README.md with image restoration feature documentation <!-- validation: manual -->
- [ ] 7.2 Document Convex schema in code comments <!-- validation: manual -->
- [ ] 7.3 Add JSDoc comments to public functions <!-- validation: manual -->
- [ ] 7.4 Create or update .env.example with GEMINI_API_KEY <!-- validation: grep "GEMINI_API_KEY" apps/web/.env.example -->
- [ ] 7.5 Document architecture decisions in ARCHITECTURE.md or similar <!-- validation: manual -->

## Dependencies

- Tasks 2.x depend on 1.4 (schema must be applied before functions work)
- Tasks 3.x depend on 2.x (restoration needs storage functions)
- Tasks 4.x can be done in parallel with 2.x and 3.x
- Task 5.x depends on 2.x, 3.x, and 4.x being complete
- Task 6.x depends on all implementation tasks
- Task 7.x can be done alongside testing

## Parallelizable Work

- Tasks 1.x and 2.x can be started together
- Tasks 4.1-4.5 (Upload component) can be built in parallel with 4.6-4.11 (Gallery component)
- Documentation tasks can be done incrementally alongside implementation
