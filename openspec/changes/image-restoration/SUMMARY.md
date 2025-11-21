# Image Restoration Proposal - Quick Reference

## 📋 Overview
Complete end-to-end implementation of image restoration workflow with database persistence, AI integration, and user interface components.

## 🎯 Objectives
- Persistent storage of restoration history
- Secure file upload via Convex Storage
- AI restoration using Gemini 3 Pro Image Preview
- User-friendly upload and gallery interface

## 📁 Files in This Proposal
1. **proposal.md** - High-level overview and rationale
2. **design.md** - Technical decisions and architecture
3. **tasks.md** - Implementation checklist (50 tasks)
4. **specs/** - Requirements and scenarios for 4 capabilities

## 🏗️ Architecture Decisions

### ✅ Convex Action (Not Next.js API Route)
- Better auth integration
- Direct database and storage access
- Consistent backend architecture

### 📊 Database Schema
```typescript
images: {
  userId: string (indexed)
  storageId: storage reference
  originalUrl: string
  restoredUrl?: string
  prompt: string
  status: "pending" | "processing" | "completed" | "failed"
  error?: string
  createdAt: number
  completedAt?: number
}
```

### 🔐 Upload Flow
1. Frontend → generateUploadUrl mutation
2. Direct upload to Convex Storage
3. Frontend → save mutation with storageId
4. Frontend → restore action
5. Real-time status updates

## 📦 Capabilities

### 1. Database (1 Requirement, 3 Scenarios)
- Images table schema with proper indexing
- User-specific queries
- Storage reference integrity

### 2. Image Storage (3 Requirements, 7 Scenarios)
- Secure file upload with pre-signed URLs
- Metadata storage after upload
- User image history queries

### 3. Image Restoration (4 Requirements, 9 Scenarios)
- Gemini API integration
- Professional restoration prompts
- Status tracking and error handling
- Convex action implementation

### 4. Frontend Components (4 Requirements, 16 Scenarios)
- Upload component with drag-and-drop
- Gallery component with grid layout
- Dashboard integration
- Real-time status updates

## 🔢 By The Numbers
- **12 Requirements** across 4 capabilities
- **35 Scenarios** covering success, error, and edge cases
- **50 Implementation Tasks** organized in 7 phases
- **4 Key Architectural Decisions** documented

## 🚀 Implementation Phases
1. Database Schema Setup (4 tasks)
2. Image Storage Functions (6 tasks)
3. AI Restoration Logic (8 tasks)
4. Frontend Components (11 tasks)
5. Dashboard Integration (6 tasks)
6. Testing & Validation (10 tasks)
7. Documentation & Cleanup (5 tasks)

## 🔍 Key Features
- ✅ User authentication and authorization
- ✅ Secure file upload
- ✅ AI-powered restoration with Gemini
- ✅ Real-time status updates
- ✅ Restoration history gallery
- ✅ Download restored images
- ✅ Comprehensive error handling

## ⚠️ Risks & Mitigations
- **API Latency**: Status tracking + real-time updates
- **Storage Costs**: Retention policy + compression
- **Rate Limits**: Queue system (future) + user limits
- **API Key Security**: Environment variables only

## 📖 Next Steps
1. Review proposal and design documents
2. Approve architectural decisions
3. Begin implementation starting with Phase 1
4. Run tests after each phase
5. Archive proposal after deployment

## 🔗 Related Documents
- `PROJECT_PLAN.md` - Phase 3 & 4
- `NANO_BANANA_PRO.md` - Gemini model details
- `MODEL_NOTE.md` - Model configuration
- `openspec/AGENTS.md` - OpenSpec conventions
