// File: dotaislash-conformance/vitest.config.ts
// What: Vitest configuration for conformance tests
// Why: Test VERSA 1.0 spec compliance
// Related: tests/*.test.ts

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000
  }
});
