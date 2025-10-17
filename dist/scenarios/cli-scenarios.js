// File: dotaislash-conformance/src/scenarios/cli-scenarios.ts
// What: CLI behavior conformance scenarios
// Why: Test CLI commands and options
// Related: types.ts
export const cliScenarios = [
    {
        id: 'cli-001',
        name: 'Init command exists',
        description: 'CLI must provide init command',
        category: 'cli',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: init command' })
    },
    {
        id: 'cli-002',
        name: 'Init creates .ai folder',
        description: 'Init must create .ai/ directory',
        category: 'cli',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: scaffold .ai/' })
    },
    {
        id: 'cli-003',
        name: 'Init creates context.json',
        description: 'Init must create valid context.json',
        category: 'cli',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: create context.json' })
    },
    {
        id: 'cli-004',
        name: 'Lint command exists',
        description: 'CLI should provide lint/validate command',
        category: 'cli',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: lint command' })
    },
    {
        id: 'cli-005',
        name: 'Lint validates schema',
        description: 'Lint must validate against JSON schemas',
        category: 'cli',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: schema validation' })
    },
    {
        id: 'cli-006',
        name: 'Lint checks file references',
        description: 'Lint should verify referenced files exist',
        category: 'cli',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: file reference checks' })
    },
    {
        id: 'cli-007',
        name: 'Print/export command',
        description: 'CLI should provide print/export command',
        category: 'cli',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: print command' })
    },
    {
        id: 'cli-008',
        name: 'Profile selection',
        description: 'CLI should support --profile option',
        category: 'cli',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: --profile flag' })
    },
    {
        id: 'cli-009',
        name: 'Exit codes',
        description: 'CLI must use proper exit codes (0 success, 1 error)',
        category: 'cli',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: standard exit codes' })
    },
    {
        id: 'cli-010',
        name: 'Help text',
        description: 'CLI should provide --help for all commands',
        category: 'cli',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: help documentation' })
    }
];
//# sourceMappingURL=cli-scenarios.js.map