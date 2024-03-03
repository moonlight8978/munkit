import { pathsToModuleNameMapper } from "ts-jest/dist/config/index.js";
import tsconfig from "./tsconfig.json" with { type: "json" };

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
    useESM: true,
  }),
};
