import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const coreWebVitalsConfig = require('eslint-config-next/core-web-vitals')
const typescriptConfig = require('eslint-config-next/typescript')
// Must be last: turns off ESLint formatting rules that would fight Prettier.
const prettierConfig = require('eslint-config-prettier')

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', '**/.afk-worktrees/**'] },
  ...coreWebVitalsConfig,
  ...typescriptConfig,
  prettierConfig,
]

export default eslintConfig
