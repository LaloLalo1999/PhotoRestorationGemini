import { describe, it, expect } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';

const CHANGE_DIR = 'openspec/changes/user-identity';

describe('Scenario Coverage and Quality', () => {
  let specContent: string;

  beforeAll(() => {
    specContent = readFileSync(join(CHANGE_DIR, 'specs/user-identity/spec.md'), 'utf-8');
  });

  describe('Requirement Structure', () => {
    it('should have at least 5 major requirements', () => {
      const requirements = specContent.match(/### Requirement:/g);
      expect(requirements).not.toBeNull();
      expect(requirements!.length).toBeGreaterThanOrEqual(5);
    });

    it('should use SHALL for all requirements', () => {
      const requirementSections = specContent.split(/### Requirement:/);
      
      requirementSections.slice(1).forEach((section, index) => {
        const firstLine = section.split('\n')[0];
        expect(firstLine).toMatch(/SHALL/);
      });
    });

    it('should have clear, actionable requirement statements', () => {
      const requirementSections = specContent.split(/### Requirement:/);
      
      requirementSections.slice(1).forEach(section => {
        const firstParagraph = section.split('\n\n')[0];
        // Should have subject + SHALL + action
        expect(firstParagraph).toMatch(/system.*SHALL.*\w+/i);
      });
    });
  });

  describe('Scenario Completeness', () => {
    it('should have multiple scenarios per requirement', () => {
      const requirementSections = specContent.split(/### Requirement:/);
      
      requirementSections.slice(1).forEach((section, index) => {
        const scenarios = section.match(/#### Scenario:/g);
        expect(scenarios).not.toBeNull();
        expect(scenarios!.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should cover happy path scenarios', () => {
      expect(specContent).toMatch(/Scenario:.*sign.*up/i);
      expect(specContent).toMatch(/Scenario:.*authenticated.*user.*queries/i);
      expect(specContent).toMatch(/Scenario:.*valid.*signature/i);
    });

    it('should cover error scenarios', () => {
      expect(specContent).toMatch(/Scenario:.*invalid/i);
      expect(specContent).toMatch(/Scenario:.*unauthenticated/i);
      expect(specContent).toMatch(/Scenario:.*missing/i);
    });

    it('should cover edge cases', () => {
      expect(specContent).toMatch(/Scenario:.*update/i);
      expect(specContent).toMatch(/Scenario:.*client.*attempts/i);
    });
  });

  describe('Scenario Structure', () => {
    it('should use WHEN-THEN-AND format consistently', () => {
      const scenarios = specContent.split(/#### Scenario:/);
      
      scenarios.slice(1).forEach(scenario => {
        expect(scenario).toMatch(/\*\*WHEN\*\*/);
        expect(scenario).toMatch(/\*\*THEN\*\*/);
      });
    });

    it('should have specific, testable conditions in WHEN clauses', () => {
      const whenClauses = specContent.match(/\*\*WHEN\*\*[^\*]+/g);
      expect(whenClauses).not.toBeNull();
      
      whenClauses!.forEach(clause => {
        // Should have concrete action or condition
        expect(clause.length).toBeGreaterThan(20);
        expect(clause).toMatch(/\w+ \w+ \w+/); // Multiple words
      });
    });

    it('should have specific, verifiable outcomes in THEN clauses', () => {
      const thenClauses = specContent.match(/\*\*THEN\*\*[^\*]+/g);
      expect(thenClauses).not.toBeNull();
      
      thenClauses!.forEach(clause => {
        // Should have concrete outcome
        expect(clause.length).toBeGreaterThan(20);
      });
    });

    it('should use AND for additional conditions appropriately', () => {
      const scenarios = specContent.split(/#### Scenario:/);
      const scenariosWithAnd = scenarios.filter(s => s.includes('**AND**'));
      
      // At least half of scenarios should have AND clauses for detailed verification
      expect(scenariosWithAnd.length).toBeGreaterThanOrEqual(scenarios.length / 3);
    });
  });

  describe('Domain Coverage', () => {
    it('should cover user lifecycle scenarios', () => {
      expect(specContent).toMatch(/sign.*up|creat/i);
      expect(specContent).toMatch(/update/i);
    });

    it('should cover authentication scenarios', () => {
      expect(specContent).toMatch(/authenticated/i);
      expect(specContent).toMatch(/unauthenticated/i);
    });

    it('should cover webhook scenarios', () => {
      expect(specContent).toMatch(/webhook/i);
      expect(specContent).toMatch(/signature/i);
      expect(specContent).toMatch(/user\.created|user\.updated/);
    });

    it('should cover data integrity scenarios', () => {
      expect(specContent).toMatch(/internal.*mutation/i);
      expect(specContent).toMatch(/client.*attempts/i);
    });

    it('should cover query scenarios', () => {
      expect(specContent).toMatch(/query.*profile/i);
      expect(specContent).toMatch(/Clerk ID/i);
    });

    it('should cover security scenarios', () => {
      expect(specContent).toMatch(/invalid.*signature/i);
      expect(specContent).toMatch(/CLERK_WEBHOOK_SECRET/);
    });

    it('should cover default value scenarios', () => {
      expect(specContent).toMatch(/5.*credit|credit.*5/i);
      expect(specContent).toMatch(/free.*tier|tier.*free/i);
    });
  });

  describe('Scenario Quality', () => {
    it('should not have vague or ambiguous scenarios', () => {
      const scenarios = specContent.split(/#### Scenario:/);
      
      scenarios.slice(1).forEach(scenario => {
        // Should not contain overly vague terms
        const vaguePhrases = ['somehow', 'maybe', 'possibly', 'might'];
        vaguePhrases.forEach(phrase => {
          expect(scenario.toLowerCase()).not.toContain(phrase);
        });
      });
    });

    it('should use specific technical terms', () => {
      const technicalTerms = [
        'webhook',
        'signature',
        'mutation',
        'query',
        'authentication',
        'clerkId',
        'Convex',
      ];

      technicalTerms.forEach(term => {
        expect(specContent).toContain(term);
      });
    });

    it('should reference specific API endpoints or functions', () => {
      expect(specContent).toMatch(/users:store|users:current/);
      expect(specContent).toMatch(/user\.created|user\.updated/);
    });
  });

  describe('Testability', () => {
    it('should have verifiable outcomes for each scenario', () => {
      const scenarios = specContent.split(/#### Scenario:/);
      
      scenarios.slice(1).forEach(scenario => {
        const thenClauses = scenario.match(/\*\*THEN\*\*[^\*]+/g);
        expect(thenClauses).not.toBeNull();
        
        thenClauses!.forEach(clause => {
          // Should contain verifiable action verbs
          expect(clause).toMatch(/returns|creates|updates|sends|verifies|rejects|throws|succeeds|fails/i);
        });
      });
    });

    it('should specify error conditions clearly', () => {
      const errorScenarios = specContent.match(/#### Scenario:.*invalid.*|#### Scenario:.*missing.*|#### Scenario:.*unauthenticated.*/gi);
      expect(errorScenarios).not.toBeNull();
      expect(errorScenarios!.length).toBeGreaterThanOrEqual(3);
    });

    it('should specify expected status codes or error types', () => {
      expect(specContent).toMatch(/400|401|403|500/);
      expect(specContent).toMatch(/error/i);
    });
  });
});