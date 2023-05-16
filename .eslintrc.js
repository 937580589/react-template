module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@emotion"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/no-unknown-property": [2, { "ignore": ["css"] }],
        "@emotion/no-unused-css": "off",
    },
    "settings": {
        "react": {
            "version": "detect",
        },
        "emotion": {
            "autoLabel": "dev-only",
            "labelFormat": "[local]"
        }
    }
}
