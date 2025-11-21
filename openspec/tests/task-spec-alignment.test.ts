import { describe, it, expect } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('Task and Specification Alignment', () => {
  let tasksContent: string;
  let specContent: string;
  let designContent: string;

  beforeAll(() => {
    tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
    specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
    designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
  });

  describe('Schema Implementation Tasks', () => {
    it('should have tasks for all schema fields mentioned in design', () => {
      const schemaFields = ['clerkId', 'email', 'credits', 'tier'];
      
      schemaFields.forEach(field => {
        expect(designContent).toContain(field);
        // Tasks should reference these fields
        expect(tasksContent).toMatch(new RegExp(field, 'i'));
      });
    });

    it('should have task for index creation matching design', () => {
      expect(designContent).toContain('by_clerk_id');
      expect(tasksContent).toContain('by_clerk_id');
    });

    it('should validate schema file path matches across documents', () => {
      const schemaPath = 'apps/web/convex/schema.ts';
      expect(tasksContent).toContain(schemaPath);
      expect(designContent).toContain('schema.ts');
    });
  });

  describe('Mutation and Query Tasks', () => {
    it('should have tasks for store mutation as internal', () => {
      expect(tasksContent).toMatch(/store.*internalMutation/i);
      expect(designContent).toContain('internalMutation');
    });

    it('should have tasks for current query', () => {
      expect(tasksContent).toMatch(/current.*query/i);
      expect(designContent).toContain('users:current');
    });

    it('should have tasks for authentication checks', () => {
      expect(tasksContent).toContain('getUserIdentity');
      expect(designContent).toContain('ctx.auth.getUserIdentity()');
    });
  });

  describe('Webhook Handler Tasks', () => {
    it('should have tasks for all webhook requirements from spec', () => {
      // Spec mentions these webhook-related requirements
      const webhookRequirements = [
        'user.created',
        'user.updated',
        'signature',
        'CLERK_WEBHOOK_SECRET',
      ];

      webhookRequirements.forEach(req => {
        expect(specContent).toContain(req);
        expect(tasksContent).toContain(req);
      });
    });

    it('should have Svix import task matching design dependency', () => {
      expect(designContent).toMatch(/Svix/);
      expect(tasksContent).toMatch(/Svix/);
    });

    it('should have task for calling internal mutation from webhook', () => {
      expect(tasksContent).toMatch(/internal\.users\.store/i);
    });
  });

  describe('Security Requirements Coverage', () => {
    it('should have tasks for all security considerations in design', () => {
      const securityItems = [
        'signature verification',
        'CLERK_WEBHOOK_SECRET',
        'Internal Mutations',
        'getUserIdentity',
      ];

      const securitySection = designContent.split('## Security Considerations')[1];
      
      securityItems.forEach(item => {
        expect(securitySection.toLowerCase()).toContain(item.toLowerCase());
      });
    });

    it('should have specification requirements for security', () => {
      expect(specContent).toMatch(/SHALL verify webhook signatures/i);
      expect(specContent).toMatch(/SHALL use internal mutations/i);
    });
  });

  describe('Default Values Consistency', () => {
    it('should have consistent default credits across documents', () => {
      const creditsRegex = /5.*credit/i;
      expect(designContent).toMatch(creditsRegex);
      expect(specContent).toMatch(creditsRegex);
    });

    it('should have consistent default tier across documents', () => {
      const tierRegex = /"free"|'free'/;
      expect(designContent).toMatch(tierRegex);
      expect(specContent).toMatch(tierRegex);
    });
  });

  describe('Validation Task Coverage', () => {
    it('should have validation for schema compilation', () => {
      expect(tasksContent).toMatch(/build.*skip-convex/i);
    });

    it('should have validation for TypeScript correctness', () => {
      expect(tasksContent).toMatch(/lint/i);
    });

    it('should have manual review tasks for complex items', () => {
      const manualReviews = tasksContent.match(/manual-review/g);
      expect(manualReviews).not.toBeNull();
      expect(manualReviews!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Task Completeness', () => {
    it('should have tasks for all files mentioned in proposal', () => {
      const proposalContent = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
      const files = ['schema.ts', 'users.ts', 'http.ts'];
      
      files.forEach(file => {
        expect(proposalContent).toContain(file);
        expect(tasksContent).toContain(file);
      });
    });

    it('should have at least 15 actionable tasks', () => {
      const taskCheckboxes = tasksContent.match(/- \[ \]/g);
      expect(taskCheckboxes).not.toBeNull();
      expect(taskCheckboxes!.length).toBeGreaterThanOrEqual(15);
    });

    it('should group tasks logically', () => {
      const sections = tasksContent.match(/## \d+\./g);
      expect(sections).not.toBeNull();
      expect(sections!.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Requirement Traceability', () => {
    it('should trace webhook requirement to tasks', () => {
      const webhookReq = /system SHALL maintain.*webhook/i;
      expect(specContent).toMatch(webhookReq);
      expect(tasksContent).toMatch(/webhook/i);
    });

    it('should trace query requirement to tasks', () => {
      expect(specContent).toMatch(/system SHALL provide a query/i);
      expect(tasksContent).toMatch(/current.*query/i);
    });

    it('should trace internal mutation requirement to tasks', () => {
      expect(specContent).toMatch(/SHALL use internal mutations/i);
      expect(tasksContent).toMatch(/internalMutation/);
    });

    it('should trace index requirement to tasks', () => {
      expect(specContent).toMatch(/SHALL index.*Clerk ID/i);
      expect(tasksContent).toMatch(/index.*clerkId/i);
    });
  });
});