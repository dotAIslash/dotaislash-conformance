// File: dotaislash-conformance/tests/conformance.test.ts
// What: Tests for conformance suite
// Why: Verify scenarios execute and report correctly
// Related: src/runner.ts, src/scenarios/*.ts

import { describe, test, expect } from 'vitest';
import {
  allScenarios,
  schemaScenarios,
  mergeScenarios,
  contextScenarios,
  profileScenarios,
  rulesScenarios,
  cliScenarios,
  permissionsScenarios,
  runConformanceSuite,
  calculateConformanceLevel,
  generateReport
} from '../src/index.js';

describe('Scenario Sets', () => {
  test('schema scenarios exist', () => {
    expect(schemaScenarios.length).toBeGreaterThan(0);
  });
  
  test('merge scenarios exist', () => {
    expect(mergeScenarios.length).toBeGreaterThan(0);
  });
  
  test('context scenarios exist', () => {
    expect(contextScenarios.length).toBeGreaterThan(0);
  });
  
  test('profile scenarios exist', () => {
    expect(profileScenarios.length).toBeGreaterThan(0);
  });
  
  test('rules scenarios exist', () => {
    expect(rulesScenarios.length).toBeGreaterThan(0);
  });
  
  test('cli scenarios exist', () => {
    expect(cliScenarios.length).toBeGreaterThan(0);
  });
  
  test('permissions scenarios exist', () => {
    expect(permissionsScenarios.length).toBeGreaterThan(0);
  });
  
  test('all scenarios combined', () => {
    expect(allScenarios.length).toBeGreaterThanOrEqual(50);
  });
  
  test('scenarios have unique IDs', () => {
    const ids = allScenarios.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
  
  test('all scenarios have required fields', () => {
    for (const scenario of allScenarios) {
      expect(scenario.id).toBeTruthy();
      expect(scenario.name).toBeTruthy();
      expect(scenario.description).toBeTruthy();
      expect(scenario.category).toBeTruthy();
      expect(scenario.priority).toMatch(/^(must|should|may)$/);
      expect(typeof scenario.test).toBe('function');
    }
  });
});

describe('Scenario Execution', () => {
  test('schema scenarios pass', async () => {
    const result = await runConformanceSuite(schemaScenarios);
    expect(result.passed).toBeGreaterThan(0);
  });
  
  test('all scenarios run without errors', async () => {
    const result = await runConformanceSuite(allScenarios);
    expect(result.total).toBe(allScenarios.length);
    expect(result.passed + result.failed + result.skipped).toBe(result.total);
  });
  
  test('suite result has correct structure', async () => {
    const result = await runConformanceSuite(schemaScenarios.slice(0, 3));
    
    expect(result.total).toBe(3);
    expect(result.passed).toBeGreaterThanOrEqual(0);
    expect(result.failed).toBeGreaterThanOrEqual(0);
    expect(result.byCategory).toBeDefined();
    expect(result.scenarios).toHaveLength(3);
  });
  
  test('scenario results include duration', async () => {
    const result = await runConformanceSuite(schemaScenarios.slice(0, 1));
    
    const scenario = result.scenarios[0];
    expect(scenario.result.duration).toBeGreaterThanOrEqual(0);
  });
});

describe('Conformance Levels', () => {
  test('all pass = full conformance', async () => {
    const mockScenarios = [
      {
        id: 'test-1',
        name: 'Test 1',
        description: 'Test',
        category: 'schema' as const,
        priority: 'must' as const,
        test: () => ({ passed: true })
      },
      {
        id: 'test-2',
        name: 'Test 2',
        description: 'Test',
        category: 'schema' as const,
        priority: 'should' as const,
        test: () => ({ passed: true })
      }
    ];
    
    const result = await runConformanceSuite(mockScenarios);
    const level = calculateConformanceLevel(result);
    
    expect(level).toBe('full');
  });
  
  test('must fail = partial/none conformance', async () => {
    const mockScenarios = [
      {
        id: 'test-1',
        name: 'Test 1',
        description: 'Test',
        category: 'schema' as const,
        priority: 'must' as const,
        test: () => ({ passed: false, error: 'Failed' })
      }
    ];
    
    const result = await runConformanceSuite(mockScenarios);
    const level = calculateConformanceLevel(result);
    
    expect(['partial', 'none']).toContain(level);
  });
});

describe('Report Generation', () => {
  test('generates markdown report', async () => {
    const result = await runConformanceSuite(schemaScenarios.slice(0, 3));
    const report = generateReport(result);
    
    expect(report).toContain('# VERSA 1.0 Conformance Report');
    expect(report).toContain('## Summary');
    expect(report).toContain('## By Category');
    expect(report).toContain('## By Priority');
  });
  
  test('report includes statistics', async () => {
    const result = await runConformanceSuite(schemaScenarios);
    const report = generateReport(result);
    
    expect(report).toMatch(/Total Scenarios: \d+/);
    expect(report).toMatch(/Passed: \d+/);
    expect(report).toMatch(/Pass Rate: \d+/);
  });
  
  test('report includes failed scenarios', async () => {
    const mockScenarios = [
      {
        id: 'fail-1',
        name: 'Failing Test',
        description: 'This will fail',
        category: 'schema' as const,
        priority: 'must' as const,
        test: () => ({ passed: false, error: 'Test error' })
      }
    ];
    
    const result = await runConformanceSuite(mockScenarios);
    const report = generateReport(result);
    
    expect(report).toContain('## Failed Scenarios');
    expect(report).toContain('fail-1');
    expect(report).toContain('Test error');
  });
});

describe('Full Suite', () => {
  test('runs all 60+ scenarios', async () => {
    const result = await runConformanceSuite(allScenarios);
    
    expect(result.total).toBeGreaterThanOrEqual(60);
    expect(result.passed).toBeGreaterThan(0);
    // Most scenarios should pass (they're spec requirements, not implementation tests)
    expect(result.passed / result.total).toBeGreaterThan(0.9);
  });
  
  test('categorizes all scenarios correctly', async () => {
    const result = await runConformanceSuite(allScenarios);
    
    expect(result.byCategory.schema.total).toBeGreaterThan(0);
    expect(result.byCategory.merge.total).toBeGreaterThan(0);
    expect(result.byCategory.context.total).toBeGreaterThan(0);
    expect(result.byCategory.profile.total).toBeGreaterThan(0);
    expect(result.byCategory.rules.total).toBeGreaterThan(0);
    expect(result.byCategory.cli.total).toBeGreaterThan(0);
    expect(result.byCategory.permissions.total).toBeGreaterThan(0);
  });
});
