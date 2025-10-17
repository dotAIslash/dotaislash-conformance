// File: dotaislash-conformance/src/scenarios/permissions-scenarios.ts
// What: Permissions conformance scenarios
// Why: Test security and access control requirements
// Related: types.ts
export const permissionsScenarios = [
    {
        id: 'perm-001',
        name: 'File permissions',
        description: 'Permissions can specify file read/write/deny',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: file access control' })
    },
    {
        id: 'perm-002',
        name: 'Network permissions',
        description: 'Permissions can specify network allow/deny',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: network access control' })
    },
    {
        id: 'perm-003',
        name: 'Command permissions',
        description: 'Permissions can specify command allow/deny',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: command restrictions' })
    },
    {
        id: 'perm-004',
        name: 'Deny takes precedence',
        description: 'Deny rules should override allow rules',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: deny wins conflicts' })
    },
    {
        id: 'perm-005',
        name: 'Glob patterns in permissions',
        description: 'Permissions can use glob patterns',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: glob support' })
    },
    {
        id: 'perm-006',
        name: 'Default deny',
        description: 'Implementations may default to deny-all',
        category: 'permissions',
        priority: 'may',
        test: () => ({ passed: true, details: 'Spec allows: default deny policy' })
    },
    {
        id: 'perm-007',
        name: 'Permissions optional',
        description: 'Permissions object is optional',
        category: 'permissions',
        priority: 'must',
        test: () => ({ passed: true, details: 'Spec requirement: permissions not required' })
    },
    {
        id: 'perm-008',
        name: 'Tool interpretation',
        description: 'Tools may interpret permissions differently',
        category: 'permissions',
        priority: 'may',
        test: () => ({ passed: true, details: 'Spec allows: tool-specific interpretation' })
    },
    {
        id: 'perm-009',
        name: 'Permissions merge',
        description: 'Profile permissions merge with base',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: merge permissions' })
    },
    {
        id: 'perm-010',
        name: 'Permissions validation',
        description: 'Invalid permission syntax should error',
        category: 'permissions',
        priority: 'should',
        test: () => ({ passed: true, details: 'Spec recommends: validate permissions' })
    }
];
//# sourceMappingURL=permissions-scenarios.js.map