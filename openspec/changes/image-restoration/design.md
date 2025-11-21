# Design: Image Restoration Engine & UI

## Context

The PhotoRestorationGemini application uses:
- **Backend**: Convex for database and serverless functions
- **Frontend**: Next.js 15 with App Router and TypeScript
- **Authentication**: Clerk (integrated with Convex)
- **AI**: Google Gemini 3 Pro Image Preview (Nano Banana Pro)
- **Styling**: Tailwind CSS with Shadcn UI components

The application currently has a prototype API route for restoration but needs a production-ready implementation with persistence and history tracking.

## Goals / Non-Goals

### Goals
- Implement complete image restoration workflow with database persistence
- Provide secure file upload to Convex Storage
- Enable users to view their restoration history
- Maintain authentication and authorization throughout the flow
- Support the Gemini 3 Pro Image Preview model for professional-quality restoration

### Non-Goals
- Batch processing (future enhancement)
- Image editing/manipulation beyond restoration
- Real-time collaboration features
- Mobile app implementation
- Payment/subscription management (covered by separate billing system)

## Decisions

### Decision 1: Convex Action for AI Restoration

**Choice**: Use a Convex action instead of the existing Next.js API route for Gemini integration.

**Rationale**:
- **Consistency**: Keeps all backend logic in Convex
- **Auth Integration**: Seamless access to `ctx.auth.getUserIdentity()`
- **Data Flow**: Direct access to Convex storage and database
- **Simplicity**: Single backend system reduces complexity
- **Type Safety**: Full TypeScript integration across frontend and backend

**Alternatives Considered**:
1. **Keep Next.js API Route**: 
   - Pro: Already implemented, familiar pattern
   - Con: Requires separate auth checking, less integration with Convex
2. **Hybrid Approach**: 
   - Pro: Flexibility to use either
   - Con: Increased complexity, maintenance burden

**Migration**: The existing `/api/restore/route.ts` can be deprecated or kept as a fallback. The new Convex action will be the primary implementation.

### Decision 2: Database Schema Design

**Schema Structure**:
```typescript
images: {
  userId: v.string(),        // Clerk user ID (indexed)
  storageId: v.id("_storage"), // Convex storage reference
  originalUrl: v.string(),   // URL to original image
  restoredUrl: v.optional(v.string()), // URL to restored image
  prompt: v.string(),        // AI prompt used
  status: v.union(           // Processing status
    v.literal("pending"),
    v.literal("processing"),
    v.literal("completed"),
    v.literal("failed")
  ),
  error: v.optional(v.string()), // Error message if failed
  createdAt: v.number(),     // Timestamp
  completedAt: v.optional(v.number()), // Completion timestamp
}
```

**Index**: `by_userId` on `userId` field for efficient user queries.

**Rationale**:
- `storageId`: Direct reference to Convex storage for retrieval
- `originalUrl` and `restoredUrl`: Generated URLs for frontend display
- `status`: Enables tracking of async processing
- Timestamps: Support for analytics and sorting

### Decision 3: File Upload Flow

**Flow**:
1. Frontend calls `generateUploadUrl` mutation
2. Upload file directly to Convex Storage via returned URL
3. Frontend calls `save` mutation with `storageId` and metadata
4. Frontend triggers restoration via action
5. Action updates image record with results

**Rationale**:
- **Security**: Pre-signed URLs prevent unauthorized uploads
- **Performance**: Direct upload to storage bypasses application server
- **Standard Pattern**: Follows Convex best practices

### Decision 4: Component Architecture

**Components**:
- `Upload`: Reusable drag-and-drop component
- `Gallery`: Grid-based image history view
- Dashboard page: Orchestrates Upload and Gallery

**Design Pattern**: Composition over monolithic dashboard component.

**Rationale**:
- **Reusability**: Components can be used in other contexts
- **Testability**: Isolated components easier to test
- **Maintainability**: Clear separation of concerns

## Technical Specifications

### Convex Functions

