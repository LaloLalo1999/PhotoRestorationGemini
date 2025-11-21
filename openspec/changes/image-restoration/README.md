# Image Restoration Engine & UI - OpenSpec Proposal

> **Status**: 🟡 Pending Review  
> **Created**: November 21, 2025  
> **Change ID**: `image-restoration`

## Quick Start

1. **Read First**: [SUMMARY.md](./SUMMARY.md) for a quick overview
2. **Understand Why**: [proposal.md](./proposal.md) for rationale and impact
3. **Review Architecture**: [design.md](./design.md) for technical decisions
4. **Check Implementation**: [tasks.md](./tasks.md) for the work breakdown
5. **Review Requirements**: [specs/](./specs/) for detailed specifications

## What This Proposal Does

This proposal implements the complete image restoration workflow for PhotoRestorationGemini:

- 🗄️ **Database Schema** for storing image metadata and restoration history
- 📤 **Image Upload** with secure Convex Storage integration
- 🤖 **AI Restoration** using Gemini 3 Pro Image Preview (Nano Banana Pro)
- 🎨 **UI Components** for upload (drag-and-drop) and gallery views
- 📊 **Real-time Updates** for restoration progress tracking

## File Structure

```
image-restoration/
├── README.md                          # This file
├── SUMMARY.md                         # Quick reference guide
├── proposal.md                        # High-level proposal (Why, What, Impact)
├── design.md                          # Architecture and technical decisions
├── tasks.md                           # Implementation checklist (50 tasks)
└── specs/                             # Capability specifications
    ├── database/
    │   └── spec.md                    # Images table schema (1 req, 3 scenarios)
    ├── image-storage/
    │   └── spec.md                    # Upload & storage (3 reqs, 7 scenarios)
    ├── image-restoration/
    │   └── spec.md                    # AI restoration (4 reqs, 9 scenarios)
    └── frontend-components/
        └── spec.md                    # Upload & Gallery (4 reqs, 16 scenarios)
```

## Key Decisions

### 1. Convex Action for AI Integration ✅
**Why**: Better auth integration, direct database/storage access, consistent architecture

**Alternative**: Next.js API route (currently implemented as prototype)

### 2. Pre-signed URLs for Upload ✅
**Why**: Secure, performant, follows Convex best practices

### 3. Status Tracking with Real-time Updates ✅
**Why**: Handle 10-30 second restoration latency, better UX

### 4. Component-based Architecture ✅
**Why**: Reusable Upload and Gallery components, better testability

## Implementation Overview

### Phase 1: Database (4 tasks)
Set up Convex schema with images table, including userId index

### Phase 2: Storage Functions (6 tasks)
Implement mutations for upload URL generation, metadata save, and user queries

### Phase 3: AI Restoration (8 tasks)
Create Convex action with Gemini integration and status tracking

### Phase 4: Frontend (11 tasks)
Build Upload and Gallery components with react-dropzone

### Phase 5: Integration (6 tasks)
Wire up components in dashboard page

### Phase 6: Testing (10 tasks)
Comprehensive testing of upload, restoration, auth, and error handling

### Phase 7: Documentation (5 tasks)
Update README, add code comments, document architecture

## Requirements Summary

| Capability | Requirements | Scenarios | Description |
|------------|--------------|-----------|-------------|
| Database | 1 | 3 | Images table schema with indexing |
| Image Storage | 3 | 7 | Secure upload and metadata management |
| Image Restoration | 4 | 9 | AI restoration with Gemini integration |
| Frontend Components | 4 | 16 | Upload and Gallery UI components |
| **TOTAL** | **12** | **35** | Complete image restoration workflow |

## Dependencies

- ✅ Convex backend (initialized)
- ✅ Clerk authentication (implemented)
- ✅ Next.js 15 with App Router
- ✅ Gemini API access
- ⚠️ `react-dropzone` (to be installed)
- ⚠️ `@google/generative-ai` (may need Convex package)

## Environment Variables Required

```env
# Existing
NEXT_PUBLIC_CONVEX_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# New for Convex
GEMINI_API_KEY=...              # Add to Convex dashboard
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| API Latency (10-30s) | Poor UX | Status tracking + real-time updates |
| Storage Costs | Scaling issues | Retention policy + compression |
| Rate Limits | Service degradation | Queue system + user limits |
| Migration Complexity | Development time | Keep old API route during transition |

## Success Criteria

- [ ] Users can upload images securely
- [ ] Images are stored in Convex Storage
- [ ] Restoration uses Gemini 3 Pro Image Preview
- [ ] Gallery shows restoration history
- [ ] Status updates in real-time
- [ ] Download works for completed restorations
- [ ] Authentication required for all operations
- [ ] Users only see their own images

## Testing Plan

1. **Unit Tests**: Convex functions (mutations, queries, actions)
2. **Integration Tests**: Upload → Restore → Gallery flow
3. **E2E Tests**: Complete user journey
4. **Security Tests**: Auth and authorization checks
5. **Performance Tests**: Latency and response times
6. **Error Tests**: API failures, network issues, invalid files

## Related Issues

- Implements Phase 3 (Database) from `PROJECT_PLAN.md`
- Implements Phase 4 (Frontend) from `PROJECT_PLAN.md`
- Uses Gemini integration as documented in `NANO_BANANA_PRO.md`

## How to Use This Proposal

### For Reviewers
1. Start with `SUMMARY.md` for overview
2. Read `proposal.md` for context and rationale
3. Review `design.md` for technical decisions
4. Check `specs/` for detailed requirements
5. Provide feedback on any concerns

### For Implementers
1. Get proposal approval first
2. Read all documents thoroughly
3. Follow `tasks.md` sequentially
4. Mark tasks complete as you go
5. Test after each phase
6. Update proposal if scope changes

### For Stakeholders
1. Read `SUMMARY.md` for quick overview
2. Review "Key Decisions" section
3. Check "Success Criteria"
4. Approve or request changes

## Questions or Feedback?

- Open an issue referencing this proposal
- Comment on the PR with questions
- Tag relevant stakeholders for review

## Approval Checklist

Before implementation begins:
- [ ] Proposal reviewed by tech lead
- [ ] Architecture decisions approved
- [ ] Resource allocation confirmed
- [ ] Timeline agreed upon
- [ ] Success criteria validated

---

## Validation Tests

This proposal includes comprehensive validation tests to ensure documentation quality and consistency.

### Quick Validation

Run the validation script from the proposal root:

```bash
./validate.sh
```

Or run directly from the tests directory:

```bash
cd tests
node validate-standalone.js
```

### Test Coverage

- **51 validation tests** covering all documents
- Structure validation (file presence, organization)
- Content completeness (required sections, statistics)
- Cross-document consistency (requirement/scenario counts)
- Markdown quality (formatting, code blocks, links)

See [tests/README.md](tests/README.md) for complete documentation.


**Note**: This is an OpenSpec proposal following the conventions defined in `openspec/AGENTS.md`. Do not begin implementation until this proposal is approved.
