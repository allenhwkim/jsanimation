module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': 'google',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    "require-jsdoc": 0,
    "guard-for-in": 0,
    "no-var": 0,
    "no-unused-vars": 0,
    "max-len": 0,
    "prefer-rest-params": 0
  },
};


