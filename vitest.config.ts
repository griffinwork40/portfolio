import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Content-integrity + pure-utility tests run in a Node environment (no DOM):
// data/content.ts and lib/utils.ts have no runtime browser dependencies.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    // Mirror the tsconfig `@/*` -> project-root alias so tests import the same way components do.
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
