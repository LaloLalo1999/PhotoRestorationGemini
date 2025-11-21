# Image Restoration OpenSpec Validation Tests

This directory contains comprehensive validation tests for the Image Restoration OpenSpec proposal documentation.

## Test Coverage

The validation suite covers:

### 1. **File Structure** (2 tests)
- Verifies all required files exist
- Checks for unexpected files

### 2. **README.md** (6 tests)
- Status indicator presence
- Change ID validation
- Quick Start section
- Document links
- Success criteria
- Approval checklist

### 3. **SUMMARY.md** (3 tests)
- Overview section
- Objectives listing
- Statistics accuracy (12 requirements, 35 scenarios, 50 tasks)

### 4. **proposal.md** (5 tests)
- Summary section
- Why section (rationale)
- What Changes section
- Impact section
- Risks section

### 5. **design.md** (8 tests)
- Context section
- Goals/Non-Goals
- Decisions documentation
- Security considerations
- Performance considerations
- Migration plan
- 4 key architectural decisions

### 6. **tasks.md** (4 tests)
- 7 main phases
- Task numbering (50+ tasks)
- Validation comments
- Dependencies section

### 7. **Database Spec** (4 tests)
- ADDED Requirements section
- Images table schema definition
- Minimum 3 scenarios
- WHEN/THEN format usage

### 8. **Image Storage Spec** (3 tests)
- ADDED Requirements section
- Minimum 3 requirements
- Minimum 7 scenarios

### 9. **Image Restoration Spec** (4 tests)
- ADDED Requirements section
- Minimum 4 requirements
- Minimum 9 scenarios
- Gemini model references

### 10. **Frontend Components Spec** (4 tests)
- ADDED Requirements section
- Minimum 4 requirements
- Minimum 16 scenarios
- react-dropzone integration

### 11. **Cross-Document Consistency** (3 tests)
- Requirement counts match
- Scenario counts match
- All specs referenced in README

### 12. **Markdown Quality** (2 tests)
- Code blocks properly closed
- Consistent formatting

**Total: 51 Validation Tests**

## Running the Tests

### Option 1: Standalone Script (Recommended, No Dependencies)

```bash
cd openspec/changes/image-restoration/tests
node validate-standalone.js
```

This script runs all validation tests without requiring any npm packages. It provides:
- ✅ Colored terminal output
- ✅ Clear pass/fail indicators
- ✅ Detailed error messages
- ✅ Exit code 0 for success, 1 for failure

### Option 2: Jest Test Suite (Requires Dependencies)

First, install dependencies:

```bash
cd openspec/changes/image-restoration/tests
npm install
```

Then run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Test Output Examples

### Success Output