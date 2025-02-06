import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended, 
  tseslint.configs.recommended, 
  react.configs.recommended, 
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'], 
    languageOptions: {
      parser: tsparser, 
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier, 
    },
    rules: {
      'prettier/prettier': 'error', // Aplica Prettier como regla
      'react/prop-types': 'off', // Desactiva prop-types porque se usa TypeScript
      'no-unused-vars': 'warn', // Advierte sobre variables no usadas
      'no-console': 'warn', // Advierte sobre console.log
    },
  },
];
