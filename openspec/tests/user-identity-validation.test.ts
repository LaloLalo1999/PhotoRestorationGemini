import { describe, it, expect } from 'bun:test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('User Identity Specification Validation', () => {
  describe('File Existence', () => {
    it('should have all required specification files', () => {
      const requiredFiles = [
        'design.md',
        'proposal.md',
        'specs/user-identity/spec.md',
        'tasks.md',
      ];

      requiredFiles.forEach(file => {
        const filePath = join(CHANGE_DIR, file);
        expect(existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('Design Document (design.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
    });

    it('should have required top-level sections', () => {
      const requiredSections = [
        '## Context',
        '## Goals',
        '## Non-Goals',
        '## Decisions',
        '## Data Model',
        '## API Design',
        '## Security Considerations',
        '## Migration Plan',
        '## Dependencies',
      ];

      requiredSections.forEach(section => {
        expect(content).toContain(section);
      });
    });

    it('should document at least 3 key decisions', () => {
      const decisionMatches = content.match(/### Decision \d+:/g);
      expect(decisionMatches).not.toBeNull();
      expect(decisionMatches!.length).toBeGreaterThanOrEqual(3);
    });

    it('should include rationale for each decision', () => {
      const decisions = content.split(/### Decision \d+:/).slice(1);
      decisions.forEach(decision => {
        expect(decision).toContain('**Rationale**:');
        expect(decision).toContain('**Alternatives considered**:');
      });
    });

    it('should define users table schema with all required fields', () => {
      expect(content).toContain('users: defineTable({');
      expect(content).toContain('clerkId: v.string()');
      expect(content).toContain('email: v.string()');
      expect(content).toContain('credits: v.number()');
      expect(content).toContain('tier: v.string()');
    });

    it('should specify index on clerkId', () => {
      expect(content).toMatch(/\.index\(["']by_clerk_id["']/);
    });

    it('should document API functions', () => {
      expect(content).toContain('users:store');
      expect(content).toContain('users:current');
      expect(content).toContain('internalMutation');
    });

    it('should include webhook flow diagram or description', () => {
      expect(content).toContain('Webhook Flow');
      expect(content).toContain('user.created');
      expect(content).toContain('user.updated');
    });

    it('should document security considerations', () => {
      const securitySection = content.split('## Security Considerations')[1];
      expect(securitySection).toContain('Webhook Signature Verification');
      expect(securitySection).toContain('Internal Mutations');
      expect(securitySection).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should include rollback plan', () => {
      expect(content).toMatch(/###?\s*Rollback/i);
    });

    it('should reference PROJECT_PLAN.md Phase 3', () => {
      expect(content).toMatch(/PROJECT_PLAN\.md.*Phase 3/);
    });
  });

  describe('Proposal Document (proposal.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
    });

    it('should have required sections', () => {
      const requiredSections = [
        '## Summary',
        '## Why',
        '## What Changes',
        '## Impact',
        '## Risks',
      ];

      requiredSections.forEach(section => {
        expect(content).toContain(section);
      });
    });

    it('should specify affected files', () => {
      expect(content).toContain('schema.ts');
      expect(content).toContain('users.ts');
      expect(content).toContain('http.ts');
    });

    it('should list dependencies', () => {
      expect(content).toMatch(/implement-auth|Clerk authentication/i);
    });

    it('should document risks', () => {
      const risksSection = content.split('## Risks')[1];
      expect(risksSection).toBeTruthy();
      expect(risksSection.length).toBeGreaterThan(50); // Has meaningful content
    });
  });

  describe('Specification Document (spec.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
    });

    it('should have ADDED Requirements header', () => {
      expect(content).toContain('## ADDED Requirements');
    });

    it('should define requirements with SHALL statements', () => {
      const shallMatches = content.match(/SHALL/g);
      expect(shallMatches).not.toBeNull();
      expect(shallMatches!.length).toBeGreaterThanOrEqual(5);
    });

    it('should include scenarios for each requirement', () => {
      const requirementSections = content.split(/### Requirement:/);
      expect(requirementSections.length).toBeGreaterThan(1);

      requirementSections.slice(1).forEach(section => {
        expect(section).toMatch(/#### Scenario:/);
      });
    });

    it('should have WHEN-THEN-AND scenario structure', () => {
      const scenarios = content.split(/#### Scenario:/);
      
      scenarios.slice(1).forEach(scenario => {
        expect(scenario).toContain('**WHEN**');
        expect(scenario).toContain('**THEN**');
      });
    });

    it('should document webhook signature verification requirement', () => {
      expect(content).toContain('verify webhook signatures');
      expect(content).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should document internal mutation requirement', () => {
      expect(content).toMatch(/internal mutation/i);
      expect(content).toContain('users:store');
    });

    it('should include error scenarios', () => {
      expect(content).toMatch(/invalid.*signature/i);
      expect(content).toMatch(/unauthenticated/i);
    });

    it('should specify default values for new users', () => {
      expect(content).toMatch(/5.*credit/i);
      expect(content).toMatch(/free.*tier/i);
    });
  });

  describe('Tasks Document (tasks.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
    });

    it('should have numbered task sections', () => {
      expect(content).toMatch(/## \d+\./);
    });

    it('should have checkboxes for all tasks', () => {
      const taskLines = content.split('\n').filter(line => line.trim().startsWith('- [ ]'));
      expect(taskLines.length).toBeGreaterThan(5);
    });

    it('should include validation comments for tasks', () => {
      expect(content).toMatch(/<!--\s*validation:/);
    });

    it('should cover database schema tasks', () => {
      expect(content).toContain('schema.ts');
      expect(content).toMatch(/index.*clerkId/i);
    });

    it('should cover user mutations and queries tasks', () => {
      expect(content).toContain('users.ts');
      expect(content).toContain('internalMutation');
      expect(content).toContain('current');
    });

    it('should cover webhook handler tasks', () => {
      expect(content).toContain('http.ts');
      expect(content).toContain('Svix');
      expect(content).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should include validation tasks', () => {
      expect(content).toMatch(/verify|validate|check/i);
    });

    it('should reference specific file paths', () => {
      expect(content).toContain('apps/web/convex/');
    });

    it('should have validation criteria that are specific and testable', () => {
      const validationComments = content.match(/<!--\s*validation:([^>]+)-->/g);
      expect(validationComments).not.toBeNull();
      expect(validationComments!.length).toBeGreaterThan(10);

      validationComments!.forEach(comment => {
        // Each validation should have a specific command or criterion
        expect(comment).toMatch(/file-exists|grep|manual-review|cd/);
      });
    });
  });

  describe('Cross-Document Consistency', () => {
    let designContent: string;
    let proposalContent: string;
    let specContent: string;
    let tasksContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
      proposalContent = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
      specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
      tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
    });

    it('should have consistent file paths across documents', () => {
      const files = ['schema.ts', 'users.ts', 'http.ts'];
      
      files.forEach(file => {
        expect(designContent).toContain(file);
        expect(proposalContent).toContain(file);
        expect(tasksContent).toContain(file);
      });
    });

    it('should have consistent API function names', () => {
      const functions = ['users:store', 'users:current'];
      
      functions.forEach(func => {
        expect(designContent).toContain(func);
        expect(specContent).toContain(func);
        expect(tasksContent).toContain(func);
      });
    });

    it('should have consistent environment variable names', () => {
      expect(designContent).toContain('CLERK_WEBHOOK_SECRET');
      expect(specContent).toContain('CLERK_WEBHOOK_SECRET');
      expect(tasksContent).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should have consistent default values', () => {
      const docs = [designContent, specContent];
      docs.forEach(doc => {
        expect(doc).toMatch(/5.*credit/i);
        expect(doc).toMatch(/free.*tier/i);
      });
    });

    it('should reference the same webhook events', () => {
      const events = ['user.created', 'user.updated'];
      
      events.forEach(event => {
        expect(designContent).toContain(event);
        expect(specContent).toContain(event);
      });
    });

    it('should reference Svix library consistently', () => {
      expect(designContent).toMatch(/Svix/i);
      expect(tasksContent).toMatch(/Svix/i);
    });
  });

  describe('Code Snippet Validation', () => {
    let designContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
    });

    it('should have valid TypeScript schema definition syntax', () => {
      const schemaMatch = designContent.match(/```typescript\s+([\s\S]*?)```/);
      expect(schemaMatch).not.toBeNull();
      
      const schemaCode = schemaMatch![1];
      expect(schemaCode).toContain('defineTable');
      expect(schemaCode).toContain('v.string()');
      expect(schemaCode).toContain('v.number()');
      expect(schemaCode).toContain('.index(');
    });

    it('should have properly formatted webhook flow steps', () => {
      const flowSection = designContent.split('## Webhook Flow')[1];
      expect(flowSection).toMatch(/\d+\./); // Numbered steps
    });
  });

  describe('Markdown Formatting', () => {
    it('should have consistent heading hierarchy in all documents', () => {
      const files = [
        'design.md',
        'proposal.md',
        'specs/user-identity/spec.md',
        'tasks.md',
      ];

      files.forEach(file => {
        const content = readFileSync(join(CHANGE_DIR, file), 'utf-8');
        const lines = content.split('\n');
        
        let previousLevel = 0;
        lines.forEach(line => {
          const headingMatch = line.match(/^(#{1,6})\s/);
          if (headingMatch) {
            const currentLevel = headingMatch[1].length;
            // Heading levels shouldn't skip (e.g., # followed by ###)
            if (previousLevel > 0) {
              expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
            }
            previousLevel = currentLevel;
          }
        });
      });
    });

    it('should not have trailing whitespace on lines', () => {
      const files = [
        'design.md',
        'proposal.md',
        'specs/user-identity/spec.md',
        'tasks.md',
      ];

      files.forEach(file => {
        const content = readFileSync(join(CHANGE_DIR, file), 'utf-8');
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
          if (line.length > 0) {
            expect(line).not.toMatch(/\s$/);
          }
        });
      });
    });

    it('should use consistent list formatting', () => {
      const files = [
        'design.md',
        'proposal.md',
        'specs/user-identity/spec.md',
      ];

      files.forEach(file => {
        const content = readFileSync(join(CHANGE_DIR, file), 'utf-8');
        const listItems = content.match(/^[\s]*[-*]\s/gm);
        
        if (listItems) {
          // All list items in a file should use the same marker
          const markers = listItems.map(item => item.trim()[0]);
          const uniqueMarkers = [...new Set(markers)];
          expect(uniqueMarkers.length).toBe(1);
        }
      });
    });
  });

  describe('Link and Reference Validation', () => {
    let designContent: string;
    let proposalContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
      proposalContent = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
    });

    it('should reference PROJECT_PLAN.md which should exist', () => {
      expect(designContent).toContain('PROJECT_PLAN.md');
      expect(proposalContent).toContain('PROJECT_PLAN.md');
      expect(existsSync('PROJECT_PLAN.md')).toBe(true);
    });

    it('should reference implement-auth change', () => {
      expect(designContent).toContain('implement-auth');
      expect(proposalContent).toContain('implement-auth');
    });
  });

  describe('Security Documentation', () => {
    let designContent: string;
    let specContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
      specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
    });

    it('should document webhook security', () => {
      expect(designContent).toMatch(/signature.*verif/i);
      expect(specContent).toMatch(/signature.*verif/i);
    });

    it('should document access control', () => {
      expect(designContent).toContain('ctx.auth.getUserIdentity()');
      expect(specContent).toContain('getUserIdentity');
    });

    it('should document internal mutation restrictions', () => {
      expect(designContent).toMatch(/internal.*mutation/i);
      expect(designContent).toMatch(/prevent.*client/i);
    });

    it('should document environment variable security', () => {
      expect(designContent).toContain('Environment Variables');
      expect(designContent).toContain('CLERK_WEBHOOK_SECRET');
    });
  });

  describe('Task Completeness', () => {
    let tasksContent: string;
    let designContent: string;

    beforeAll(() => {
      tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
    });

    it('should have tasks for all mentioned files in design', () => {
      const designFiles = ['schema.ts', 'users.ts', 'http.ts'];
      
      designFiles.forEach(file => {
        expect(tasksContent).toContain(file);
      });
    });

    it('should have validation tasks', () => {
      expect(tasksContent).toMatch(/## \d+\..*Validation/i);
    });

    it('should have review and documentation tasks', () => {
      expect(tasksContent).toMatch(/review/i);
      expect(tasksContent).toMatch(/document/i);
    });
  });
});