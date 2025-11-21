#!/usr/bin/env node
/**
 * Standalone Validation Script for Image Restoration OpenSpec Proposal
 * 
 * This script validates the structure, completeness, and consistency
 * of the OpenSpec proposal documentation without requiring test framework dependencies.
 * 
 * Usage: node validate-standalone.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

class ValidationRunner {
  constructor(basePath) {
    this.basePath = basePath;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  readFile(filename) {
    const filepath = path.join(this.basePath, filename);
    if (!fs.existsSync(filepath)) {
      throw new Error(`File not found: ${filename}`);
    }
    return fs.readFileSync(filepath, 'utf-8');
  }

  fileExists(filename) {
    const filepath = path.join(this.basePath, filename);
    return fs.existsSync(filepath);
  }

  async runTests() {
    console.log(`${colors.blue}Running validation tests...${colors.reset}\n`);

    for (const test of this.tests) {
      try {
        await test.fn();
        this.passed++;
        console.log(`${colors.green}✓${colors.reset} ${colors.gray}${test.name}${colors.reset}`);
      } catch (error) {
        this.failed++;
        this.errors.push({ test: test.name, error: error.message });
        console.log(`${colors.red}✗${colors.reset} ${test.name}`);
        console.log(`  ${colors.red}${error.message}${colors.reset}`);
      }
    }

    console.log(`\n${colors.blue}Test Results:${colors.reset}`);
    console.log(`  ${colors.green}Passed: ${this.passed}${colors.reset}`);
    console.log(`  ${colors.red}Failed: ${this.failed}${colors.reset}`);
    console.log(`  Total: ${this.tests.length}`);

    if (this.failed > 0) {
      console.log(`\n${colors.yellow}⚠ Some tests failed. Please review the errors above.${colors.reset}`);
      process.exit(1);
    } else {
      console.log(`\n${colors.green}✓ All validation tests passed!${colors.reset}`);
      process.exit(0);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  assertMatch(content, pattern, message) {
    if (!pattern.test(content)) {
      throw new Error(message || `Expected content to match pattern: ${pattern}`);
    }
  }

  assertContains(content, substring, message) {
    if (!content.includes(substring)) {
      throw new Error(message || `Expected content to contain: ${substring}`);
    }
  }

  assertCount(items, expectedCount, message) {
    if (items !== expectedCount) {
      throw new Error(message || `Expected ${expectedCount} items, but found ${items}`);
    }
  }
}

// Main test execution
const basePath = path.join(__dirname, '..');
const runner = new ValidationRunner(basePath);

// File Structure Tests
runner.test('All required files exist', () => {
  const requiredFiles = [
    'README.md',
    'SUMMARY.md',
    'proposal.md',
    'design.md',
    'tasks.md',
    'specs/database/spec.md',
    'specs/image-storage/spec.md',
    'specs/image-restoration/spec.md',
    'specs/frontend-components/spec.md'
  ];

  requiredFiles.forEach(file => {
    runner.assert(runner.fileExists(file), `Required file missing: ${file}`);
  });
});

// README.md Tests
runner.test('README contains status indicator', () => {
  const content = runner.readFile('README.md');
  runner.assertMatch(content, /Status.*Pending Review/i, 'README should contain status indicator');
});

runner.test('README contains change ID', () => {
  const content = runner.readFile('README.md');
  runner.assertMatch(content, /Change ID.*image-restoration/i, 'README should contain change ID');
});

runner.test('README has Quick Start section', () => {
  const content = runner.readFile('README.md');
  runner.assertMatch(content, /## Quick Start/, 'README should have Quick Start section');
});

runner.test('README links to all required documents', () => {
  const content = runner.readFile('README.md');
  runner.assertContains(content, 'SUMMARY.md');
  runner.assertContains(content, 'proposal.md');
  runner.assertContains(content, 'design.md');
  runner.assertContains(content, 'tasks.md');
  runner.assertContains(content, 'specs/');
});

runner.test('README includes success criteria', () => {
  const content = runner.readFile('README.md');
  runner.assertMatch(content, /## Success Criteria/, 'README should have success criteria section');
});

runner.test('README includes approval checklist', () => {
  const content = runner.readFile('README.md');
  runner.assertMatch(content, /## Approval Checklist/, 'README should have approval checklist');
});

// SUMMARY.md Tests
runner.test('SUMMARY has overview section', () => {
  const content = runner.readFile('SUMMARY.md');
  runner.assertMatch(content, /## .*Overview/i, 'SUMMARY should have overview section');
});

runner.test('SUMMARY lists objectives', () => {
  const content = runner.readFile('SUMMARY.md');
  runner.assertMatch(content, /## .*Objectives/i, 'SUMMARY should list objectives');
});

runner.test('SUMMARY includes statistics', () => {
  const content = runner.readFile('SUMMARY.md');
  runner.assertMatch(content, /12 Requirements/, 'SUMMARY should mention 12 requirements');
  runner.assertMatch(content, /35 Scenarios/, 'SUMMARY should mention 35 scenarios');
  runner.assertMatch(content, /50.*Tasks/, 'SUMMARY should mention 50 tasks');
});

// proposal.md Tests
runner.test('proposal has Summary section', () => {
  const content = runner.readFile('proposal.md');
  runner.assertMatch(content, /## Summary/, 'proposal should have Summary section');
});

runner.test('proposal has Why section', () => {
  const content = runner.readFile('proposal.md');
  runner.assertMatch(content, /## Why/, 'proposal should explain Why');
});

runner.test('proposal has What Changes section', () => {
  const content = runner.readFile('proposal.md');
  runner.assertMatch(content, /## What Changes/, 'proposal should describe What Changes');
});

runner.test('proposal has Impact section', () => {
  const content = runner.readFile('proposal.md');
  runner.assertMatch(content, /## Impact/, 'proposal should have Impact section');
});

runner.test('proposal has Risks section', () => {
  const content = runner.readFile('proposal.md');
  runner.assertMatch(content, /## Risks/, 'proposal should document Risks');
});

// design.md Tests
runner.test('design has Context section', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Context/, 'design should have Context section');
});

runner.test('design has Goals / Non-Goals section', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Goals.*Non-Goals/, 'design should have Goals/Non-Goals');
});

runner.test('design has Decisions section', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Decisions/, 'design should document Decisions');
});

runner.test('design documents 4 key decisions', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /Decision 1/, 'design should have Decision 1');
  runner.assertMatch(content, /Decision 2/, 'design should have Decision 2');
  runner.assertMatch(content, /Decision 3/, 'design should have Decision 3');
  runner.assertMatch(content, /Decision 4/, 'design should have Decision 4');
});

runner.test('design includes security considerations', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Security Considerations/, 'design should have security section');
});

runner.test('design includes performance considerations', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Performance Considerations/, 'design should have performance section');
});

runner.test('design has migration plan', () => {
  const content = runner.readFile('design.md');
  runner.assertMatch(content, /## Migration Plan/, 'design should have migration plan');
});

// tasks.md Tests
runner.test('tasks has 7 main phases', () => {
  const content = runner.readFile('tasks.md');
  const phases = content.match(/## \d+\./g);
  runner.assert(phases && phases.length === 7, `Expected 7 phases, found ${phases ? phases.length : 0}`);
});

runner.test('tasks are numbered correctly', () => {
  const content = runner.readFile('tasks.md');
  const tasks = content.match(/- \[ \] \d+\.\d+/g);
  runner.assert(tasks && tasks.length >= 50, `Expected at least 50 tasks, found ${tasks ? tasks.length : 0}`);
});

runner.test('tasks have validation comments', () => {
  const content = runner.readFile('tasks.md');
  const lines = content.split('\n');
  const taskLines = lines.filter(line => line.trim().startsWith('- [ ]'));
  
  taskLines.forEach((line, index) => {
    runner.assert(line.includes('<!-- validation:'), `Task at line ${index} missing validation comment`);
  });
});

runner.test('tasks have dependencies section', () => {
  const content = runner.readFile('tasks.md');
  runner.assertMatch(content, /## Dependencies/, 'tasks should have Dependencies section');
});

// Database Spec Tests
runner.test('database spec has ADDED Requirements', () => {
  const content = runner.readFile('specs/database/spec.md');
  runner.assertMatch(content, /## ADDED Requirements/, 'database spec should have ADDED Requirements section');
});

runner.test('database spec defines images table', () => {
  const content = runner.readFile('specs/database/spec.md');
  runner.assertMatch(content, /### Requirement.*Images Table Schema/, 'database spec should define images table');
});

runner.test('database spec has at least 3 scenarios', () => {
  const content = runner.readFile('specs/database/spec.md');
  const scenarios = content.match(/#### Scenario:/g);
  runner.assert(scenarios && scenarios.length >= 3, `Expected at least 3 scenarios, found ${scenarios ? scenarios.length : 0}`);
});

runner.test('database spec uses WHEN/THEN format', () => {
  const content = runner.readFile('specs/database/spec.md');
  runner.assertMatch(content, /- \*\*WHEN\*\*/, 'database spec should use WHEN/THEN format');
  runner.assertMatch(content, /- \*\*THEN\*\*/, 'database spec should use WHEN/THEN format');
});

