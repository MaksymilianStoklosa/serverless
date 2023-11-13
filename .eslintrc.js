module.exports = {
  ignorePatterns: ["node_modules/", "dist/", "build/", "newrelic/", "config/", "**/test/**", "**/example/**"],
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
      plugins: ["@typescript-eslint", "prettier"],
      env: {
        browser: true,
        es2021: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-namespace": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-console": "warn",
        "no-use-before-define": "error",
        eqeqeq: "error",
        "no-invalid-this": "error",
        "no-return-assign": "error",
        "no-unused-expressions": ["error", { allowTernary: true }],
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "arrow-spacing": "error",
        "no-confusing-arrow": "error",
        "no-duplicate-imports": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-template": "error",
      },
    },
    {
      files: ["**/*.test.ts"],
    },
    {
      env: {
        node: true,
      },
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
      files: [
        "bin/index.js",
        "lib.js",
        ".eslintrc.{js,cjs}",
        "commitlint.config.js",
        ".lintstagedrc.js",
        "jest.config.js",
        "testEnviroment.js",
        "**/rollup.config.js",
        "**/rollup.config.lambda.js",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["**/*.js"],
      parser: "@babel/eslint-parser",
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
      plugins: ["prettier"],
      parserOptions: {
        requireConfigFile: false,
      },
      env: {
        browser: true,
        es6: true,
      },
    },
    {
      files: ["*.test.js"],
      parser: "@babel/eslint-parser",
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
      plugins: ["jest", "prettier"],
      parserOptions: {
        requireConfigFile: false,
      },
      env: {
        node: true,
        es6: true,
        browser: true,
      },
    },
  ],
  rules: {},
};
