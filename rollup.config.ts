import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      exports: "named",
      sourcemap: true,
    },
    {
      format: "es",
      file: packageJson.module,
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    external(),
    commonjs({
      include: ["node_modules/**"],
    }),
    typescript({
      clean: true,
      rollupCommonJSResolveHack: true,
      exclude: ["node_modules"],
    }),
  ],
};
