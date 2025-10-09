import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],

  platform: "node",
  target: ["node16"],

  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,

  outfile: "dist/bundle/index.js",
  lineLimit: 80,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
