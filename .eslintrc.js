module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/no-cycle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'implicit-arrow-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'no-plusplus': 'off',
    'operator-linebreak': 'off',
    'no-continue': 'off',
    'nonblock-statement-body-position': 'off',
    curly: 'off',
    'linebreak-style': 0,
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-one-expression-per-line': 'off',
    'react/button-has-type': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
      },
    },
  },
};
