// File: dotaislash-conformance/src/index.ts
// What: Main entry point for conformance package
// Why: Export all scenarios and runner
// Related: scenarios/*.ts, runner.ts

export type {
  ConformanceScenario,
  ConformanceCategory,
  ConformanceResult,
  ConformanceSuiteResult,
  ConformanceLevel
} from './types.js';

export { runConformanceSuite, calculateConformanceLevel, generateReport } from './runner.js';

// Export all scenario sets
export { schemaScenarios } from './scenarios/schema-scenarios.js';
export { mergeScenarios } from './scenarios/merge-scenarios.js';
export { contextScenarios } from './scenarios/context-scenarios.js';
export { profileScenarios } from './scenarios/profile-scenarios.js';
export { rulesScenarios } from './scenarios/rules-scenarios.js';
export { cliScenarios } from './scenarios/cli-scenarios.js';
export { permissionsScenarios } from './scenarios/permissions-scenarios.js';

// Combined scenarios
import { schemaScenarios } from './scenarios/schema-scenarios.js';
import { mergeScenarios } from './scenarios/merge-scenarios.js';
import { contextScenarios } from './scenarios/context-scenarios.js';
import { profileScenarios } from './scenarios/profile-scenarios.js';
import { rulesScenarios } from './scenarios/rules-scenarios.js';
import { cliScenarios } from './scenarios/cli-scenarios.js';
import { permissionsScenarios } from './scenarios/permissions-scenarios.js';

export const allScenarios = [
  ...schemaScenarios,
  ...mergeScenarios,
  ...contextScenarios,
  ...profileScenarios,
  ...rulesScenarios,
  ...cliScenarios,
  ...permissionsScenarios
];