// Image Storage Spec Tests
runner.test('image-storage spec has ADDED Requirements', () => {
  const content = runner.readFile('specs/image-storage/spec.md');
  runner.assertMatch(content, /## ADDED Requirements/, 'image-storage spec should have ADDED Requirements');
});

runner.test('image-storage spec has at least 3 requirements', () => {
  const content = runner.readFile('specs/image-storage/spec.md');
  const requirements = content.match(/### Requirement:/g);
  runner.assert(requirements && requirements.length >= 3, `Expected at least 3 requirements, found ${requirements ? requirements.length : 0}`);
});

runner.test('image-storage spec has at least 7 scenarios', () => {
  const content = runner.readFile('specs/image-storage/spec.md');
  const scenarios = content.match(/#### Scenario:/g);
  runner.assert(scenarios && scenarios.length >= 7, `Expected at least 7 scenarios, found ${scenarios ? scenarios.length : 0}`);
});

// Image Restoration Spec Tests
runner.test('image-restoration spec has ADDED Requirements', () => {
  const content = runner.readFile('specs/image-restoration/spec.md');
  runner.assertMatch(content, /## ADDED Requirements/, 'image-restoration spec should have ADDED Requirements');
});

runner.test('image-restoration spec has at least 4 requirements', () => {
  const content = runner.readFile('specs/image-restoration/spec.md');
  const requirements = content.match(/### Requirement:/g);
  runner.assert(requirements && requirements.length >= 4, `Expected at least 4 requirements, found ${requirements ? requirements.length : 0}`);
});

runner.test('image-restoration spec has at least 9 scenarios', () => {
  const content = runner.readFile('specs/image-restoration/spec.md');
  const scenarios = content.match(/#### Scenario:/g);
  runner.assert(scenarios && scenarios.length >= 9, `Expected at least 9 scenarios, found ${scenarios ? scenarios.length : 0}`);
});

runner.test('image-restoration spec mentions Gemini model', () => {
  const content = runner.readFile('specs/image-restoration/spec.md');
  runner.assertMatch(content, /gemini-3.0-pro-image-preview/i, 'image-restoration spec should mention Gemini model');
});

// Frontend Components Spec Tests
runner.test('frontend-components spec has ADDED Requirements', () => {
  const content = runner.readFile('specs/frontend-components/spec.md');
  runner.assertMatch(content, /## ADDED Requirements/, 'frontend-components spec should have ADDED Requirements');
});

runner.test('frontend-components spec has at least 4 requirements', () => {
  const content = runner.readFile('specs/frontend-components/spec.md');
  const requirements = content.match(/### Requirement:/g);
  runner.assert(requirements && requirements.length >= 4, `Expected at least 4 requirements, found ${requirements ? requirements.length : 0}`);
});

runner.test('frontend-components spec has at least 16 scenarios', () => {
  const content = runner.readFile('specs/frontend-components/spec.md');
  const scenarios = content.match(/#### Scenario:/g);
  runner.assert(scenarios && scenarios.length >= 16, `Expected at least 16 scenarios, found ${scenarios ? scenarios.length : 0}`);
});

runner.test('frontend-components spec mentions react-dropzone', () => {
  const content = runner.readFile('specs/frontend-components/spec.md');
  runner.assertMatch(content, /react-dropzone/i, 'frontend-components spec should mention react-dropzone');
});

// Cross-Document Consistency Tests
runner.test('requirement counts match across documents', () => {
  const readme = runner.readFile('README.md');
  const summary = runner.readFile('SUMMARY.md');
  
  runner.assertMatch(summary, /12 Requirements/, 'SUMMARY should mention 12 Requirements');
  runner.assertMatch(readme, /TOTAL.*\*\*12\*\*/, 'README table should show **12** in TOTAL row');
});

runner.test('scenario counts match across documents', () => {
  const readme = runner.readFile('README.md');
  const summary = runner.readFile('SUMMARY.md');
  
  runner.assertMatch(summary, /35 Scenarios/, 'SUMMARY should mention 35 Scenarios');
  runner.assertMatch(readme, /TOTAL.*\*\*35\*\*/, 'README table should show **35** in TOTAL row');
});

runner.test('README references specs directory', () => {
  const readme = runner.readFile('README.md');
  
});

// Markdown Quality Tests
runner.test('code blocks are properly closed in README', () => {
  const content = runner.readFile('README.md');
  const codeBlockStarts = (content.match(/```/g) || []).length;
  runner.assert(codeBlockStarts % 2 === 0, 'Code blocks should be properly closed (even number of ```)');
});

runner.test('code blocks are properly closed in design.md', () => {
  const content = runner.readFile('design.md');
  const codeBlockStarts = (content.match(/```/g) || []).length;
  runner.assert(codeBlockStarts % 2 === 0, 'Code blocks should be properly closed (even number of ```)');
});

// Run all tests
runner.runTests().catch(error => {
  console.error(`${colors.red}Validation script error:${colors.reset}`, error);
  process.exit(1);
});