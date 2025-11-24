/**
 * Validation Tests for Image Restoration OpenSpec Proposal
 * 
 * These tests validate the structure, completeness, and consistency
 * of the OpenSpec proposal documentation.
 */

const fs = require('fs');
const path = require('path');

// Test utilities
class SpecValidator {
  constructor(basePath) {
    this.basePath = basePath;
    this.errors = [];
  }

  readFile(filename) {
    const filepath = path.join(this.basePath, filename);
    if (!fs.existsSync(filepath)) {
      throw new Error(`File not found: ${filename}`);
    }
    return fs.readFileSync(filepath, 'utf-8');
  }

  addError(message) {
    this.errors.push(message);
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}

// Test Suite
describe('Image Restoration OpenSpec Proposal Validation', () => {
  let validator;
  const basePath = path.join(__dirname, '..');

  beforeEach(() => {
    validator = new SpecValidator(basePath);
  });

  describe('File Structure', () => {
    test('all required files exist', () => {
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
        const filepath = path.join(basePath, file);
        expect(fs.existsSync(filepath)).toBe(true);
      });
    });

    test('no unexpected files in root', () => {
      const files = fs.readdirSync(basePath);
      const allowedFiles = ['README.md', 'SUMMARY.md', 'proposal.md', 'design.md', 'tasks.md', 'specs', 'tests'];
      
      files.forEach(file => {
        expect(allowedFiles.includes(file)).toBe(true);
      });
    });
  });

