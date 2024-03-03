import multi from "@rollup/plugin-multi-entry";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

/**
 * @type {import('rollup').OutputOptions["entryFileNames"]}
 */
const entryFileNames = (chunk) => {
  if (chunk.name.includes("virtual")) {
    return "main.js";
  }

  return `${chunk.name}.js`;
};

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: "src/**/*.ts",
    output: [
      {
        dir: "build/cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      multi({
        entryFileName: "main.js",
      }),
      typescript({
        exclude: ["__tests__/**/*"],
        declaration: true,
        outDir: "build/cjs",
      }),
    ],
  },
  {
    input: "src/**/*.ts",
    output: {
      dir: "build/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames,
    },
    plugins: [
      multi({
        preserveModules: true,
      }),
      typescript({
        exclude: ["__tests__/**/*"],
        declaration: true,
        outDir: "build/esm",
      }),
    ],
  },
];

export default config;