**Mutations**:
- `images.generateUploadUrl()`: Returns pre-signed upload URL
- `images.save(args)`: Saves image metadata after upload
- `images.updateStatus(args)`: Updates processing status

**Queries**:
- `images.list()`: Returns user's image history (paginated)
- `images.get(id)`: Returns single image details

**Actions**:
- `images.restore(args)`: Calls Gemini API and updates image record

### Frontend Components

**Upload Component**:
- Uses `react-dropzone` for drag-and-drop
- Displays upload progress
- Triggers restoration automatically or on button click

**Gallery Component**:
- Grid layout with Tailwind CSS
- Shows thumbnail, status, and timestamps
- Click to view full size
- Download button for completed restorations

## Data Flow

```
1. User drops file → Upload component
2. Component calls generateUploadUrl mutation
3. Component uploads file to Convex Storage
4. Component calls save mutation with storageId
5. Component calls restore action
6. Action:
   - Fetches image from storage
   - Calls Gemini API
   - Uploads restored image to storage
   - Updates database record with results
7. Gallery component reflects updated status via real-time query
```

## Security Considerations

1. **Authentication**: All Convex functions check `ctx.auth.getUserIdentity()`
2. **Authorization**: Users can only access their own images
3. **File Validation**: Check file types and sizes before upload
4. **API Key**: Gemini API key stored in environment variables, never exposed to client
5. **Storage Access**: Convex storage URLs are time-limited

## Performance Considerations

1. **Pagination**: Gallery query should support pagination for large histories
2. **Thumbnail Generation**: Consider generating thumbnails for faster gallery loading (future enhancement)
3. **Caching**: Leverage Convex's built-in caching for queries
4. **Streaming**: Consider streaming for large image uploads (if needed)

## Risks / Trade-offs

### Risk: Gemini API Latency
- **Description**: Restoration can take 10-30 seconds
- **Mitigation**: 
  - Use status tracking to show progress
  - Implement real-time updates via Convex subscriptions
  - Set appropriate timeout limits

### Risk: Storage Costs
- **Description**: Images consume Convex storage quota
- **Mitigation**:
  - Implement retention policy (e.g., delete after 30 days)
  - Compress images before storage
  - Monitor usage and set alerts

### Risk: Concurrent Requests
- **Description**: Multiple simultaneous restoration requests could hit API limits
- **Mitigation**:
  - Implement queue system (future enhancement)
  - Add rate limiting per user
  - Display queue position to users

### Trade-off: API Route vs Convex Action
- **Chosen**: Convex action for consistency
- **Trade-off**: Slightly more complex setup, but better long-term maintainability

## Migration Plan

### Phase 1: Add Database Schema
1. Create `convex/schema.ts` with images table
2. Run `npx convex dev` to apply schema

### Phase 2: Implement Storage Functions
1. Create `convex/images.ts` with mutations and queries
2. Test with Convex dashboard

### Phase 3: Implement Restoration Action
1. Add Gemini integration to Convex action
2. Add environment variable `GEMINI_API_KEY` to Convex dashboard
3. Test restoration flow

### Phase 4: Build Frontend Components
1. Create Upload component
2. Create Gallery component
3. Update dashboard page

### Phase 5: Testing & Validation
1. Test upload flow
2. Test restoration with various image types
3. Test error handling
4. Test gallery display

### Rollback Strategy
- Keep existing API route functional during transition
- Feature flag for new vs old implementation
- Database schema is additive (no breaking changes)

## Open Questions

1. **Image Retention**: How long should we keep images in storage? (Recommendation: 30 days, configurable)
2. **Quota Management**: Should we limit the number of restorations per user? (Recommendation: Tie to Clerk billing tiers)
3. **Thumbnail Generation**: Should we generate thumbnails for the gallery? (Recommendation: Yes, but as future enhancement)
4. **Batch Processing**: Support for processing multiple images at once? (Recommendation: Future enhancement)
5. **Export Options**: Should users be able to export their entire history? (Recommendation: Future enhancement)
