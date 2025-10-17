// File: dotaislash-conformance/src/scenarios/schema-scenarios.ts
// What: Schema validation conformance scenarios
// Why: Test JSON Schema compliance for all VERSA primitives
// Related: types.ts, runner.ts

import type { ConformanceScenario } from '../types.js';
import { validateContext, validateProfile, validateAgent } from '@dotaislash/schemas';

export const schemaScenarios: ConformanceScenario[] = [
  {
    id: 'schema-001',
    name: 'Minimal context validates',
    description: 'A context with only version field must validate',
    category: 'schema',
    priority: 'must',
    specRef: 'SPEC.md#context-json',
    test: () => {
      const result = validateContext({ version: '1.0' });
      return {
        passed: result.valid,
        error: result.errors?.[0]?.message
      };
    }
  },
  
  {
    id: 'schema-002',
    name: 'Context requires version',
    description: 'Context without version field must fail validation',
    category: 'schema',
    priority: 'must',
    test: () => {
      const result = validateContext({});
      return {
        passed: !result.valid, // Should fail
        error: result.valid ? 'Should have failed validation' : undefined
      };
    }
  },
  
  {
    id: 'schema-003',
    name: 'Version must be 1.0',
    description: 'Only version "1.0" is valid for VERSA 1.0',
    category: 'schema',
    priority: 'must',
    test: () => {
      const v10 = validateContext({ version: '1.0' });
      const v20 = validateContext({ version: '2.0' });
      
      return {
        passed: v10.valid && !v20.valid,
        error: !v10.valid ? 'v1.0 should be valid' : v20.valid ? 'v2.0 should be invalid' : undefined
      };
    }
  },
  
  {
    id: 'schema-004',
    name: 'Context accepts optional metadata',
    description: 'Metadata object with name, description, tags is valid',
    category: 'schema',
    priority: 'must',
    test: () => {
      const result = validateContext({
        version: '1.0',
        metadata: {
          name: 'Test Project',
          description: 'A test',
          tags: ['typescript', 'backend']
        }
      });
      
      return {
        passed: result.valid,
        error: result.errors?.[0]?.message
      };
    }
  },
  
  {
    id: 'schema-005',
    name: 'Rules array contains strings',
    description: 'Rules field must be array of strings',
    category: 'schema',
    priority: 'must',
    test: () => {
      const valid = validateContext({
        version: '1.0',
        rules: ['rules/style.md', 'rules/testing.md']
      });
      
      const invalid = validateContext({
        version: '1.0',
        rules: [123, true] as any
      });
      
      return {
        passed: valid.valid && !invalid.valid,
        error: !valid.valid ? 'Valid rules failed' : invalid.valid ? 'Invalid rules passed' : undefined
      };
    }
  },
  
  {
    id: 'schema-006',
    name: 'Settings temperature range',
    description: 'Temperature must be between 0 and 2',
    category: 'schema',
    priority: 'must',
    test: () => {
      const valid = validateContext({
        version: '1.0',
        settings: { temperature: 0.7 }
      });
      
      const tooLow = validateContext({
        version: '1.0',
        settings: { temperature: -0.1 }
      });
      
      const tooHigh = validateContext({
        version: '1.0',
        settings: { temperature: 2.1 }
      });
      
      return {
        passed: valid.valid && !tooLow.valid && !tooHigh.valid,
        error: !valid.valid ? '0.7 should be valid' : tooLow.valid ? '-0.1 should be invalid' : 'Validation incomplete'
      };
    }
  },
  
  {
    id: 'schema-007',
    name: 'Profile requires merge strategy',
    description: 'Profile must have merge field with deep/shallow/replace',
    category: 'schema',
    priority: 'must',
    test: () => {
      const noMerge = validateProfile({
        version: '1.0'
      });
      
      const validMerge = validateProfile({
        version: '1.0',
        merge: 'deep'
      });
      
      return {
        passed: !noMerge.valid && validMerge.valid,
        error: noMerge.valid ? 'Should require merge' : !validMerge.valid ? 'Valid merge failed' : undefined
      };
    }
  },
  
  {
    id: 'schema-008',
    name: 'Profile merge strategy enum',
    description: 'Merge must be one of deep, shallow, replace',
    category: 'schema',
    priority: 'must',
    test: () => {
      const deep = validateProfile({ version: '1.0', merge: 'deep' });
      const shallow = validateProfile({ version: '1.0', merge: 'shallow' });
      const replace = validateProfile({ version: '1.0', merge: 'replace' });
      const invalid = validateProfile({ version: '1.0', merge: 'invalid' as any });
      
      return {
        passed: deep.valid && shallow.valid && replace.valid && !invalid.valid,
        error: !deep.valid ? 'deep invalid' : !shallow.valid ? 'shallow invalid' : !replace.valid ? 'replace invalid' : invalid.valid ? 'invalid passed' : undefined
      };
    }
  },
  
  {
    id: 'schema-009',
    name: 'Agent optional fields',
    description: 'Agent can have name, description, model, rules',
    category: 'schema',
    priority: 'must',
    test: () => {
      const result = validateAgent({
        version: '1.0',
        name: 'Code Reviewer',
        description: 'Reviews code',
        model: 'claude-sonnet-4',
        temperature: 0.3,
        rules: ['rules/review.md']
      });
      
      return {
        passed: result.valid,
        error: result.errors?.[0]?.message
      };
    }
  },
  
  {
    id: 'schema-010',
    name: 'Permissions structure',
    description: 'Permissions can specify files, network, commands',
    category: 'schema',
    priority: 'must',
    test: () => {
      const result = validateContext({
        version: '1.0',
        permissions: {
          files: {
            read: ['src/**'],
            write: ['src/**'],
            deny: ['.env*']
          },
          network: {
            allow: ['https://api.example.com'],
            deny: ['*']
          },
          commands: {
            allow: ['npm test'],
            deny: ['rm -rf']
          }
        }
      });
      
      return {
        passed: result.valid,
        error: result.errors?.[0]?.message
      };
    }
  }
];
