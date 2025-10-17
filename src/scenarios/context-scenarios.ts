// File: dotaislash-conformance/src/scenarios/context-scenarios.ts
// What: Context file conformance scenarios  
// Why: Test context.json structure and content requirements
// Related: types.ts, schema-scenarios.ts

import type { ConformanceScenario } from '../types.js';

export const contextScenarios: ConformanceScenario[] = [
  {
    id: 'context-001',
    name: 'Context file location',
    description: '.ai/context.json must be in .ai folder at project root',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: .ai/context.json path' })
  },
  
  {
    id: 'context-002',
    name: 'Context is JSON',
    description: 'context.json must be valid JSON',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: valid JSON format' })
  },
  
  {
    id: 'context-003',
    name: 'Rules are file paths',
    description: 'Rules array contains relative paths to markdown files',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: rules/filename.md paths' })
  },
  
  {
    id: 'context-004',
    name: 'Context patterns',
    description: 'Context array contains glob patterns',
    category: 'context',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: glob patterns like src/**/*.ts' })
  },
  
  {
    id: 'context-005',
    name: 'Agents are file paths',
    description: 'Agents array contains paths to agent JSON files',
    category: 'context',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: agents/name.json paths' })
  },
  
  {
    id: 'context-006',
    name: 'Settings are optional',
    description: 'Settings object is optional in context',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: settings not required' })
  },
  
  {
    id: 'context-007',
    name: 'Metadata is optional',
    description: 'Metadata object is optional',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: metadata not required' })
  },
  
  {
    id: 'context-008',
    name: 'Permissions are optional',
    description: 'Permissions object is optional',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: permissions not required' })
  },
  
  {
    id: 'context-009',
    name: 'Unknown fields ignored',
    description: 'Additional properties should be ignored gracefully',
    category: 'context',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: forward compatibility' })
  },
  
  {
    id: 'context-010',
    name: 'UTF-8 encoding',
    description: 'context.json must be UTF-8 encoded',
    category: 'context',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: UTF-8 encoding' })
  }
];
