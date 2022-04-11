/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser'
  },
  plugins: ['import'],
  rules: {
    // vue base
    'vue/no-unused-vars': [
      'error',
      {
        ignorePattern: '^_'
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // "always" 需要在没有内容的元素上自动关闭
          normal: 'always',
          component: 'always' // Vue.js 自定义组件的样式
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': 0,
    'vue/custom-event-name-casing': 0,
    'vue/eqeqeq': [2, 'always', { null: 'ignore' }],
    'vue/multi-word-component-names': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/no-reserved-props': 0,
    // common
    'no-unused-vars': ['error', { args: 'none' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [2, 'never'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'],
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'jsx-quotes': 2,
    'no-async-promise-executor': 0,
    'space-before-function-paren': 0,
    'no-empty': 0,
    'spaced-comment': ['error', 'always'],
    'no-undef': 0,
    // import
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin']
      }
    ],
    'import/first': 2,
    // typescript
    '@typescript-eslint/no-explicit-any': 0,
    // 防止<script setup>使用的变量<template>被标记为未使用  禁用掉
    'vue/script-setup-uses-vars': 2,
    '@typescript-eslint/no-unused-vars': 2
  }
})
