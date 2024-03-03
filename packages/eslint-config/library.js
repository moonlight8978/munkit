const { resolve } = require("node:path");

const baseRules = require("./rules/base");

const project = resolve(process.cwd(), "tsconfig.json");
console.log(project);

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  plugins: ["only-warn", "jest"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
    "*.config.js",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: {
    ...baseRules,
  },
};
