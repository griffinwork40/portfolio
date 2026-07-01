import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const coreWebVitalsConfig = require('eslint-config-next/core-web-vitals')
const typescriptConfig = require('eslint-config-next/typescript')

const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', '**/.afk-worktrees/**'] },
  ...coreWebVitalsConfig,
  ...typescriptConfig,
]

export default eslintConfig
