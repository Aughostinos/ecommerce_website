export default [
  {
    files: ["**/*.js"],
    ignores: ["babel.config.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    plugins: {
      jest: require("eslint-plugin-jest"),
    },
    rules: {
      "max-classes-per-file": "off",
      "no-underscore-dangle": "off",
      "no-console": "off",
      "no-shadow": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "LabeledStatement",
          message: "Labeled statements are not allowed.",
        },
        {
          selector: "WithStatement",
          message: "With statements are not allowed.",
        },
      ],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ["**/*.test.js"],
    env: {
      jest: true,
    },
  },
];
