# Image Restoration Engine & UI

## Summary

This change implements the end-to-end image restoration workflow for the PhotoRestorationGemini application. It establishes the database schema, backend functions for image management, AI restoration logic, and frontend components for upload and gallery views.

## Why

Phase 3 (Database) and Phase 4 (Frontend) of the project plan require a complete implementation of the image restoration feature. Currently, the application has a basic prototype with an API route for restoration, but lacks:
- Persistent storage of images and restoration history
- Proper integration with Convex backend
- User-specific image management
- Gallery view for browsing past restorations

This change provides the foundation for a production-ready photo restoration service with proper data persistence, user management, and history tracking.

## What Changes

- **Database Schema**: Add `images` table to `convex/schema.ts` with user relationships and restoration metadata
- **Image Storage Functions**: Implement Convex mutations for secure file upload (`generateUploadUrl`, `save`) and query for listing images (`list`)
- **AI Restoration Architecture**: Integrate Gemini API through a Convex action (preferred for backend consistency) with fallback considerations
- **Frontend Components**: Add Upload and Gallery components with drag-and-drop support using `react-dropzone`
- **Dashboard Integration**: Update dashboard page to incorporate new components

## Impact

### Affected Capabilities
- `database` (NEW): Convex schema for images table
- `image-storage` (NEW): File upload and storage management
- `image-restoration` (MODIFIED): Enhanced restoration workflow with persistence
- `frontend-components` (NEW): Reusable Upload and Gallery components

### Affected Code
- `apps/web/convex/schema.ts` (create): Database schema definition
- `apps/web/convex/images.ts` (create): Image management functions
- `apps/web/app/dashboard/page.tsx` (modify): Integrate new components
- `apps/web/app/components/Upload.tsx` (create): Upload component
- `apps/web/app/components/Gallery.tsx` (create): Gallery component
- `apps/web/app/api/restore/route.ts` (modify or deprecate): Move logic to Convex action if appropriate

## Risks

- **API Key Management**: Gemini API key must be properly secured (handled via environment variables)
- **Storage Costs**: Convex storage usage will scale with user adoption; monitoring required
- **Migration Path**: Existing API route may need deprecation strategy if moved to Convex action
- **Rate Limiting**: Gemini API rate limits need consideration for production usage
