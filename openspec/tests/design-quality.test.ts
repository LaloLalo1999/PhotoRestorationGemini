import { describe, it, expect } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('Design Document Quality', () => {
  let designContent: string;

  beforeAll(() => {
    designContent = readFileSync(join(CHANGE_DIR, 'design.md'), 'utf-8');
  });

  describe('Decision Documentation', () => {
    it('should document rationale for each decision', () => {
      const decisions = designContent.split(/### Decision \d+:/);
      
      decisions.slice(1).forEach((decision, index) => {
        const hasRationale = decision.includes('**Rationale**:');
        expect(hasRationale).toBe(true);
        
        const rationaleSection = decision.split('**Rationale**:')[1]?.split('**')[0];
        expect(rationaleSection).toBeTruthy();
        expect(rationaleSection.trim().length).toBeGreaterThan(50);
      });
    });

    it('should document alternatives considered for each decision', () => {
      const decisions = designContent.split(/### Decision \d+:/);
      
      decisions.slice(1).forEach(decision => {
        expect(decision).toContain('**Alternatives considered**:');
        
        const altSection = decision.split('**Alternatives considered**:')[1]?.split('**')[0];
        expect(altSection).toBeTruthy();
        expect(altSection.trim().length).toBeGreaterThan(30);
      });
    });

    it('should have decision titles that clearly state the choice', () => {
      const decisionTitles = designContent.match(/### Decision \d+: .+/g);
      expect(decisionTitles).not.toBeNull();
      
      decisionTitles!.forEach(title => {
        // Should be more than just "Decision N:"
        const titleText = title.split(':')[1];
        expect(titleText).toBeTruthy();
        expect(titleText.trim().split(' ').length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have at least 4 key decisions', () => {
      const decisions = designContent.match(/### Decision \d+:/g);
      expect(decisions).not.toBeNull();
      expect(decisions!.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Context and Goals', () => {
    it('should clearly state the context', () => {
      const contextSection = designContent.split('## Context')[1]?.split('##')[0];
      expect(contextSection).toBeTruthy();
      expect(contextSection.length).toBeGreaterThan(200);
    });

    it('should reference related changes or phases', () => {
      expect(designContent).toMatch(/Phase \d+/);
      expect(designContent).toMatch(/implement-auth|authentication/i);
    });

    it('should list specific goals', () => {
      const goalsSection = designContent.split('## Goals')[1]?.split('##')[0];
      expect(goalsSection).toBeTruthy();
      
      const goals = goalsSection.match(/^-\s+/gm);
      expect(goals).not.toBeNull();
      expect(goals!.length).toBeGreaterThanOrEqual(3);
    });

    it('should clearly state non-goals', () => {
      const nonGoalsSection = designContent.split('## Non-Goals')[1]?.split('##')[0];
      expect(nonGoalsSection).toBeTruthy();
      
      const nonGoals = nonGoalsSection.match(/^-\s+/gm);
      expect(nonGoals).not.toBeNull();
      expect(nonGoals!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Data Model', () => {
    it('should define complete schema', () => {
      const dataModelSection = designContent.split('## Data Model')[1]?.split('##')[0];
      expect(dataModelSection).toBeTruthy();
      expect(dataModelSection).toContain('```typescript');
      expect(dataModelSection).toContain('defineTable');
    });

    it('should document all fields with types', () => {
      expect(designContent).toMatch(/clerkId:.*v\.string/);
      expect(designContent).toMatch(/email:.*v\.string/);
      expect(designContent).toMatch(/credits:.*v\.number/);
      expect(designContent).toMatch(/tier:.*v\.string/);
    });

    it('should include field descriptions or comments', () => {
      const schemaSection = designContent.match(/```typescript[\s\S]*?```/)?.[0];
      expect(schemaSection).toBeTruthy();
      
      // Should have comments explaining fields
      expect(schemaSection).toMatch(/\/\//);
    });

    it('should document indexes', () => {
      expect(designContent).toMatch(/\.index.*by_clerk_id/);
    });
  });

  describe('API Design', () => {
    it('should document all API functions', () => {
      const apiSection = designContent.split('## API Design')[1]?.split('##')[0];
      expect(apiSection).toBeTruthy();
      
      expect(apiSection).toContain('users:store');
      expect(apiSection).toContain('users:current');
    });

    it('should specify function types (mutation/query)', () => {
      const apiSection = designContent.split('## API Design')[1]?.split('##')[0];
      expect(apiSection).toMatch(/internalMutation|mutation/i);
      expect(apiSection).toMatch(/query/i);
    });

    it('should document function inputs', () => {
      const apiSection = designContent.split('## API Design')[1]?.split('##')[0];
      expect(apiSection).toMatch(/Input:/i);
    });

    it('should document function outputs', () => {
      const apiSection = designContent.split('## API Design')[1]?.split('##')[0];
      expect(apiSection).toMatch(/Returns:|Behavior:/i);
    });

    it('should document HTTP endpoints', () => {
      const apiSection = designContent.split('## API Design')[1]?.split('##')[0];
      expect(apiSection).toMatch(/POST.*http/i);
    });
  });

  describe('Flow Documentation', () => {
    it('should document webhook flow', () => {
      expect(designContent).toContain('Webhook Flow');
    });

    it('should have numbered steps in flow', () => {
      const flowSection = designContent.split('Webhook Flow')[1]?.split('##')[0];
      expect(flowSection).toBeTruthy();
      
      const steps = flowSection.match(/^\d+\./gm);
      expect(steps).not.toBeNull();
      expect(steps!.length).toBeGreaterThanOrEqual(5);
    });

    it('should show complete flow from trigger to completion', () => {
      const flowSection = designContent.split('Webhook Flow')[1]?.split('##')[0];
      
      expect(flowSection).toMatch(/sign.*up|user.*created/i);
      expect(flowSection).toMatch(/webhook/i);
      expect(flowSection).toMatch(/verif/i);
      expect(flowSection).toMatch(/mutation/i);
      expect(flowSection).toMatch(/200|OK/i);
    });
  });

  describe('Security Documentation', () => {
    it('should have dedicated security section', () => {
      expect(designContent).toContain('## Security Considerations');
    });

    it('should document authentication mechanisms', () => {
      const securitySection = designContent.split('## Security Considerations')[1]?.split('##')[0];
      expect(securitySection).toMatch(/auth/i);
      expect(securitySection).toContain('getUserIdentity');
    });

    it('should document webhook security', () => {
      const securitySection = designContent.split('## Security Considerations')[1]?.split('##')[0];
      expect(securitySection).toMatch(/signature.*verif/i);
      expect(securitySection).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should document access control', () => {
      const securitySection = designContent.split('## Security Considerations')[1]?.split('##')[0];
      expect(securitySection).toMatch(/internal.*mutation/i);
    });

    it('should document environment variables', () => {
      const securitySection = designContent.split('## Security Considerations')[1]?.split('##')[0];
      expect(securitySection).toMatch(/environment.*variable/i);
    });
  });

  describe('Migration and Deployment', () => {
    it('should document migration steps', () => {
      const migrationSection = designContent.split('## Migration Plan')[1]?.split('##')[0];
      expect(migrationSection).toBeTruthy();
      
      const steps = migrationSection.match(/^\d+\./gm);
      expect(steps).not.toBeNull();
      expect(steps!.length).toBeGreaterThanOrEqual(4);
    });

    it('should include rollback plan', () => {
      expect(designContent).toMatch(/rollback/i);
    });

    it('should specify deployment order', () => {
      const migrationSection = designContent.split('## Migration Plan')[1]?.split('##')[0];
      expect(migrationSection).toMatch(/deploy.*schema/i);
      expect(migrationSection).toMatch(/configure.*webhook/i);
    });
  });

  describe('Dependencies', () => {
    it('should document dependencies section', () => {
      expect(designContent).toContain('## Dependencies');
    });

    it('should list required services', () => {
      const depsSection = designContent.split('## Dependencies')[1]?.split('##')[0];
      expect(depsSection).toContain('Clerk');
      expect(depsSection).toContain('Svix');
    });

    it('should list required environment variables', () => {
      const depsSection = designContent.split('## Dependencies')[1]?.split('##')[0];
      expect(depsSection).toContain('CLERK_ISSUER_URL');
      expect(depsSection).toContain('CLERK_WEBHOOK_SECRET');
    });

    it('should reference prerequisite changes', () => {
      expect(designContent).toMatch(/implement-auth/);
    });
  });

  describe('Future Considerations', () => {
    it('should document future enhancements', () => {
      expect(designContent).toMatch(/## Future|## Open Questions/);
    });

    it('should list specific future features', () => {
      const futureSection = designContent.split(/## Future/)[1] || designContent;
      expect(futureSection).toMatch(/credit.*deduction|pro.*tier|upgrade/i);
    });
  });
});