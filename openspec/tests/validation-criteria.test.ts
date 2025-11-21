import { describe, it, expect } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('Validation Criteria Quality', () => {
  let tasksContent: string;

  beforeAll(() => {
    tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
  });

  describe('Validation Comment Structure', () => {
    it('should have validation comments for all tasks', () => {
      const taskLines = tasksContent.match(/^- \[ \].+$/gm);
      expect(taskLines).not.toBeNull();
      
      const validationComments = tasksContent.match(/<!--\s*validation:/g);
      expect(validationComments).not.toBeNull();
      
      // Most tasks should have validation criteria (allow some manual tasks)
      expect(validationComments!.length).toBeGreaterThanOrEqual(taskLines!.length * 0.7);
    });

    it('should use consistent validation comment format', () => {
      const validationComments = tasksContent.match(/<!--\s*validation:[^>]+-->/g);
      expect(validationComments).not.toBeNull();
      
      validationComments!.forEach(comment => {
        // Should be well-formed HTML comment
        expect(comment).toMatch(/^<!--\s*validation:.+-->$/);
      });
    });
  });

  describe('File Existence Validations', () => {
    it('should use file-exists for file creation tasks', () => {
      const createFileTasks = tasksContent.match(/- \[ \][^\n]*Create[^\n]*$/gim);
      
      if (createFileTasks) {
        createFileTasks.forEach(task => {
          const taskIndex = tasksContent.indexOf(task);
          const nextComment = tasksContent.substring(taskIndex, taskIndex + 200);
          expect(nextComment).toMatch(/validation:\s*file-exists/);
        });
      }
    });

    it('should specify exact file paths in file-exists validations', () => {
      const fileExistsValidations = tasksContent.match(/validation:\s*file-exists\s+([^\s]+)/g);
      
      if (fileExistsValidations) {
        fileExistsValidations.forEach(validation => {
          const path = validation.match(/file-exists\s+(.+?)(?:\s*-->)?$/)?.[1];
          expect(path).toBeTruthy();
          expect(path).toMatch(/^apps\/web\//);
        });
      }
    });
  });

  describe('Grep Validations', () => {
    it('should use grep for content verification tasks', () => {
      const contentTasks = tasksContent.match(/- \[ \][^\n]*Add|Implement|Define[^\n]*$/gim);
      
      if (contentTasks && contentTasks.length > 0) {
        const grepValidations = tasksContent.match(/validation:\s*grep/g);
        expect(grepValidations).not.toBeNull();
        expect(grepValidations!.length).toBeGreaterThan(0);
      }
    });

    it('should include search patterns in grep validations', () => {
      const grepValidations = tasksContent.match(/validation:\s*grep\s+[^\s]+/g);
      
      if (grepValidations) {
        grepValidations.forEach(validation => {
          const pattern = validation.match(/grep\s+(.+?)(?:\s*-->)?$/)?.[1];
          expect(pattern).toBeTruthy();
          expect(pattern!.length).toBeGreaterThan(3);
        });
      }
    });

    it('should specify file paths for grep validations', () => {
      const grepWithFiles = tasksContent.match(/validation:\s*grep[^>]+apps\/web/g);
      expect(grepWithFiles).not.toBeNull();
      expect(grepWithFiles!.length).toBeGreaterThan(0);
    });
  });

  describe('Command Validations', () => {
    it('should use executable commands for build validations', () => {
      const buildTasks = tasksContent.match(/- \[ \][^\n]*build|compile[^\n]*$/gim);
      
      if (buildTasks) {
        buildTasks.forEach(task => {
          const taskIndex = tasksContent.indexOf(task);
          const nextComment = tasksContent.substring(taskIndex, taskIndex + 200);
          expect(nextComment).toMatch(/validation:\s*cd.*&&.*bun/);
        });
      }
    });

    it('should use lint commands for TypeScript validation', () => {
      expect(tasksContent).toMatch(/validation:.*bun run lint/);
    });
  });

  describe('Manual Review Validations', () => {
    it('should use manual-review for subjective tasks', () => {
      const reviewTasks = tasksContent.match(/- \[ \][^\n]*[Rr]eview[^\n]*$/gim);
      
      if (reviewTasks) {
        reviewTasks.forEach(task => {
          const taskIndex = tasksContent.indexOf(task);
          const nextComment = tasksContent.substring(taskIndex, taskIndex + 200);
          expect(nextComment).toMatch(/validation:\s*manual-review/);
        });
      }
    });

    it('should have justification for manual-review validations', () => {
      // Manual review should be used sparingly and for good reason
      const manualReviews = tasksContent.match(/validation:\s*manual-review/g);
      
      if (manualReviews) {
        // Should not be overused
        expect(manualReviews.length).toBeLessThanOrEqual(5);
      }
    });
  });

  describe('Validation Specificity', () => {
    it('should have specific validation criteria, not generic', () => {
      const validations = tasksContent.match(/validation:\s*([^>]+?)-->/g);
      
      if (validations) {
        validations.forEach(validation => {
          const criteria = validation.match(/validation:\s*(.+?)-->/)?.[1];
          expect(criteria).toBeTruthy();
          
          // Should not be too short or vague
          expect(criteria!.trim().length).toBeGreaterThan(10);
          
          // Should not use vague terms
          expect(criteria!.toLowerCase()).not.toMatch(/check|verify|test/); // Unless followed by specific what
        });
      }
    });

    it('should include file names in validation criteria where applicable', () => {
      const fileRelatedTasks = tasksContent.match(/- \[ \][^\n]*(schema|users|http)\.ts[^\n]*$/gim);
      
      if (fileRelatedTasks) {
        fileRelatedTasks.forEach(task => {
          const taskIndex = tasksContent.indexOf(task);
          const nextComment = tasksContent.substring(taskIndex, taskIndex + 300);
          
          // Should mention the file in validation
          expect(nextComment).toMatch(/schema\.ts|users\.ts|http\.ts/);
        });
      }
    });
  });

  describe('Validation Completeness', () => {
    it('should validate schema tasks with schema-specific checks', () => {
      const schemaTasks = tasksContent.split('## 1. Database Schema')[1]?.split('##')[0];
      
      if (schemaTasks) {
        expect(schemaTasks).toMatch(/validation:.*schema\.ts/);
        expect(schemaTasks).toMatch(/validation:.*by_clerk_id/);
      }
    });

    it('should validate mutation tasks with mutation-specific checks', () => {
      const mutationTasks = tasksContent.split('## 2. User Mutations')[1]?.split('##')[0];
      
      if (mutationTasks) {
        expect(mutationTasks).toMatch(/validation:.*internalMutation/);
        expect(mutationTasks).toMatch(/validation:.*getUserIdentity/);
      }
    });

    it('should validate webhook tasks with webhook-specific checks', () => {
      const webhookTasks = tasksContent.split('## 3. Clerk Webhook')[1]?.split('##')[0];
      
      if (webhookTasks) {
        expect(webhookTasks).toMatch(/validation:.*svix/i);
        expect(webhookTasks).toMatch(/validation:.*CLERK_WEBHOOK_SECRET/);
        expect(webhookTasks).toMatch(/validation:.*user\\.created|user\\.updated/);
      }
    });
  });

  describe('Validation Automation', () => {
    it('should prefer automated validations over manual review', () => {
      const allValidations = tasksContent.match(/validation:\s*([^>]+?)-->/g);
      const manualValidations = tasksContent.match(/validation:\s*manual-review/g);
      
      if (allValidations && manualValidations) {
        const autoValidationRatio = (allValidations.length - manualValidations.length) / allValidations.length;
        expect(autoValidationRatio).toBeGreaterThan(0.6); // At least 60% should be automated
      }
    });

    it('should use grep with specific patterns, not just filename searches', () => {
      const grepValidations = tasksContent.match(/validation:\s*grep\s+"[^"]+"|validation:\s*grep\s+'[^']+'/g);
      expect(grepValidations).not.toBeNull();
      expect(grepValidations!.length).toBeGreaterThan(5);
    });
  });
});