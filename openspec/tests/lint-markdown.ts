#!/usr/bin/env bun
/**
 * Markdown Linting Utility
 * Validates markdown files for common issues
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface LintIssue {
  file: string;
  line: number;
  issue: string;
  severity: 'error' | 'warning';
}

const issues: LintIssue[] = [];

function lintFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for trailing whitespace
    if (line.length > 0 && /\s$/.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        issue: 'Trailing whitespace',
        severity: 'warning',
      });
    }

    // Check for multiple consecutive blank lines
    if (index > 0 && line === '' && lines[index - 1] === '') {
      issues.push({
        file: filePath,
        line: lineNum,
        issue: 'Multiple consecutive blank lines',
        severity: 'warning',
      });
    }

    // Check for inconsistent list markers
    if (/^\s*[-*+]\s/.test(line)) {
      const marker = line.match(/^\s*([-*+])/)?.[1];
      // Store for consistency check across file
    }

    // Check for missing space after heading hash
    if (/^#{1,6}[^#\s]/.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        issue: 'Missing space after heading hash',
        severity: 'error',
      });
    }

    // Check for broken reference-style links
    if (/\[([^\]]+)\]\[([^\]]*)\]/.test(line) && !/^\[([^\]]+)\]:\s*/.test(line)) {
      // This is a link reference, check if definition exists later
      const refMatch = line.match(/\[([^\]]+)\]\[([^\]]*)\]/);
      if (refMatch) {
        const refName = refMatch[2] || refMatch[1];
        const hasDefinition = content.includes(`[${refName}]:`);
        if (!hasDefinition) {
          issues.push({
            file: filePath,
            line: lineNum,
            issue: `Undefined reference: ${refName}`,
            severity: 'error',
          });
        }
      }
    }
  });

  // Check for missing final newline
  if (content.length > 0 && !content.endsWith('\n')) {
    issues.push({
      file: filePath,
      line: lines.length,
      issue: 'Missing final newline',
      severity: 'warning',
    });
  }
}

function walkDirectory(dir: string): void {
  const entries = readdirSync(dir);

  entries.forEach(entry => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walkDirectory(fullPath);
    } else if (entry.endsWith('.md')) {
      lintFile(fullPath);
    }
  });
}

// Main execution
const targetDir = process.argv[2] || 'openspec/changes/user-identity';

console.log(`Linting markdown files in: ${targetDir}\n`);

try {
  walkDirectory(targetDir);

  if (issues.length === 0) {
    console.log('✓ No issues found!');
    process.exit(0);
  } else {
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');

    console.log(`Found ${issues.length} issue(s):`);
    console.log(`  ${errors.length} error(s)`);
    console.log(`  ${warnings.length} warning(s)\n`);

    issues.forEach(issue => {
      const icon = issue.severity === 'error' ? '✗' : '⚠';
      console.log(`${icon} ${issue.file}:${issue.line}`);
      console.log(`  ${issue.issue}\n`);
    });

    process.exit(errors.length > 0 ? 1 : 0);
  }
} catch (error) {
  console.error('Error during linting:', error);
  process.exit(1);
}