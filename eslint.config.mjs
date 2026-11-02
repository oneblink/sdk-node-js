import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import pluginSecurity from 'eslint-plugin-security'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const compat = new FlatCompat({
  baseDirectory: _dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const pluginSecurityStrict = {
  ...pluginSecurity.configs.recommended,
  rules: Object.fromEntries(
    Object.keys(pluginSecurity.configs.recommended.rules).map((rule) => [
      rule,
      'error',
    ]),
  ),
}

export default [
  {
    ignores: [
      './node_modules/**',
      './tenants/**',
      './docs/**',
      './local-tests/**',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ),
  pluginSecurityStrict,
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 2021,

      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },

    rules: {},
  },
]
