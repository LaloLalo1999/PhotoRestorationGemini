import { describe, it, expect } from 'bun:test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('User Identity Change Integration', () => {
  describe('Documentation Completeness', () => {
    it('should have all four required documentation files', () => {
      const requiredFiles = {
        design: 'design.md',
        proposal: 'proposal.md',
        spec: 'specs/user-identity/spec.md',
        tasks: 'tasks.md',
      };

      Object.entries(requiredFiles).forEach(([type, file]) => {
        const filePath = join(CHANGE_DIR, file);
        expect(existsSync(filePath)).toBe(true);
        
        // Each file should have substantial content
        const content = readFileSync(filePath, 'utf-8');
        expect(content.length).toBeGreaterThan(500);
      });
    });
  });

  describe('End-to-End Requirements Traceability', () => {
    let proposalContent: string;
    let designContent: string;
    let specContent: string;
    let tasksContent: string;

    beforeAll(() => {
      proposalContent = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
      specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
      tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
    });

    it('should trace core functionality from proposal through to tasks', () => {
      // User synchronization mentioned in all docs
      expect(proposalContent.toLowerCase()).toMatch(/synchron/);
      expect(designContent.toLowerCase()).toMatch(/synchron/);
      expect(specContent.toLowerCase()).toMatch(/synchron|webhook/);
      expect(tasksContent.toLowerCase()).toMatch(/webhook/);
    });

    it('should trace credit tracking feature across all documents', () => {
      const creditMention = /credit/i;
      
      expect(proposalContent).toMatch(creditMention);
      expect(designContent).toMatch(creditMention);
      expect(specContent).toMatch(creditMention);
      expect(tasksContent).toMatch(creditMention);
    });

    it('should trace tier management feature across all documents', () => {
      const tierMention = /tier/i;
      
      expect(proposalContent).toMatch(tierMention);
      expect(designContent).toMatch(tierMention);
      expect(specContent).toMatch(tierMention);
      expect(tasksContent).toMatch(tierMention);
    });

    it('should have consistent security requirements end-to-end', () => {
      // Webhook security
      expect(proposalContent).toMatch(/webhook/i);
      expect(designContent).toMatch(/Webhook Signature Verification/i);
      expect(specContent).toMatch(/verify webhook signatures/i);
      expect(tasksContent).toMatch(/signature verification/i);

      // Environment variable
      const secretVar = 'CLERK_WEBHOOK_SECRET';
      expect(designContent).toContain(secretVar);
      expect(specContent).toContain(secretVar);
      expect(tasksContent).toContain(secretVar);
    });
  });

  describe('Implementation Readiness', () => {
    let tasksContent: string;

    beforeAll(() => {
      tasksContent = readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8');
    });

    it('should have actionable tasks for all deliverables', () => {
      const deliverables = ['schema.ts', 'users.ts', 'http.ts'];
      
      deliverables.forEach(file => {
        expect(tasksContent).toContain(file);
        
        // Each file should have multiple tasks
        const fileSection = tasksContent.split(file)[0];
        const tasksBeforeFile = (fileSection.match(/- \[ \]/g) || []).length;
        const tasksAfterFile = (tasksContent.split(file)[1]?.split('##')[0]?.match(/- \[ \]/g) || []).length;
        
        expect(tasksAfterFile).toBeGreaterThan(0);
      });
    });

    it('should have validation criteria that can be executed', () => {
      const validations = tasksContent.match(/<!--\s*validation:([^>]+)-->/g);
      expect(validations).not.toBeNull();
      
      let automatedCount = 0;
      validations!.forEach(validation => {
        if (!validation.includes('manual-review')) {
          automatedCount++;
        }
      });
      
      // Most validations should be automated
      expect(automatedCount).toBeGreaterThan(validations!.length * 0.6);
    });
  });

  describe('Design Decision Quality', () => {
    let designContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
    });

    it('should have decisions that align with requirements', () => {
      // Decision about internal mutations should align with security requirements
      expect(designContent).toMatch(/Decision.*[Ii]nternal.*[Mm]utation/);
      expect(designContent).toMatch(/prevent.*client.*manipulat/i);
      
      // Decision about webhooks should align with sync requirements
      expect(designContent).toMatch(/Decision.*Webhook/i);
      expect(designContent).toMatch(/Real-time|real time/i);
    });

    it('should justify architectural choices with clear rationale', () => {
      const decisions = designContent.split(/### Decision \d+:/);
      
      decisions.slice(1).forEach(decision => {
        const rationale = decision.split('**Rationale**:')[1]?.split('**')[0];
        expect(rationale).toBeTruthy();
        
        // Rationale should be substantial
        expect(rationale.trim().length).toBeGreaterThan(100);
        
        // Should explain "why" not just "what"
        expect(rationale.toLowerCase()).toMatch(/because|since|enables|provides|prevents|ensures/);
      });
    });
  });

  describe('Specification Testability', () => {
    let specContent: string;

    beforeAll(() => {
      specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
    });

    it('should have scenarios that can be automated in tests', () => {
      const scenarios = specContent.split(/#### Scenario:/);
      
      scenarios.slice(1).forEach(scenario => {
        const thenClause = scenario.match(/\*\*THEN\*\*([^\*]+)/)?.[1];
        expect(thenClause).toBeTruthy();
        
        // Should have verifiable action
        expect(thenClause!.toLowerCase()).toMatch(/return|create|update|send|verify|reject|throw|succeed|fail/);
      });
    });

    it('should cover both success and failure paths', () => {
      const scenarios = specContent.match(/#### Scenario:[^\n]+/g);
      expect(scenarios).not.toBeNull();
      
      const successScenarios = scenarios!.filter(s => 
        !s.toLowerCase().includes('invalid') && 
        !s.toLowerCase().includes('error') && 
        !s.toLowerCase().includes('fail')
      );
      
      const failureScenarios = scenarios!.filter(s => 
        s.toLowerCase().includes('invalid') || 
        s.toLowerCase().includes('error') || 
        s.toLowerCase().includes('fail') ||
        s.toLowerCase().includes('missing')
      );
      
      expect(successScenarios.length).toBeGreaterThan(0);
      expect(failureScenarios.length).toBeGreaterThan(0);
    });
  });

  describe('Documentation Consistency', () => {
    let allContent: Record<string, string>;

    beforeAll(() => {
      allContent = {
        proposal: readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8'),
        design: readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8'),
        spec: readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8'),
        tasks: readFileSync(join(CHANGE_DIR, 'tasks.md'), 'utf-8'),
      };
    });

    it('should use consistent terminology across all documents', () => {
      const keyTerms = [
        'Clerk',
        'Convex',
        'webhook',
        'internal mutation',
        'clerkId',
      ];

      keyTerms.forEach(term => {
        const documents = Object.entries(allContent);
        const mentionCount = documents.filter(([_, content]) => 
          content.toLowerCase().includes(term.toLowerCase())
        ).length;
        
        // Core terms should appear in most documents
        if (['Clerk', 'webhook', 'clerkId'].includes(term)) {
          expect(mentionCount).toBeGreaterThanOrEqual(3);
        }
      });
    });

    it('should have consistent file paths across documents', () => {
      const filePaths = [
        'apps/web/convex/schema.ts',
        'apps/web/convex/users.ts',
        'apps/web/convex/http.ts',
      ];

      filePaths.forEach(path => {
        // Should appear in tasks at minimum
        expect(allContent.tasks).toContain(path);
        
        // Base filename should appear in design and proposal
        const filename = path.split('/').pop()!;
        expect(allContent.design).toContain(filename);
        expect(allContent.proposal).toContain(filename);
      });
    });
  });

  describe('Risk and Dependency Documentation', () => {
    let proposalContent: string;
    let designContent: string;

    beforeAll(() => {
      proposalContent = readFileSync(join(CHANGE_DIR, 'proposal.md'), 'utf-8');
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
    });

    it('should document all external dependencies', () => {
      const dependencies = ['Clerk', 'Svix', 'implement-auth'];
      
      dependencies.forEach(dep => {
        expect(designContent.toLowerCase()).toContain(dep.toLowerCase());
      });
    });

    it('should identify and explain risks', () => {
      const risksSection = proposalContent.split('## Risks')[1];
      expect(risksSection).toBeTruthy();
      
      // Should mention configuration
      expect(risksSection.toLowerCase()).toMatch(/environment|configuration|secret/);
    });

    it('should have rollback strategy', () => {
      expect(designContent.toLowerCase()).toMatch(/rollback/);
      
      const rollbackSection = designContent.split(/rollback/i)[1]?.substring(0, 500);
      expect(rollbackSection).toBeTruthy();
      expect(rollbackSection.length).toBeGreaterThan(50);
    });
  });

  describe('Feature Completeness', () => {
    let designContent: string;
    let specContent: string;

    beforeAll(() => {
      designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
      specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
    });

    it('should cover all user management capabilities', () => {
      const capabilities = [
        'create user',
        'update user',
        'query user',
        'credit',
        'tier',
      ];

      capabilities.forEach(capability => {
        const normalizedCap = capability.toLowerCase();
        expect(
          designContent.toLowerCase().includes(normalizedCap) ||
          specContent.toLowerCase().includes(normalizedCap)
        ).toBe(true);
      });
    });

    it('should define clear API contract', () => {
      // Should define inputs and outputs
      expect(designContent).toMatch(/Input:/);
      expect(designContent).toMatch(/Returns:|Behavior:/);
      
      // Should specify function signatures
      expect(designContent).toContain('users:store');
      expect(designContent).toContain('users:current');
    });
  });
});