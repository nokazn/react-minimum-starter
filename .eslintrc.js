const ALLOW = 0;
const WARNING = 1
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    // 'jest/globals': true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    "jest/globals": true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.webpack.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'jest', 'jest-dom'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  rules: {
    // switch 文での prettier との競合を防ぐ
    indent: [ERROR, 2, { SwitchCase: WARNING }],
    'lines-between-class-members': ALLOW,
    'no-console': WARNING,
    'arrow-body-style': ALLOW,
    'no-undef': ALLOW,

    /**
     * eslint-plugin-import
     */
    'import/extensions': [
      ERROR,
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        json: 'never',
      },
    ],
    'import/no-unresolved': [WARNING, { commonjs: true, amd: true }],
    'import/no-extraneous-dependencies': [WARNING, { devDependencies: true }],
    'import/prefer-default-export': ALLOW,

    /**
     * eslint と @typescript-eslint 競合を防ぐ
     */
    // typescript-eslint の no-use-before-define を有効にする
    'no-use-before-define': ALLOW,
    '@typescript-eslint/no-use-before-define': ERROR,
    // typescript-eslint の no-unuserd-vars を有効にする
    'no-unused-vars': ALLOW,
    '@typescript-eslint/no-unused-vars': ERROR,

    // typescript-eslint が上手く推論できでない?
    // https://github.com/typescript-eslint/typescript-eslint/issues/2109
    '@typescript-eslint/no-unsafe-member-access': ALLOW,
    '@typescript-eslint/no-unsafe-assignment': ALLOW,
    '@typescript-eslint/no-unsafe-call': ALLOW,

    /**
     * eslint-plugin-react
     */
    // tsx も有効にする
    'react/jsx-filename-extension': [ERROR, { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': ALLOW,
  },
};
