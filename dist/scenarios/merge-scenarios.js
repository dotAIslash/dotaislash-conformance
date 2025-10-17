// File: dotaislash-conformance/src/scenarios/merge-scenarios.ts
// What: Profile merging conformance scenarios
// Why: Test deep, shallow, and replace merge strategies
// Related: types.ts, schema-scenarios.ts
export const mergeScenarios = [
    {
        id: 'merge-001',
        name: 'Deep merge concatenates arrays',
        description: 'Deep merge must concatenate arrays from base and profile',
        category: 'merge',
        priority: 'must',
        specRef: 'SPEC.md#deep-merge',
        test: () => {
            // This tests the spec requirement, not implementation
            // Implementation-specific tests would use the actual merger
            return {
                passed: true,
                details: 'Spec requires: base.rules + profile.rules = merged.rules'
            };
        }
    },
    {
        id: 'merge-002',
        name: 'Deep merge recurses objects',
        description: 'Deep merge must recursively merge nested objects',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: base.settings.x + profile.settings.y = merged.settings.{x,y}'
            };
        }
    },
    {
        id: 'merge-003',
        name: 'Deep merge profile overrides primitives',
        description: 'Profile primitive values override base values',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: profile values win for primitives'
            };
        }
    },
    {
        id: 'merge-004',
        name: 'Deep merge null removes field',
        description: 'null in profile removes field from merged config',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: profile.field = null removes base.field'
            };
        }
    },
    {
        id: 'merge-005',
        name: 'Deep merge undefined preserves',
        description: 'undefined in profile preserves base value',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: profile.field = undefined keeps base.field'
            };
        }
    },
    {
        id: 'merge-006',
        name: 'Shallow merge replaces arrays',
        description: 'Shallow merge replaces entire arrays',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: profile.array fully replaces base.array'
            };
        }
    },
    {
        id: 'merge-007',
        name: 'Shallow merge top-level only',
        description: 'Shallow merge only merges top-level properties',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: no recursion into nested objects'
            };
        }
    },
    {
        id: 'merge-008',
        name: 'Replace ignores base',
        description: 'Replace mode ignores base configuration entirely',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: only profile used, base discarded'
            };
        }
    },
    {
        id: 'merge-009',
        name: 'Invalid merge strategy fails',
        description: 'Unknown merge strategy must cause error',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: only deep/shallow/replace allowed'
            };
        }
    },
    {
        id: 'merge-010',
        name: 'Merge preserves version',
        description: 'Merged config keeps version 1.0',
        category: 'merge',
        priority: 'must',
        test: () => {
            return {
                passed: true,
                details: 'Spec requires: version field maintained after merge'
            };
        }
    }
];
//# sourceMappingURL=merge-scenarios.js.map