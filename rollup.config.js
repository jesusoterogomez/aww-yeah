import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default {
    input: "src/index.ts",
    output: {
        dir: "dist",
        format: "cjs", // Export as ES5 node modules.
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        typescript({
            typescript: require("typescript"),
        }),
        json(),
    ],
};
