const { pathsToModuleNameMapper } = require("ts-jest");
const tsconfig = require("./tsconfig.json");

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
    useESM: true,
  }),
  transform: {
    "\\.(ts|tsx|js|jsx)$": ["ts-jest"],
  },
  testMatch: ["**/*.(spec|test).(ts|js)"],
};

module.exports = config;
