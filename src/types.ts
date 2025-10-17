// File: dotaislash-conformance/src/types.ts
// What: Types for conformance testing
// Why: Type-safe test scenarios and results
// Related: scenarios/*.ts, runner.ts

/**
 * Conformance test scenario
 */
export interface ConformanceScenario {
  /** Unique scenario ID */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** Scenario description */
  description: string;
  
  /** Category (schema, cli, profiles, etc.) */
  category: ConformanceCategory;
  
  /** Priority level */
  priority: 'must' | 'should' | 'may';
  
  /** Spec section reference */
  specRef?: string;
  
  /** Test function */
  test: () => Promise<ConformanceResult> | ConformanceResult;
}

/**
 * Test categories
 */
export type ConformanceCategory =
  | 'schema'
  | 'context'
  | 'profile'
  | 'agent'
  | 'rules'
  | 'permissions'
  | 'merge'
  | 'discovery'
  | 'cli';

/**
 * Test result
 */
export interface ConformanceResult {
  /** Whether test passed */
  passed: boolean;
  
  /** Error message if failed */
  error?: string;
  
  /** Additional details */
  details?: string;
  
  /** Execution time in ms */
  duration?: number;
}

/**
 * Test suite results
 */
export interface ConformanceSuiteResult {
  /** Total scenarios */
  total: number;
  
  /** Passed scenarios */
  passed: number;
  
  /** Failed scenarios */
  failed: number;
  
  /** Skipped scenarios */
  skipped: number;
  
  /** Results by category */
  byCategory: Record<ConformanceCategory, {
    total: number;
    passed: number;
    failed: number;
  }>;
  
  /** Individual results */
  scenarios: Array<{
    id: string;
    name: string;
    category: ConformanceCategory;
    priority: string;
    result: ConformanceResult;
  }>;
}

/**
 * Conformance level achieved
 */
export type ConformanceLevel =
  | 'full'      // All MUST pass, all SHOULD pass
  | 'high'      // All MUST pass, most SHOULD pass
  | 'basic'     // All MUST pass
  | 'partial'   // Some MUST fail
  | 'none';     // Many MUST fail
