module.exports = {
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:react-hooks/recommended"
    ],
    rules: {
        "@typescript-eslint/no-misused-promises": [
            2,
            {
                checksVoidReturn: {
                    attributes: false
                }
            }
        ]
    },
    root: true,
    overrides: [
        {
            files: [
                "*.js"
            ],
            extends: [
                "plugin:@typescript-eslint/disable-type-checked"
            ]
        }
    ],
    env: {
        browser: true,
        node: true
    }
}