import type { ConformanceScenario, ConformanceSuiteResult, ConformanceLevel } from './types.js';
/**
 * Run all conformance scenarios
 */
export declare function runConformanceSuite(scenarios: ConformanceScenario[]): Promise<ConformanceSuiteResult>;
/**
 * Calculate conformance level based on results
 */
export declare function calculateConformanceLevel(result: ConformanceSuiteResult): ConformanceLevel;
/**
 * Generate conformance report
 */
export declare function generateReport(result: ConformanceSuiteResult): string;
//# sourceMappingURL=runner.d.ts.map