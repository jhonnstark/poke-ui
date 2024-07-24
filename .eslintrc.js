/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'vuetify',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
