# OpenSpec Validation Tests

This directory contains comprehensive validation tests for OpenSpec documentation, ensuring high-quality specifications, designs, and task definitions.

## Overview

The test suite validates:
- **Document Structure**: Proper markdown formatting and required sections
- **Content Quality**: Completeness and clarity of specifications
- **Cross-Document Consistency**: Alignment between design, specs, and tasks
- **Requirement Coverage**: Traceability from requirements to implementation tasks
- **Scenario Quality**: Well-structured, testable scenarios
- **Security Documentation**: Proper security consideration coverage

## Test Files

### `user-identity-validation.test.ts`
Main validation suite covering:
- File existence and structure
- Required sections in all documents
- Code snippet validity
- Cross-document consistency
- Security documentation
- Link and reference validation

### `task-spec-alignment.test.ts`
Validates alignment between tasks and specifications:
- Task coverage of all requirements
- Requirement traceability to tasks
- Validation criteria completeness
- Task grouping and organization

### `scenario-coverage.test.ts`
Ensures comprehensive scenario coverage:
- Happy path scenarios
- Error and edge case scenarios
- WHEN-THEN-AND structure consistency
- Testability of scenarios
- Domain coverage completeness

### `design-quality.test.ts`
Validates design document quality:
- Decision documentation completeness
- Rationale and alternatives for each decision
- API and data model documentation
- Security considerations
- Migration and rollback plans

### `lint-markdown.ts`
Markdown linting utility checking for:
- Trailing whitespace
- Heading hierarchy
- Broken references
- Consistent formatting

## Running Tests

```bash
# Run all tests
cd openspec/tests
bun test

# Run specific test file
bun test user-identity-validation.test.ts

# Watch mode for development
bun test --watch

# Lint markdown files
bun run lint:md
```

## Test Structure

Each test follows this pattern:

```typescript
describe('Category', () => {
  let content: string;

  beforeAll(() => {
    content = readFileSync('path/to/file.md', 'utf-8');
  });

  it('should validate specific aspect', () => {
    expect(content).toContain('expected content');
  });
});
```

## Validation Philosophy

1. **Bias for Action**: Tests assume documentation should be comprehensive
2. **Specificity**: Tests verify concrete, specific content, not vague statements
3. **Traceability**: Tests ensure requirements trace to implementation tasks
4. **Testability**: Tests validate that scenarios are actually testable
5. **Security First**: Tests ensure security considerations are documented

## Adding New Tests

When adding a new OpenSpec change:

1. Create a new test file following the naming convention: `{change-name}-validation.test.ts`
2. Copy the structure from existing tests
3. Customize sections based on your change's requirements
4. Ensure all document types are covered (design, proposal, spec, tasks)
5. Add cross-document consistency checks

## Continuous Integration

These tests can be integrated into CI/CD pipelines to ensure specification quality before implementation:

```yaml
# Example GitHub Actions workflow
- name: Validate OpenSpec Documentation
  run: |
    cd openspec/tests
    bun install
    bun test
```

## Coverage Goals

- **Structural**: 100% - All required sections present
- **Consistency**: 100% - Cross-document alignment verified
- **Quality**: 90%+ - Comprehensive content checks
- **Traceability**: 100% - All requirements trace to tasks

## Contributing

When adding new validation tests:
- Make assertions specific and meaningful
- Include both positive and negative test cases
- Document why each test matters
- Keep tests maintainable and readable