# @dotaislash/conformance

**VERSA 1.0 Conformance Test Suite**

Version: 1.0.0

---

## Overview

Comprehensive test suite with **70 scenarios** to verify VERSA 1.0 specification compliance.

---

## Conformance Levels

| Level | Requirements |
|-------|--------------|
| **Full** | All MUST scenarios pass, all SHOULD scenarios pass |
| **High** | All MUST scenarios pass, most SHOULD scenarios pass (≥90%) |
| **Basic** | All MUST scenarios pass, some SHOULD scenarios pass (≥70%) |
| **Partial** | Most MUST scenarios pass (≥80%) |
| **None** | Many MUST scenarios fail (<80%) |

---

## Installation

```bash
bun add @dotaislash/conformance
```

---

## Usage

### Run All Scenarios

```typescript
import { allScenarios, runConformanceSuite, generateReport } from '@dotaislash/conformance';

const result = await runConformanceSuite(allScenarios);
console.log(generateReport(result));
```

### Run Specific Category

```typescript
import { schemaScenarios, runConformanceSuite } from '@dotaislash/conformance';

const result = await runConformanceSuite(schemaScenarios);
console.log(`Passed: ${result.passed}/${result.total}`);
```

---

## Scenarios

### Schema (10 scenarios)
- Minimal context validation
- Version requirements
- Metadata structure
- Rules array format
- Settings validation
- Profile schema
- Agent schema
- Permissions structure

### Merge (10 scenarios)
- Deep merge array concatenation
- Deep merge object recursion
- Deep merge primitive overrides
- Deep merge null/undefined handling
- Shallow merge behavior
- Replace mode
- Merge strategy validation

### Context (10 scenarios)
- File location requirements
- JSON validity
- File path conventions
- Optional fields
- UTF-8 encoding

### Profile (10 scenarios)
- Profile location
- Naming conventions
- Required fields
- Merge strategies
- Multiple profiles
- Validation

### Rules (10 scenarios)
- Markdown format
- Folder location
- Front matter (optional)
- Metadata structure
- Priority levels
- Attach modes
- Scope options

### CLI (10 scenarios)
- Init command
- Lint/validate command
- Print/export command
- Profile selection
- Exit codes
- Help text

### Permissions (10 scenarios)
- File permissions
- Network permissions
- Command permissions
- Deny precedence
- Glob patterns
- Optional behavior

---

## API

### `runConformanceSuite(scenarios: ConformanceScenario[]): Promise<ConformanceSuiteResult>`

Execute scenarios and return results.

### `calculateConformanceLevel(result: ConformanceSuiteResult): ConformanceLevel`

Determine conformance level based on pass/fail rates.

### `generateReport(result: ConformanceSuiteResult): string`

Generate markdown conformance report.

---

## Example Output

```
# VERSA 1.0 Conformance Report

**Conformance Level:** FULL

## Summary

- Total Scenarios: 70
- Passed: 70
- Failed: 0
- Pass Rate: 100.0%

## By Category

| Category | Total | Passed | Failed | Rate |
|----------|-------|--------|--------|------|
| schema | 10 | 10 | 0 | 100% |
| merge | 10 | 10 | 0 | 100% |
| context | 10 | 10 | 0 | 100% |
| profile | 10 | 10 | 0 | 100% |
| rules | 10 | 10 | 0 | 100% |
| cli | 10 | 10 | 0 | 100% |
| permissions | 10 | 10 | 0 | 100% |

## By Priority

| Priority | Total | Passed | Rate |
|----------|-------|--------|------|
| MUST | 45 | 45 | 100% |
| SHOULD | 20 | 20 | 100% |
| MAY | 5 | 5 | 100% |
```

---

## Scenario Structure

```typescript
interface ConformanceScenario {
  id: string;                    // Unique ID (e.g., 'schema-001')
  name: string;                  // Human-readable name
  description: string;           // What is being tested
  category: ConformanceCategory; // Test category
  priority: 'must' | 'should' | 'may'; // RFC 2119 keywords
  specRef?: string;              // Reference to spec section
  test: () => ConformanceResult; // Test function
}
```

---

## Testing Your Implementation

```typescript
// Create test scenarios for your implementation
import { type ConformanceScenario } from '@dotaislash/conformance';

const myImplementationTests: ConformanceScenario[] = [
  {
    id: 'impl-001',
    name: 'My implementation validates context',
    description: 'Test that my validator works',
    category: 'schema',
    priority: 'must',
    test: () => {
      const result = myValidator.validate({ version: '1.0' });
      return { passed: result.valid };
    }
  }
];

// Run against conformance suite
import { allScenarios, runConformanceSuite } from '@dotaislash/conformance';

const fullSuite = [...allScenarios, ...myImplementationTests];
const result = await runConformanceSuite(fullSuite);
```

---

## License

MIT © dotAIslash

---

## Links

- [VERSA Specification](https://github.com/dotAIslash/dotaislash-spec)
- [Schemas Package](https://github.com/dotAIslash/dotaislash-schemas)
- [CLI Tool](https://github.com/dotAIslash/dotaislash-cli)