  describe('README.md', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('README.md');
    });

    test('contains status indicator', () => {
      expect(content).toMatch(/Status.*Pending Review/i);
    });

    test('contains created date', () => {
      expect(content).toMatch(/Created.*November 21, 2025/i);
    });

    test('contains change ID', () => {
      expect(content).toMatch(/Change ID.*image-restoration/i);
    });

    test('has Quick Start section', () => {
      expect(content).toMatch(/## Quick Start/);
    });

    test('has file structure diagram', () => {
      expect(content).toMatch(/```[\s\S]*image-restoration[\s\S]*```/);
    });

    test('links to all required documents', () => {
      expect(content).toContain('SUMMARY.md');
      expect(content).toContain('proposal.md');
      expect(content).toContain('design.md');
      expect(content).toContain('tasks.md');
      expect(content).toContain('specs/');
    });

    test('includes success criteria', () => {
      expect(content).toMatch(/## Success Criteria/);
      expect(content).toMatch(/\[\s*\]/); // Has checkboxes
    });

    test('includes approval checklist', () => {
      expect(content).toMatch(/## Approval Checklist/);
    });
  });

  describe('SUMMARY.md', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('SUMMARY.md');
    });

    test('has overview section', () => {
      expect(content).toMatch(/## .*Overview/i);
    });

    test('lists objectives', () => {
      expect(content).toMatch(/## .*Objectives/i);
    });

    test('describes architecture decisions', () => {
      expect(content).toMatch(/## .*Architecture/i);
    });

    test('includes statistics (by the numbers)', () => {
      expect(content).toMatch(/## .*By The Numbers/i);
      expect(content).toMatch(/12 Requirements/);
      expect(content).toMatch(/35 Scenarios/);
      expect(content).toMatch(/50.*Tasks/);
    });

    test('lists implementation phases', () => {
      expect(content).toMatch(/## .*Implementation Phases/i);
    });
  });

  describe('proposal.md', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('proposal.md');
    });

    test('has Summary section', () => {
      expect(content).toMatch(/## Summary/);
    });

    test('has Why section explaining rationale', () => {
      expect(content).toMatch(/## Why/);
    });

    test('has What Changes section', () => {
      expect(content).toMatch(/## What Changes/);
    });

    test('has Impact section', () => {
      expect(content).toMatch(/## Impact/);
    });

    test('has Risks section', () => {
      expect(content).toMatch(/## Risks/);
    });

    test('mentions affected capabilities', () => {
      expect(content).toMatch(/database/i);
      expect(content).toMatch(/image-storage/i);
      expect(content).toMatch(/image-restoration/i);
      expect(content).toMatch(/frontend-components/i);
    });
  });

  describe('design.md', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('design.md');
    });

    test('has Context section', () => {
      expect(content).toMatch(/## Context/);
    });

    test('has Goals / Non-Goals section', () => {
      expect(content).toMatch(/## Goals.*Non-Goals/);
    });

    test('has Decisions section', () => {
      expect(content).toMatch(/## Decisions/);
    });

    test('documents key architectural decisions', () => {
      expect(content).toMatch(/Decision 1/);
      expect(content).toMatch(/Decision 2/);
      expect(content).toMatch(/Decision 3/);
      expect(content).toMatch(/Decision 4/);
    });

    test('includes rationale for decisions', () => {
      expect(content).toMatch(/Rationale/);
    });

    test('mentions alternatives considered', () => {
      expect(content).toMatch(/Alternatives Considered/i);
    });

    test('has Technical Specifications section', () => {
      expect(content).toMatch(/## Technical Specifications/);
    });

    test('includes security considerations', () => {
      expect(content).toMatch(/## Security Considerations/);
    });

    test('includes performance considerations', () => {
      expect(content).toMatch(/## Performance Considerations/);
    });

    test('documents risks and trade-offs', () => {
      expect(content).toMatch(/## Risks.*Trade-offs/);
    });

    test('has migration plan', () => {
      expect(content).toMatch(/## Migration Plan/);
    });
  });

  describe('tasks.md', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('tasks.md');
    });

    test('has 7 main phases', () => {
      const phases = content.match(/## \d+\./g);
      expect(phases).not.toBeNull();
      expect(phases.length).toBe(7);
    });

    test('all tasks are numbered correctly', () => {
      const taskPattern = /- \[ \] \d+\.\d+/g;
      const tasks = content.match(taskPattern);
      expect(tasks).not.toBeNull();
      expect(tasks.length).toBeGreaterThanOrEqual(50);
    });

    test('each task has validation comment', () => {
      const lines = content.split('\n');
      const taskLines = lines.filter(line => line.trim().startsWith('- [ ]'));
      
      taskLines.forEach(line => {
        expect(line).toMatch(/<!-- validation:/);
      });
    });

    test('has dependencies section', () => {
      expect(content).toMatch(/## Dependencies/);
    });

    test('has parallelizable work section', () => {
      expect(content).toMatch(/## Parallelizable Work/);
    });

    test('phases are logically ordered', () => {
      expect(content).toMatch(/1\. Database Schema Setup/);
      expect(content).toMatch(/2\. Image Storage Functions/);
      expect(content).toMatch(/3\. AI Restoration Logic/);
      expect(content).toMatch(/4\. Frontend Components/);
      expect(content).toMatch(/5\. Dashboard Integration/);
      expect(content).toMatch(/6\. Testing & Validation/);
      expect(content).toMatch(/7\. Documentation & Cleanup/);
    });
  });

  describe('Database Spec', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('specs/database/spec.md');
    });

    test('has ADDED Requirements section', () => {
      expect(content).toMatch(/## ADDED Requirements/);
    });

    test('defines images table schema requirement', () => {
      expect(content).toMatch(/### Requirement.*Images Table Schema/);
    });

    test('has at least 3 scenarios', () => {
      const scenarios = content.match(/#### Scenario:/g);
      expect(scenarios).not.toBeNull();
      expect(scenarios.length).toBeGreaterThanOrEqual(3);
    });

    test('scenarios follow WHEN/THEN format', () => {
      expect(content).toMatch(/- \*\*WHEN\*\*/);
      expect(content).toMatch(/- \*\*THEN\*\*/);
    });

    test('mentions required fields', () => {
      expect(content).toMatch(/userId/);
      expect(content).toMatch(/storageId/);
      expect(content).toMatch(/status/);
      expect(content).toMatch(/createdAt/);
    });
  });

  describe('Image Storage Spec', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('specs/image-storage/spec.md');
    });

    test('has ADDED Requirements section', () => {
      expect(content).toMatch(/## ADDED Requirements/);
    });

    test('defines at least 3 requirements', () => {
      const requirements = content.match(/### Requirement:/g);
      expect(requirements).not.toBeNull();
      expect(requirements.length).toBeGreaterThanOrEqual(3);
    });

    test('has scenarios for each requirement', () => {
      const scenarios = content.match(/#### Scenario:/g);
      expect(scenarios).not.toBeNull();
      expect(scenarios.length).toBeGreaterThanOrEqual(7);
    });

    test('covers secure file upload', () => {
      expect(content).toMatch(/Secure File Upload/i);
    });

    test('covers metadata storage', () => {
      expect(content).toMatch(/Metadata Storage/i);
    });

    test('covers user image history', () => {
      expect(content).toMatch(/User Image History/i);
    });
  });

  describe('Image Restoration Spec', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('specs/image-restoration/spec.md');
    });

    test('has ADDED Requirements section', () => {
      expect(content).toMatch(/## ADDED Requirements/);
    });

    test('defines at least 4 requirements', () => {
      const requirements = content.match(/### Requirement:/g);
      expect(requirements).not.toBeNull();
      expect(requirements.length).toBeGreaterThanOrEqual(4);
    });

    test('has at least 9 scenarios', () => {
      const scenarios = content.match(/#### Scenario:/g);
      expect(scenarios).not.toBeNull();
      expect(scenarios.length).toBeGreaterThanOrEqual(9);
    });

    test('mentions Gemini model', () => {
      expect(content).toMatch(/Gemini/i);
      expect(content).toMatch(/gemini-3.0-pro-image-preview/i);
    });

    test('covers restoration process', () => {
      expect(content).toMatch(/AI-Powered Image Restoration/i);
    });

    test('covers error handling', () => {
      expect(content).toMatch(/failure/i);
      expect(content).toMatch(/error/i);
    });
  });

  describe('Frontend Components Spec', () => {
    let content;

    beforeAll(() => {
      content = validator.readFile('specs/frontend-components/spec.md');
    });

    test('has ADDED Requirements section', () => {
      expect(content).toMatch(/## ADDED Requirements/);
    });

    test('defines at least 4 requirements', () => {
      const requirements = content.match(/### Requirement:/g);
      expect(requirements).not.toBeNull();
      expect(requirements.length).toBeGreaterThanOrEqual(4);
    });

    test('has at least 16 scenarios', () => {
      const scenarios = content.match(/#### Scenario:/g);
      expect(scenarios).not.toBeNull();
      expect(scenarios.length).toBeGreaterThanOrEqual(16);
    });

    test('covers Upload component', () => {
      expect(content).toMatch(/Upload Component/i);
    });

    test('covers Gallery component', () => {
      expect(content).toMatch(/Gallery Component/i);
    });

    test('covers Dashboard integration', () => {
      expect(content).toMatch(/Dashboard Integration/i);
    });

    test('mentions react-dropzone', () => {
      expect(content).toMatch(/react-dropzone/i);
    });
  });

  describe('Cross-Document Consistency', () => {
    test('requirement counts match across documents', () => {
      const summary = validator.readFile('SUMMARY.md');
      const readme = validator.readFile('README.md');
      
      // Both should mention 12 requirements
      expect(summary).toMatch(/12 Requirements/);
      expect(readme).toMatch(/12.*\|.*Requirements/);
    });

    test('scenario counts match across documents', () => {
      const summary = validator.readFile('SUMMARY.md');
      const readme = validator.readFile('README.md');
      
      // Both should mention 35 scenarios
      expect(summary).toMatch(/35 Scenarios/);
      expect(readme).toMatch(/35.*\|.*Scenarios/);
    });

    test('task counts match across documents', () => {
      const summary = validator.readFile('SUMMARY.md');
      const readme = validator.readFile('README.md');
      const tasks = validator.readFile('tasks.md');
      
      // All should mention 50 tasks
      expect(summary).toMatch(/50.*Tasks/);
      expect(readme).toMatch(/50 tasks/);
    });

    test('change ID is consistent', () => {
      const readme = validator.readFile('README.md');
      
      expect(readme).toMatch(/image-restoration/);
    });

    test('all specs are referenced in README', () => {
      const readme = validator.readFile('README.md');
      
      expect(readme).toContain('specs/database/spec.md');
      expect(readme).toContain('specs/image-storage/spec.md');
      expect(readme).toContain('specs/image-restoration/spec.md');
      expect(readme).toContain('specs/frontend-components/spec.md');
    });
  });

  describe('Markdown Quality', () => {
    const files = [
      'README.md',
      'SUMMARY.md',
      'proposal.md',
      'design.md',
      'tasks.md'
    ];

    files.forEach(file => {
      describe(file, () => {
        let content;

        beforeAll(() => {
          content = validator.readFile(file);
        });

        test('has proper heading hierarchy', () => {
          const lines = content.split('\n');
          let previousLevel = 0;
          
          lines.forEach(line => {
            const match = line.match(/^(#{1,6})\s/);
            if (match) {
              const level = match[1].length;
              // Headings should not skip levels (e.g., # -> ###)
              if (previousLevel > 0) {
                expect(level - previousLevel).toBeLessThanOrEqual(1);
              }
              previousLevel = level;
            }
          });
        });

        test('no trailing whitespace', () => {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.endsWith(' ') || line.endsWith('\t')) {
              validator.addError(`${file}:${index + 1} has trailing whitespace`);
            }
          });
          
          expect(validator.hasErrors()).toBe(false);
        });

        test('proper list formatting', () => {
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            // Check for common list formatting issues
            if (line.match(/^[-*+]\S/)) {
              validator.addError(`${file}:${index + 1} missing space after list marker`);
            }
          });
          
          expect(validator.hasErrors()).toBe(false);
        });

        test('code blocks are properly closed', () => {
          const codeBlockStarts = (content.match(/```/g) || []).length;
          expect(codeBlockStarts % 2).toBe(0);
        });
      });
    });
  });

  describe('Internal Links', () => {
    test('all internal links are valid', () => {
      const readme = validator.readFile('README.md');
      
      // Extract markdown links
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links = [...readme.matchAll(linkPattern)];
      
      links.forEach(([fullMatch, text, url]) => {
        // Skip external links
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return;
        }
        
        // Check if file exists
        const filepath = path.join(basePath, url);
        if (!fs.existsSync(filepath)) {
          validator.addError(`Broken link in README.md: ${url}`);
        }
      });
      
      expect(validator.hasErrors()).toBe(false);
    });
  });
});

// Export for standalone execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SpecValidator };
}