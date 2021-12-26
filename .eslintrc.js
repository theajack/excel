module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  'rules': {
    'prefer-const': 'error',
    'no-extend-native': 0,
    'no-new': 0,
    'no-useless-escape': 0,
    'no-useless-constructor': 0,
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'indent': ['error', 4, {
        'SwitchCase': 1
    }],
    'space-infix-ops': ['error', {'int32Hint': false}],
    'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
    }],
    'semi': ['error', 'always'],
    'comma-dangle': 0,
    'no-console': 0,
    'no-debugger': 0,
    'id-length': 0,
    'eol-last': 0,
    'object-curly-spacing': ['error', 'never'],
    'arrow-spacing': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'error',
    'spaced-comment': 'error',
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'no-unreachable': 'error',
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'semi-spacing': 'error',
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'no-undef': 'error',
  }
}
