module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
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