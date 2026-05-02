import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      // Prettier
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],

      // Unused imports — auto-delete
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',

      // Code style
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      // Limits
      complexity: ['error', 10],
      'max-lines': ['error', { max: 255, skipBlankLines: true, skipComments: true }],

      // Debug
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-unreachable': 'error',

      // We prohibit for..in
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'Avoid for..in — use Object.keys/entries.',
        },
      ],

      // React
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**', 'public/**']),
]);

export default eslintConfig;
