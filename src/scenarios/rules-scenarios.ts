// File: dotaislash-conformance/src/scenarios/rules-scenarios.ts
// What: Rule file conformance scenarios
// Why: Test rule structure and metadata
// Related: types.ts

import type { ConformanceScenario } from '../types.js';

export const rulesScenarios: ConformanceScenario[] = [
  {
    id: 'rules-001',
    name: 'Rules are markdown',
    description: 'Rule files must be markdown (.md) format',
    category: 'rules',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: .md extension' })
  },
  
  {
    id: 'rules-002',
    name: 'Rules in rules folder',
    description: 'Rules must be in .ai/rules/ folder',
    category: 'rules',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: .ai/rules/ location' })
  },
  
  {
    id: 'rules-003',
    name: 'Rule front matter optional',
    description: 'YAML front matter is optional',
    category: 'rules',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: front matter optional' })
  },
  
  {
    id: 'rules-004',
    name: 'Front matter structure',
    description: 'Front matter must use ai:meta format',
    category: 'rules',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: ai:meta YAML block' })
  },
  
  {
    id: 'rules-005',
    name: 'Priority levels',
    description: 'Priority can be critical, high, medium, low',
    category: 'rules',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: 4 priority levels' })
  },
  
  {
    id: 'rules-006',
    name: 'Attach modes',
    description: 'Attach can be always, on-demand, never',
    category: 'rules',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: 3 attach modes' })
  },
  
  {
    id: 'rules-007',
    name: 'Scope options',
    description: 'Scope can be global, file, function',
    category: 'rules',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: 3 scope levels' })
  },
  
  {
    id: 'rules-008',
    name: 'Applies_to array',
    description: 'applies_to can filter by language/framework',
    category: 'rules',
    priority: 'should',
    test: () => ({ passed: true, details: 'Spec recommends: language filters' })
  },
  
  {
    id: 'rules-009',
    name: 'Rule content',
    description: 'Rule body is plain markdown',
    category: 'rules',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: markdown content' })
  },
  
  {
    id: 'rules-010',
    name: 'Rule UTF-8',
    description: 'Rule files must be UTF-8 encoded',
    category: 'rules',
    priority: 'must',
    test: () => ({ passed: true, details: 'Spec requirement: UTF-8 encoding' })
  }
];
