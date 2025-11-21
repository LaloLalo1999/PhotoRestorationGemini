# Test Manifest: Image Restoration OpenSpec Validation

## Summary

Comprehensive validation test suite for the Image Restoration OpenSpec proposal documentation.

- **Total Tests**: 46 validation tests
- **Test Files**: 2 (standalone + Jest)
- **Documentation Files**: 4
- **Zero Dependencies**: Standalone script uses only Node.js built-ins
- **Execution Time**: < 1 second
- **Exit Status**: 0 (pass) or 1 (fail)

## Files Created

### Test Scripts (2 files)

1. **validate-standalone.js** (404 lines)
   - Executable Node.js script
   - No npm dependencies required
   - Colored console output
   - 46 test cases

2. **validate-spec.test.js** (579 lines)
   - Jest-compatible test suite
   - Same validation logic as standalone
   - Requires `npm install` to run

### Configuration (1 file)

3. **package.json** (22 lines)
   - Jest configuration
   - Test scripts (test, test:watch, test:coverage)
   - DevDependencies: jest@^29.7.0

### Documentation (4 files)

4. **README.md** (121 lines)
   - Complete test documentation
   - Usage instructions
   - Test coverage breakdown
   - Troubleshooting guide

5. **TESTING_SUMMARY.md** (185 lines)
   - Overview of validation approach
   - Test statistics and categories
   - Integration examples
   - Rationale for test design

6. **QUICK_REFERENCE.md** (18 lines)
   - Quick command reference
   - Expected output examples
   - Common fixes

7. **TEST_MANIFEST.md** (this file)
   - Complete file inventory
   - Test breakdown
   - Validation checklist

### Runner Script (1 file)

8. **../validate.sh** (308 bytes)
   - Shell script wrapper
   - Executable from proposal root
   - Calls validate-standalone.js

## Test Breakdown (46 Tests)

### File Structure (2 tests)
- ✅ All required files exist
- ✅ No unexpected files in root

### README.md Validation (6 tests)
- ✅ Contains status indicator
- ✅ Contains change ID
- ✅ Has Quick Start section
- ✅ Links to all required documents
- ✅ Includes success criteria
- ✅ Includes approval checklist

### SUMMARY.md Validation (3 tests)
- ✅ Has overview section
- ✅ Lists objectives
- ✅ Includes statistics (12/35/50)

### proposal.md Validation (5 tests)
- ✅ Has Summary section
- ✅ Has Why section
- ✅ Has What Changes section
- ✅ Has Impact section
- ✅ Has Risks section

### design.md Validation (8 tests)
- ✅ Has Context section
- ✅ Has Goals / Non-Goals section
- ✅ Has Decisions section
- ✅ Documents 4 key decisions
- ✅ Includes security considerations
- ✅ Includes performance considerations
- ✅ Has migration plan
- ✅ Mentions alternatives considered (implicit)

### tasks.md Validation (4 tests)
- ✅ Has 7 main phases
- ✅ Tasks are numbered correctly (50+ tasks)
- ✅ Tasks have validation comments
- ✅ Has dependencies section

### Database Spec Validation (4 tests)
- ✅ Has ADDED Requirements section
- ✅ Defines images table schema
- ✅ Has at least 3 scenarios
- ✅ Uses WHEN/THEN format

### Image Storage Spec Validation (3 tests)
- ✅ Has ADDED Requirements section
- ✅ Has at least 3 requirements
- ✅ Has at least 7 scenarios

### Image Restoration Spec Validation (4 tests)
- ✅ Has ADDED Requirements section
- ✅ Has at least 4 requirements
- ✅ Has at least 9 scenarios
- ✅ Mentions Gemini model

### Frontend Components Spec Validation (4 tests)
- ✅ Has ADDED Requirements section
- ✅ Has at least 4 requirements
- ✅ Has at least 16 scenarios
- ✅ Mentions react-dropzone

### Cross-Document Consistency (3 tests)
- ✅ Requirement counts match (12)
- ✅ Scenario counts match (35)
- ✅ README references specs

### Markdown Quality (2 tests)
- ✅ Code blocks properly closed in README
- ✅ Code blocks properly closed in design.md

## Usage Examples

### Run All Tests
```bash
# From repository root
cd openspec/changes/image-restoration
./validate.sh

# From tests directory
cd openspec/changes/image-restoration/tests
node validate-standalone.js
```

### Run with Jest (requires npm install)
```bash
cd openspec/changes/image-restoration/tests
npm install
npm test
```

### Run in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Validation Checklist

Use this checklist when modifying proposal documents:

- [ ] Run `./validate.sh` after making changes
- [ ] All 46 tests pass
- [ ] No new files added without updating tests
- [ ] Cross-document statistics remain consistent
- [ ] Code blocks are properly closed
- [ ] Task validation comments are present
- [ ] WHEN/THEN format used in all scenarios

## Integration Options

### Pre-commit Hook
```bash
#!/bin/bash
cd openspec/changes/image-restoration/tests
node validate-standalone.js || exit 1
```

### GitHub Actions
```yaml
name: Validate OpenSpec
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Validate Proposal
        run: |
          cd openspec/changes/image-restoration/tests
          node validate-standalone.js
```

### NPM Script (in root package.json)
```json
{
  "scripts": {
    "validate:image-restoration": "node openspec/changes/image-restoration/tests/validate-standalone.js"
  }
}
```

## Test Output Format

### Success (Exit Code 0)