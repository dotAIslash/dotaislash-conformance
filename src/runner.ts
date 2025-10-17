// File: dotaislash-conformance/src/runner.ts
// What: Conformance test runner
// Why: Execute all scenarios and generate report
// Related: types.ts, scenarios/*.ts

import type { ConformanceScenario, ConformanceSuiteResult, ConformanceLevel, ConformanceCategory } from './types.js';

/**
 * Run all conformance scenarios
 */
export async function runConformanceSuite(
  scenarios: ConformanceScenario[]
): Promise<ConformanceSuiteResult> {
  const result: ConformanceSuiteResult = {
    total: scenarios.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    byCategory: {} as Record<ConformanceCategory, { total: number; passed: number; failed: number }>,
    scenarios: []
  };

  // Initialize category counts
  const categories: ConformanceCategory[] = [
    'schema', 'context', 'profile', 'agent', 'rules',
    'permissions', 'merge', 'discovery', 'cli'
  ];
  
  for (const category of categories) {
    result.byCategory[category] = { total: 0, passed: 0, failed: 0 };
  }

  // Run each scenario
  for (const scenario of scenarios) {
    const startTime = Date.now();
    
    try {
      const testResult = await Promise.resolve(scenario.test());
      const duration = Date.now() - startTime;
      
      const scenarioResult = {
        id: scenario.id,
        name: scenario.name,
        category: scenario.category,
        priority: scenario.priority,
        result: {
          ...testResult,
          duration
        }
      };
      
      result.scenarios.push(scenarioResult);
      
      if (testResult.passed) {
        result.passed++;
        result.byCategory[scenario.category].passed++;
      } else {
        result.failed++;
        result.byCategory[scenario.category].failed++;
      }
      
      result.byCategory[scenario.category].total++;
      
    } catch (error) {
      result.failed++;
      result.byCategory[scenario.category].failed++;
      result.byCategory[scenario.category].total++;
      
      result.scenarios.push({
        id: scenario.id,
        name: scenario.name,
        category: scenario.category,
        priority: scenario.priority,
        result: {
          passed: false,
          error: error instanceof Error ? error.message : String(error)
        }
      });
    }
  }

  return result;
}

/**
 * Calculate conformance level based on results
 */
export function calculateConformanceLevel(result: ConformanceSuiteResult): ConformanceLevel {
  const mustScenarios = result.scenarios.filter(s => s.priority === 'must');
  const shouldScenarios = result.scenarios.filter(s => s.priority === 'should');
  
  const mustPassed = mustScenarios.filter(s => s.result.passed).length;
  const shouldPassed = shouldScenarios.filter(s => s.result.passed).length;
  
  const mustPercent = mustScenarios.length > 0 ? mustPassed / mustScenarios.length : 1;
  const shouldPercent = shouldScenarios.length > 0 ? shouldPassed / shouldScenarios.length : 1;
  
  if (mustPercent < 0.8) return 'none';
  if (mustPercent < 1.0) return 'partial';
  if (shouldPercent < 0.7) return 'basic';
  if (shouldPercent < 0.9) return 'high';
  return 'full';
}

/**
 * Generate conformance report
 */
export function generateReport(result: ConformanceSuiteResult): string {
  const level = calculateConformanceLevel(result);
  const lines: string[] = [];
  
  lines.push('# VERSA 1.0 Conformance Report');
  lines.push('');
  lines.push(`**Conformance Level:** ${level.toUpperCase()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Total Scenarios: ${result.total}`);
  lines.push(`- Passed: ${result.passed}`);
  lines.push(`- Failed: ${result.failed}`);
  lines.push(`- Pass Rate: ${((result.passed / result.total) * 100).toFixed(1)}%`);
  lines.push('');
  
  lines.push('## By Category');
  lines.push('');
  lines.push('| Category | Total | Passed | Failed | Rate |');
  lines.push('|----------|-------|--------|--------|------|');
  
  for (const [category, stats] of Object.entries(result.byCategory)) {
    if (stats.total === 0) continue;
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    lines.push(`| ${category} | ${stats.total} | ${stats.passed} | ${stats.failed} | ${rate}% |`);
  }
  
  lines.push('');
  lines.push('## By Priority');
  lines.push('');
  
  const byPriority: Record<string, { total: number; passed: number }> = {
    must: { total: 0, passed: 0 },
    should: { total: 0, passed: 0 },
    may: { total: 0, passed: 0 }
  };
  
  for (const scenario of result.scenarios) {
    byPriority[scenario.priority].total++;
    if (scenario.result.passed) {
      byPriority[scenario.priority].passed++;
    }
  }
  
  lines.push('| Priority | Total | Passed | Rate |');
  lines.push('|----------|-------|--------|------|');
  
  for (const [priority, stats] of Object.entries(byPriority)) {
    if (stats.total === 0) continue;
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    lines.push(`| ${priority.toUpperCase()} | ${stats.total} | ${stats.passed} | ${rate}% |`);
  }
  
  lines.push('');
  
  // Failed scenarios
  const failed = result.scenarios.filter(s => !s.result.passed);
  if (failed.length > 0) {
    lines.push('## Failed Scenarios');
    lines.push('');
    
    for (const scenario of failed) {
      lines.push(`### ${scenario.id}: ${scenario.name}`);
      lines.push('');
      lines.push(`**Category:** ${scenario.category}`);
      lines.push(`**Priority:** ${scenario.priority.toUpperCase()}`);
      
      if (scenario.result.error) {
        lines.push('');
        lines.push(`**Error:** ${scenario.result.error}`);
      }
      
      lines.push('');
    }
  }
  
  return lines.join('\n');
}
