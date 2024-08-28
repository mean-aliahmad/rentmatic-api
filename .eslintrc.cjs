module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    globals: {
        module: 'readonly',
    },
    rules: {
        'no-undef': 'off',
        'no-console': 'off',
        "linebreak-style": "off",
        "indent": "off",
        "import/extensions": ["error", "ignorePackages", { "js": "never" }],
        "consistent-return": "off",
        "max-len": "off",
        "comma-dangle": "off",
        "no-trailing-spaces": "off",
        'import/extensions': 'off', // Disable the import-extensions rule
        'func-names': 'off',
        'object-curly-newline': 'off',
        'no-return-await': 'off'
    },
};
