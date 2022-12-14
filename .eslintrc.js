module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    plugins: [],
    ignorePatterns: ['node_modules/', '.next/'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['./'],
            },
            alias: {
                map: [
                    ['hooks', './hooks'],
                    ['pages', './pages'],
                    ['public', './public'],
                    ['themes', './themes'],
                    ['types', './types'],
                    ['utils', './utils'],
                    ['public', './public'],
                    ['constants', './constants'],
                    ['components', './components'],
                    ['styles', './styles'],
                ],
                extensions: ['.ts', '.tsx'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        useJSXTextNode: true,
    },
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
        node: true,
    },
    rules: {
        /* INDENT RULES */
        indent: 'off',
        'no-tabs': 'off',
        '@typescript-eslint/indent': ['error', 'tab'],
        'react/jsx-indent': ['error', 'tab'],

        /* OTHER RULES */
        '@typescript-eslint/camelcase': 'off',
        'max-len': ['error', 130, 4],
        'import/prefer-default-export': 'off',
        'import/extensions': 0,
        'consistent-return': 'off',
        'react/jsx-indent-props': [2, 'tab'],
        'react/destructuring-assignment': 'off',
        'react/no-array-index-key': 'warn',
        'react/require-default-props': 'off',
        'react/forbid-prop-types': 'off',
        'jsx-a11y/no-autofocus': 'warn',
        'no-param-reassign': 'warn',
        'react/jsx-no-undef': ['error', { allowGlobals: true }],
        '@typescript-eslint/no-unused-vars': 'error',
        'import/no-named-as-default': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-extra-semi': 'warn',
        'object-curly-newline': 'off',
        'arrow-parens': 'off',
        'prefer-regex-literals': 'warn',
        'no-unsafe-optional-chaining': 'off',
        'no-nested-ternary': 'warn',
        'default-param-last': 'off',
        'function-paren-newline': 'off',
        camelcase: 'off',
        semi: ['error', 'always'],
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'linebreak-style': [0, 'error', 'windows'],
        'lines-between-class-members': 'off',
        'no-unused-expressions': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        'react/display-name': 'off',
        /* NEED TO FIX */
        'react/jsx-one-expression-per-line': 'warn',
        'no-return-await': 'warn',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'react/prefer-stateless-function': 'warn',
        'react/function-component-definition': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/no-unstable-nested-components': ['off'],
        'react/jsx-no-bind': ['off'],
        'import/no-cycle': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/tabindex-no-positive': 0,
        'jsx-a11y/anchor-is-valid': ['error', {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton'],
        }],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
};
