import { defineConfig } from 'eslint/config';

import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { prettier },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'no-undef': 'off'
    }
  },
  eslintConfigPrettier
]);
