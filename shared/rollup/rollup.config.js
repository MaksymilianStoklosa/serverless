const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const terser = require("@rollup/plugin-terser");
const { execSync } = require("child_process");

const zip = () => {
  return {
    name: "zip",
    writeBundle: {
      handler() {
        execSync("cd dist && zip -r ./lambda.zip ./index.js");
      },
    },
  };
};

module.exports = {
  input: "src/lambda.ts",
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    if (warning.code === "CIRCULAR_DEPENDENCY" && warning.message.includes("node_modules")) return;
    warn(warning);
  },
  plugins: [
    // Bundles commonjs modules
    commonjs(),
    // Resolves dependencies from node_modules
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ["node"],
    }),
    // Integration between Rollup and Typescript.
    typescript(),
    // Format json to es6 module
    json(),
    // Minify code
    terser(),
    // Zip bundle
    zip(),
  ],

  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
  },
};
