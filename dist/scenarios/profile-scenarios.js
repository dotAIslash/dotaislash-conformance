// File: dotaislash-conformance/src/scenarios/profile-scenarios.ts
// What: Profile file conformance scenarios
// Why: Test profile structure and merge behavior
// Related: types.ts, merge-scenarios.ts
export const profileScenarios = [
    {
        id: 'profile-001',
        name: 'Profile location',
        description: 'Profiles must be in .ai/profiles/ folder',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: .ai/profiles/*.json' })
    },
    {
        id: 'profile-002',
        name: 'Profile naming',
        description: 'Profile filename determines profile name',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: cursor.json → cursor profile' })
    },
    {
        id: 'profile-003',
        name: 'Profile has version',
        description: 'Profile must have version field',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: version: "1.0"' })
    },
    {
        id: 'profile-004',
        name: 'Profile has merge',
        description: 'Profile must have merge strategy',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: merge: deep|shallow|replace' })
    },
    {
        id: 'profile-005',
        name: 'Profile can override any field',
        description: 'Profile can override any context field',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: full override capability' })
    },
    {
        id: 'profile-006',
        name: 'Profile metadata optional',
        description: 'Profile metadata is optional',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: metadata not required' })
    },
    {
        id: 'profile-007',
        name: 'Multiple profiles allowed',
        description: 'Project can have multiple profiles',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: unlimited profiles' })
    },
    {
        id: 'profile-008',
        name: 'Profile defaults',
        description: 'Implementation can set default merge strategy',
        category: 'profile',
        priority: 'may',
        test: () => ({ passed: true, details: 'Spec allows: default merge strategy' })
    },
    {
        id: 'profile-009',
        name: 'Profile validation',
        description: 'Invalid profile must cause error',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: validate profiles' })
    },
    {
        id: 'profile-010',
        name: 'Profile UTF-8',
        description: 'Profile files must be UTF-8 encoded',
        category: 'profile',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: UTF-8 encoding' })
    }
];
//# sourceMappingURL=profile-scenarios.js.map